"use client"

import { useState } from "react"
import { X, Bus, User, FileText, Shield, Upload } from "lucide-react"

interface AddBusModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BusFormData {
  registrationNumber: string
  busType: string
  seatingCapacity: string
  color: string
  isAvailable: boolean
  ownerName: string
  nicNumber: string
  contactNumber: string
  email: string
  address: string
  vehicleLicense: File | null
  insuranceCertificate: File | null
}

export function AddBusModal({ isOpen, onClose }: AddBusModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BusFormData>({
    registrationNumber: "",
    busType: "",
    seatingCapacity: "",
    color: "",
    isAvailable: false,
    ownerName: "",
    nicNumber: "",
    contactNumber: "",
    email: "",
    address: "",
    vehicleLicense: null,
    insuranceCertificate: null,
  })

  const steps = [
    { number: 1, title: "Basic Info", icon: Bus },
    { number: 2, title: "Owner Details", icon: User },
    { number: 3, title: "Documents", icon: FileText },
    { number: 4, title: "Compliance", icon: Shield },
  ]

  const busTypes = ["Select Type", "Luxury", "Semi-Luxury", "Standard", "Mini Bus"]

  const updateFormData = (field: keyof BusFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (field: "vehicleLicense" | "insuranceCertificate", file: File | null) => {
    updateFormData(field, file)
  }

  const handleCancel = () => {
    setCurrentStep(1)
    setFormData({
      registrationNumber: "",
      busType: "",
      seatingCapacity: "",
      color: "",
      isAvailable: false,
      ownerName: "",
      nicNumber: "",
      contactNumber: "",
      email: "",
      address: "",
      vehicleLicense: null,
      insuranceCertificate: null,
    })
    onClose()
  }

  const handleSaveDraft = () => {
    console.log("Save as draft:", formData)
  }

  const handleSubmit = () => {
    console.log("Submit for approval:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Add New Bus</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Navigation */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.number
                      ? "bg-blue-600 text-white"
                      : currentStep > step.number
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep === step.number ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && <div className="w-12 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bus className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Basic Bus Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ABC-1234"
                    value={formData.registrationNumber}
                    onChange={(e) => updateFormData("registrationNumber", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bus Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.busType}
                    onChange={(e) => updateFormData("busType", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    {busTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 52"
                    value={formData.seatingCapacity}
                    onChange={(e) => updateFormData("seatingCapacity", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    placeholder="e.g., Blue"
                    value={formData.color}
                    onChange={(e) => updateFormData("color", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => updateFormData("isAvailable", e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
                  Bus is currently available for service
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Owner Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Bus Owner Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bus Owner Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.ownerName}
                    onChange={(e) => updateFormData("ownerName", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Number / BR Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 123456789V"
                    value={formData.nicNumber}
                    onChange={(e) => updateFormData("nicNumber", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={formData.contactNumber}
                    onChange={(e) => updateFormData("contactNumber", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="owner@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Complete address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  rows={4}
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Mandatory Document Uploads</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle License<span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">PDF or Image (Max 5MB)</p>
                    <button
                      onClick={() => document.getElementById("vehicleLicense")?.click()}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Choose File
                    </button>
                    <input
                      id="vehicleLicense"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileUpload("vehicleLicense", e.target.files?.[0] || null)}
                    />
                    {formData.vehicleLicense && (
                      <p className="text-sm text-green-600 mt-2">{formData.vehicleLicense.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Certificate<span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">PDF or Image (Max 5MB)</p>
                    <button
                      onClick={() => document.getElementById("insuranceCertificate")?.click()}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Choose File
                    </button>
                    <input
                      id="insuranceCertificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => handleFileUpload("insuranceCertificate", e.target.files?.[0] || null)}
                    />
                    {formData.insuranceCertificate && (
                      <p className="text-sm text-green-600 mt-2">{formData.insuranceCertificate.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Compliance */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Compliance & Review</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Review Your Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Number:</span>
                    <span className="font-medium">{formData.registrationNumber || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bus Type:</span>
                    <span className="font-medium">{formData.busType || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seating Capacity:</span>
                    <span className="font-medium">{formData.seatingCapacity || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner Name:</span>
                    <span className="font-medium">{formData.ownerName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents:</span>
                    <span className="font-medium">
                      {formData.vehicleLicense && formData.insuranceCertificate ? "Complete" : "Incomplete"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Previous
              </button>
            )}

            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Save as Draft
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit for Approval
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
