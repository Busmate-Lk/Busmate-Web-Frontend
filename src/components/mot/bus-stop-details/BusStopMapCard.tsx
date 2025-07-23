import { MapPin, Search, Navigation } from "lucide-react"
import type { BusStop } from "@/app/mot/(authenticated)/bus-stops/page"

export default function BusStopMapCard({ busStop }: { busStop: BusStop }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Location Map</h3>
        <button className="p-2 rounded hover:bg-gray-100">
          <MapPin className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-gray-100 rounded-lg h-80 flex flex-col items-center justify-center relative overflow-hidden mb-4">
        <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
          <MapPin className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-1">{busStop.name}</h4>
        <p className="text-gray-600 text-sm mb-2">
          {busStop.latitude}° N, {busStop.longitude}° E
        </p>
        <p className="text-gray-500 text-xs">Interactive map view</p>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 border px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-center">
          <Search className="w-4 h-4 mr-2" />
          View Nearby Stops
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center">
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  )
}