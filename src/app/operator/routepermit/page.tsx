"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { MetricCard } from "@/components/operator/metric-card"
import { PermitTable } from "@/components/operator/permit-table"
import { FileText, MapPin, Clock, AlertTriangle, Plus, Search } from "lucide-react"

interface RoutePermit {
  id: string
  permitId: string
  routeId: string
  routeName: string
  startPoint: string
  endPoint: string
  operator: string
  expiryDate: string
  isExpired: boolean
  intermediateStops?: string[]
}

export default function RoutePermitManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const permitData: RoutePermit[] = [
    {
      id: "1",
      permitId: "PRM001",
      routeId: "RT001",
      routeName: "Colombo - Kandy Express",
      startPoint: "Colombo Fort Bus Stand",
      endPoint: "Kandy Central Bus Terminal",
      operator: "Mandakini Travels",
      expiryDate: "2024-12-31",
      isExpired: false,
      intermediateStops: [
        "Kelaniya Junction",
        "Kiribathgoda",
        "Nittambuwa",
        "Veyangoda",
        "Mirigama",
        "Pasyala",
        "Kegalle",
        "Mawanella",
        "Rambukkana",
        "Kadugannawa",
        "Peradeniya"
      ]
    },
    {
      id: "2",
      permitId: "PRM002",
      routeId: "RT002",
      routeName: "Galle - Matara Coastal",
      startPoint: "Galle Bus Stand",
      endPoint: "Matara Main Terminal",
      operator: "Mandakini Travels",
      expiryDate: "2024-06-15",
      isExpired: true,
      intermediateStops: [
        "Unawatuna Junction",
        "Thalpe",
        "Koggala",
        "Ahangama",
        "Midigama",
        "Weligama",
        "Mirissa",
        "Kamburugamuwa",
        "Gandara"
      ]
    },
    {
      id: "3",
      permitId: "PRM003",
      routeId: "RT003",
      routeName: "Matara - Hambantota Highway",
      startPoint: "Matara Main Terminal",
      endPoint: "Hambantota Bus Stand",
      operator: "Mandakini Travels",
      expiryDate: "2025-03-20",
      isExpired: false,
      intermediateStops: [
        "Dikwella",
        "Beliatta",
        "Angunukolapelessa",
        "Sooriyawewa",
        "Tissamaharama"
      ]
    },
    {
      id: "4",
      permitId: "PRM004",
      routeId: "RT004",
      routeName: "Matara - Badulla Mountain",
      startPoint: "Matara Main Terminal",
      endPoint: "Badulla Central",
      operator: "Mandakini Travels",
      expiryDate: "2025-08-10",
      isExpired: false,
      intermediateStops: [
        "Akuressa",
        "Deniyaya",
        "Morawaka",
        "Embilipitiya",
        "Ratnapura",
        "Balangoda",
        "Haputale",
        "Bandarawela",
        "Ella"
      ]
    },
    {
      id: "5",
      permitId: "PRM005",
      routeId: "RT005",
      routeName: "Colombo - Jaffna Northern",
      startPoint: "Colombo Bastian Mawatha",
      endPoint: "Jaffna Central",
      operator: "Mandakini Travels",
      expiryDate: "2024-11-30",
      isExpired: false,
      intermediateStops: [
        "Negombo",
        "Chilaw",
        "Puttalam",
        "Anuradhapura",
        "Vavuniya",
        "Cheddikulam",
        "Kilinochchi"
      ]
    }
  ]

  const filteredPermits = permitData.filter((permit) => {
    const matchesSearch =
      permit.permitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.routeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.endPoint.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && !permit.isExpired) ||
      (statusFilter === "expired" && permit.isExpired)

    return matchesSearch && matchesStatus
  })

  const handleAddPermit = () => {
    console.log("Add new permit")
  }

  const handleViewPermit = (permitId: string) => {
    console.log("View permit:", permitId)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="permits" /> */}

      <div className="flex-1">
        <Header 
          pageTitle="Route Permit Management" 
          pageDescription="Manage route permits, licenses, and regulatory compliance"
        />

        <div className="p-6">
          

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Permits"
              value={permitData.length}
              icon={<FileText className="w-6 h-6 text-blue-600" />}
            />
            <MetricCard
              title="Active Permits"
              value={permitData.filter(p => !p.isExpired).length}
              icon={<MapPin className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Expired Permits"
              value={permitData.filter(p => p.isExpired).length}
              icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
            />
            <MetricCard
              title="Expiring Soon"
              value={0}
              icon={<Clock className="w-6 h-6 text-orange-600" />}
            />
          </div>

          {/* Add Permit Button */}
          <div className="mb-6">
            {/* <button
              onClick={handleAddPermit}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Permit
            </button> */}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
            <div className="p-6">
              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by permit ID, route, or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex h-10 w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Permit Table */}
            <PermitTable 
              permits={filteredPermits} 
              onViewPermit={handleViewPermit}
              currentPage={currentPage}
              totalPermits={permitData.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
