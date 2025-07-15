import { Calendar } from "lucide-react"

interface ImportantDatesFormProps {
  formData: {
    registrationDate: string
    lastInspectionDate: string
    nextMaintenanceDate: string
  }
  onInputChange: (field: string, value: string) => void
}

export default function ImportantDatesForm({ formData, onInputChange }: ImportantDatesFormProps) {
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date *</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.registrationDate}
              onChange={(e) => onInputChange("registrationDate", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Inspection Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.lastInspectionDate}
              onChange={(e) => onInputChange("lastInspectionDate", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Next Maintenance Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.nextMaintenanceDate}
              onChange={(e) => onInputChange("nextMaintenanceDate", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}