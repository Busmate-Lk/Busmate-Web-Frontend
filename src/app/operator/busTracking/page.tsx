"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { PageHeader } from "@/components/operator/page-header"
import { BusCard } from "@/components/operator/bus-card"
import { Tabs } from "@/components/operator/tabs"
import Link from "next/link"

interface BusData {
  id: string
  busNumber: string
  model: string
  capacity: number
  route: string
  driver: string
  status: "Active" | "Maintenance" | "Inactive"
}

export default function FleetManagement() {
  const [activeTab, setActiveTab] = useState("all")

  const busesData: BusData[] = [
    {
      id: "1",
      busNumber: "BUS-001",
      model: "Mercedes Sprinter",
      capacity: 45,
      route: "Route A1",
      driver: "John Smith",
      status: "Active",
     
    },
    {
      id: "2",
      busNumber: "BUS-002",
      model: "Volvo B9R",
      capacity: 52,
      route: "Route B2",
      driver: "Mike Johnson",
      status: "Maintenance",
    },
    {
      id: "3",
      busNumber: "BUS-003",
      model: "Scania K410",
      capacity: 48,
      route: "Route C3",
      driver: "Sarah Wilson",
      status: "Active",
    },
    {
      id: "4",
      busNumber: "BUS-004",
      model: "MAN Lion's City",
      capacity: 55,
      route: "Route D4",
      driver: "David Brown",
      status: "Active",
    },
    {
      id: "5",
      busNumber: "BUS-005",
      model: "Iveco Crossway",
      capacity: 42,
      route: "Route E5",
      driver: "Lisa Davis",
      status: "Maintenance",
    },
    {
      id: "6",
      busNumber: "BUS-006",
      model: "Setra S516",
      capacity: 50,
      route: "Route F6",
      driver: "Tom Anderson",
      status: "Active",
    },
  ]

  const getFilteredBuses = (filter: string) => {
    if (filter === "all") return busesData
    return busesData.filter((bus) => bus.status.toLowerCase() === filter.toLowerCase())
  }

  const handleAddBus = () => {
    console.log("Add new bus")
  }

  const tabs = [
    {
      value: "all",
      label: "All Buses",
      content: (
        <Link href={"/operator/busSeatView"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredBuses("all").map((bus) => (
            <BusCard
              key={bus.id}
              busNumber={bus.busNumber}
              model={bus.model}
              capacity={bus.capacity}
              route={bus.route}
              driver={bus.driver}
              status={bus.status}
            />
          ))}
        </div>
        </Link>
      ),
    },
    {
      value: "active",
      label: "Active",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredBuses("active").map((bus) => (
            <BusCard
              key={bus.id}
              busNumber={bus.busNumber}
              model={bus.model}
              capacity={bus.capacity}
              route={bus.route}
              driver={bus.driver}
              status={bus.status}
            />
          ))}
        </div>
      ),
    },
    {
      value: "maintenance",
      label: "Maintenance",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredBuses("maintenance").map((bus) => (
            <BusCard
              key={bus.id}
              busNumber={bus.busNumber}
              model={bus.model}
              capacity={bus.capacity}
              route={bus.route}
              driver={bus.driver}
              status={bus.status}
            />
          ))}
        </div>
      ),
    },
    {
      value: "inactive",
      label: "Inactive",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredBuses("inactive").map((bus) => (
            <BusCard
              key={bus.id}
              busNumber={bus.busNumber}
              model={bus.model}
              capacity={bus.capacity}
              route={bus.route}
              driver={bus.driver}
              status={bus.status}
            />
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="tracking" /> */}

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <PageHeader
            title="Fleet Management"
            actionButton={{
              label: "Add Bus",
              onClick: handleAddBus,
            }}
          />

          <Tabs tabs={tabs} defaultValue="all" onValueChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
