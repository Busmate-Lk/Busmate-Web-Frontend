import { Bus, Users, Navigation, User } from "lucide-react"

interface BusCardProps {
  busNumber: string
  model: string
  capacity: number
  route: string
  driver: string
  status: "Active" | "Maintenance" | "Inactive"
}

export function BusCard({ busNumber, model, capacity, route, driver, status }: BusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Maintenance":
        return "bg-red-500"
      case "Inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{busNumber}</h3>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(status)}`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(status)}`} />
            {status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Bus className="w-4 h-4" />
            <span className="text-sm">{model}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Capacity: {capacity}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Navigation className="w-4 h-4" />
            <span className="text-sm">{route}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span className="text-sm">{driver}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
