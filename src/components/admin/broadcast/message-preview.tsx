import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"

export function MessagePreview() {
  return (
    <div className="space-y-6">
      {/* Message Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Message Preview</CardTitle>
          <p className="text-sm text-gray-600">Mobile app view</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                BM
              </div>
              <div>
                <p className="font-medium text-sm">BUSMATE LK</p>
                <p className="text-xs text-gray-500">now</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-xs font-medium text-blue-600">INFO</span>
              </div>
              <h4 className="font-medium text-sm mb-1">Message Subject</h4>
              <p className="text-sm text-gray-600">Your message content will appear here...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Users</span>
            <span className="font-medium">25,694</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Active Today</span>
            <span className="font-medium">12,847</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Avg. Open Rate</span>
            <span className="font-medium text-green-600">84.2%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
