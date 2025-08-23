import { AlertCircle } from "lucide-react"

interface FormData {
  busType: string
  facilityType: string
  route: string
  province: string
}

interface BasicInformationFormProps {
  formData: FormData
  sriLankanRoutes: string[]
  onInputChange: (field: string, value: string) => void
  validationErrors?: { [key: string]: string }
  showValidation?: boolean
}

export default function BasicInformationForm({ 
  formData, 
  sriLankanRoutes, 
  onInputChange,
  validationErrors = {},
  showValidation = false
}: BasicInformationFormProps) {
  
  const getFieldError = (field: string) => {
    return showValidation ? validationErrors[field] : ''
  }

  const getFieldClasses = (field: string) => {
    const hasError = showValidation && validationErrors[field]
    return `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    }`
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-blue-500">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
            1
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div data-field="busType">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.busType}
              onChange={(e) => onInputChange("busType", e.target.value)}
              className={getFieldClasses('busType')}
            >
              <option value="">Select bus type</option>
              <option value="AC">AC Bus</option>
              <option value="Non-AC">Non-AC Bus</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
              <option value="Luxury">Luxury</option>
              <option value="Express">Express Service</option>
            </select>
            {getFieldError('busType') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('busType')}
              </div>
            )}
          </div>

          <div data-field="facilityType">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facility Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.facilityType}
              onChange={(e) => onInputChange("facilityType", e.target.value)}
              className={getFieldClasses('facilityType')}
            >
              <option value="">Select facility</option>
              <option value="Normal">Normal Service</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
              <option value="Luxury">Luxury Service</option>
              <option value="Express">Express Service</option>
              <option value="Intercity">Intercity Express</option>
            </select>
            {getFieldError('facilityType') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('facilityType')}
              </div>
            )}
          </div>

          <div data-field="route">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.route}
              onChange={(e) => onInputChange("route", e.target.value)}
              className={getFieldClasses('route')}
            >
              <option value="">Select route</option>
              {sriLankanRoutes.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
            {getFieldError('route') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('route')}
              </div>
            )}
          </div>

          <div data-field="province">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Province <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.province}
              onChange={(e) => onInputChange("province", e.target.value)}
              className={getFieldClasses('province')}
            >
              <option value="">Select province</option>
              <option value="Western">Western Province</option>
              <option value="Central">Central Province</option>
              <option value="Southern">Southern Province</option>
              <option value="Northern">Northern Province</option>
              <option value="Eastern">Eastern Province</option>
              <option value="North Western">North Western Province</option>
              <option value="North Central">North Central Province</option>
              <option value="Uva">Uva Province</option>
              <option value="Sabaragamuwa">Sabaragamuwa Province</option>
            </select>
            {getFieldError('province') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('province')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}