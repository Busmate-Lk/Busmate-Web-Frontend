"use client"

import { useState } from "react"
import { Lock, ChevronDown } from "lucide-react"

interface BusDetailsData {
  operatorName: string
  licenseNumber: string
  busId: string
  busNumber: string
  numberOfSeats: string
  routeType: string
}

export function EditBusDetailsForm() {
  const [formData, setFormData] = useState<BusDetailsData>({
    operatorName: "Metro Bus Services Ltd.",
    licenseNumber: "LIC-2024-001",
    busId: "",
    busNumber: "",
    numberOfSeats: "",
    routeType: "",
  })

  const [routeTypeOpen, setRouteTypeOpen] = useState(false)

  const routeTypeOptions = [
    { value: "", label: "Select route type" },
    { value: "urban", label: "Urban Route" },
    { value: "intercity", label: "Intercity Route" },
    { value: "express", label: "Express Route" },
    { value: "local", label: "Local Route" },
    { value: "shuttle", label: "Shuttle Service" },
  ]

  const updateFormData = (field: keyof BusDetailsData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Save bus details:", formData)
    // Handle form submission
  }

  const handleCancel = () => {
    console.log("Cancel editing")
    // Handle cancel action
  }

  return (
    <div className="max-w-4xl">
      {/* Operator Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Operator Information</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Operator Access Only</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Operator Name</label>
              <input
                type="text"
                value={formData.operatorName}
                disabled
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                type="text"
                value={formData.licenseNumber}
                disabled
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bus Details Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Bus Details</h2>

          <div className="space-y-6">
            {/* First Row - Bus ID and Bus Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bus ID<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter bus ID"
                  value={formData.busId}
                  onChange={(e) => updateFormData("busId", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bus Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter bus number"
                  value={formData.busNumber}
                  onChange={(e) => updateFormData("busNumber", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {/* Second Row - Number of Seats and Route Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Seats<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter number of seats"
                  value={formData.numberOfSeats}
                  onChange={(e) => updateFormData("numberOfSeats", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route Type<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setRouteTypeOpen(!routeTypeOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={formData.routeType ? "text-gray-900" : "text-gray-500"}>
                      {routeTypeOptions.find((opt) => opt.value === formData.routeType)?.label || "Select route type"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {routeTypeOpen && (
                    <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                      {routeTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            updateFormData("routeType", option.value)
                            setRouteTypeOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Choose the operational type of this bus route</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
