"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import FareStatistics from "@/components/mot/FareStatistics"
import FareFilters from "@/components/mot/FareFilters"
import FareTable from "@/components/mot/FareTable"
import FareQuickActions from "@/components/mot/FareQuickActions"
import { usePagination, Pagination } from '@/components/mot/pagination'
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals'
import { Plus } from "lucide-react"

interface FareStructure {
  id: string
  busType: string
  facilityType: string
  baseFare: number
  perKmRate: number
  effectiveFrom: string
  status: string
  route?: string
  operator?: string
}

const fareStructures: FareStructure[] = [
  {
    id: "FS001",
    busType: "AC",
    facilityType: "Luxury",
    baseFare: 100.0,
    perKmRate: 5.8,
    effectiveFrom: "2024-01-01",
    status: "Active",
    route: "Colombo - Kandy",
    operator: "SLTB Central",
  },
  {
    id: "FS002",
    busType: "Non-AC",
    facilityType: "Normal",
    baseFare: 77.0,
    perKmRate: 4.8,
    effectiveFrom: "2025-01-01",
    status: "Active",
    route: "Colombo - Galle",
    operator: "Southern Transport",
  },
  {
    id: "FS003",
    busType: "Semi-Luxury",
    facilityType: "Semi-Luxury",
    baseFare: 48.0,
    perKmRate: 4.5,
    effectiveFrom: "2024-10-01",
    status: "Active",
    route: "Kandy - Nuwara Eliya",
    operator: "Hill Country Express",
  },
  {
    id: "FS004",
    busType: "AC",
    facilityType: "Express",
    baseFare: 900.0,
    perKmRate: 6.4,
    effectiveFrom: "2025-10-01",
    status: "Pending",
    route: "Colombo - Matara",
    operator: "Coastal Express",
  },
  {
    id: "FS005",
    busType: "Non-AC",
    facilityType: "Normal",
    baseFare: 48.0,
    perKmRate: 5.2,
    effectiveFrom: "2023-12-01",
    status: "Expired",
    route: "Kurunegala - Anuradhapura",
    operator: "North Western Transport",
  },
]

export default function Fare() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [busTypeFilter, setBusTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [selectedFare, setSelectedFare] = useState<FareStructure | null>(null)
  const [fares, setFares] = useState<FareStructure[]>(fareStructures)

  // Fixed filtering logic using useMemo for better performance
  const filteredFares = useMemo(() => {
    return fares.filter((fare) => {
      // Search filter - only apply if searchTerm has content
      const matchesSearch = !searchTerm || searchTerm.trim() === '' ||
        fare.route?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fare.operator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fare.id.toLowerCase().includes(searchTerm.toLowerCase())

      // Bus type filter - only apply if busTypeFilter is not empty
      const matchesBusType = !busTypeFilter || busTypeFilter === '' || 
        fare.busType === busTypeFilter

      // Status filter - only apply if statusFilter is not empty  
      const matchesStatus = !statusFilter || statusFilter === '' || 
        fare.status === statusFilter

      return matchesSearch && matchesBusType && matchesStatus
    })
  }, [fares, searchTerm, busTypeFilter, statusFilter])

  // Pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedFares,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredFares, 10) // 10 items per page by default

  const handleAddFare = () => {
    router.push("/mot/bus-fare-form")
  }

  const handleEditFare = (fare: FareStructure) => {
    router.push(`/mot/bus-fare-form?edit=${fare.id}`)
  }

  const handleViewFare = (fare: FareStructure) => {
    router.push(`/mot/bus-fare-details?fareId=${fare.id}`)
  }

  const handleDeleteFare = (fare: FareStructure) => {
    setSelectedFare(fare)
    setShowDeleteModal(true)
  }

  const handleDeactivateFare = (fare: FareStructure) => {
    setSelectedFare(fare)
    setShowDeactivateModal(true)
  }

  const confirmDelete = () => {
    if (selectedFare) {
      setFares(prevFares => prevFares.filter(fare => fare.id !== selectedFare.id))
      
      // Reset to first page if current page becomes empty after deletion
      if (paginatedFares.length === 1 && currentPage > 1) {
        handlePageChange(1)
      }
      
      console.log("Deleted fare:", selectedFare.id)
    }
    setShowDeleteModal(false)
    setSelectedFare(null)
  }

  const confirmDeactivate = () => {
    if (selectedFare) {
      setFares(prevFares => 
        prevFares.map(fare => 
          fare.id === selectedFare.id 
            ? { ...fare, status: "Inactive" }
            : fare
        )
      )
      console.log("Deactivated fare:", selectedFare.id)
    }
    setShowDeactivateModal(false)
    setSelectedFare(null)
  }

  return (
    <Layout
      activeItem="bus-fare"
      pageTitle="Bus Fare Management"
      pageDescription="Manage bus fare structures, rates, and pricing policies"
      role="mot"
    >
      <div className="space-y-6">
        <FareStatistics 
          fareStructures={fares}
        />

        {/* Filters and Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex-1">
            <FareFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              busTypeFilter={busTypeFilter}
              setBusTypeFilter={setBusTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onAddNewFare={handleAddFare}
            />
          </div>
        </div>

        <FareTable
          fares={paginatedFares}
          onView={handleViewFare}
          onEdit={handleEditFare}
          onDelete={handleDeleteFare}
          onDeactivate={handleDeactivateFare}
        />

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />

        <FareQuickActions
          onAddFare={handleAddFare}
        />

        {/* Confirmation Modals */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={selectedFare ? `fare structure ${selectedFare.id} (${selectedFare.route})` : ""}
          title="Delete Fare Structure"
          isLoading={false}
        />

        <DeactivationConfirmationModal
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          onConfirm={confirmDeactivate}
          itemName={selectedFare ? `fare structure ${selectedFare.id} (${selectedFare.route})` : ""}
          title="Deactivate Fare Structure"
          isLoading={false}
        />
      </div>
    </Layout>
  )
}