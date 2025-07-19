
interface FormData {
  operator: string
  operatorType: string
}

interface OperatorInformationFormProps {
  formData: FormData
  sriLankanOperators: string[]
  onInputChange: (field: string, value: string) => void
}

export default function OperatorInformationForm({ 
  formData, 
  sriLankanOperators, 
  onInputChange 
}: OperatorInformationFormProps) {
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operator *</label>
            <select
              value={formData.operator}
              onChange={(e) => onInputChange("operator", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select operator</option>
              {sriLankanOperators.map((operator) => (
                <option key={operator} value={operator}>
                  {operator}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operator Type *</label>
            <select
              value={formData.operatorType}
              onChange={(e) => onInputChange("operatorType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select type</option>
              <option value="SLTB">SLTB (Government)</option>
              <option value="Provincial">Provincial Transport Board</option>
              <option value="Private">Private Operator</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}