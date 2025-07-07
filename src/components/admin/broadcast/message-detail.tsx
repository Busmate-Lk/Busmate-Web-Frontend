import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { ArrowLeft, RotateCcw, Edit, Download, Trash2, Users, Eye, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

interface MessageDetailProps {
  messageId: string
}

export function MessageDetail({ messageId }: MessageDetailProps) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/broadcast/history">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Messages
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold">Service Alert: Route 138 Delay</h1>
              <Badge className="bg-green-100 text-green-800">✓ Delivered</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">⚠️ Warning</Badge>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Sent: Dec 19, 2024 at 2:45 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>By: Sarah Fernando (Transport Admin)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Resend
          </Button>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit & Resend
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Message Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Content</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Western Province Passengers • 15,847 recipients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⭐</span>
                  <span>Priority: High</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="font-medium">Service Alert - Route 138</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="mb-4">Dear passengers,</p>
                <p className="mb-4">
                  Due to road construction on Galle Road, Route 138 buses are experiencing delays of approximately{" "}
                  <strong>15-20 minutes</strong>.
                </p>
                <p className="mb-4">Alternative routes: 120, 122, 125</p>
                <p>We apologize for any inconvenience caused.</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t text-sm text-gray-500">
                <span>Characters: 247 | Estimated reading time: 15 seconds</span>
                <span>No attachments</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">78.6%</div>
                  <div className="text-sm text-gray-600">Open Rate</div>
                  <div className="text-xs text-green-600">Above average</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.3s</div>
                  <div className="text-sm text-gray-600">Avg. Delivery Time</div>
                  <div className="text-xs text-blue-600">Excellent</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <div className="text-sm text-gray-600">Delivery Success</div>
                  <div className="text-xs text-purple-600">Outstanding</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Message Delivered Successfully</p>
                    <p className="text-xs text-gray-500">2:52 PM - All recipients reached</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Delivery Started</p>
                    <p className="text-xs text-gray-500">2:46 PM - First delivery attempt</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Message Sent</p>
                    <p className="text-xs text-gray-500">2:45 PM - Message queued for delivery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">15,832</div>
                <div className="text-sm text-gray-600">Successfully Delivered</div>
                <div className="text-xs text-green-600">99.9% delivery rate</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Recipients</span>
                  <span className="font-medium">15,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Delivered</span>
                  <span className="font-medium text-green-600">15,832</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Failed</span>
                  <span className="font-medium text-red-600">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Opened</span>
                  <span className="font-medium text-blue-600">12,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Open Rate</span>
                  <span className="font-medium">78.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View Recipients
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <RotateCcw className="h-4 w-4 mr-2" />
                Create Similar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
