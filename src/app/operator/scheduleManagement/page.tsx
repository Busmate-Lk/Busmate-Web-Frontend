"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { PageHeader } from "@/components/operator/page-header"
import { SearchFilters } from "@/components/operator/search-filters"
import { RouteTable } from "@/components/operator/route-table"


interface RouteData {
  id: string
  routeName: string
  startPoint: string
  endPoint: string
  stops: number
  scheduleStart: string
  scheduleEnd: string
  frequency: string
  assignedBus: string
  status: "Active" | "Inactive"
}

export default function ScheduleManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
 

  const routesData: RouteData[] = [
    {
      id: "1",
      routeName: "Downtown Express",
      startPoint: "Central Station",
      endPoint: "Business District",
      stops: 8,
      scheduleStart: "7:00 AM",
      scheduleEnd: "9:00 PM",
      frequency: "Every 15 mins",
      assignedBus: "Bus #A101",
      status: "Active",
    },
    {
      id: "2",
      routeName: "Airport Shuttle",
      startPoint: "Airport",
      endPoint: "Hotel District",
      stops: 5,
      scheduleStart: "6:00 AM",
      scheduleEnd: "11:00 PM",
      frequency: "Every 30 mins",
      assignedBus: "Bus #B205",
      status: "Active",
    },
    {
      id: "3",
      routeName: "University Line",
      startPoint: "Campus North",
      endPoint: "Campus South",
      stops: 12,
      scheduleStart: "6:30 AM",
      scheduleEnd: "10:00 PM",
      frequency: "Every 20 mins",
      assignedBus: "Bus #C312",
      status: "Inactive",
    },
  ]

  const filteredRoutes = routesData.filter((route) => {
    const matchesSearch =
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || route.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleEditRoute = (routeId: string) => {
    console.log("Edit route:", routeId)
  }

  const handleDeleteRoute = (routeId: string) => {
    console.log("Delete route:", routeId)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="schedule" /> */}

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <PageHeader
            title="Route & Schedule Management"
            subtitle="Manage your fleet routes and schedules efficiently"
          />

          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
            searchPlaceholder="Search routes..."
          />

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Routes Overview</h2>
            </div>
            <div className="p-0">
              <RouteTable routes={filteredRoutes} onEdit={handleEditRoute} onDelete={handleDeleteRoute} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
