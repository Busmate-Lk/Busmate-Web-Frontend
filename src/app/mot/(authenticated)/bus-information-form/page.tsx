"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, AlertCircle, CheckCircle, ChevronRight, Home } from "lucide-react"
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

  const busId = searchParams.get("edit")
  const isEditing = !!busId

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  // Initialize form data with empty values
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
    status: "Active",
    notes: "",
  })

  const [isLoading, setIsLoading] = useState(true)

  // Sample bus data for editing
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
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
      status: "Active",
      notes: "Hill country scenic route service",
    },
  ]

  // Breadcrumb configuration
  const getBreadcrumbs = () => {
    const existingBus = isEditing
      ? existingBuses.find(bus => bus.id === busId)
      : null

    return [
      {
        label: "Bus Information",
        href: "/mot/bus-infomation",
        current: false
      },
      {
        label: isEditing
          ? `Edit ${existingBus?.busNumber || busId}`
          : "Add New Bus",
        href: null,
        current: true
      }
    ]
  }

  // Validation rules (keeping your existing validation logic)
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic Information validation
    if (!formData.busNumber.trim()) {
      newErrors.busNumber = "Bus number is required"
    } else if (!/^[A-Z]{2,3}-\d{4}$/.test(formData.busNumber.trim())) {
      newErrors.busNumber = "Bus number must be in format XX-1234 or XXX-1234"
    }

    if (!formData.busType) {
      newErrors.busType = "Bus type is required"
    }

    if (!formData.operator.trim()) {
      newErrors.operator = "Operator name is required"
    } else if (formData.operator.trim().length < 3) {
      newErrors.operator = "Operator name must be at least 3 characters"
    }

    if (!formData.operatorType) {
      newErrors.operatorType = "Operator type is required"
    }

    if (!formData.seatingCapacity) {
      newErrors.seatingCapacity = "Seating capacity is required"
    } else if (parseInt(formData.seatingCapacity) < 1 || parseInt(formData.seatingCapacity) > 100) {
      newErrors.seatingCapacity = "Seating capacity must be between 1 and 100"
    }

    if (formData.standingCapacity && (parseInt(formData.standingCapacity) < 0 || parseInt(formData.standingCapacity) > 50)) {
      newErrors.standingCapacity = "Standing capacity must be between 0 and 50"
    }

    if (!formData.status) {
      newErrors.status = "Bus status is required"
    }

    // Technical Specifications validation
    if (!formData.chassisNo.trim()) {
      newErrors.chassisNo = "Chassis number is required"
    } else if (!/^[A-Z]{2}\d{9}$/.test(formData.chassisNo.trim())) {
      newErrors.chassisNo = "Chassis number must be in format XX123456789"
    }

    if (!formData.engineNo.trim()) {
      newErrors.engineNo = "Engine number is required"
    } else if (!/^[A-Z]{2}\d{9}$/.test(formData.engineNo.trim())) {
      newErrors.engineNo = "Engine number must be in format XX123456789"
    }

    if (!formData.fuelType) {
      newErrors.fuelType = "Fuel type is required"
    }

    // Location Assignment validation
    if (!formData.regionAssigned) {
      newErrors.regionAssigned = "Region assignment is required"
    }

    if (!formData.depotName.trim()) {
      newErrors.depotName = "Depot name is required"
    } else if (formData.depotName.trim().length < 3) {
      newErrors.depotName = "Depot name must be at least 3 characters"
    }

    // Important Dates validation
    if (!formData.registrationDate) {
      newErrors.registrationDate = "Registration date is required"
    } else {
      const regDate = new Date(formData.registrationDate)
      const today = new Date()
      const minDate = new Date('1990-01-01')

      if (regDate > today) {
        newErrors.registrationDate = "Registration date cannot be in the future"
      } else if (regDate < minDate) {
        newErrors.registrationDate = "Registration date cannot be before 1990"
      }
    }

    if (formData.lastInspectionDate) {
      const inspectionDate = new Date(formData.lastInspectionDate)
      const regDate = new Date(formData.registrationDate)
      const today = new Date()

      if (inspectionDate > today) {
        newErrors.lastInspectionDate = "Last inspection date cannot be in the future"
      } else if (formData.registrationDate && inspectionDate < regDate) {
        newErrors.lastInspectionDate = "Last inspection date cannot be before registration date"
      }
    }

    if (formData.nextMaintenanceDate) {
      const maintenanceDate = new Date(formData.nextMaintenanceDate)
      const today = new Date()
      const maxDate = new Date()
      maxDate.setFullYear(today.getFullYear() + 2)

      if (maintenanceDate < today) {
        newErrors.nextMaintenanceDate = "Next maintenance date should be in the future"
      } else if (maintenanceDate > maxDate) {
        newErrors.nextMaintenanceDate = "Next maintenance date cannot be more than 2 years from now"
      }
    }

    // Notes validation (optional but with length limit)
    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = "Notes cannot exceed 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Use useEffect to populate form data when editing
  useEffect(() => {
    if (isEditing && busId) {
      const existingBus = existingBuses.find(bus => bus.id === busId)

      if (existingBus) {
        setFormData({
          busNumber: existingBus.busNumber || "",
          busType: existingBus.busType || "",
          operator: existingBus.operator || "",
          operatorType: existingBus.operatorType || "",
          seatingCapacity: existingBus.seatingCapacity || "",
          standingCapacity: existingBus.standingCapacity || "",
          chassisNo: existingBus.chassisNo || "",
          engineNo: existingBus.engineNo || "",
          fuelType: existingBus.fuelType || "",
          regionAssigned: existingBus.regionAssigned || "",
          depotName: existingBus.depotName || "",
          primaryRoute: existingBus.primaryRoute || "",
          secondaryRoute: existingBus.secondaryRoute || "",
          registrationDate: existingBus.registrationDate || "",
          lastInspectionDate: existingBus.lastInspectionDate || "",
          nextMaintenanceDate: existingBus.nextMaintenanceDate || "",
          status: existingBus.status || "Active",
          notes: existingBus.notes || "",
        })
      }
    }
    setIsLoading(false)
  }, [busId, isEditing])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidation(true)

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (isEditing) {
        console.log("Bus updated:", { id: busId, formData })
      } else {
        console.log("Bus created:", formData)
      }

      router.push("/mot/bus-infomation")
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/mot/bus-infomation")
  }

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <Layout
        activeItem="bus-infomation"
        pageTitle="Loading..."
        pageDescription="Loading bus information"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bus information...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const existingBus = isEditing
    ? existingBuses.find(bus => bus.id === busId)
    : null

  const hasErrors = Object.keys(errors).length > 0
  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="bus-infomation"
      pageTitle={isEditing ? "Edit Bus Information" : "Add New Bus"}
      pageDescription={isEditing ? "Update bus information" : "Register a new bus to the fleet management system"}
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="text-gray-400 mx-2">/</span>
                  )}

                  {breadcrumb.current ? (
                    <span className="text-sm font-medium text-gray-900">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => router.push(breadcrumb.href!)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {breadcrumb.label}
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

      

        {/* Validation Summary */}
        {showValidation && hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Please correct the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showValidation && !hasErrors && !isSubmitting && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Form validation passed! Ready to submit.
                </h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInformationForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
            showValidation={showValidation}
          />
          <TechnicalSpecsForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
            showValidation={showValidation}
          />
          <LocationAssignmentForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
            showValidation={showValidation}
          />
          <ImportantDatesForm
            formData={formData}
            onInputChange={handleInputChange}
            errors={errors}
            showValidation={showValidation}
          />
          <BusPhotoUpload />
          <AdditionalNotesForm
            notes={formData.notes}
            onNotesChange={(value) => handleInputChange("notes", value)}
            error={errors.notes}
            showValidation={showValidation}
          />

          {/* Action Buttons */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {isEditing
                  ? "Changes will be saved immediately upon submission."
                  : "Bus will be added to the fleet management system."
                }
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {isSubmitting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {isSubmitting
                    ? (isEditing ? "Updating..." : "Creating...")
                    : (isEditing ? "Update Bus" : "Add Bus")
                  }
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}