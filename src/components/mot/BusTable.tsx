import { Eye, Edit, Trash2, Power } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Bus } from "@/app/mot/(authenticated)/bus-infomation/page"

export default function BusTable({
  buses,
  onView,
  onEdit,
  onDelete,
  onDeactivate,
}: {
  buses: Bus[]
  onView: (bus: Bus) => void
  onEdit: (bus: Bus) => void
  onDelete: (bus: Bus) => void
  onDeactivate: (bus: Bus) => void
}) {
  const router = useRouter();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )
      case "Maintenance":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Maintenance
          </span>
        )
      case "Inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
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

  const getOperatorTypeBadge = (type: string) => {
    switch (type) {
      case "SLTB":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            SLTB
          </span>
        )
      case "Private":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Private
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
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Bus Fleet Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seating Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr key={bus.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{bus.busNumber}</td>
                <td className="px-6 py-4 text-gray-600">{bus.busType}</td>
                <td className="px-6 py-4 text-gray-600">{bus.operator}</td>
                <td className="px-6 py-4">{getOperatorTypeBadge(bus.operatorType)}</td>
                <td className="px-6 py-4 text-gray-600">{bus.seatingCapacity}</td>
                <td className="px-6 py-4">{getStatusBadge(bus.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {/* View Button */}
                    <button 
                      onClick={() => onView(bus)} 
                      className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {/* Edit Button */}
                    <button 
                      onClick={() => onEdit(bus)} 
                      className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                      title="Edit bus"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    {/* Deactivate Button - Only show for Active buses */}
                    {bus.status === "Active" && (
                      <button 
                        onClick={() => onDeactivate(bus)} 
                        className="p-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors"
                        title="Deactivate bus"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => onDelete(bus)} 
                      className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      title="Delete bus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {buses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No buses found matching your criteria.</p>
        </div>
      )}
      
        </div>
     
  )
}
