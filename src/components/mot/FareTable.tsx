import { Eye, Edit, Trash2, Power } from "lucide-react"

interface FareStructure {
  id: string
  busType: string
  facilityType: string
  baseFare: number
  perKmRate: number
  effectiveFrom: string
  status: string
  route?: string
  operator?: string
}

interface FareTableProps {
  fares: FareStructure[]
  onView: (fare: FareStructure) => void
  onEdit: (fare: FareStructure) => void
  onDelete?: (fare: FareStructure) => void
  onDeactivate?: (fare: FareStructure) => void // Add this line
}

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}/${month}/${year}` // DD/MM/YYYY format
}

export default function FareTable({ 
  fares, 
  onView, 
  onEdit, 
  onDelete, 
  onDeactivate 
}: FareTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )
      case "Inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )
      case "Expired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Expired
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  const getBusTypeBadge = (type: string) => {
    switch (type) {
      case "AC":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            AC
          </span>
        )
      case "Non-AC":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Non-AC
          </span>
        )
      case "Semi-Luxury":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Semi-Luxury
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {type}
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Fare Structures Directory</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Fare (Rs.)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per KM Rate (Rs.)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fares.map((fare) => (
              <tr key={fare.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fare.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{fare.route}</p>
                    <p className="text-sm text-gray-500">{fare.operator}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getBusTypeBadge(fare.busType)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {fare.baseFare.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {fare.perKmRate.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(fare.effectiveFrom)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(fare.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onView(fare)} 
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(fare)} 
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      title="Edit fare"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {/* Show deactivate button only for active fares */}
                    {onDeactivate && fare.status === "Active" && (
                      <button 
                        onClick={() => onDeactivate(fare)}
                        className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
                        title="Deactivate fare"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Show delete button for all fares */}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(fare)}
                        className="text-red-600 hover:text-red-700 transition-colors duration-200"
                        title="Delete fare permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {fares.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Eye className="w-12 h-12 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No fare structures found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or add a new fare structure.</p>
        </div>
      )}

      {/* Pagination */}
      {fares.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {fares.length} result{fares.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors duration-200">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}