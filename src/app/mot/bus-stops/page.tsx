"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from 'next/navigation'

export interface BusStop {
  id: string
  name: string
  latitude: number
  longitude: number
  city: string
  province: string
  status: "Active" | "Inactive" | "Under Construction" | "Maintenance"
  facilities?: string[]
  routes?: string[]
}

const sriLankanBusStops: BusStop[] = [
  {
    id: "BS001",
    name: "Fort Railway Station",
    latitude: 6.9271,
    longitude: 79.8612,
    city: "Colombo",
    province: "Western",
    status: "Active",
  },
  {
    id: "BS002",
    name: "Pettah Central Bus Stand",
    latitude: 6.9344,
    longitude: 79.8428,
    city: "Colombo",
    province: "Western",
    status: "Active",
  },
  {
    id: "BS003",
    name: "Kandy Clock Tower",
    latitude: 7.2906,
    longitude: 80.6337,
    city: "Kandy",
    province: "Central",
    status: "Active",
  },
  {
    id: "BS004",
    name: "Galle Bus Terminal",
    latitude: 6.0535,
    longitude: 80.221,
    city: "Galle",
    province: "Southern",
    status: "Active",
  },
  {
    id: "BS005",
    name: "Negombo Bus Stand",
    latitude: 7.2083,
    longitude: 79.8358,
    city: "Negombo",
    province: "Western",
    status: "Active",
  },
  {
    id: "BS006",
    name: "Anuradhapura New Bus Stand",
    latitude: 8.3114,
    longitude: 80.4037,
    city: "Anuradhapura",
    province: "North Central",
    status: "Maintenance",
  },
  {
    id: "BS007",
    name: "Matara Bus Terminal",
    latitude: 5.9549,
    longitude: 80.555,
    city: "Matara",
    province: "Southern",
    status: "Active",
  },
  {
    id: "BS008",
    name: "Kurunegala Bus Stand",
    latitude: 7.4818,
    longitude: 80.3609,
    city: "Kurunegala",
    province: "North Western",
    status: "Active",
  },
  {
    id: "BS009",
    name: "Ratnapura Bus Terminal",
    latitude: 6.6828,
    longitude: 80.4126,
    city: "Ratnapura",
    province: "Sabaragamuwa",
    status: "Active",
  },
  {
    id: "BS010",
    name: "Badulla Bus Stand",
    latitude: 6.9934,
    longitude: 81.055,
    city: "Badulla",
    province: "Uva",
    status: "Maintenance",
  },
]



import BusStopStats from "@/components/mot/BusStopStats"
import BusStopFilters from "@/components/mot/BusStopFilters"
import BusStopTable from "@/components/mot/BusStopTable"
import { Layout } from "@/components/shared/layout";

export default function BusStops() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [provinceFilter, setProvinceFilter] = useState("all")

  const filteredBusStops = sriLankanBusStops.filter((stop) => {
    const matchesSearch =
      stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stop.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = cityFilter === "all" || stop.city.toLowerCase() === cityFilter.toLowerCase()
    const matchesProvince = provinceFilter === "all" || stop.province.toLowerCase() === provinceFilter.toLowerCase()
    return matchesSearch && matchesCity && matchesProvince
  })

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle="Bus Stops Management"
      pageDescription="Manage and monitor bus stop locations and facilities"
      role="mot"
    >
      <div className="space-y-6">
        <BusStopStats busStops={sriLankanBusStops} />
        
        {/* Filters and Add Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <BusStopFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              provinceFilter={provinceFilter}
              setProvinceFilter={setProvinceFilter}
            />
          </div>
          <button
            onClick={() => router.push("/mot/bus-stop-form")}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus Stop
          </button>
        </div>

        <BusStopTable busStops={filteredBusStops} />
      </div>
    </Layout>
  )
}