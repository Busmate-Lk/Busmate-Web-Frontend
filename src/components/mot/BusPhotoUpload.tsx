import { Upload } from "lucide-react"

export default function BusPhotoUpload() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          Bus Photo
        </h3>
      </div>
      <div className="p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          <button
            type="button"
            className="mt-4 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Choose File
          </button>
        </div>
      </div>
    </div>
  )
}