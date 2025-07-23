"use client"

import { Eye } from "lucide-react"
import { useState } from "react"

interface FleetBus {
  id: string
  busId: string
  busName: string
  registration: string
  type: "Luxury" | "Semi-Luxury" | "Standard" | "Expressway"
  routeName: string
  permitExpiryDate: string
  insuranceExpiryDate: string
}

interface FleetTableProps {
  fleet: FleetBus[]
  currentPage: number
  totalResults: number
  onPageChange: (page: number) => void
}

export function FleetTable({
  fleet,
  currentPage,
  totalResults,
  onPageChange,
}: FleetTableProps) {
  const [selectedBus, setSelectedBus] = useState<FleetBus | null>(null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Luxury":
        return "bg-blue-100 text-blue-800"
      case "Semi-Luxury":
        return "bg-purple-100 text-purple-800"
      case "Standard":
        return "bg-gray-100 text-gray-800"
      case "Expressway":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  const getExpiryColor = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) {
      return "text-gray-900" // Expired - keep black
    } else if (daysUntilExpiry <= 30) {
      return "text-gray-900" // Expiring soon - keep black
    } else {
      return "text-gray-900" // Valid - keep black
    }
  }

  const itemsPerPage = 10
  const totalPages = Math.ceil(totalResults / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults)

  return (
    <div>
      {/* Modal */}
      {selectedBus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Bus Details</h3>
            <div className="space-y-2">
              <p><strong>Bus ID:</strong> {selectedBus.busId}</p>
              <p><strong>Bus Name:</strong> {selectedBus.busName}</p>
              <p><strong>Registration:</strong> {selectedBus.registration}</p>
              <p><strong>Type:</strong> {selectedBus.type}</p>
              <p><strong>Route Name:</strong> {selectedBus.routeName}</p>
              <p><strong>Permit Expiry Date:</strong> 
                <span className="text-gray-900">
                  {formatDate(selectedBus.permitExpiryDate)}
                  {isExpired(selectedBus.permitExpiryDate) && <span className="text-red-500"> (Expired)</span>}
                </span>
              </p>
              <p><strong>Insurance Expiry Date:</strong> 
                <span className="text-gray-900">
                  {formatDate(selectedBus.insuranceExpiryDate)}
                  {isExpired(selectedBus.insuranceExpiryDate) && <span className="text-red-500"> (Expired)</span>}
                </span>
              </p>
            </div>
            <button
              onClick={() => setSelectedBus(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Bus Info</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Bus Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Route</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Permit Expiry</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Insurance Expiry</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((bus) => (
              <tr key={bus.id} className="transition-colors hover:bg-gray-50">
                <td className="p-4 align-middle">
                  <div>
                    <div className="font-medium text-gray-900">{bus.busId}</div>
                    <div className="text-sm text-gray-500">{bus.registration}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="font-medium text-gray-900">{bus.busName}</div>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(bus.type)}`}
                  >
                    {bus.type}
                  </span>
                </td>
                <td className="p-4 align-middle text-gray-900">{bus.routeName}</td>
                <td className="p-4 align-middle">
                  <div className={`text-sm ${getExpiryColor(bus.permitExpiryDate)}`}>
                    {formatDate(bus.permitExpiryDate)}
                    {isExpired(bus.permitExpiryDate) && <span className="block text-xs text-red-500">Expired</span>}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className={`text-sm ${getExpiryColor(bus.insuranceExpiryDate)}`}>
                    {formatDate(bus.insuranceExpiryDate)}
                    {isExpired(bus.insuranceExpiryDate) && <span className="block text-xs text-red-500">Expired</span>}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => setSelectedBus(bus)}
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startIndex}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalResults}</span> results
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + Math.max(1, currentPage - 2)
            if (pageNum > totalPages) return null
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 text-sm border rounded-md ${
                  pageNum === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
