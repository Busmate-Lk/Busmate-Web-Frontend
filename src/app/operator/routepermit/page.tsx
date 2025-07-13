"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { PermitTable } from "@/components/operator/permit-table"
import { Search } from "lucide-react"

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
}

export default function RoutePermitManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOne, setFilterOne] = useState("")
  const [filterTwo, setFilterTwo] = useState("")

  const permitData: RoutePermit[] = [
    {
      id: "1",
      permitId: "PRM001",
      routeId: "RT001",
      routeName: "Colombo - Kandy",
      startPoint: "Colombo Fort",
      endPoint: "Kandy Central",
      operator: "SLTB",
      expiryDate: "2024-12-31",
      isExpired: false,
    },
    {
      id: "2",
      permitId: "PRM002",
      routeId: "RT002",
      routeName: "Galle - Matara",
      startPoint: "Galle Bus Stand",
      endPoint: "Matara Terminal",
      operator: "Private",
      expiryDate: "2024-06-15",
      isExpired: true,
    },
  ]

  const filteredPermits = permitData.filter((permit) => {
    const matchesSearch =
      permit.permitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.routeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.operator.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const handleSearch = () => {
    console.log("Search:", { searchQuery, filterOne, filterTwo })
  }

  const handleViewPermit = (permitId: string) => {
    console.log("View permit:", permitId)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="permits" /> */}

      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Route Permit Management</h1>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by Route ID, Name, or Operator"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
              <div className="w-48">
                <input
                  type="text"
                  placeholder="Filter option 1"
                  value={filterOne}
                  onChange={(e) => setFilterOne(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
              <div className="w-48">
                <input
                  type="text"
                  placeholder="Filter option 2"
                  value={filterTwo}
                  onChange={(e) => setFilterTwo(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
              <button
                onClick={handleSearch}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>

          {/* Permit Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <PermitTable permits={filteredPermits} onViewPermit={handleViewPermit} />
          </div>
        </div>
      </div>
    </div>
  )
}
