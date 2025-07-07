"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Textarea } from "@/components/admin/ui/textarea"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/admin/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Bold, Italic, Underline, Link, List, Calendar, Clock, Send, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function ComposeMessage() {
  const router = useRouter()
  const [messageType, setMessageType] = useState("info")
  const [scheduling, setScheduling] = useState("now")
  const [allUsers, setAllUsers] = useState(true)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/broadcast/history")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Messages
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compose Message</h1>
            <p className="text-gray-600">Create and send broadcast messages to users</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Message Details</CardTitle>
              <p className="text-sm text-gray-600">Configure your broadcast message settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Message Type */}
              <div>
                <Label className="text-base font-medium">Message Type</Label>
                <div className="grid grid-cols-4 gap-3 mt-3">
                  <button
                    onClick={() => setMessageType("info")}
                    className={`p-4 rounded-lg border text-center transition-colors ${messageType === "info"
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-blue-600 mb-2">ℹ️</div>
                    <span className="text-sm font-medium">Info</span>
                  </button>
                  <button
                    onClick={() => setMessageType("warning")}
                    className={`p-4 rounded-lg border text-center transition-colors ${messageType === "warning"
                      ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-yellow-600 mb-2">⚠️</div>
                    <span className="text-sm font-medium">Warning</span>
                  </button>
                  <button
                    onClick={() => setMessageType("critical")}
                    className={`p-4 rounded-lg border text-center transition-colors ${messageType === "critical"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-red-600 mb-2">🚨</div>
                    <span className="text-sm font-medium">Critical</span>
                  </button>
                  <button
                    onClick={() => setMessageType("maintenance")}
                    className={`p-4 rounded-lg border text-center transition-colors ${messageType === "maintenance"
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="text-purple-600 mb-2">🔧</div>
                    <span className="text-sm font-medium">Maintenance</span>
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject..." className="mt-2" />
              </div>

              {/* Target Audience */}
              <div>
                <Label className="text-base font-medium">Target Audience</Label>
                <div className="grid grid-cols-2 gap-6 mt-3">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-users" checked={allUsers} onCheckedChange={setAllUsers} />
                      <Label htmlFor="all-users">All Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="passengers" />
                      <Label htmlFor="passengers">Passengers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="conductors" />
                      <Label htmlFor="conductors">Conductors</Label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fleet-operators" />
                      <Label htmlFor="fleet-operators">Fleet Operators</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mot-officials" />
                      <Label htmlFor="mot-officials">MoT Officials</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="custom" />
                      <Label htmlFor="custom">Custom Selection</Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Filters */}
              <div>
                <Label className="text-base font-medium">Location Filters (Optional)</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <Label htmlFor="province">Province</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Provinces" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Provinces</SelectItem>
                        <SelectItem value="western">Western</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="southern">Southern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        <SelectItem value="colombo">Colombo</SelectItem>
                        <SelectItem value="kandy">Kandy</SelectItem>
                        <SelectItem value="galle">Galle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="route">Route</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Routes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Routes</SelectItem>
                        <SelectItem value="route-001">Route 001</SelectItem>
                        <SelectItem value="route-138">Route 138</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <Label>Message Content</Label>
                <div className="border rounded-lg mt-2">
                  <div className="flex items-center space-x-2 p-3 border-b bg-gray-50">
                    <Button variant="ghost" size="sm">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-32 border-0 resize-none focus-visible:ring-0"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Characters: 0/1000</span>
                  <span>Estimated recipients: 12,847</span>
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <Label className="text-base font-medium">Scheduling</Label>
                <RadioGroup value={scheduling} onValueChange={setScheduling} className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="send-now" />
                    <Label htmlFor="send-now">Send Now</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="later" id="schedule-later" />
                    <Label htmlFor="schedule-later">Schedule Later</Label>
                  </div>
                </RadioGroup>

                {scheduling === "later" && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="relative">
                      <Input type="text" placeholder="mm/dd/yyyy" />
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                    <div className="relative">
                      <Input type="text" placeholder="--:-- --" />
                      <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <div className="flex space-x-3">
                  <Button variant="outline">Preview</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Message Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Message Preview</CardTitle>
              <p className="text-sm text-gray-600">How it appears on mobile</p>
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

          {/* Delivery Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Statistics</CardTitle>
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
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Delivery</span>
                <span className="font-medium text-blue-600">~2 minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
