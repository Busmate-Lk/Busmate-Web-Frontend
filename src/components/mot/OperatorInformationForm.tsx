import { AlertCircle } from "lucide-react"

interface FormData {
  operator: string
  operatorType: string
}

interface OperatorInformationFormProps {
  formData: FormData
  sriLankanOperators: string[]
  onInputChange: (field: string, value: string) => void
  validationErrors?: { [key: string]: string }
  showValidation?: boolean
}

export default function OperatorInformationForm({ 
  formData, 
  sriLankanOperators, 
  onInputChange,
  validationErrors = {},
  showValidation = false
}: OperatorInformationFormProps) {
  
  const getFieldError = (field: string) => {
    return showValidation ? validationErrors[field] : ''
  }

  const getFieldClasses = (field: string) => {
    const hasError = showValidation && validationErrors[field]
    return `w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
      hasError 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
    }`
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-green-500">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
            2
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Operator Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div data-field="operator">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operator <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.operator}
              onChange={(e) => onInputChange("operator", e.target.value)}
              className={getFieldClasses('operator')}
            >
              <option value="">Select operator</option>
              {sriLankanOperators.map((operator) => (
                <option key={operator} value={operator}>
                  {operator}
                </option>
              ))}
            </select>
            {getFieldError('operator') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('operator')}
              </div>
            )}
          </div>

          <div data-field="operatorType">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operator Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.operatorType}
              onChange={(e) => onInputChange("operatorType", e.target.value)}
              className={getFieldClasses('operatorType')}
            >
              <option value="">Select type</option>
              <option value="SLTB">SLTB (Government)</option>
              <option value="Provincial">Provincial Transport Board</option>
              <option value="Private">Private Operator</option>
            </select>
            {getFieldError('operatorType') && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('operatorType')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}