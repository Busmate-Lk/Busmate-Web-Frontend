"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import BasicInformationForm from "@/components/mot/fare-BasicInformationForm"
import OperatorInformationForm from "@/components/mot/OperatorInformationForm"
import FareStructureForm from "@/components/mot/FareStructureForm"
import FareReference from "@/components/mot/FareReference"
import SLTBGuidelines from "@/components/mot/SLTBGuidelines"

// Sample existing fare structures (in real app, this would come from API)
const existingFareStructures = {
  "FS001": {
    busType: "AC",
    facilityType: "Luxury",
    route: "Colombo - Kandy (115 km)",
    operator: "SLTB Central",
    operatorType: "SLTB",
    province: "Central",
    baseFare: "100.0",
    perKmRate: "5.8",
    effectiveFrom: "2024-01-01",
    validUntil: "2024-12-31",
    description: "AC luxury service for Colombo to Kandy route",
    testDistance: "115",
  },
  "FS002": {
    busType: "Non-AC",
    facilityType: "Normal",
    route: "Colombo - Galle (119 km)",
    operator: "Southern Transport",
    operatorType: "Private",
    province: "Southern",
    baseFare: "77.0",
    perKmRate: "4.8",
    effectiveFrom: "2025-01-01",
    validUntil: "2025-12-31",
    description: "Regular non-AC service for coastal route",
    testDistance: "119",
  },
  "FS003": {
    busType: "Semi-Luxury",
    facilityType: "Semi-Luxury",
    route: "Kandy - Nuwara Eliya (77 km)",
    operator: "Hill Country Express",
    operatorType: "Private",
    province: "Central",
    baseFare: "48.0",
    perKmRate: "4.5",
    effectiveFrom: "2024-10-01",
    validUntil: "2025-09-30",
    description: "Semi-luxury service for hill country route",
    testDistance: "77",
  },
  "FS004": {
    busType: "AC",
    facilityType: "Express",
    route: "Colombo - Matara (160 km)",
    operator: "Coastal Express",
    operatorType: "Private",
    province: "Southern",
    baseFare: "900.0",
    perKmRate: "6.4",
    effectiveFrom: "2025-10-01",
    validUntil: "2026-09-30",
    description: "Express AC service for long distance coastal route",
    testDistance: "160",
  },
  "FS005": {
    busType: "Non-AC",
    facilityType: "Normal",
    route: "Kurunegala - Anuradhapura (142 km)",
    operator: "North Western Transport",
    operatorType: "SLTB",
    province: "North Western",
    baseFare: "48.0",
    perKmRate: "5.2",
    effectiveFrom: "2023-12-01",
    validUntil: "2024-11-30",
    description: "Regular service connecting northwestern cities",
    testDistance: "142",
  },
}

export default function AddFare() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  // Get initial form data based on edit mode
  const getInitialFormData = () => {
    if (editId && existingFareStructures[editId as keyof typeof existingFareStructures]) {
      return existingFareStructures[editId as keyof typeof existingFareStructures]
    }
    return {
      busType: "",
      facilityType: "",
      route: "",
      operator: "",
      operatorType: "",
      province: "",
      baseFare: "",
      perKmRate: "",
      effectiveFrom: "",
      validUntil: "",
      description: "",
      testDistance: "50",
    }
  }

  const [formData, setFormData] = useState(getInitialFormData())
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sriLankanRoutes = [
    "Colombo - Kandy (115 km)",
    "Colombo - Galle (119 km)",
    "Colombo - Matara (160 km)",
    "Kandy - Nuwara Eliya (77 km)",
    "Colombo - Negombo (37 km)",
    "Kandy - Anuradhapura (142 km)",
    "Galle - Matara (41 km)",
    "Colombo - Kurunegala (94 km)",
    "Kandy - Badulla (129 km)",
    "Colombo - Ratnapura (101 km)",
    "Anuradhapura - Trincomalee (127 km)",
    "Kandy - Polonnaruwa (140 km)",
    "Colombo - Chilaw (83 km)",
    "Galle - Tangalle (64 km)",
    "Kandy - Hatton (65 km)",
    "Colombo - Avissawella (54 km)",
    "Matara - Hambantota (47 km)",
  ]

  const sriLankanOperators = [
    "Sri Lanka Transport Board (SLTB)",
    "Western Province Road Passenger Transport Authority",
    "Central Province Transport Board",
    "Southern Province Transport Board",
    "North Western Province Transport Board",
    "North Central Province Transport Board",
    "Uva Province Transport Board",
    "Sabaragamuwa Province Transport Board",
    "Eastern Province Transport Board",
    "Northern Province Transport Board",
    "Lanka Ashok Leyland Private Limited",
    "Colombo City Transport",
    "Hill Country Express Services",
    "Coastal Line Transport",
    "Express Pearl Transport",
    "Golden Mile Transport",
    "Royal Express Services",
    "Metro Bus Services",
    "SLTB Central",
    "Southern Transport",
    "Hill Country Express",
    "Coastal Express",
    "North Western Transport",
  ]

  const currentFareReference = [
    { route: "Colombo - Kandy", type: "AC", fare: "Rs. 600 - 700" },
    { route: "Colombo - Galle", type: "Non-AC", fare: "Rs. 400 - 450" },
    { route: "Kandy - Nuwara Eliya", type: "Semi-Luxury", fare: "Rs. 380 - 410" },
    { route: "Colombo - Negombo", type: "AC", fare: "Rs. 450 - 480" },
  ]

  const handleSave = () => {
    setIsSaving(true)
    
    if (editId) {
      console.log("Updating fare structure:", editId, formData)
      // Simulate API call for update
      setTimeout(() => {
        setIsSaving(false)
        router.push("/mot/bus-fare")
      }, 1000)
    } else {
      console.log("Creating new fare structure:", formData)
      // Simulate API call for create
      setTimeout(() => {
        setIsSaving(false)
        router.push("/mot/bus-fare")
      }, 1000)
    }
  }

  const handleCancel = () => {
    router.push("/mot/bus-fare")
  }

  const isEditMode = !!editId
  const pageTitle = isEditMode ? `Edit Fare Structure - ${editId}` : "Add New Fare Structure"
  const pageDescription = isEditMode 
    ? "Update fare structure for bus routes" 
    : "Create fare structure for bus routes in Sri Lanka"

  return (
    <Layout
      activeItem="bus-fare"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Fare Management</span>
          </button>
          
          {/* Edit Mode Indicator */}
          {isEditMode && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">Editing: {editId}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <BasicInformationForm
              formData={formData}
              sriLankanRoutes={sriLankanRoutes}
              onInputChange={handleInputChange}
            />

            <OperatorInformationForm
              formData={formData}
              sriLankanOperators={sriLankanOperators}
              onInputChange={handleInputChange}
            />

            <FareStructureForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isEditMode ? "Update Fare Structure" : "Save Fare Structure"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FareReference 
              formData={formData}
              currentFareReference={currentFareReference}
            />

            <SLTBGuidelines />
          </div>
        </div>
      </div>
    </Layout>
  )
}