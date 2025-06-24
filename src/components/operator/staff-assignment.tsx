"use client"

import { useState } from "react"

export function StaffAssignment() {
  const [selectedBus, setSelectedBus] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("")
  const [selectedDriver, setSelectedDriver] = useState("")
  const [selectedConductor, setSelectedConductor] = useState("")

  const handleAssignStaff = () => {
    console.log("Assign staff:", { selectedBus, selectedRoute, selectedDriver, selectedConductor })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6">Assign Staff to Schedule</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bus</label>
            <select
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Bus #001 - NA-1234</option>
              <option value="bus002">Bus #002 - NA-5678</option>
              <option value="bus003">Bus #003 - NA-9012</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Route/Schedule</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Route A - Today 08:00 AM</option>
              <option value="routeb">Route B - Today 09:00 AM</option>
              <option value="routec">Route C - Today 10:00 AM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Driver</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Michael Brown (Available)</option>
              <option value="john">John Smith (Available)</option>
              <option value="david">David Wilson (Available)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Conductor</label>
            <select
              value={selectedConductor}
              onChange={(e) => setSelectedConductor(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sarah Johnson (Available)</option>
              <option value="mary">Mary Davis (Available)</option>
              <option value="lisa">Lisa Wilson (Available)</option>
            </select>
          </div>

          <button
            onClick={handleAssignStaff}
            className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Assign Staff
          </button>
        </div>
      </div>
    </div>
  )
}
