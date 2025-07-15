"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import FareStatistics from "@/components/mot/FareStatistics"
import FareFilters from "@/components/mot/FareFilters"
import FareTable from "@/components/mot/FareTable"
import FareQuickActions from "@/components/mot/FareQuickActions"
import { Plus, FileText } from "lucide-react"

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
  const [busTypeFilter, setBusTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredFares = fareStructures.filter((fare) => {
    const matchesSearch =
      fare.route?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fare.operator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fare.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBusType = busTypeFilter === "all" || fare.busType.toLowerCase() === busTypeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || fare.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesBusType && matchesStatus
  })

  const handleAddFare = () => {
    router.push("/mot/add-fare")
  }

  const handleViewChart = () => {
    router.push("/mot/fare-chart")
  }

  const handleEditFare = (fare: FareStructure) => {
    router.push(`/mot/add-fare?edit=${fare.id}`)
  }

  const handleViewFare = (fare: FareStructure) => {
    router.push(`/mot/fare-chart?fareId=${fare.id}`)
  }

  const handleDeleteFare = (fare: FareStructure) => {
    console.log("Delete fare:", fare.id)
  }

  const handleCalculator = () => {
    console.log("Open fare calculator")
  }

  const handleApplyFilters = () => {
    console.log("Apply filters")
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
          fareStructures={fareStructures}
        />

        {/* Filters and Action Buttons in the same line */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex-1">
            <FareFilters
              searchTerm={searchTerm}
              busTypeFilter={busTypeFilter}
              statusFilter={statusFilter}
              onSearchChange={setSearchTerm}
              onBusTypeChange={setBusTypeFilter}
              onStatusChange={setStatusFilter}
              onApplyFilters={handleApplyFilters}
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleViewChart}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200"
            >
              <FileText className="w-4 h-4" />
              View Fare Chart
            </button>
            <button 
              onClick={handleAddFare}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add New Fare
            </button>
          </div>
        </div>

        <FareTable
          fares={filteredFares}
          onView={handleViewFare}
          onEdit={handleEditFare}
          onDelete={handleDeleteFare}
        />

        <FareQuickActions
          onAddFare={handleAddFare}
          onViewChart={handleViewChart}
          onCalculator={handleCalculator}
        />
      </div>
    </Layout>
  )
}