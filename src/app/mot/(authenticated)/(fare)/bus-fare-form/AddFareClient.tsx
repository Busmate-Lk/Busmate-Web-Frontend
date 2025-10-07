"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Save, AlertCircle } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import BasicInformationForm from "@/components/mot/fare-BasicInformationForm"
import OperatorInformationForm from "@/components/mot/OperatorInformationForm"
import FareStructureForm from "@/components/mot/FareStructureForm"
import FareReference from "@/components/mot/FareReference"
import SLTBGuidelines from "@/components/mot/SLTBGuidelines"

// Validation interface
interface ValidationErrors {
  [key: string]: string
}

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

export default function AddFareClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")

  // Define a type for form fields
  type FormField =
    | "busType"
    | "facilityType"
    | "route"
    | "operator"
    | "operatorType"
    | "province"
    | "baseFare"
    | "perKmRate"
    | "effectiveFrom"
    | "validUntil"
    | "description"
    | "testDistance"

  type FormData = {
    [key in FormField]: string
  }

  // Get initial form data based on edit mode
  const getInitialFormData = (): FormData => {
    if (editId && existingFareStructures[editId as keyof typeof existingFareStructures]) {
      return existingFareStructures[editId as keyof typeof existingFareStructures] as FormData
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

  const [formData, setFormData] = useState<FormData>(getInitialFormData())
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isSaving, setIsSaving] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  // Breadcrumb configuration
  const getBreadcrumbs = () => {
    const existingFare = editId && existingFareStructures[editId as keyof typeof existingFareStructures]
      ? existingFareStructures[editId as keyof typeof existingFareStructures]
      : null

    return [
      {
        label: "Bus Fare Management",
        href: "/mot/bus-fare",
        current: false
      },
      {
        label: editId
          ? `Edit ${editId}`
          : "Add New Fare Structure",
        href: null,
        current: true
      }
    ]
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Validation functions
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'busType':
        return !value ? 'Bus type is required' : ''

      case 'facilityType':
        return !value ? 'Facility type is required' : ''

      case 'route':
        return !value ? 'Route is required' : ''

      case 'operator':
        return !value ? 'Operator is required' : ''

      case 'operatorType':
        return !value ? 'Operator type is required' : ''

      case 'province':
        return !value ? 'Province is required' : ''

      case 'baseFare':
        if (!value) return 'Base fare is required'
        const baseFareNum = parseFloat(value)
        if (isNaN(baseFareNum)) return 'Base fare must be a valid number'
        if (baseFareNum < 30) return 'Base fare must be at least Rs. 30.00'
        if (baseFareNum > 10000) return 'Base fare seems too high (max: Rs. 10,000)'
        return ''

      case 'perKmRate':
        if (!value) return 'Per KM rate is required'
        const perKmNum = parseFloat(value)
        if (isNaN(perKmNum)) return 'Per KM rate must be a valid number'
        if (perKmNum <= 0) return 'Per KM rate must be greater than zero (minimum Rs. 0.50)'
        if (perKmNum > 100) return 'Per KM rate seems too high (max: Rs. 100/km)'
        return ''

      case 'effectiveFrom':
        if (!value) return 'Effective from date is required'
        const effectiveDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (effectiveDate < today && !editId) {
          return 'Effective from date cannot be in the past'
        }
        return ''

      case 'validUntil':
        if (!value) return ''
        const validUntilDate = new Date(value)
        const effectiveFromDate = new Date(formData.effectiveFrom)
        if (formData.effectiveFrom && validUntilDate < effectiveFromDate) {
          return 'Valid until date cannot be before effective from date'
        }
        return ''

      default:
        return ''
    }
  }

  // Validate the entire form and set errors
  const validateForm = (): boolean => {
    const requiredFields: FormField[] = [
      'busType', 'facilityType', 'route', 'operator',
      'operatorType', 'province', 'baseFare', 'perKmRate', 'effectiveFrom'
    ]

    const errors: ValidationErrors = {};

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        errors[field] = error
      }
    })

    const validUntilError = validateField('validUntil', formData['validUntil'])
    if (validUntilError) {
      errors['validUntil'] = validUntilError
    }

    // Business logic validations
    if (formData.baseFare && formData.perKmRate) {
      const baseFare = parseFloat(formData.baseFare)
      const perKmRate = parseFloat(formData.perKmRate)

      // Check if fare structure is reasonable
      if (baseFare > 0 && perKmRate > 0) {
        const testDistance = 100 // 100km test
        const totalFare = baseFare + (perKmRate * testDistance)

        if (totalFare > 5000) {
          errors.fareStructure = 'Fare structure seems too expensive for typical routes'
        }
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
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
    setShowValidation(true)

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0]
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

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
  const pageTitle = isEditMode ? "Edit Fare Structure"  : "Add New Fare Structure"
  const pageDescription = isEditMode
    ? "Update fare structure for bus routes"
    : "Create fare structure for bus routes in Sri Lanka"

  const hasErrors = Object.keys(validationErrors).length > 0
  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="bus-fare"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
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
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800">Please fix the following errors:</h4>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {Object.entries(validationErrors).map(([field, error]) => (
                <li key={field} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <BasicInformationForm
              formData={formData}
              sriLankanRoutes={sriLankanRoutes}
              onInputChange={handleInputChange}
              validationErrors={validationErrors}
              showValidation={showValidation}
            />

            <OperatorInformationForm
              formData={formData}
              sriLankanOperators={sriLankanOperators}
              onInputChange={handleInputChange}
              validationErrors={validationErrors}
              showValidation={showValidation}
            />

            <FareStructureForm
              formData={formData}
              onInputChange={handleInputChange}
              validationErrors={validationErrors}
              showValidation={showValidation}
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
                className={`px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${hasErrors && showValidation
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    {isEditMode ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {hasErrors && showValidation ? 'Fix Errors & Save' : (isEditMode ? "Update Fare Structure" : "Save Fare Structure")}
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