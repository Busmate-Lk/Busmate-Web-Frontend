"use client"

import { useState } from "react"
import { Users, ChevronDown } from "lucide-react"

interface RouteData {
  routeName: string
  startLocation: string
  endLocation: string
  stops: string[]
  frequency: string
  departureTime: string
  arrivalTime: string
  selectedBus: string
  selectedDriver: string
  selectedConductor: string
}

interface ResourceAssignmentProps {
  routeData: RouteData
  onUpdate: (field: string, value: any) => void
}

export function ResourceAssignment({ routeData, onUpdate }: ResourceAssignmentProps) {
  const [busOpen, setBusOpen] = useState(false)
  const [driverOpen, setDriverOpen] = useState(false)
  const [conductorOpen, setConductorOpen] = useState(false)

  const busOptions = ["Choose a bus...", "Bus #001 - Available", "Bus #002 - Available", "Bus #003 - Available"]
  const driverOptions = ["Choose a driver...", "John Smith - Available", "Mike Johnson - Available"]
  const conductorOptions = ["Choose a conductor...", "Sarah Wilson - Available", "Lisa Davis - Available"]

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Resource Assignment</h2>
        </div>

        <div className="space-y-6">
          {/* Select Bus */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bus</label>
            <div className="relative">
              <button
                onClick={() => setBusOpen(!busOpen)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-gray-500">{routeData.selectedBus || "Choose a bus..."}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {busOpen && (
                <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                  {busOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onUpdate("selectedBus", option)
                        setBusOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Select a bus that is not assigned during this time slot</p>
          </div>

          {/* Select Driver and Conductor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Driver</label>
              <div className="relative">
                <button
                  onClick={() => setDriverOpen(!driverOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-red-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <span className="text-gray-500">{routeData.selectedDriver || "Choose a driver..."}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
                {driverOpen && (
                  <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                    {driverOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onUpdate("selectedDriver", option)
                          setDriverOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-red-500 mt-1">Driver already assigned to another route at this time</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Conductor</label>
              <div className="relative">
                <button
                  onClick={() => setConductorOpen(!conductorOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-500">{routeData.selectedConductor || "Choose a conductor..."}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
                {conductorOpen && (
                  <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                    {conductorOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onUpdate("selectedConductor", option)
                          setConductorOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
