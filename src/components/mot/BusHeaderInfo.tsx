import { Settings } from "lucide-react"

interface Bus {
  id: string
  busNumber: string
  busType: string
  operator: string
  operatorType: string
  status: string
}

interface BusHeaderInfoProps {
  bus: Bus
}

export default function BusHeaderInfo({ bus }: BusHeaderInfoProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Bus No</p>
              <p className="font-semibold text-gray-900">{bus.busNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">T</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Bus Type</p>
              <p className="font-semibold text-gray-900">{bus.busType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">O</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Operator</p>
              <p className="font-semibold text-gray-900">{bus.operator}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">T</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">Operator Type</p>
              <div>{getOperatorTypeBadge(bus.operatorType)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <div>{getStatusBadge(bus.status)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}