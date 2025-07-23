import { Calendar, AlertCircle } from "lucide-react"

interface ImportantDatesFormProps {
  formData: {
    registrationDate: string
    lastInspectionDate: string
    nextMaintenanceDate: string
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

  // Helper function to get min date (1990-01-01)
  const getMinDate = () => {
    return '1990-01-01'
  }

  // Helper function to get max future date (2 years from now)
  const getMaxFutureDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 2)
    return date.toISOString().split('T')[0]
  }

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
              value={formData.registrationDate}
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
              Last Inspection Date
            </label>
            <input
              name="lastInspectionDate"
              type="date"
              className={getInputClassName("lastInspectionDate")}
              value={formData.lastInspectionDate}
              onChange={(e) => onInputChange("lastInspectionDate", e.target.value)}
              max={getTodayDate()}
            />
            <ErrorMessage fieldName="lastInspectionDate" />
            <p className="text-xs text-gray-500 mt-1">Most recent safety inspection</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Maintenance Date
            </label>
            <input
              name="nextMaintenanceDate"
              type="date"
              className={getInputClassName("nextMaintenanceDate")}
              value={formData.nextMaintenanceDate}
              onChange={(e) => onInputChange("nextMaintenanceDate", e.target.value)}
              min={getTodayDate()}
              max={getMaxFutureDate()}
            />
            <ErrorMessage fieldName="nextMaintenanceDate" />
            <p className="text-xs text-gray-500 mt-1">Scheduled maintenance date</p>
          </div>
        </div>

        {/* Date Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-yellow-900 mb-2">Date Guidelines:</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Registration date cannot be in the future or before 1990</li>
            <li>• Last inspection date cannot be before registration date</li>
            <li>• Next maintenance should be scheduled within the next 2 years</li>
            <li>• Regular inspections are required every 6 months for public transport</li>
          </ul>
        </div>
      </div>
    </div>
  )
}