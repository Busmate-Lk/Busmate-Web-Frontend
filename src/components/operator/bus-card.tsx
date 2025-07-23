import { Bus, Navigation, User, Phone, MapPin, Eye } from "lucide-react"

interface BusCardProps {
  busNumber: string
  busName: string
  route: string
  driver: string
  conductor: string
  conductorPhone: string
  status: "Active" | "Maintenance" | "Inactive"
}

export function BusCard({ busNumber, busName, route, driver, conductor, conductorPhone, status }: BusCardProps) {
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{busNumber}</h3>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(status)}`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(status)}`} />
            {status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Bus className="w-4 h-4" />
            <span className="text-sm font-medium">{busName}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Navigation className="w-4 h-4" />
            <span className="text-sm">{route}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-sm">Driver: {driver}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="text-sm">Conductor: {conductor}</span>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span className="text-xs text-gray-500">{conductorPhone}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button className="flex-1 inline-flex items-center justify-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-700 transition-colors">
              View Details
            </button>
            <button className="flex-1 inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
              Track Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
