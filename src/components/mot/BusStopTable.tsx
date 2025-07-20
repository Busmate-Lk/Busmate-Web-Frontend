import { Eye, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { BusStop } from "@/app/mot/(authenticated)/bus-stops/page"

function getStatusBadge(status: string) {
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
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {status}
        </span>
      )
  }
}

export default function BusStopTable({ busStops }: { busStops: BusStop[] }) {
  const router = useRouter()
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">Bus Stops Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stop ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stop Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location (Lat/Lng)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City/Province</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {busStops.map((stop) => (
              <tr key={stop.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{stop.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{stop.name}</td>
                <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                  {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{stop.city} / {stop.province}</td>
                <td className="px-6 py-4">{getStatusBadge(stop.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push(`/mot/bus-stop-details?id=${stop.id}`)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/mot/bus-stop-form?id=${stop.id}`)}
                      className="text-gray-600 hover:text-gray-900"
                    >
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
          Showing {busStops.length} results
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