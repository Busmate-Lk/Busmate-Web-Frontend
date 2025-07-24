import { Settings, AlertCircle } from "lucide-react"

interface TechnicalSpecsFormProps {
  formData: {
    chassisNo: string
    engineNo: string
    fuelType: string
  }
  onInputChange: (field: string, value: string) => void
  errors: Record<string, string>
  showValidation: boolean
}

export default function TechnicalSpecsForm({ 
  formData, 
  onInputChange, 
  errors, 
  showValidation 
}: TechnicalSpecsFormProps) {
  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
    const hasError = showValidation && errors[fieldName]
    
    if (hasError) {
      return `${baseClass} border-red-300 focus:ring-red-500 focus:border-red-500`
    }
    return `${baseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`
  }

  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!showValidation || !errors[fieldName]) return null
    
    return (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span className="text-sm text-red-600">{errors[fieldName]}</span>
      </div>
    )
  }

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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chassis Number *
            </label>
            <input
              name="chassisNo"
              className={getInputClassName("chassisNo")}
              placeholder="e.g., CH789456123"
              value={formData.chassisNo}
              onChange={(e) => onInputChange("chassisNo", e.target.value)}
              required
            />
            <ErrorMessage fieldName="chassisNo" />
            <p className="text-xs text-gray-500 mt-1">Format: XX123456789 (2 letters + 9 digits)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Number *
            </label>
            <input
              name="engineNo"
              className={getInputClassName("engineNo")}
              placeholder="e.g., EN987654321"
              value={formData.engineNo}
              onChange={(e) => onInputChange("engineNo", e.target.value)}
              required
            />
            <ErrorMessage fieldName="engineNo" />
            <p className="text-xs text-gray-500 mt-1">Format: XX123456789 (2 letters + 9 digits)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type *
            </label>
            <select
              name="fuelType"
              className={getInputClassName("fuelType")}
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
            <ErrorMessage fieldName="fuelType" />
          </div>
        </div>

        {/* Help Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Technical Specifications Guidelines:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Chassis and Engine numbers must be unique and follow the specified format</li>
            <li>• These numbers are typically found on the vehicle registration documents</li>
            <li>• Contact the manufacturer or dealer if you need help locating these numbers</li>
            <li>• Fuel type determines maintenance schedules and operational costs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}