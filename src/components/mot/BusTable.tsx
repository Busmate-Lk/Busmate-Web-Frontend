import { Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Bus } from "@/app/mot/bus-infomation/page"

export default function BusTable({
  buses,
  onView,
  onEdit,
}: {
  buses: Bus[]
  onView: (bus: Bus) => void
  onEdit: (bus: Bus) => void
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
              <tr key={bus.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{bus.busNumber}</td>
                <td className="px-6 py-4">{bus.busType}</td>
                <td className="px-6 py-4">{bus.operator}</td>
                <td className="px-6 py-4">{getOperatorTypeBadge(bus.operatorType)}</td>
                <td className="px-6 py-4">{bus.seatingCapacity}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    bus.status === 'Active' ? 'bg-green-100 text-green-800' :
                    bus.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bus.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => router.push(`/mot/bus-information-details?id=${bus.id}`)} className="text-gray-600 hover:text-gray-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => router.push(`/mot/bus-information-form?id=${bus.id}`)} className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {buses.length} results
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
          <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  )
}
