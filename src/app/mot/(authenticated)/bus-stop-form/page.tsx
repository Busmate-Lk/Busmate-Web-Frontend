"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import AddBusStopBasicInfo from "@/components/mot/AddBusStopBasicInfo"
import AddBusStopLocation from "@/components/mot/AddBusStopLocation"
import AddBusStopFacilities from "@/components/mot/AddBusStopFacilities"
import AddBusStopNotes from "@/components/mot/AddBusStopNotes"

export default function BusStopForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busStopId = searchParams.get("id") // Get ID for editing
  const isEditing = !!busStopId

  // Sample bus stop data (replace with your actual data source)
  const existingBusStops = [
    {
      id: "BS001",
      stopName: "Fort Railway Station",
      stopCode: "BS001",
      latitude: "6.9271",
      longitude: "79.8612",
      address: "Fort Railway Station, Colombo Fort",
      city: "Colombo",
      district: "Colombo",
      province: "Western",
      stopType: "Terminal",
      status: "Active",
      nearbyLandmarks: "Near Central Bank, Fort Railway Station",
      notes: "Main bus terminal in Colombo Fort area",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: true,
        ticketCounter: true,
        restrooms: true,
        parking: false,
        wheelchairAccess: true,
        digitalDisplay: true,
        wifi: false,
      }
    },
    {
      id: "BS002",
      stopName: "Pettah Central Bus Stand",
      stopCode: "BS002",
      latitude: "6.9344",
      longitude: "79.8428",
      address: "Main Street, Pettah, Colombo",
      city: "Colombo",
      district: "Colombo",
      province: "Western",
      stopType: "Terminal",
      status: "Active",
      nearbyLandmarks: "Near Pettah Market, Khan Clock Tower",
      notes: "Central bus terminal serving multiple routes",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: true,
        ticketCounter: true,
        restrooms: true,
        parking: true,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS003",
      stopName: "Kandy Clock Tower",
      stopCode: "BS003",
      latitude: "7.2906",
      longitude: "80.6337",
      address: "Dalada Veediya, Kandy",
      city: "Kandy",
      district: "Kandy",
      province: "Central",
      stopType: "Regular",
      status: "Active",
      nearbyLandmarks: "Temple of the Tooth, Kandy Lake",
      notes: "Historic bus stop near the famous clock tower",
      facilities: {
        shelter: true,
        seating: false,
        lighting: true,
        cctv: false,
        ticketCounter: false,
        restrooms: false,
        parking: false,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS004",
      stopName: "Galle Bus Terminal",
      stopCode: "BS004",
      latitude: "6.0535",
      longitude: "80.221",
      address: "Galle Bus Stand, Galle",
      city: "Galle",
      district: "Galle",
      province: "Southern",
      stopType: "Terminal",
      status: "Active",
      nearbyLandmarks: "Galle Fort, Dutch Hospital",
      notes: "Main terminal for southern province routes",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: true,
        ticketCounter: true,
        restrooms: true,
        parking: true,
        wheelchairAccess: true,
        digitalDisplay: true,
        wifi: true,
      }
    },
    {
      id: "BS005",
      stopName: "Negombo Bus Stand",
      stopCode: "BS005",
      latitude: "7.2083",
      longitude: "79.8358",
      address: "Main Road, Negombo",
      city: "Negombo",
      district: "Gampaha",
      province: "Western",
      stopType: "Regular",
      status: "Active",
      nearbyLandmarks: "Negombo Beach, Fish Market",
      notes: "Busy bus stop serving airport and beach routes",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: false,
        ticketCounter: false,
        restrooms: false,
        parking: false,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS006",
      stopName: "Anuradhapura New Bus Stand",
      stopCode: "BS006",
      latitude: "8.3114",
      longitude: "80.4037",
      address: "New Town, Anuradhapura",
      city: "Anuradhapura",
      district: "Anuradhapura",
      province: "North Central",
      stopType: "Terminal",
      status: "Maintenance",
      nearbyLandmarks: "Sacred City, Ruwanwelisaya",
      notes: "Under maintenance - renovating facilities",
      facilities: {
        shelter: true,
        seating: false,
        lighting: false,
        cctv: false,
        ticketCounter: false,
        restrooms: false,
        parking: true,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS007",
      stopName: "Matara Bus Terminal",
      stopCode: "BS007",
      latitude: "5.9549",
      longitude: "80.555",
      address: "Matara Main Road, Matara",
      city: "Matara",
      district: "Matara",
      province: "Southern",
      stopType: "Terminal",
      status: "Active",
      nearbyLandmarks: "Matara Beach, Star Fort",
      notes: "Terminal serving deep south routes",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: true,
        ticketCounter: true,
        restrooms: true,
        parking: false,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS008",
      stopName: "Kurunegala Bus Stand",
      stopCode: "BS008",
      latitude: "7.4818",
      longitude: "80.3609",
      address: "Clock Tower Road, Kurunegala",
      city: "Kurunegala",
      district: "Kurunegala",
      province: "North Western",
      stopType: "Regular",
      status: "Active",
      nearbyLandmarks: "Kurunegala Lake, Elephant Rock",
      notes: "Central hub for North Western province",
      facilities: {
        shelter: true,
        seating: true,
        lighting: true,
        cctv: false,
        ticketCounter: false,
        restrooms: true,
        parking: false,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS009",
      stopName: "Ratnapura Bus Terminal",
      stopCode: "BS009",
      latitude: "6.6828",
      longitude: "80.4126",
      address: "Main Street, Ratnapura",
      city: "Ratnapura",
      district: "Ratnapura",
      province: "Sabaragamuwa",
      stopType: "Terminal",
      status: "Active",
      nearbyLandmarks: "Gem Market, Maha Saman Devalaya",
      notes: "Gateway to hill country and gem mining areas",
      facilities: {
        shelter: true,
        seating: false,
        lighting: true,
        cctv: false,
        ticketCounter: true,
        restrooms: false,
        parking: true,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
    {
      id: "BS010",
      stopName: "Badulla Bus Stand",
      stopCode: "BS010",
      latitude: "6.9934",
      longitude: "81.055",
      address: "Lower Street, Badulla",
      city: "Badulla",
      district: "Badulla",
      province: "Uva",
      stopType: "Regular",
      status: "Maintenance",
      nearbyLandmarks: "Badulla Railway Station, Dunhinda Falls",
      notes: "Hill country terminal - under renovation",
      facilities: {
        shelter: false,
        seating: false,
        lighting: false,
        cctv: false,
        ticketCounter: false,
        restrooms: false,
        parking: false,
        wheelchairAccess: false,
        digitalDisplay: false,
        wifi: false,
      }
    },
  ]

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