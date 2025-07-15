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

export default function AddBus() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  const [formData, setFormData] = useState({
    busNumber: "",
    busType: "",
    operator: "",
    operatorType: "",
    seatingCapacity: "",
    standingCapacity: "",
    chassisNo: "",
    engineNo: "",
    fuelType: "",
    regionAssigned: "",
    depotName: "",
    primaryRoute: "",
    secondaryRoute: "",
    registrationDate: "",
    lastInspectionDate: "",
    nextMaintenanceDate: "",
    notes: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/bus-infomation")
  }
  const handleCancel = () => {
    router.push("/mot/bus-infomation")
  }


  return (
    <Layout
      activeItem="bus-infomation"
      pageTitle={editId ? "Edit Bus" : "Add New Bus"}
      pageDescription={editId ? "Update bus information" : "Register a new bus to the fleet management system"}
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bus Information
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

          {/* Action Buttons */}
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
              {editId ? "Update Bus" : "Add Bus"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}