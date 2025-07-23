"use client"

import { useState } from "react"

export function StaffAssignment() {
  const [selectedBus, setSelectedBus] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("")
  const [selectedDriver, setSelectedDriver] = useState("")
  const [selectedConductor, setSelectedConductor] = useState("")

  // Available staff data - only showing available staff
  const availableDrivers = [
    { id: "15", name: "Arjuna Ranatunga", status: "Available" },
  ]

  const availableConductors = [
    { id: "16", name: "Lalith Jayasuriya", status: "Available" },
  ]

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
              <option value="">Select a bus</option>
              <option value="mandakini-express">Mandakini Express</option>
              <option value="mandakini-super">Mandakini Super</option>
              <option value="mandakini-classic">Mandakini Classic</option>
              <option value="mandakini-deluxe">Mandakini Deluxe</option>
              <option value="mandakini-premium">Mandakini Premium</option>
              <option value="mandakini-royal">Mandakini Royal</option>
              <option value="mandakini-highway">Mandakini Highway</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Route/Schedule</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a route</option>
              <option value="matara-galle">MATARA-GALLE - Today 07:00 AM</option>
              <option value="matara-colombo">MATARA-COLOMBO - Today 06:00 AM</option>
              <option value="matara-tangalle">MATARA-TANGALLE - Today 06:30 AM</option>
              <option value="matara-hambantota">MATARA-HAMBANTOTA - Today 05:30 AM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Driver</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an available driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} ({driver.status})
                </option>
              ))}
            </select>
            {availableDrivers.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No drivers available for assignment</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Conductor</label>
            <select
              value={selectedConductor}
              onChange={(e) => setSelectedConductor(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an available conductor</option>
              {availableConductors.map((conductor) => (
                <option key={conductor.id} value={conductor.id}>
                  {conductor.name} ({conductor.status})
                </option>
              ))}
            </select>
            {availableConductors.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">No conductors available for assignment</p>
            )}
          </div>

          <button
            onClick={handleAssignStaff}
            disabled={!selectedBus || !selectedRoute || !selectedDriver || !selectedConductor || availableDrivers.length === 0 || availableConductors.length === 0}
            className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Assign Staff
          </button>

          {(availableDrivers.length === 0 || availableConductors.length === 0) && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All staff members are currently assigned. To reassign staff, please update their status to "Available" first.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
