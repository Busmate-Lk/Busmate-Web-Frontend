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
}

export default function BasicInformationForm({ 
  formData, 
  sriLankanRoutes, 
  onInputChange 
}: BasicInformationFormProps) {
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type *</label>
            <select
              value={formData.busType}
              onChange={(e) => onInputChange("busType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select bus type</option>
              <option value="AC">AC Bus</option>
              <option value="Non-AC">Non-AC Bus</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
              <option value="Luxury">Luxury</option>
              <option value="Express">Express Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility Type *</label>
            <select
              value={formData.facilityType}
              onChange={(e) => onInputChange("facilityType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select facility</option>
              <option value="Normal">Normal Service</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
              <option value="Luxury">Luxury Service</option>
              <option value="Express">Express Service</option>
              <option value="Intercity">Intercity Express</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Route *</label>
            <select
              value={formData.route}
              onChange={(e) => onInputChange("route", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select route</option>
              {sriLankanRoutes.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
            <select
              value={formData.province}
              onChange={(e) => onInputChange("province", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        </div>
      </div>
    </div>
  )
}