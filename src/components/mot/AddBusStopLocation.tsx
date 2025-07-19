import { MapPin, Map } from "lucide-react"

export default function AddBusStopLocation({ formData, handleInputChange }: {
  formData: any,
  handleInputChange: (field: string, value: string) => void
}) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">Location Details</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
            <input
              type="number"
              step="any"
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., 6.9271"
              value={formData.latitude}
              onChange={(e) => handleInputChange("latitude", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
            <input
              type="number"
              step="any"
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., 79.8612"
              value={formData.longitude}
              onChange={(e) => handleInputChange("longitude", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
          <textarea
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="Enter the complete address of the bus stop..."
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., Colombo"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
            <select
              className="w-full border border-gray-400 rounded px-3 py-2 text-gray-600"
              value={formData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
              required
            >
              <option value="">Select district</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Badulla">Badulla</option>
              <option value="Negombo">Negombo</option>
              <option value="Kalutara">Kalutara</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Province *</label>
            <select
              className="w-full border border-gray-400 rounded px-3 py-2 text-gray-600"
              value={formData.province}
              onChange={(e) => handleInputChange("province", e.target.value)}
              required
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
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nearby Landmarks</label>            <input
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="e.g., Near Central Bank, Opposite to Shopping Mall"
            value={formData.nearbyLandmarks}
            onChange={(e) => handleInputChange("nearbyLandmarks", e.target.value)}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">Location Preview</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Interactive map will appear here</p>
          <p className="text-sm text-gray-500">
            {formData.latitude && formData.longitude
              ? `Location: ${formData.latitude}, ${formData.longitude}`
              : "Enter coordinates to see location preview"}
          </p>
          <button type="button" className="mt-4 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
            Open Full Screen Map
          </button>
        </div>
      </div>
    </>
  )
}