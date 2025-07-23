"use client"

import { Eye, Trash2, ArrowRight, X } from "lucide-react"
import { useState } from "react"

interface RouteData {
  id: string
  routeName: string
  startPoint: string
  endPoint: string
  stops: number
  scheduleStart: string
  scheduleEnd: string
  frequency: string
  assignedBus: string
  status: "Active" | "Inactive"
  scheduleDate: string
  validFrom: string
  validTo: string
}

interface RouteTableProps {
  routes: RouteData[]
  onView?: (routeId: string) => void
  onDelete?: (routeId: string) => void
}

export function RouteTable({ routes, onView, onDelete }: RouteTableProps) {
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewRoute = (route: RouteData) => {
    setSelectedRoute(route)
    setIsModalOpen(true)
    onView?.(route.id)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedRoute(null)
  }
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Route Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Start/End Points</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Schedule Time</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Schedule Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Assigned Bus</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-gray-400 text-lg">📅</div>
                  <p className="text-gray-500 font-medium">No schedules found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria or date filter</p>
                </div>
              </td>
            </tr>
          ) : (
            routes.map((route) => (
              <tr key={route.id} className="transition-colors hover:bg-gray-50">
                <td className="p-4 align-middle font-medium text-gray-900">{route.routeName}</td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{route.startPoint}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{route.endPoint}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{route.stops} stops</div>
                </td>
                <td className="p-4 align-middle">
                  <div>
                    <div className="font-medium text-gray-900">
                      {route.scheduleStart} - {route.scheduleEnd}
                    </div>
                    <div className="text-sm text-gray-500">{route.frequency}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="text-gray-900">
                    {new Date(route.scheduleDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
                <td className="p-4 align-middle text-gray-900">{route.assignedBus}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      route.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {route.status}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleViewRoute(route)}
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Route Details Modal */}
      {isModalOpen && selectedRoute && (
        <div className="fixed inset-0 bg-[#000000b8] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Route Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRoute.routeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      selectedRoute.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedRoute.status}
                  </span>
                </div>
              </div>

              {/* Route Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mx-auto mb-1"></div>
                    <p className="text-sm font-medium text-gray-900">{selectedRoute.startPoint}</p>
                    <p className="text-xs text-gray-500">Start Point</p>
                  </div>
                  <div className="flex-1">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                    <p className="text-center text-sm text-gray-600 mt-1">{selectedRoute.stops} stops</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full mx-auto mb-1"></div>
                    <p className="text-sm font-medium text-gray-900">{selectedRoute.endPoint}</p>
                    <p className="text-xs text-gray-500">End Point</p>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
                  <p className="text-lg text-gray-900">{selectedRoute.scheduleStart} - {selectedRoute.scheduleEnd}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <p className="text-lg text-gray-900">{selectedRoute.frequency}</p>
                </div>
              </div>

              {/* Schedule Date Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
                  <p className="text-lg text-gray-900">
                    {new Date(selectedRoute.scheduleDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Validity</label>
                  <p className="text-sm text-gray-600">
                    From: {new Date(selectedRoute.validFrom).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    To: {new Date(selectedRoute.validTo).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Bus Assignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Bus</label>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-semibold text-blue-900">{selectedRoute.assignedBus}</p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Route ID:</span>
                    <span className="ml-2 text-gray-600">{selectedRoute.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Total Stops:</span>
                    <span className="ml-2 text-gray-600">{selectedRoute.stops}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Created Date:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(selectedRoute.scheduleDate).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Validity Period:</span>
                    <span className="ml-2 text-gray-600">
                      {Math.ceil((new Date(selectedRoute.validTo).getTime() - new Date(selectedRoute.validFrom).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
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
