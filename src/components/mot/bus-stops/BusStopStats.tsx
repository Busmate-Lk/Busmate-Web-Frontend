import { Bus, CheckCircle, AlertTriangle, MapPin } from "lucide-react"
import { StopResponse } from "@/lib/api-client/route-management"
import { useMemo } from "react"

export default function BusStopStats({ busStops }: { busStops: StopResponse[] }) {
  const stats = useMemo(() => {
    const totalStops = busStops?.length || 0
    const accessibleStops = busStops?.filter(stop => stop.isAccessible)?.length || 0
    const nonAccessibleStops = totalStops - accessibleStops
    const uniqueStates = new Set(busStops?.map(stop => stop.location?.state).filter(Boolean)).size
    const uniqueCities = new Set(busStops?.map(stop => stop.location?.city).filter(Boolean)).size

    return {
      totalStops,
      accessibleStops,
      nonAccessibleStops,
      uniqueStates,
      uniqueCities,
      accessibilityPercentage: totalStops > 0 ? ((accessibleStops / totalStops) * 100).toFixed(1) : "0"
    }
  }, [busStops])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="border-l-4 border-blue-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Bus Stops</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalStops}</p>
            <p className="text-sm text-blue-600 mt-1">{stats.uniqueCities} cities covered</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Bus className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-green-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Accessible Stops</p>
            <p className="text-3xl font-bold text-gray-900">{stats.accessibleStops}</p>
            <p className="text-sm text-green-600 mt-1">{stats.accessibilityPercentage}% of total</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-yellow-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Non-Accessible</p>
            <p className="text-3xl font-bold text-gray-900">{stats.nonAccessibleStops}</p>
            <p className="text-sm text-yellow-600 mt-1">Need improvements</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-purple-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">States Covered</p>
            <p className="text-3xl font-bold text-gray-900">{stats.uniqueStates}</p>
            <p className="text-sm text-purple-600 mt-1">{stats.uniqueCities} cities</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  )
}