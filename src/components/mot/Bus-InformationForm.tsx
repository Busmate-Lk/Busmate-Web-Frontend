import { FileText } from "lucide-react"

interface BasicInformationFormProps {
  formData: {
    busNumber: string
    busType: string
    operator: string
    operatorType: string
    seatingCapacity: string
    standingCapacity: string
  }
  onInputChange: (field: string, value: string) => void
}

export default function BasicInformationForm({ formData, onInputChange }: BasicInformationFormProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Basic Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bus Number *</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., NB-1234"
              value={formData.busNumber}
              onChange={(e) => onInputChange("busNumber", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type *</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.busType}
              onChange={(e) => onInputChange("busType", e.target.value)}
              required
            >
              <option value="">Select bus type</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Luxury">Luxury</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operator Name *</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Ceylon Transport Board"
              value={formData.operator}
              onChange={(e) => onInputChange("operator", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operator Type *</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.operatorType}
              onChange={(e) => onInputChange("operatorType", e.target.value)}
              required
            >
              <option value="">Select operator type</option>
              <option value="SLTB">SLTB (Sri Lanka Transport Board)</option>
              <option value="Private">Private Operator</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity *</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 45"
              value={formData.seatingCapacity}
              onChange={(e) => onInputChange("seatingCapacity", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Standing Capacity</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 15"
              value={formData.standingCapacity}
              onChange={(e) => onInputChange("standingCapacity", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}