"use client"

import { ArrowLeft, Edit } from "lucide-react"
import { useSearchParams, useRouter } from 'next/navigation'
import { Layout } from "@/components/shared/layout"
import BusStopInfoCard from "@/components/mot/BusStopInfoCard"
import BusStopMapCard from "@/components/mot/BusStopMapCard"

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

export default function ViewBusStop() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busStopId = searchParams.get("id")

  // Example: Replace with your actual data source
  const busStops: BusStop[] = [
    {
      id: "BS001",
      name: "Fort Railway Station",
      latitude: 6.9271,
      longitude: 79.8612,
      city: "Colombo",
      province: "Western",
      status: "Active",
      routes: ["138", "100", "120"],
    },
    {
      id: "BS002",
      name: "Pettah Central Bus Stand",
      latitude: 6.9344,
      longitude: 79.8428,
      city: "Colombo",
      province: "Western",
      status: "Active",
      routes: ["101", "102", "103"],
    },
  
  {
    id: "BS003",
    name: "Kandy Clock Tower",
    latitude: 7.2906,
    longitude: 80.6337,
    city: "Kandy",
    province: "Central",
    status: "Active",
    routes: ["654", "621", "620"]
  },
  {
    id: "BS004",
    name: "Galle Bus Terminal",
    latitude: 6.0535,
    longitude: 80.221,
    city: "Galle",
    province: "Southern",
    status: "Active",
    routes: ["02", "32/4", "EX 1-1"]
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
  

  const busStop = busStops.find(stop => stop.id === busStopId) || null

  if (!busStop) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stop Details"
        pageDescription="View and manage bus stop information"
        role="mot"
      >
        <div className="space-y-6">
          <button
            className="flex items-center border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => router.push("/mot/bus-stops")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stop List
          </button>
          <div className="text-red-600 font-semibold">Bus stop not found.</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle="Bus Stop Details"
      pageDescription="View and manage bus stop information"
      role="mot"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Bus Stop Details</h2>
            <p className="text-gray-600 mt-1">View and manage bus stop information</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
              onClick={() => router.push("/mot/bus-stops")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stop List
            </button>
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => router.push(`/mot/bus-stop-form?id=${busStop.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Stop
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BusStopInfoCard busStop={busStop} onEdit={() => router.push(`/edit-bus-stop?id=${busStop.id}`)} />
          <BusStopMapCard busStop={busStop} />
        </div>
      </div>
    </Layout>
  )
}