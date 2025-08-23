"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { MetricCard } from "@/components/operator/metric-card"
import { FleetTable } from "@/components/operator/fleet-table"
import { AddBusModal } from "@/components/operator/add-bus-modal"
import { Bus, CheckCircle, XCircle, Armchair, Plus, Search, ChevronDown, FileText, Shield } from "lucide-react"

interface FleetBus {
  id: string
  busId: string
  busName: string
  registration: string
  type: "Luxury" | "Semi-Luxury" | "Standard" | "Expressway"
  routeName: string
  permitExpiryDate: string
  insuranceExpiryDate: string
}

export default function FleetManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false)

  const fleetData: FleetBus[] = [
    {
      id: "1",
      busId: "ND 4536",
      busName: "Mandakini Express",
      registration: "SP-4536",
      type: "Luxury",
      routeName: "MATARA-GALLE",
      permitExpiryDate: "2025-12-15",
      insuranceExpiryDate: "2025-10-20",
    },
    {
      id: "2",
      busId: "ND 7892",
      busName: "Mandakini Super",
      registration: "SP-7892",
      type: "Semi-Luxury",
      routeName: "MATARA-COLOMBO",
      permitExpiryDate: "2026-03-10",
      insuranceExpiryDate: "2025-11-05",
    },
    {
      id: "3",
      busId: "ND 3421",
      busName: "Mandakini Classic",
      registration: "SP-3421",
      type: "Standard",
      routeName: "MATARA-TANGALLE",
      permitExpiryDate: "2025-08-25",
      insuranceExpiryDate: "2025-09-12",
    },
    {
      id: "4",
      busId: "ND 8765",
      busName: "Mandakini Deluxe",
      registration: "SP-8765",
      type: "Luxury",
      routeName: "MATARA-HAMBANTOTA",
      permitExpiryDate: "2026-01-18",
      insuranceExpiryDate: "2025-12-08",
    },
    {
      id: "5",
      busId: "ND 5234",
      busName: "Mandakini Premium",
      registration: "SP-5234",
      type: "Semi-Luxury",
      routeName: "MATARA-AKURESSA",
      permitExpiryDate: "2025-11-30",
      insuranceExpiryDate: "2026-01-15",
    },
    {
      id: "6",
      busId: "ND 9876",
      busName: "Mandakini Royal",
      registration: "SP-9876",
      type: "Expressway",
      routeName: "MATARA-WELIGAMA",
      permitExpiryDate: "2025-09-14",
      insuranceExpiryDate: "2025-10-28",
    },
    {
      id: "7",
      busId: "ND 2468",
      busName: "Mandakini Highway",
      registration: "SP-2468",
      type: "Expressway",
      routeName: "MATARA-KATARAGAMA",
      permitExpiryDate: "2026-02-20",
      insuranceExpiryDate: "2025-11-30",
    },
  ]

  const filteredFleet = fleetData.filter((bus) => {
    const matchesSearch =
      bus.busId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.busName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.registration.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      typeFilter === "all" || bus.type.toLowerCase().replace("-", "").includes(typeFilter.toLowerCase())

    return matchesSearch && matchesType
  })

  const handleAddBus = () => {
    console.log("Add new bus")
  }

  // Calculate expiring documents
  const getExpiringDocuments = () => {
    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000))
    
    let expiringPermits = 0
    let expiringInsurance = 0
    
    fleetData.forEach(bus => {
      const permitDate = new Date(bus.permitExpiryDate)
      const insuranceDate = new Date(bus.insuranceExpiryDate)
      
      if (permitDate <= thirtyDaysFromNow) expiringPermits++
      if (insuranceDate <= thirtyDaysFromNow) expiringInsurance++
    })
    
    return { expiringPermits, expiringInsurance }
  }

  const { expiringPermits, expiringInsurance } = getExpiringDocuments()

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "luxury", label: "Luxury" },
    { value: "semiluxury", label: "Semi-Luxury" },
    { value: "standard", label: "Standard" },
    { value: "expressway", label: "Expressway" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="fleet" /> */}

      <div className="flex-1">
        <Header 
          pageTitle="Fleet Management" 
          pageDescription="Manage and monitor your bus fleet, routes, permits, and insurance"
        />

        <div className="p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Buses"
              value={fleetData.length}
              icon={<Bus className="w-6 h-6 text-blue-600" />}
            />
            <MetricCard
              title="Active Buses"
              value={fleetData.length}
              icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Permits Expiring Soon"
              value={expiringPermits}
              icon={<FileText className="w-6 h-6 text-orange-600" />}
            />
            <MetricCard
              title="Insurance Expiring Soon"
              value={expiringInsurance}
              icon={<Shield className="w-6 h-6 text-red-600" />}
            />
          </div>

          {/* Add Bus Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                handleAddBus();
                setIsAddBusModalOpen(true);
              }}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Bus
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Bus ID, Name, or Registration"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{typeOptions.find((opt) => opt.value === typeFilter)?.label}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {typeDropdownOpen && (
                <div className="absolute top-full mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTypeFilter(option.value)
                        setTypeDropdownOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fleet Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <FleetTable
              fleet={filteredFleet}
              currentPage={currentPage}
              totalResults={filteredFleet.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Add Bus Modal */}
      <AddBusModal isOpen={isAddBusModalOpen} onClose={() => setIsAddBusModalOpen(false)} />
    </div>
  )
}
