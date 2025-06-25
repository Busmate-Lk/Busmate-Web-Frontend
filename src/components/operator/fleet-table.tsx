"use client"

import { Edit, Trash2 } from "lucide-react"

interface FleetBus {
  id: string
  busId: string
  registration: string
  type: "Luxury" | "Semi-Luxury" | "Standard"
  seatingCapacity: number
  status: boolean
}

interface FleetTableProps {
  fleet: FleetBus[]
  currentPage: number
  totalResults: number
  onPageChange: (page: number) => void
  onStatusToggle: (busId: string) => void
  onEdit?: (busId: string) => void
  onDelete?: (busId: string) => void
}

export function FleetTable({
  fleet,
  currentPage,
  totalResults,
  onPageChange,
  onStatusToggle,
  onEdit,
  onDelete,
}: FleetTableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Luxury":
        return "bg-blue-100 text-blue-800"
      case "Semi-Luxury":
        return "bg-purple-100 text-purple-800"
      case "Standard":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-gray-50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Bus ID / Registration</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Type</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Seating Capacity</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {fleet.map((bus) => (
              <tr key={bus.id} className="border-b transition-colors hover:bg-gray-50">
                <td className="p-4 align-middle">
                  <div>
                    <div className="font-medium text-gray-900">{bus.busId}</div>
                    <div className="text-sm text-gray-500">{bus.registration}</div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(bus.type)}`}
                  >
                    {bus.type}
                  </span>
                </td>
                <td className="p-4 align-middle text-gray-900">{bus.seatingCapacity}</td>
                <td className="p-4 align-middle">
                  <button
                    onClick={() => onStatusToggle(bus.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      bus.status ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        bus.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => onEdit?.(bus.id)}
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => onDelete?.(bus.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing 1 to {Math.min(10, totalResults)} of {totalResults} results
        </div>
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
    </div>
  )
}
