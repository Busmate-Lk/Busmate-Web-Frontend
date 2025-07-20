import { Bus, CheckCircle, AlertTriangle, MapPin } from "lucide-react"
import { BusStop } from "@/app/mot/(authenticated)/bus-stops/page"

export default function BusStopStats({ busStops }: { busStops: BusStop[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="border-l-4 border-blue-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Bus Stops</p>
            <p className="text-3xl font-bold text-gray-900">{busStops.length}</p>
            <p className="text-sm text-green-600 mt-1">+3% from last month</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Bus className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-green-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Stops</p>
            <p className="text-3xl font-bold text-gray-900">
              {busStops.filter(b => b.status === "Active").length}
            </p>
            <p className="text-sm text-green-600 mt-1">+5% from last month</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-yellow-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Under Maintenance</p>
            <p className="text-3xl font-bold text-gray-900">
              {busStops.filter(b => b.status === "Maintenance").length}
            </p>
            <p className="text-sm text-yellow-600 mt-1">-2% from last month</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
      <div className="border-l-4 border-purple-500 bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Provinces Covered</p>
            <p className="text-3xl font-bold text-gray-900">
              {Array.from(new Set(busStops.map(b => b.province))).length}
            </p>
            <p className="text-sm text-purple-600 mt-1">All provinces</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  )
}