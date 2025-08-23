import { Calendar, AlertCircle } from "lucide-react"

interface ImportantDatesFormProps {
  formData: {
    registrationDate: string
    permitValidFrom: string
    permitValidTo: string
    // Add any other fields that might be passed from the parent
    [key: string]: any
  }
  onInputChange: (field: string, value: string) => void
  errors: Record<string, string>
  showValidation: boolean
}

export default function ImportantDatesForm({
  formData,
  onInputChange,
  errors,
  showValidation
}: ImportantDatesFormProps) {
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

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  // Helper function to get min date (1990-01-01 to match validation)
  const getMinDate = () => {
    return '1990-01-01'
  }

  // Helper function to get max future date (1 years from now for permit validity)
  const getMaxFutureDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    return date.toISOString().split('T')[0]
  }

  // Debug: Log the form data to check what's being passed
  console.log('ImportantDatesForm - formData:', formData)

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Important Dates
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Date *
            </label>
            <input
              name="registrationDate"
              type="date"
              className={getInputClassName("registrationDate")}
              value={formData.registrationDate || ''}
              onChange={(e) => onInputChange("registrationDate", e.target.value)}
              min={getMinDate()}
              max={getTodayDate()}
              required
            />
            <ErrorMessage fieldName="registrationDate" />
            <p className="text-xs text-gray-500 mt-1">Date when bus was first registered</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permit Valid From *
            </label>
            <input
              name="permitValidFrom"
              type="date"
              className={getInputClassName("permitValidFrom")}
              value={formData.permitValidFrom || ''}
              onChange={(e) => onInputChange("permitValidFrom", e.target.value)}
              min={getMinDate()}
              max={getMaxFutureDate()}
              required
            />
            <ErrorMessage fieldName="permitValidFrom" />
            <p className="text-xs text-gray-500 mt-1">Start date of permit validity</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permit Valid To *
            </label>
            <input
              name="permitValidTo"
              type="date"
              className={getInputClassName("permitValidTo")}
              value={formData.permitValidTo || ''}
              onChange={(e) => onInputChange("permitValidTo", e.target.value)}
              min={formData.permitValidFrom || getTodayDate()}
              max={getMaxFutureDate()}
              required
            />
            <ErrorMessage fieldName="permitValidTo" />
            <p className="text-xs text-gray-500 mt-1">End date of permit validity</p>
          </div>
        </div>

        {/* Date Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-900 mb-2">Date Guidelines:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Registration date cannot be in the future or before 1990</li>
            <li>• Permit valid from date must be after or equal to registration date</li>
            <li>• Permit valid to date must be after the permit valid from date</li>
            <li>• Permit validity period should not exceed 1 years</li>
            <li>• Ensure permit renewal before expiry to maintain legal operation</li>
          </ul>
        </div>

        {/* Debug Information (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs">
            <strong>Debug Info:</strong>
            <div>Registration Date: {formData.registrationDate || 'empty'}</div>
            <div>Permit Valid From: {formData.permitValidFrom || 'empty'}</div>
            <div>Permit Valid To: {formData.permitValidTo || 'empty'}</div>
          </div>
        )}
      </div>
    </div>
  )
}