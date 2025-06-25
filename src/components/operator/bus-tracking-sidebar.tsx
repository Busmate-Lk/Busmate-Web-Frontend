"use client"

import { useState } from "react"
import { Search, MapPin, Route } from "lucide-react"

interface Bus {
  id: string
  number: string
  status: "On Time" | "Delayed"
  delay?: number
  location: string
  route: string
  routeDescription: string
}

interface BusTrackingSidebarProps {
  selectedBus: string | null
  onSelectBus: (busId: string | null) => void
}

export function BusTrackingSidebar({ selectedBus, onSelectBus }: BusTrackingSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const buses: Bus[] = [
    {
      id: "SP2",
      number: "STOP #sp2",
      status: "On Time",
      location: "Central Station",
      route: "Route 15",
      routeDescription: "Downtown Loop",
    },
    {
      id: "SP3",
      number: "STOP #B205",
      status: "Delayed",
      delay: 5,
      location: "Oak Street",
      route: "Route 22",
      routeDescription: "North Side",
    },
    {
      id: "SP4",
      number: "STOP #C312",
      status: "On Time",
      location: "University Ave",
      route: "Route 8",
      routeDescription: "Campus Express",
    },
    {
      id: "SP5",
      number: "STOP #D418",
      status: "Delayed",
      delay: 12,
      location: "Mall Plaza",
      route: "Route 33",
      routeDescription: "Shopping District",
    },
    {
      id: "SP6",
      number: "STOP #E521",
      status: "On Time",
      location: "Airport Terminal",
      route: "Route 50",
      routeDescription: "Airport Express",
    },
  ]

  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const onTimeBuses = buses.filter((bus) => bus.status === "On Time").length
  const delayedBuses = buses.filter((bus) => bus.status === "Delayed").length

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bus ID or route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Status Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">On Time</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{onTimeBuses}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Delayed</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{delayedBuses}</div>
          </div>
        </div>
      </div>

      {/* Active Buses List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Least Stops ({buses.length})</h3>
          <div className="space-y-3">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                onClick={() => onSelectBus(selectedBus === bus.id ? null : bus.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedBus === bus.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{bus.number}</span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${bus.status === "On Time" ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${bus.status === "On Time" ? "text-green-600" : "text-red-600"}`}
                    >
                      {bus.status === "On Time" ? "On Time" : `+${bus.delay} min`}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{bus.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Route className="w-3 h-3" />
                    <span>
                      {bus.route} - {bus.routeDescription}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bus Status Legend */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Bus Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">On Time</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Delayed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
