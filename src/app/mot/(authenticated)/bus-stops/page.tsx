"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from 'next/navigation'
import BusStopStats from "@/components/mot/bus-stops/BusStopStats"
import BusStopFilters from "@/components/mot/bus-stops/BusStopFilters"
import BusStopTable from "@/components/mot/bus-stops/BusStopTable"
import { Layout } from "@/components/shared/layout";
// import { sriLankanBusStops } from "./data" 
import useBusStops from "@/hooks/use-bus-stops"


export default function BusStops() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [provinceFilter, setProvinceFilter] = useState("all")

  const { busStops, addBusStop } = useBusStops();

  // const filteredBusStops = busStops.filter((stop) => {
  //   const matchesSearch =
  //     stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     stop.id.toLowerCase().includes(searchTerm.toLowerCase())
  //   const matchesCity = cityFilter === "all" || stop.city.toLowerCase() === cityFilter.toLowerCase()
  //   const matchesProvince = provinceFilter === "all" || stop.province.toLowerCase() === provinceFilter.toLowerCase()
  //   return matchesSearch && matchesCity && matchesProvince
  // })

    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stops Management"
        pageDescription="Manage and monitor bus stop locations and facilities"
        role="mot"
      >
        <div className="space-y-6">
          <BusStopStats busStops={busStops} />

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
              onClick={() => router.push('/mot/bus-stop-form')}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Bus Stop
            </button>
          </div>

          <BusStopTable busStops={busStops} />
        </div>
      </Layout>
    );
}