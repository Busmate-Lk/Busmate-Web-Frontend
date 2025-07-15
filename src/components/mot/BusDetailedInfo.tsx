import { Settings, Calendar, MapPin, Users, Fuel } from "lucide-react"

interface Bus {
  chassisNo: string
  engineNo: string
  fuelType: string
  regionAssigned: string
  depotName: string
  seatingCapacity: number
  standingCapacity?: number
  registrationDate: string
  lastInspectionDate: string
  nextMaintenanceDate: string
}

interface BusDetailedInfoProps {
  bus: Bus
}

export default function BusDetailedInfo({ bus }: BusDetailedInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Information</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Chassis No.</p>
              <p className="font-medium">{bus.chassisNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Registration Date</p>
              <p className="font-medium">{new Date(bus.registrationDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Engine No.</p>
              <p className="font-medium">{bus.engineNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Region Assigned</p>
              <p className="font-medium">{bus.regionAssigned}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Seating Capacity</p>
              <p className="font-medium">{bus.seatingCapacity} Passengers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Depot Name</p>
              <p className="font-medium">{bus.depotName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Standing Capacity</p>
              <p className="font-medium">{bus.standingCapacity || 0} Passengers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Last Inspection</p>
              <p className="font-medium">{new Date(bus.lastInspectionDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Fuel className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Fuel Type</p>
              <p className="font-medium">{bus.fuelType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Next Maintenance</p>
              <p className="font-medium">{new Date(bus.nextMaintenanceDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}