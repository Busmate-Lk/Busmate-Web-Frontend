import { MapPin } from "lucide-react"

interface LocationAssignmentFormProps {
  formData: {
    regionAssigned: string
    depotName: string
    primaryRoute: string
    secondaryRoute: string
  }
  onInputChange: (field: string, value: string) => void
}

export default function LocationAssignmentForm({ formData, onInputChange }: LocationAssignmentFormProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Location & Assignment
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region Assigned *</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.regionAssigned}
              onChange={(e) => onInputChange("regionAssigned", e.target.value)}
              required
            >
              <option value="">Select region</option>
              <option value="Western Province">Western Province</option>
              <option value="Central Province">Central Province</option>
              <option value="Southern Province">Southern Province</option>
              <option value="Northern Province">Northern Province</option>
              <option value="Eastern Province">Eastern Province</option>
              <option value="North Western Province">North Western Province</option>
              <option value="North Central Province">North Central Province</option>
              <option value="Uva Province">Uva Province</option>
              <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Depot Name *</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Colombo Central Depot"
              value={formData.depotName}
              onChange={(e) => onInputChange("depotName", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Route</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Colombo - Kandy"
              value={formData.primaryRoute}
              onChange={(e) => onInputChange("primaryRoute", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Route</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Kandy - Nuwara Eliya"
              value={formData.secondaryRoute}
              onChange={(e) => onInputChange("secondaryRoute", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}