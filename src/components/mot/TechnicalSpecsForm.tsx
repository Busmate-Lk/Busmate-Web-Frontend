import { Settings } from "lucide-react"

interface TechnicalSpecsFormProps {
  formData: {
    chassisNo: string
    engineNo: string
    fuelType: string
  }
  onInputChange: (field: string, value: string) => void
}

export default function TechnicalSpecsForm({ formData, onInputChange }: TechnicalSpecsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Technical Specifications
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number *</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., CH789456123"
              value={formData.chassisNo}
              onChange={(e) => onInputChange("chassisNo", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number *</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., EN987654321"
              value={formData.engineNo}
              onChange={(e) => onInputChange("engineNo", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.fuelType}
            onChange={(e) => onInputChange("fuelType", e.target.value)}
            required
          >
            <option value="">Select fuel type</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG (Compressed Natural Gas)</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  )
}