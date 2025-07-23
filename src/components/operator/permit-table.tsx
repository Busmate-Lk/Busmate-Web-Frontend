"use client"

import { useState } from "react"
import { Eye, X, MapPin, Calendar, FileText } from "lucide-react"

interface RoutePermit {
  id: string
  permitId: string
  routeId: string
  routeName: string
  startPoint: string
  endPoint: string
  operator: string
  expiryDate: string
  isExpired: boolean
  intermediateStops?: string[]
}

interface PermitTableProps {
  permits: RoutePermit[]
  onViewPermit: (permitId: string) => void
  currentPage?: number
  totalPermits?: number
  onPageChange?: (page: number) => void
}

export function PermitTable({ permits, onViewPermit, currentPage = 1, totalPermits = 0, onPageChange }: PermitTableProps) {
  const [selectedPermit, setSelectedPermit] = useState<RoutePermit | null>(null)
  const [showModal, setShowModal] = useState(false)

  const getOperatorColor = (operator: string) => {
    return operator === "SLTB" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getExpiryDateColor = (isExpired: boolean) => {
    return isExpired ? "text-red-600" : "text-gray-900"
  }

  const getStatusColor = (isExpired: boolean) => {
    return isExpired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
  }

  const handleViewPermit = (permit: RoutePermit) => {
    setSelectedPermit(permit)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPermit(null)
  }

  return (
    <div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Permit ID</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Route ID</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Route Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Start Point</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">End Point</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Expiry Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permits.map((permit) => (
              <tr key={permit.id} className="transition-colors hover:bg-gray-50">
                <td className="p-4 align-middle font-medium text-gray-900">{permit.permitId}</td>
                <td className="p-4 align-middle text-gray-900">{permit.routeId}</td>
                <td className="p-4 align-middle text-gray-900">{permit.routeName}</td>
                <td className="p-4 align-middle text-gray-600">{permit.startPoint}</td>
                <td className="p-4 align-middle text-gray-600">{permit.endPoint}</td>
                <td className={`p-4 align-middle font-medium ${getExpiryDateColor(permit.isExpired)}`}>
                  {permit.expiryDate}
                </td>
                <td className="p-4 align-middle">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(permit.isExpired)}`}>
                    {permit.isExpired ? "Expired" : "Active"}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <button
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => handleViewPermit(permit)}
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {onPageChange && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">Showing 1-{permits.length} of {totalPermits} permits</div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">{currentPage}</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedPermit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Route Permit Details</h2>
              <button
                onClick={closeModal}
                className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedPermit.permitId}</h3>
                  <p className="text-gray-600">{selectedPermit.routeId} - {selectedPermit.routeName}</p>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-2 ${getStatusColor(selectedPermit.isExpired)}`}>
                    {selectedPermit.isExpired ? "Expired" : "Active"}
                  </span>
                </div>
              </div>
              
              {/* Route Information */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Route Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Start Point</label>
                    <p className="text-gray-900">{selectedPermit.startPoint}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">End Point</label>
                    <p className="text-gray-900">{selectedPermit.endPoint}</p>
                  </div>
                </div>
              </div>

              {/* Intermediate Bus Stops */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Intermediate Bus Stops</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {selectedPermit.intermediateStops && selectedPermit.intermediateStops.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPermit.intermediateStops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-900">{stop}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No intermediate stops defined</p>
                  )}
                </div>
              </div>

              {/* Permit Details */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date
                  </label>
                  <p className={`text-lg font-semibold ${getExpiryDateColor(selectedPermit.isExpired)}`}>
                    {selectedPermit.expiryDate}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Operator</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getOperatorColor(selectedPermit.operator)}`}>
                      {selectedPermit.operator}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
