"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import { ArrowLeft, Edit, Trash2, Power, Calculator, FileText, MapPin, Calendar, DollarSign } from "lucide-react"
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals'

interface FareStructure {
  id: string
  busType: string
  facilityType: string
  baseFare: number
  perKmRate: number
  effectiveFrom: string
  effectiveTo?: string
  status: string
  route?: string
  operator?: string
  region?: string
  createdDate?: string
  lastUpdated?: string
  createdBy?: string
  notes?: string
  distanceBands?: {
    min: number
    max: number
    fare: number
  }[]
}

// Sample fare data - replace with API call
const sampleFares: FareStructure[] = [
  {
    id: "FS001",
    busType: "AC",
    facilityType: "Luxury",
    baseFare: 100.0,
    perKmRate: 5.8,
    effectiveFrom: "2024-01-01",
    effectiveTo: "2024-12-31",
    status: "Active",
    route: "Colombo - Kandy",
    operator: "SLTB Central",
    region: "Central Province",
    createdDate: "2023-12-15",
    lastUpdated: "2024-01-01",
    createdBy: "John Doe (Transport Officer)",
    notes: "Premium service with luxury amenities. Includes complimentary refreshments.",
    distanceBands: [
      { min: 0, max: 50, fare: 150 },
      { min: 51, max: 100, fare: 280 },
      { min: 101, max: 150, fare: 410 },
      { min: 151, max: 200, fare: 540 }
    ]
  },
  {
    id: "FS002",
    busType: "Non-AC",
    facilityType: "Normal",
    baseFare: 77.0,
    perKmRate: 4.8,
    effectiveFrom: "2025-01-01",
    status: "Active",
    route: "Colombo - Galle",
    operator: "Southern Transport",
    region: "Southern Province",
    createdDate: "2024-11-20",
    lastUpdated: "2024-11-25",
    createdBy: "Jane Smith (Fare Manager)",
    notes: "Standard service for coastal route. High frequency during peak hours.",
    distanceBands: [
      { min: 0, max: 50, fare: 120 },
      { min: 51, max: 100, fare: 240 },
      { min: 101, max: 150, fare: 360 }
    ]
  }
]

export default function BusFareDetails() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fareId = searchParams.get("fareId")

  const [fareData, setFareData] = useState<FareStructure | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)

  // Breadcrumb configuration
  const getBreadcrumbs = () => {
    return [
      {
        label: "Bus Fare Management",
        href: "/mot/bus-fare",
        current: false
      },
      {
        label: fareData ? `${fareData.id} Details` : "Fare Details",
        href: null,
        current: true
      }
    ]
  }

  useEffect(() => {
    if (fareId) {
      // Simulate API call
      const foundFare = sampleFares.find(fare => fare.id === fareId)
      setFareData(foundFare || null)
    }
    setIsLoading(false)
  }, [fareId])

  const handleBack = () => {
    router.push("/mot/bus-fare")
  }

  const handleEdit = () => {
    if (fareData) {
      router.push(`/mot/bus-fare-form?edit=${fareData.id}`)
    }
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleDeactivate = () => {
    setShowDeactivateModal(true)
  }

  const confirmDelete = () => {
    console.log("Deleting fare:", fareData?.id)
    // Add delete logic here
    setShowDeleteModal(false)
    router.push("/mot/bus-fare")
  }

  const confirmDeactivate = () => {
    if (fareData) {
      setFareData({ ...fareData, status: "Inactive" })
      console.log("Deactivated fare:", fareData.id)
    }
    setShowDeactivateModal(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBusTypeBadge = (type: string) => {
    switch (type) {
      case "AC":
        return "bg-blue-100 text-blue-800"
      case "Non-AC":
        return "bg-gray-100 text-gray-800"
      case "Semi-Luxury":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const calculateFare = (distance: number) => {
    if (!fareData) return 0
    return fareData.baseFare + (distance * fareData.perKmRate)
  }

  if (isLoading) {
    return (
      <Layout
        activeItem="bus-fare"
        pageTitle="Loading..."
        pageDescription="Loading fare details"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading fare details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!fareData) {
    return (
      <Layout
        activeItem="bus-fare"
        pageTitle="Fare Not Found"
        pageDescription="The requested fare structure could not be found"
        role="mot"
      >
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Fare Structure Not Found</h3>
          <p className="text-gray-500 mb-6">The fare structure you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Fare Management
          </button>
        </div>
      </Layout>
    )
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="bus-fare"
      pageTitle={"Fare Details"}
      pageDescription={`Detailed information for ${fareData.route} fare structure`}
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

        {/* Status Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
              Edit Fare
            </button>

            {fareData.status === "Active" && (
              <button
                onClick={handleDeactivate}
                className="flex items-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 rounded hover:bg-orange-50 transition-colors duration-200"
              >
                <Power className="w-4 h-4" />
                Deactivate
              </button>
            )}

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded hover:bg-red-50 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{fareData.route}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Fare ID: <strong>{fareData.id}</strong></span>
                <span>•</span>
                <span>Operator: <strong>{fareData.operator}</strong></span>
                <span>•</span>
                <span>Region: <strong>{fareData.region}</strong></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getBusTypeBadge(fareData.busType)}`}>
                {fareData.busType}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(fareData.status)}`}>
                {fareData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fare Structure */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Fare Structure
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Fare</label>
                    <p className="text-2xl font-bold text-blue-600">Rs. {fareData.baseFare.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Per KM Rate</label>
                    <p className="text-2xl font-bold text-green-600">Rs. {fareData.perKmRate.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facility Type</label>
                  <p className="text-lg text-gray-900">{fareData.facilityType}</p>
                </div>
              </div>
            </div>

            {/* Distance-Based Fare Chart */}
            {fareData.distanceBands && (
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    Distance-Based Fare Chart
                  </h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Distance Range (KM)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fare (Rs.)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {fareData.distanceBands.map((band, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {band.min} - {band.max} km
                            </td>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                              Rs. {band.fare.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {fareData.notes && (
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Additional Notes
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{fareData.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Validity Period */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Validity Period
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                  <p className="text-sm text-gray-900">{formatDate(fareData.effectiveFrom)}</p>
                </div>
                {fareData.effectiveTo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Effective To</label>
                    <p className="text-sm text-gray-900">{formatDate(fareData.effectiveTo)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Route Information */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Route Information
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <p className="text-sm text-gray-900">{fareData.route}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                  <p className="text-sm text-gray-900">{fareData.operator}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <p className="text-sm text-gray-900">{fareData.region}</p>
                </div>
              </div>
            </div>

            {/* Audit Information */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Audit Information</h3>
              </div>
              <div className="p-6 space-y-4">
                {fareData.createdDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-sm text-gray-900">{formatDate(fareData.createdDate)}</p>
                  </div>
                )}
                {fareData.lastUpdated && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                    <p className="text-sm text-gray-900">{formatDate(fareData.lastUpdated)}</p>
                  </div>
                )}
                {fareData.createdBy && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                    <p className="text-sm text-gray-900">{fareData.createdBy}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>


        {/* Confirmation Modals */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={`fare structure ${fareData.id} (${fareData.route})`}
          title="Delete Fare Structure"
          isLoading={false}
        />

        <DeactivationConfirmationModal
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          onConfirm={confirmDeactivate}
          itemName={`fare structure ${fareData.id} (${fareData.route})`}
          title="Deactivate Fare Structure"
          isLoading={false}
        />
      </div>
    </Layout>
  )
}
