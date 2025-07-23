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
  scheduleDate: string
  validFrom: string
  validTo: string
}

export default function ScheduleManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")
 

  const routesData: RouteData[] = [
    {
      id: "1",
      routeName: "MATARA-GALLE",
      startPoint: "Matara Bus Stand",
      endPoint: "Galle Fort Terminal",
      stops: 8,
      scheduleStart: "7:00 AM",
      scheduleEnd: "9:00 PM",
      frequency: "",
      assignedBus: "ND 4536 - Mandakini Express",
      status: "Active",
      scheduleDate: "2025-07-22",
      validFrom: "2025-07-22",
      validTo: "2025-12-31",
    },
    {
      id: "2",
      routeName: "MATARA-COLOMBO",
      startPoint: "Matara Bus Stand",
      endPoint: "Colombo Central Terminal",
      stops: 5,
      scheduleStart: "6:00 AM",
      scheduleEnd: "11:00 PM",
      frequency: "",
      assignedBus: "ND 7892 - Mandakini Super",
      status: "Active",
      scheduleDate: "2025-07-23",
      validFrom: "2025-07-23",
      validTo: "2025-12-31",
    },
    {
      id: "3",
      routeName: "MATARA-TANGALLE",
      startPoint: "Matara Bus Stand",
      endPoint: "Tangalle Beach Junction",
      stops: 12,
      scheduleStart: "6:30 AM",
      scheduleEnd: "10:00 PM",
      frequency: "",
      assignedBus: "ND 3421 - Mandakini Classic",
      status: "Active",
      scheduleDate: "2025-07-24",
      validFrom: "2025-07-24",
      validTo: "2025-11-30",
    },
    {
      id: "4",
      routeName: "MATARA-HAMBANTOTA",
      startPoint: "Matara Bus Stand",
      endPoint: "Hambantota New Town",
      stops: 15,
      scheduleStart: "5:30 AM",
      scheduleEnd: "11:30 PM",
      frequency: "",
      assignedBus: "ND 8765 - Mandakini Deluxe",
      status: "Active",
      scheduleDate: "2025-07-25",
      validFrom: "2025-07-25",
      validTo: "2025-10-31",
    },
    {
      id: "5",
      routeName: "MATARA-AKURESSA",
      startPoint: "Matara Bus Stand",
      endPoint: "Akuressa Junction",
      stops: 6,
      scheduleStart: "8:00 AM",
      scheduleEnd: "6:00 PM",
      frequency: "",
      assignedBus: "ND 5234 - Mandakini Premium",
      status: "Active",
      scheduleDate: "2025-07-26",
      validFrom: "2025-07-26",
      validTo: "2025-09-30",
    },
    {
      id: "6",
      routeName: "MATARA-WELIGAMA",
      startPoint: "Matara Bus Stand",
      endPoint: "Weligama Bay Terminal",
      stops: 20,
      scheduleStart: "6:00 AM",
      scheduleEnd: "10:00 PM",
      frequency: "",
      assignedBus: "ND 9876 - Mandakini Royal",
      status: "Inactive",
      scheduleDate: "2025-07-27",
      validFrom: "2025-07-27",
      validTo: "2025-08-31",
    },
  ]

  const filteredRoutes = routesData.filter((route) => {
    const matchesSearch =
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.assignedBus.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || route.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDate = !dateFilter || route.scheduleDate === dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewRoute = (routeId: string) => {
    console.log("View route:", routeId)
  }

  const handleDeleteRoute = (routeId: string) => {
    console.log("Delete route:", routeId)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="schedule" /> */}

      <div className="flex-1">
        <Header 
          pageTitle="Schedule Management" 
          pageDescription="Plan and manage bus schedules, routes, and timetables"
        />

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
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            searchPlaceholder="Search routes..."
          />

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Routes Overview</h2>
            </div>
            <div className="p-0">
              <RouteTable routes={filteredRoutes} onView={handleViewRoute} onDelete={handleDeleteRoute} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
