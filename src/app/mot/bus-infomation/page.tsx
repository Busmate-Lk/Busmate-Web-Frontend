"use client"

import { useState, useMemo } from "react"
import { useRouter } from 'next/navigation'
import { Plus } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import BusStatsCards from "@/components/mot/BusStatsCards"
import BusFilters from "@/components/mot/BusFilters"
import BusTable from "@/components/mot/BusTable"
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
}

const sriLankanBuses: Bus[] = [
  {
    id: "1",
    busNumber: "NB-1234",
    busType: "AC",
    operator: "Ceylon Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 45,
    standingCapacity: 15,
    status: "Active",
    chassisNo: "CH789456123",
    engineNo: "EN987654321",
    fuelType: "Diesel",
    regionAssigned: "Western Province",
    depotName: "Colombo Central Depot",
    registrationDate: "2022-03-15",
    lastInspectionDate: "2024-11-20",
    nextMaintenanceDate: "2025-01-15",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    busNumber: "PV-5678",
    busType: "Non-AC",
    operator: "Lanka Private Bus",
    operatorType: "Private",
    seatingCapacity: 52,
    status: "Active",
    chassisNo: "CH456789012",
    engineNo: "EN123456789",
    fuelType: "Diesel",
    regionAssigned: "Western Province",
    depotName: "Pettah Depot",
    registrationDate: "2021-08-10",
    lastInspectionDate: "2024-10-15",
    nextMaintenanceDate: "2025-02-20",
  },
  {
    id: "3",
    busNumber: "SL-9012",
    busType: "Sleeper",
    operator: "Express Lanka",
    operatorType: "Private",
    seatingCapacity: 32,
    status: "Maintenance",
    chassisNo: "CH123456789",
    engineNo: "EN456789012",
    fuelType: "Diesel",
    regionAssigned: "Central Province",
    depotName: "Kandy Depot",
    registrationDate: "2020-12-05",
    lastInspectionDate: "2024-09-30",
    nextMaintenanceDate: "2024-12-15",
  },
  {
    id: "4",
    busNumber: "NB-3456",
    busType: "AC",
    operator: "SLTB Western",
    operatorType: "SLTB",
    seatingCapacity: 48,
    status: "Active",
    chassisNo: "CH987654321",
    engineNo: "EN789012345",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Galle Depot",
    registrationDate: "2023-01-20",
    lastInspectionDate: "2024-11-05",
    nextMaintenanceDate: "2025-03-10",
  },
  {
    id: "5",
    busNumber: "WP-7890",
    busType: "AC",
    operator: "Kurunegala Express",
    operatorType: "Private",
    seatingCapacity: 50,
    status: "Active",
    chassisNo: "CH654321098",
    engineNo: "EN321098765",
    fuelType: "Diesel",
    regionAssigned: "North Western Province",
    depotName: "Kurunegala Depot",
    registrationDate: "2019-06-15",
    lastInspectionDate: "2024-08-20",
    nextMaintenanceDate: "2024-11-30",
  },
  {
    id: "6",
    busNumber: "UP-2468",
    busType: "Semi-Luxury",
    operator: "Hill Country Transport",
    operatorType: "SLTB",
    seatingCapacity: 40,
    status: "Active",
    chassisNo: "CH135792468",
    engineNo: "EN246813579",
    fuelType: "Diesel",
    regionAssigned: "Uva Province",
    depotName: "Badulla Depot",
    registrationDate: "2022-07-12",
    lastInspectionDate: "2024-10-25",
    nextMaintenanceDate: "2025-01-25",
  },
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
      activeItem="bus-infomation"
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
          buses={filteredBuses}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDeactivate={handleDeactivate}
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