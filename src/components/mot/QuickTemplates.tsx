import { AlertTriangle, Calendar, Bell } from "lucide-react"

export default function QuickTemplates() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Message Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h4 className="font-medium text-gray-900">Emergency Alert</h4>
            </div>
            <p className="text-sm text-gray-600">Urgent notifications for immediate attention</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h4 className="font-medium text-gray-900">Route Update</h4>
            </div>
            <p className="text-sm text-gray-600">Schedule changes and route modifications</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-green-500" />
              <h4 className="font-medium text-gray-900">General Notice</h4>
            </div>
            <p className="text-sm text-gray-600">Regular announcements and updates</p>
          </div>
        </div>
      </div>
    </div>
  )
}