import { Settings } from "lucide-react"

export default function AddBusStopFacilities({ facilities, handleFacilityChange }: {
  facilities: any,
  handleFacilityChange: (facility: string, checked: boolean) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-lg text-gray-900">Available Facilities</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(facilities).map(([facility, checked]) => (
          <label key={facility} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(checked)}
              onChange={e => handleFacilityChange(facility, e.target.checked)}
              className="accent-blue-600 w-4 h-4 rounded "
            />
            <span className="text-sm capitalize text-gray-700">{facility.replace(/([A-Z])/g, " $1").trim()}</span>
          </label>
        ))}
      </div>
    </div>
  )
}