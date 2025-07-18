"use client"

import { useState } from "react"
import { User, Camera, Upload, FileText, Calendar, ChevronDown } from "lucide-react"

interface StaffFormData {
  role: "Driver" | "Conductor"
  fullName: string
  nicNumber: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  emailAddress: string
  emergencyContactName: string
  emergencyContactPhone: string
  photo: File | null
  licenseNumber: string
  licenseType: string
  licenseExpiryDate: string
  licenseFrontImage: File | null
  licenseBackImage: File | null
  medicalReport: File | null
  employmentLetter: File | null
  availabilityStatus: boolean
  assignImmediately: boolean
  selectedBus: string
  selectedRoute: string
}

export function AddStaffForm() {
  const [formData, setFormData] = useState<StaffFormData>({
    role: "Driver",
    fullName: "",
    nicNumber: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    photo: null,
    licenseNumber: "",
    licenseType: "",
    licenseExpiryDate: "",
    licenseFrontImage: null,
    licenseBackImage: null,
    medicalReport: null,
    employmentLetter: null,
    availabilityStatus: true,
    assignImmediately: false,
    selectedBus: "",
    selectedRoute: "",
  })

  const [genderOpen, setGenderOpen] = useState(false)
  const [licenseTypeOpen, setLicenseTypeOpen] = useState(false)
  const [busOpen, setBusOpen] = useState(false)
  const [routeOpen, setRouteOpen] = useState(false)

  const genderOptions = ["Select gender", "Male", "Female", "Other"]
  const licenseTypeOptions = ["Select license type", "Heavy Vehicle", "Light Vehicle", "Motorcycle", "Commercial"]
  const busOptions = ["Choose bus", "Bus #001", "Bus #002", "Bus #003"]
  const routeOptions = ["Choose route", "Route A - Downtown", "Route B - Airport", "Route C - University"]

  const updateFormData = (field: keyof StaffFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (field: keyof StaffFormData, file: File | null) => {
    updateFormData(field, file)
  }

  const handleCapturePhoto = () => {
    console.log("Capture photo")
  }

  const handleCancel = () => {
    console.log("Cancel")
  }

  const handleSaveDraft = () => {
    console.log("Save as draft:", formData)
  }

  const handleSubmit = () => {
    console.log("Submit staff profile:", formData)
  }

  return (
    <div className="space-y-8">
      {/* Role & Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Role & Personal Information</h2>
          </div>

          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Role Selection <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => updateFormData("role", "Driver")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    formData.role === "Driver"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Driver
                </button>
                <button
                  onClick={() => updateFormData("role", "Conductor")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    formData.role === "Conductor"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Conductor
                </button>
              </div>
            </div>

            {/* Personal Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIC Number or Passport ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter NIC or Passport ID"
                  value={formData.nicNumber}
                  onChange={(e) => updateFormData("nicNumber", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 text-gray-700 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="relative">
                  <button
                    onClick={() => setGenderOpen(!genderOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={formData.gender ? "text-gray-900" : "text-gray-500"}>
                      {formData.gender || "Select gender"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {genderOpen && (
                    <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                      {genderOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            updateFormData("gender", option === "Select gender" ? "" : option)
                            setGenderOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.emailAddress}
                  onChange={(e) => updateFormData("emailAddress", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                <input
                  type="text"
                  placeholder="Contact name"
                  value={formData.emergencyContactName}
                  onChange={(e) => updateFormData("emergencyContactName", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateFormData("emergencyContactPhone", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Face Photo Capture */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Face Photo Capture</h2>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={handleCapturePhoto}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Capture Photo
              </button>
              <button
                onClick={() => document.getElementById("photoUpload")?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload("photo", e.target.files?.[0] || null)}
              />
            </div>

            <p className="text-sm text-gray-500">
              Upload a clear, front-facing headshot.
              <br />
              JPEG/PNG format, well-lit image required
            </p>
          </div>
        </div>
      </div>

      {/* License Details & Upload */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">License Details & Upload</h2>
          </div>

          <div className="space-y-6">
            {/* License Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter license number"
                  value={formData.licenseNumber}
                  onChange={(e) => updateFormData("licenseNumber", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    onClick={() => setLicenseTypeOpen(!licenseTypeOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={formData.licenseType ? "text-gray-900" : "text-gray-500"}>
                      {formData.licenseType || "Select license type"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {licenseTypeOpen && (
                    <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                      {licenseTypeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            updateFormData("licenseType", option === "Select license type" ? "" : option)
                            setLicenseTypeOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.licenseExpiryDate}
                  onChange={(e) => updateFormData("licenseExpiryDate", e.target.value)}
                  className="flex h-10 w-full rounded-md border text-gray-700 border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {/* License Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload License Front Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500">JPG, PNG (max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("licenseFrontImage", e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload License Back Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500">JPG, PNG (max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("licenseBackImage", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>

            {/* Optional Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Report Upload (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload medical report</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileUpload("medicalReport", e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Employment Letter (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload employment letter</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFileUpload("employmentLetter", e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Availability & Optional Assignment */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Availability & Optional Assignment</h2>
          </div>

          <div className="space-y-6">
            {/* Availability Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Availability Status</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Available</span>
                <button
                  onClick={() => updateFormData("availabilityStatus", !formData.availabilityStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.availabilityStatus ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.availabilityStatus ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Assign Immediately */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="assignImmediately"
                checked={formData.assignImmediately}
                onChange={(e) => updateFormData("assignImmediately", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="assignImmediately" className="text-sm text-gray-700">
                Assign Immediately?
              </label>
            </div>

            {/* Assignment Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Bus</label>
                <div className="relative">
                  <button
                    onClick={() => setBusOpen(!busOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={formData.selectedBus ? "text-gray-900" : "text-gray-500"}>
                      {formData.selectedBus || "Choose bus"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {busOpen && (
                    <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                      {busOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            updateFormData("selectedBus", option === "Choose bus" ? "" : option)
                            setBusOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Route/Schedule</label>
                <div className="relative">
                  <button
                    onClick={() => setRouteOpen(!routeOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={formData.selectedRoute ? "text-gray-900" : "text-gray-500"}>
                      {formData.selectedRoute || "Choose route"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {routeOpen && (
                    <div className="absolute top-full mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg z-50">
                      {routeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            updateFormData("selectedRoute", option === "Choose route" ? "" : option)
                            setRouteOpen(false)
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleCancel}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit Staff Profile
          </button>
        </div>
      </div>
    </div>
  )
}
