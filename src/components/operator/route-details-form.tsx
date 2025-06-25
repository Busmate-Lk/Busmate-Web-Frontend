"use client"

import { useState } from "react"
import { MapPin, Plus, X, ChevronDown } from "lucide-react"

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

interface RouteDetailsFormProps {
  routeData: RouteData
  onUpdate: (field: string, value: any) => void
}

export function RouteDetailsForm({ routeData, onUpdate }: RouteDetailsFormProps) {
  const [newStop, setNewStop] = useState("")
  const [frequencyOpen, setFrequencyOpen] = useState(false)

  const frequencyOptions = ["Daily", "Weekly", "Monthly", "Custom"]

  const addStop = () => {
    if (newStop.trim()) {
      onUpdate("stops", [...routeData.stops, newStop.trim()])
      setNewStop("")
    }
  }

  const removeStop = (index: number) => {
    const updatedStops = routeData.stops.filter((_, i) => i !== index)
    onUpdate("stops", updatedStops)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Route Details</h2>
        </div>

        <div className="space-y-6">
          {/* Route Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Route Name</label>
            <input
              type="text"
              placeholder="Enter route name"
              value={routeData.routeName}
              onChange={(e) => onUpdate("routeName", e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
          </div>

          {/* Start and End Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Starting point"
                  value={routeData.startLocation}
                  onChange={(e) => onUpdate("startLocation", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Destination"
                  value={routeData.endLocation}
                  onChange={(e) => onUpdate("endLocation", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>

          {/* Route Stops */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Route Stops</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {routeData.stops.map((stop, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {stop}
                  <button onClick={() => removeStop(index)} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add stop"
                value={newStop}
                onChange={(e) => setNewStop(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addStop()}
                className="flex h-10 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
              <button
                onClick={addStop}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Stop
              </button>
            </div>
          </div>

          {/* Frequency and Times */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <div className="relative">
                <button
                  onClick={() => setFrequencyOpen(!frequencyOpen)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span>{routeData.frequency}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
                {frequencyOpen && (
                  <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                    {frequencyOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          onUpdate("frequency", option)
                          setFrequencyOpen(false)
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
              <input
                type="time"
                value={routeData.departureTime}
                onChange={(e) => onUpdate("departureTime", e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Time</label>
              <input
                type="time"
                value={routeData.arrivalTime}
                onChange={(e) => onUpdate("arrivalTime", e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
