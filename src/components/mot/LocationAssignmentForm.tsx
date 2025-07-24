import { MapPin, AlertCircle } from "lucide-react"

interface LocationAssignmentFormProps {
  formData: {
    regionAssigned: string
    depotName: string
    primaryRoute: string
    secondaryRoute: string
  }
  onInputChange: (field: string, value: string) => void
  errors: Record<string, string>
  showValidation: boolean
}

export default function LocationAssignmentForm({ 
  formData, 
  onInputChange, 
  errors, 
  showValidation 
}: LocationAssignmentFormProps) {
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
          <MapPin className="w-5 h-5 text-blue-600" />
          Location Assignment
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region Assigned *
            </label>
            <select
              name="regionAssigned"
              className={getInputClassName("regionAssigned")}
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
            <ErrorMessage fieldName="regionAssigned" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depot Name *
            </label>
            <input
              name="depotName"
              className={getInputClassName("depotName")}
              placeholder="e.g., Colombo Central Depot"
              value={formData.depotName}
              onChange={(e) => onInputChange("depotName", e.target.value)}
              required
            />
            <ErrorMessage fieldName="depotName" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Route
            </label>
            <input
              name="primaryRoute"
              className={getInputClassName("primaryRoute")}
              placeholder="e.g., Colombo - Kandy"
              value={formData.primaryRoute}
              onChange={(e) => onInputChange("primaryRoute", e.target.value)}
            />
            <ErrorMessage fieldName="primaryRoute" />
          </div>
          {/*}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Route
            </label>
            <input
              name="secondaryRoute"
              className={getInputClassName("secondaryRoute")}
              placeholder="e.g., Colombo - Gampaha"
              value={formData.secondaryRoute}
              onChange={(e) => onInputChange("secondaryRoute", e.target.value)}
            />
            <ErrorMessage fieldName="secondaryRoute" />
          </div>*/}
        </div>

        {/* Route Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Route Assignment Information:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Primary route is the main service route for this bus</li>
            {/* <li>• Secondary route is used during peak hours or as backup</li>*/}
            <li>• Route assignments can be changed later through the route management system</li>
            <li>• Ensure depot location supports the assigned routes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}