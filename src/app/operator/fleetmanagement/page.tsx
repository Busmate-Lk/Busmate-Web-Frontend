"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { MetricCard } from "@/components/operator/metric-card"
import { FleetTable } from "@/components/operator/fleet-table"
import { AddBusModal } from "@/components/operator/add-bus-modal"
import { Bus, CheckCircle, XCircle, Armchair, Plus, Search, ChevronDown } from "lucide-react"

interface FleetBus {
  id: string
  busId: string
  registration: string
  type: "Luxury" | "Semi-Luxury" | "Standard"
  seatingCapacity: number
  status: boolean
}

export default function FleetManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false)

  const fleetData: FleetBus[] = [
    {
      id: "1",
      busId: "BUS-001",
      registration: "KL-07-AB-1234",
      type: "Luxury",
      seatingCapacity: 45,
      status: true,
    },
    {
      id: "2",
      busId: "BUS-002",
      registration: "KL-07-AB-5678",
      type: "Semi-Luxury",
      seatingCapacity: 40,
      status: false,
    },
  ]

  const filteredFleet = fleetData.filter((bus) => {
    const matchesSearch =
      bus.busId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.registration.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType =
      typeFilter === "all" || bus.type.toLowerCase().replace("-", "").includes(typeFilter.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && bus.status) ||
      (statusFilter === "inactive" && !bus.status)

    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddBus = () => {
    console.log("Add new bus")
  }

  const handleStatusToggle = (busId: string) => {
    console.log("Toggle status for bus:", busId)
  }

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "luxury", label: "Luxury" },
    { value: "semiluxury", label: "Semi-Luxury" },
    { value: "standard", label: "Standard" },
  ]

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem="fleet" />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Buses"
              value={24}
              icon={<Bus className="w-6 h-6 text-blue-600" />}
              iconBgColor="bg-blue-100"
            />
            <MetricCard
              title="Active Buses"
              value={18}
              icon={<CheckCircle className="w-6 h-6 text-green-600" />}
              iconBgColor="bg-green-100"
            />
            <MetricCard
              title="Inactive Buses"
              value={6}
              icon={<XCircle className="w-6 h-6 text-red-600" />}
              iconBgColor="bg-red-100"
            />
            <MetricCard
              title="Seats Available Today"
              value={432}
              icon={<Armchair className="w-6 h-6 text-purple-600" />}
              iconBgColor="bg-purple-100"
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
                placeholder="Search by Registration No."
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

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{statusOptions.find((opt) => opt.value === statusFilter)?.label}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setStatusFilter(option.value)
                        setStatusDropdownOpen(false)
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
              onStatusToggle={handleStatusToggle}
            />
          </div>
        </div>
      </div>

      {/* Add Bus Modal */}
      <AddBusModal isOpen={isAddBusModalOpen} onClose={() => setIsAddBusModalOpen(false)} />
    </div>
  )
}
