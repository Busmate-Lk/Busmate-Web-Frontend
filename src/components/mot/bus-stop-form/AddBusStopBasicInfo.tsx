import { FileText } from "lucide-react"

export default function AddBusStopBasicInfo({ formData, handleInputChange }: {
  formData: any,
  handleInputChange: (field: string, value: string) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-lg text-gray-900">Basic Information</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bus Stop Name *</label>
          <input
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="e.g., Fort Railway Station"
            value={formData.stopName}
            onChange={(e) => handleInputChange("stopName", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stop Code *</label>
          <input
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="e.g., BS001"
            value={formData.stopCode}
            onChange={(e) => handleInputChange("stopCode", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stop Type *</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-600"
            value={formData.stopType}
            onChange={(e) => handleInputChange("stopType", e.target.value)}
            required
          >
            <option value="">Select stop type</option>
            <option value="Regular">Regular Stop</option>
            <option value="Terminal">Bus Terminal</option>
            <option value="Junction">Junction Stop</option>
            <option value="Express">Express Stop</option>
            <option value="Interchange">Interchange</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <select
            className="w-full border border-gray-400 rounded px-3 py-2 text-gray-600"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            required
          >
            <option value="Active">Active</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Maintenance">Under Maintenance</option>
            <option value="Temporarily Closed">Temporarily Closed</option>
          </select>
        </div>
      </div>
    </div>
  )
}