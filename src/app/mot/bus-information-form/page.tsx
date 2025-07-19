"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import BasicInformationForm from "@/components/mot/Bus-InformationForm"
import TechnicalSpecsForm from "@/components/mot/TechnicalSpecsForm"
import LocationAssignmentForm from "@/components/mot/LocationAssignmentForm"
import ImportantDatesForm from "@/components/mot/ImportantDatesForm"
import BusPhotoUpload from "@/components/mot/BusPhotoUpload"
import AdditionalNotesForm from "@/components/mot/AdditionalNotesForm"

export default function BusInformationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busId = searchParams.get("id")   // Get ID for editing
  const isEditing = !!busId

  // Sample bus data for editing (in real app, this would come from API)
  const existingBuses = [
    {
      id: "1",
      busNumber: "NB-1234",
      busType: "AC",
      operator: "Ceylon Transport Board",
      operatorType: "SLTB",
      seatingCapacity: "45",
      standingCapacity: "15",
      chassisNo: "CH789456123",
      engineNo: "EN987654321",
      fuelType: "Diesel",
      regionAssigned: "Western Province",
      depotName: "Colombo Central Depot",
      primaryRoute: "Colombo - Kandy",
      secondaryRoute: "Colombo - Gampaha",
      registrationDate: "2022-03-15",
      lastInspectionDate: "2024-11-20",
      nextMaintenanceDate: "2025-01-15",
      notes: "Main bus terminal in Colombo Fort area",
    },
    {
      id: "2",
      busNumber: "PV-5678",
      busType: "Non-AC",
      operator: "Lanka Private Bus",
      operatorType: "Private",
      seatingCapacity: "52",
      standingCapacity: "",
      chassisNo: "CH456789012",
      engineNo: "EN123456789",
      fuelType: "Diesel",
      regionAssigned: "Western Province",
      depotName: "Pettah Depot",
      primaryRoute: "Colombo - Negombo",
      secondaryRoute: "",
      registrationDate: "2021-08-10",
      lastInspectionDate: "2024-10-15",
      nextMaintenanceDate: "2025-02-20",
      notes: "Regular service to airport route",
    },
    {
      id: "3",
      busNumber: "SL-9012",
      busType: "Sleeper",
      operator: "Express Lanka",
      operatorType: "Private",
      seatingCapacity: "32",
      standingCapacity: "",
      chassisNo: "CH123456789",
      engineNo: "EN456789012",
      fuelType: "Diesel",
      regionAssigned: "Central Province",
      depotName: "Kandy Depot",
      primaryRoute: "Colombo - Kandy",
      secondaryRoute: "Kandy - Nuwara Eliya",
      registrationDate: "2020-12-05",
      lastInspectionDate: "2024-09-30",
      nextMaintenanceDate: "2024-12-15",
      notes: "Currently under maintenance - engine overhaul required",
    },
    {
      id: "4",
      busNumber: "NB-3456",
      busType: "AC",
      operator: "SLTB Western",
      operatorType: "SLTB",
      seatingCapacity: "48",
      standingCapacity: "",
      chassisNo: "CH987654321",
      engineNo: "EN789012345",
      fuelType: "Diesel",
      regionAssigned: "Southern Province",
      depotName: "Galle Depot",
      primaryRoute: "Colombo - Galle",
      secondaryRoute: "Galle - Matara",
      registrationDate: "2023-01-20",
      lastInspectionDate: "2024-11-05",
      nextMaintenanceDate: "2025-03-10",
      notes: "Express service to southern provinces",
    },
    {
      id: "5",
      busNumber: "WP-7890",
      busType: "AC",
      operator: "Kurunegala Express",
      operatorType: "Private",
      seatingCapacity: "50",
      standingCapacity: "",
      chassisNo: "CH654321098",
      engineNo: "EN321098765",
      fuelType: "Diesel",
      regionAssigned: "North Western Province",
      depotName: "Kurunegala Depot",
      primaryRoute: "Colombo - Kurunegala",
      secondaryRoute: "",
      registrationDate: "2019-06-15",
      lastInspectionDate: "2024-08-20",
      nextMaintenanceDate: "2024-11-30",
      notes: "Popular route connecting North Western province",
    },
    {
      id: "6",
      busNumber: "UP-2468",
      busType: "Semi-Luxury",
      operator: "Hill Country Transport",
      operatorType: "SLTB",
      seatingCapacity: "40",
      standingCapacity: "",
      chassisNo: "CH135792468",
      engineNo: "EN246813579",
      fuelType: "Diesel",
      regionAssigned: "Uva Province",
      depotName: "Badulla Depot",
      primaryRoute: "Colombo - Badulla",
      secondaryRoute: "Badulla - Ella",
      registrationDate: "2022-07-12",
      lastInspectionDate: "2024-10-25",
      nextMaintenanceDate: "2025-01-25",
      notes: "Hill country scenic route service",
    },
  ]

  // Find existing bus data if editing
  const existingBus = isEditing 
    ? existingBuses.find(bus => bus.id === busId)
    : null

  const [formData, setFormData] = useState({
    busNumber: existingBus?.busNumber || "",
    busType: existingBus?.busType || "",
    operator: existingBus?.operator || "",
    operatorType: existingBus?.operatorType || "",
    seatingCapacity: existingBus?.seatingCapacity || "",
    standingCapacity: existingBus?.standingCapacity || "",
    chassisNo: existingBus?.chassisNo || "",
    engineNo: existingBus?.engineNo || "",
    fuelType: existingBus?.fuelType || "",
    regionAssigned: existingBus?.regionAssigned || "",
    depotName: existingBus?.depotName || "",
    primaryRoute: existingBus?.primaryRoute || "",
    secondaryRoute: existingBus?.secondaryRoute || "",
    registrationDate: existingBus?.registrationDate || "",
    lastInspectionDate: existingBus?.lastInspectionDate || "",
    nextMaintenanceDate: existingBus?.nextMaintenanceDate || "",
    notes: existingBus?.notes || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditing) {
      console.log("Bus updated:", { id: busId, formData })
      // Add your update logic here
    } else {
      console.log("Bus created:", formData)
      // Add your create logic here
    }
    
    router.push("/mot/bus-infomation")
  }

  const handleCancel = () => {
    router.push("/mot/bus-infomation")
  }


  return (
    <Layout
      activeItem="bus-infomation"
      pageTitle={isEditing ? "Edit Bus" : "Add New Bus"}
      pageDescription={isEditing ? "Update bus information" : "Register a new bus to the fleet management system"}
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.push("/mot/bus-infomation")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Bus Information</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInformationForm formData={formData} onInputChange={handleInputChange} />
          <TechnicalSpecsForm formData={formData} onInputChange={handleInputChange} />
          <LocationAssignmentForm formData={formData} onInputChange={handleInputChange} />
          <ImportantDatesForm formData={formData} onInputChange={handleInputChange} />
          <BusPhotoUpload />
          <AdditionalNotesForm
            notes={formData.notes}
            onNotesChange={(value) => handleInputChange("notes", value)}
          />


          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? "Update Bus" : "Add Bus"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}