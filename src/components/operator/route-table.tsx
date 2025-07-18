"use client"

import { Edit, Trash2, ArrowRight } from "lucide-react"

interface RouteData {
  id: string
  routeName: string
  startPoint: string
  endPoint: string
  stops: number
  scheduleStart: string
  scheduleEnd: string
  frequency: string
  assignedBus: string
  status: "Active" | "Inactive"
}

interface RouteTableProps {
  routes: RouteData[]
  onEdit?: (routeId: string) => void
  onDelete?: (routeId: string) => void
}

export function RouteTable({ routes, onEdit, onDelete }: RouteTableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-gray-50">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Route Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Start/End Points</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Schedule Time</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Assigned Bus</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Status</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {routes.map((route) => (
            <tr key={route.id} className="border-b transition-colors hover:bg-gray-50">
              <td className="p-4 align-middle font-medium text-gray-500">{route.routeName}</td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{route.startPoint}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">{route.endPoint}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{route.stops} stops</div>
              </td>
              <td className="p-4 align-middle">
                <div>
                  <div className="font-medium text-gray-500">
                    {route.scheduleStart} - {route.scheduleEnd}
                  </div>
                  <div className="text-sm text-gray-500">{route.frequency}</div>
                </div>
              </td>
              <td className="p-4 align-middle text-gray-500">{route.assignedBus}</td>
              <td className="p-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    route.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {route.status}
                </span>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <button
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => onEdit?.(route.id)}
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => onDelete?.(route.id)}
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
  )
}
