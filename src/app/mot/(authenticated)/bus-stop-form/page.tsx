"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import AddBusStopBasicInfo from "@/components/mot/bus-stop-form/AddBusStopBasicInfo"
import AddBusStopLocation from "@/components/mot/bus-stop-form/AddBusStopLocation"
import AddBusStopFacilities from "@/components/mot/bus-stop-form/AddBusStopFacilities"
import AddBusStopNotes from "@/components/mot/bus-stop-form/AddBusStopNotes"
import { existingBusStops } from "./data"

export default function BusStopForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busStopId = searchParams.get("id") // Get ID for editing
  const isEditing = !!busStopId

  // Find existing bus stop data if editing
  const existingBusStop = isEditing 
    ? existingBusStops.find(stop => stop.id === busStopId)
    : null

  const [formData, setFormData] = useState({
    stopName: existingBusStop?.stopName || "",
    stopCode: existingBusStop?.stopCode || "",
    latitude: existingBusStop?.latitude || "",
    longitude: existingBusStop?.longitude || "",
    address: existingBusStop?.address || "",
    city: existingBusStop?.city || "",
    district: existingBusStop?.district || "",
    province: existingBusStop?.province || "",
    stopType: existingBusStop?.stopType || "",
    status: existingBusStop?.status || "Active",
    nearbyLandmarks: existingBusStop?.nearbyLandmarks || "",
    notes: existingBusStop?.notes || "",
  })

  const [facilities, setFacilities] = useState({
    shelter: existingBusStop?.facilities?.shelter || false,
    seating: existingBusStop?.facilities?.seating || false,
    lighting: existingBusStop?.facilities?.lighting || false,
    cctv: existingBusStop?.facilities?.cctv || false,
    ticketCounter: existingBusStop?.facilities?.ticketCounter || false,
    restrooms: existingBusStop?.facilities?.restrooms || false,
    parking: existingBusStop?.facilities?.parking || false,
    wheelchairAccess: existingBusStop?.facilities?.wheelchairAccess || false,
    digitalDisplay: existingBusStop?.facilities?.digitalDisplay || false,
    wifi: existingBusStop?.facilities?.wifi || false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFacilities((prev) => ({
      ...prev,
      [facility]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    if (isEditing) {
      console.log("Bus stop updated:", { id: busStopId, formData, facilities })
      // Add your update logic here
    } else {
      console.log("Bus stop created:", { formData, facilities })
      // Add your create logic here
    }
    router.push("/mot/bus-stops")
  }

  const handleCancel = () => {
    router.push("/mot/bus-stops")
  }

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle={isEditing ? "Edit Bus Stop" : "Add Bus Stop"}
      pageDescription={isEditing ? "Update bus stop information and facilities" : "Create a new bus stop with location and facility details"}
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.push("/mot/bus-stops")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Bus Stops</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <AddBusStopBasicInfo formData={formData} handleInputChange={handleInputChange} />
        <AddBusStopLocation formData={formData} handleInputChange={handleInputChange} />
        <AddBusStopFacilities facilities={facilities} handleFacilityChange={handleFacilityChange} />
        <AddBusStopNotes notes={formData.notes} handleInputChange={handleInputChange} />
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            {isEditing ? "Update Bus Stop" : "Add Bus Stop"}
          </button>
        </div>
        </form>
      </div>
    </Layout>
  )
}