import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface FareStructure {
  id: string
  status: string
  perKmRate: number
}

interface FareStatisticsProps {
  fareStructures: FareStructure[]
}

export default function FareStatistics({ fareStructures }: FareStatisticsProps) {
  const activeFares = fareStructures.filter((f) => f.status === "Active").length
  const expiredFares = fareStructures.filter((f) => f.status === "Expired").length
  const averageFare = fareStructures.length > 0
    ? fareStructures.reduce((sum, f) => sum + f.perKmRate, 0) / fareStructures.length
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fare Structures</p>
              <p className="text-3xl font-bold text-gray-900">{fareStructures.length}</p>
              <p className="text-sm text-blue-600 mt-1">All routes covered</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Fares</p>
              <p className="text-3xl font-bold text-gray-900">{activeFares}</p>
              <p className="text-sm text-green-600 mt-1">Currently in effect</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-red-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired Fares</p>
              <p className="text-3xl font-bold text-gray-900">{expiredFares}</p>
              <p className="text-sm text-red-600 mt-1">No longer valid</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rate</p>
              <p className="text-3xl font-bold text-gray-900">Rs. {averageFare.toFixed(4)}</p>
              <p className="text-sm text-purple-600 mt-1">Per kilometer</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}