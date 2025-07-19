import { AlertTriangle, CheckCircle, Phone, MapPin } from "lucide-react"

export default function SLTBGuidelines() {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">SLTB Guidelines</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-medium text-yellow-800">Ministry Approval Required</p>
            <p className="text-yellow-700 text-xs mt-1">
              All fare changes require Ministry of Transport approval before implementation
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-gray-700">Base fare: Rs. 10-30 range</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-gray-700">Per km: Rs. 2.50-4.00 range</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-gray-700">Student discount: 50% mandatory</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-gray-700">Senior discount: 25% recommended</p>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="flex items-center gap-2 text-blue-600">
              <Phone className="w-4 h-4" />
              <p className="text-sm">Transport Hotline: 1919</p>
            </div>
            <div className="flex items-center gap-2 text-blue-600 mt-1">
              <MapPin className="w-4 h-4" />
              <p className="text-sm">Ministry of Transport, Colombo 01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}