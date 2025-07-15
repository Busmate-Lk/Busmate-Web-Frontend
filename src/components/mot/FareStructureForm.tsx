interface FormData {
  busType: string
  facilityType: string
  route: string
  operator: string
  operatorType: string
  province: string
  baseFare: string
  perKmRate: string
  effectiveFrom: string
  validUntil: string
  description: string
  testDistance: string
  [key: string]: string
}

interface FareStructureFormProps {
  formData: FormData
  onInputChange: (field: string, value: string) => void
}

export default function FareStructureForm({ formData, onInputChange }: FareStructureFormProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-purple-500">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">
            3
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Fare Structure</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Base Fare */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Fare (Rs.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.baseFare}
              onChange={(e) => onInputChange("baseFare", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter base fare amount"
              min="0"
              step="0.01"
            />
          </div>

          {/* Per KM Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Per KM Rate (Rs.) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.perKmRate}
              onChange={(e) => onInputChange("perKmRate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter per kilometer rate"
              min="0"
              step="0.01"
            />
          </div>

          {/* Effective From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective From <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.effectiveFrom}
              onChange={(e) => onInputChange("effectiveFrom", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Valid Until */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valid Until
            </label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) => onInputChange("validUntil", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description/Notes
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter any additional notes or descriptions about this fare structure..."
          />
        </div>
      </div>
    </div>
  )
}