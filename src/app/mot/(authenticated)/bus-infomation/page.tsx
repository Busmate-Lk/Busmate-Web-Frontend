"use client"

import { useState, useMemo } from "react"
import { useRouter } from 'next/navigation'
import { Plus } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import BusStatsCards from "@/components/mot/BusStatsCards"
import BusFilters from "@/components/mot/BusFilters"
import BusTable from "@/components/mot/BusTable"
import { usePagination, Pagination } from '@/components/mot/pagination'
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals'

export interface Bus {
  id: string
  busNumber: string
  busType: string
  operator: string
  operatorType: string
  seatingCapacity: number
  standingCapacity?: number
  status: string
  chassisNo: string
  engineNo: string
  fuelType: string
  regionAssigned: string
  depotName: string
  registrationDate: string
  lastInspectionDate: string
  nextMaintenanceDate: string
  photo?: string
  assignedRoute?: string
}

const sriLankanBuses: Bus[] = [
  {
    id: "1",
    busNumber: "ND-4536",
    busType: "AC",
    operator: "Southern Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 45,
    standingCapacity: 15,
    status: "Active",
    chassisNo: "CH789456123",
    engineNo: "EN987654321",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2022-03-15",
    lastInspectionDate: "2024-11-20",
    nextMaintenanceDate: "2025-01-15",
    photo: "/placeholder.svg?height=300&width=400",
    assignedRoute: "MATARA-GALLE"
  },
  {
    id: "2",
    busNumber: "ND-7892",
    busType: "AC",
    operator: "Ceylon Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 52,
    standingCapacity: 20,
    status: "Active",
    chassisNo: "CH456789012",
    engineNo: "EN123456789",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2021-08-10",
    lastInspectionDate: "2024-10-15",
    nextMaintenanceDate: "2025-02-20",
    assignedRoute: "MATARA-COLOMBO"
  },
  {
     id: "3",
    busNumber: "ND-3421",
    busType: "Non-AC",
    operator: "Southern Express",
    operatorType: "Private",
    seatingCapacity: 48,
    status: "Active",
    chassisNo: "CH123456789",
    engineNo: "EN456789012",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2020-12-05",
    lastInspectionDate: "2024-09-30",
    nextMaintenanceDate: "2024-12-15",
    assignedRoute: "MATARA-TANGALLE"
  },
  {
     id: "4",
    busNumber: "ND-8765",
    busType: "Semi-Luxury",
    operator: "Ruhunu Transport",
    operatorType: "Private",
    seatingCapacity: 40,
    status: "Active",
    chassisNo: "CH987654321",
    engineNo: "EN789012345",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Hambantota Depot",
    registrationDate: "2023-01-20",
    lastInspectionDate: "2024-11-05",
    nextMaintenanceDate: "2025-03-10",
    assignedRoute: "MATARA-HAMBANTOTA"
  },
  {
     id: "5",
    busNumber: "ND-5234",
    busType: "Non-AC",
    operator: "Akuressa Transport",
    operatorType: "Private",
    seatingCapacity: 50,
    status: "Active",
    chassisNo: "CH654321098",
    engineNo: "EN321098765",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Akuressa Depot",
    registrationDate: "2019-06-15",
    lastInspectionDate: "2024-08-20",
    nextMaintenanceDate: "2024-11-30",
    assignedRoute: "MATARA-AKURESSA"
  },
  {
    id: "6",
    busNumber: "ND-9876",
    busType: "AC",
    operator: "Weligama Bay Transport",
    operatorType: "SLTB",
    seatingCapacity: 42,
    status: "Inactive",
    chassisNo: "CH135792468",
    engineNo: "EN246813579",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Weligama Depot",
    registrationDate: "2022-07-12",
    lastInspectionDate: "2024-10-25",
    nextMaintenanceDate: "2025-01-25",
    assignedRoute: "MATARA-WELIGAMA"
  }
]

export default function BusInfo() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [busTypeFilter, setBusTypeFilter] = useState("")
  const [operatorTypeFilter, setOperatorTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const [buses, setBuses] = useState<Bus[]>(sriLankanBuses)

  // Fixed filtering logic using useMemo for better performance
  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      // Search filter - check if search term is in bus number or operator
      const matchesSearch = !searchTerm || 
        bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.operator.toLowerCase().includes(searchTerm.toLowerCase())

      // Bus type filter - only apply if busTypeFilter is not empty
      const matchesBusType = !busTypeFilter || bus.busType === busTypeFilter

      // Operator type filter - only apply if operatorTypeFilter is not empty
      const matchesOperatorType = !operatorTypeFilter || bus.operatorType === operatorTypeFilter

      // Status filter - only apply if statusFilter is not empty
      const matchesStatus = !statusFilter || bus.status === statusFilter

      return matchesSearch && matchesBusType && matchesOperatorType && matchesStatus
    })
  }, [buses, searchTerm, busTypeFilter, operatorTypeFilter, statusFilter])

  // Pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedBuses,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredBuses, 10) // 10 items per page by default

  const handleView = (bus: Bus) => {
    router.push(`/mot/bus-information-details?id=${bus.id}`)
  }

  const handleEdit = (bus: Bus) => {
    router.push(`/mot/bus-information-form?edit=${bus.id}`)
  }

  const handleDelete = (bus: Bus) => {
    setSelectedBus(bus)
    setShowDeleteModal(true)
  }

  const handleDeactivate = (bus: Bus) => {
    setSelectedBus(bus)
    setShowDeactivateModal(true)
  }

  const confirmDelete = () => {
    if (selectedBus) {
      setBuses(buses.filter(bus => bus.id !== selectedBus.id))
      setShowDeleteModal(false)
      setSelectedBus(null)
      
      // Reset to first page if current page has no items after deletion
      if (paginatedBuses.length === 1 && currentPage > 1) {
        handlePageChange(1)
      }
      
      console.log(`Bus ${selectedBus.busNumber} has been deleted successfully`)
    }
  }

  const confirmDeactivate = () => {
    if (selectedBus) {
      setBuses(buses.map(bus => 
        bus.id === selectedBus.id 
          ? { ...bus, status: 'Inactive' }
          : bus
      ))
      setShowDeactivateModal(false)
      setSelectedBus(null)
      
      console.log(`Bus ${selectedBus.busNumber} has been deactivated successfully`)
    }
  }

  const cancelModal = () => {
    setShowDeleteModal(false)
    setShowDeactivateModal(false)
    setSelectedBus(null)
  }

  return (
    <Layout
      activeItem="bus-information"
      pageTitle="Bus Fleet Management"
      pageDescription="Manage and monitor your bus fleet operations"
      role="mot"
    >
      <div className="space-y-6">
        <BusStatsCards />
        
        <div className="flex items-center justify-between mb-5 gap-6">
          <div className="flex-1 max-w-5xl">
            <BusFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              busTypeFilter={busTypeFilter}
              setBusTypeFilter={setBusTypeFilter}
              operatorTypeFilter={operatorTypeFilter}
              setOperatorTypeFilter={setOperatorTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
          <button 
            onClick={() => router.push("/mot/bus-information-form")}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus
          </button>
        </div>
        
        <BusTable
          buses={paginatedBuses}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDeactivate={handleDeactivate}
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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={cancelModal}
          onConfirm={confirmDelete}
          title="Delete Bus"
          itemName={selectedBus ? `Bus ${selectedBus.busNumber}` : ''}
          isLoading={false}
        />

        {/* Deactivation Confirmation Modal */}
        <DeactivationConfirmationModal
          isOpen={showDeactivateModal}
          onClose={cancelModal}
          onConfirm={confirmDeactivate}
          title="Deactivate Bus"
          itemName={selectedBus ? `Bus ${selectedBus.busNumber}` : ''}
          isLoading={false}
        />
      </div>
    </Layout>
  )
}