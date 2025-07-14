import { Edit } from "lucide-react"
import type { BusStop } from "@/app/mot/bus-stops/page"

export default function BusStopInfoCard({ busStop, onEdit }: { busStop: BusStop, onEdit: (busStop: BusStop) => void }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b">Stop Information</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Stop ID</span>
          <span className="font-semibold text-gray-900">{busStop.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Stop Name</span>
          <span className="font-semibold text-gray-900">{busStop.name}</span>
        </div>
        <div>
          <h4 className="text-gray-600 mb-3">Coordinates</h4>
          <div className="space-y-2 ml-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Latitude:</span>
              <span className="text-gray-900">{busStop.latitude}° N</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Longitude:</span>
              <span className="text-gray-900">{busStop.longitude}° E</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-gray-600 mb-3">Location</h4>
          <div className="space-y-2 ml-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Region:</span>
              <span className="text-gray-900">{busStop.province} Province</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">City:</span>
              <span className="text-gray-900">{busStop.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Zone:</span>
              <span className="text-gray-900">Colombo 03</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 font-medium">{busStop.status}</span>
          </div>
        </div>
        <div>
          <h4 className="text-gray-600 mb-4">Linked Routes</h4>
          <div className="space-y-3">
            {(busStop.routes ?? []).map((route: string, idx: number) => (
              <div key={route} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">{route}</div>
                  <span className="text-gray-900">Route {route}</span>
                </div>
                <button className="p-2 rounded hover:bg-blue-100">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}