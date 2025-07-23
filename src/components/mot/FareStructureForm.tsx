import { AlertCircle } from "lucide-react"

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
  validationErrors?: { [key: string]: string }
  showValidation?: boolean
}

export default function FareStructureForm({ 
  formData, 
  onInputChange,
  validationErrors = {},
  showValidation = false
}: FareStructureFormProps) {
  
  const getFieldError = (field: string) => {
    return showValidation ? validationErrors[field] : ''
  }

  const getFieldClasses = (field: string) => {
    const hasError = showValidation && validationErrors[field]
    return `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
    }`
  }

  // Enhanced input handler with validation
  const handleNumberInput = (field: string, value: string) => {
    // Allow empty input for user experience
    if (value === '') {
      onInputChange(field, value)
      return
    }

    // Convert to number and validate
    const numValue = parseFloat(value)
    
    // Prevent negative values
    if (numValue < 0) {
      return // Don't update if negative
    }

    // Allow the input but validation will catch minimum values
    onInputChange(field, value)
  }

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
          <div data-field="baseFare">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base Fare (Rs.) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.baseFare}
                onChange={(e) => handleNumberInput("baseFare", e.target.value)}
                className={getFieldClasses('baseFare')}
                placeholder="Enter base fare (minimum Rs. 30)"
                min="30"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-sm">Rs.</span>
              </div>
            </div>
            {getFieldError('baseFare') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('baseFare')}
              </div>
            )}
            <div className="mt-1 text-xs text-gray-500">
              Minimum base fare: Rs. 30.00
            </div>
          </div>

          {/* Per KM Rate */}
          <div data-field="perKmRate">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Per KM Rate (Rs.) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.perKmRate}
                onChange={(e) => handleNumberInput("perKmRate", e.target.value)}
                className={getFieldClasses('perKmRate')}
                placeholder="Enter per kilometer rate "
                min="0.01"
                step="0.01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-sm">Rs./km</span>
              </div>
            </div>
            {getFieldError('perKmRate') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('perKmRate')}
              </div>
            )}
            <div className="mt-1 text-xs text-gray-500">
              Minimum rate: Rs. 0.50 per kilometer
            </div>
          </div>

          {/* Effective From */}
          <div data-field="effectiveFrom">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Effective From <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.effectiveFrom}
              onChange={(e) => onInputChange("effectiveFrom", e.target.value)}
              className={getFieldClasses('effectiveFrom')}
            />
            {getFieldError('effectiveFrom') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('effectiveFrom')}
              </div>
            )}
          </div>

          {/* Valid Until */}
          <div data-field="validUntil">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valid Until
            </label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) => onInputChange("validUntil", e.target.value)}
              className={getFieldClasses('validUntil')}
            />
            {getFieldError('validUntil') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('validUntil')}
              </div>
            )}
          </div>
        </div>

        {/* Minimum Value Warning */}
        {(parseFloat(formData.baseFare) < 30 && formData.baseFare !== "") && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Warning:</span>
              Base fare must be at least Rs. 30.00 according to ministry guidelines.
            </div>
          </div>
        )}

        {/* Zero Value Warning */}
        {(formData.baseFare === "0" || formData.perKmRate === "0") && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Warning:</span>
              Base fare and per KM rate cannot be zero. Please enter valid amounts.
            </div>
          </div>
        )}

        {/* Fare Structure Business Logic Error */}
        {showValidation && validationErrors.fareStructure && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.fareStructure}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description/Notes
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter any additional notes or descriptions about this fare structure..."
          />
        </div>
      </div>
    </div>
  )
}