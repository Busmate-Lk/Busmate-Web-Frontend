"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Textarea } from "@/components/admin/ui/textarea"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/admin/ui/radio-group"
import { Bold, Italic, Underline, Link, List, Calendar, Clock } from "lucide-react"

export function BroadcastForm() {
  const [messageType, setMessageType] = useState("info")
  const [scheduling, setScheduling] = useState("now")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Broadcast Message</CardTitle>
        <p className="text-sm text-gray-600">Send messages to your BUSMATE LK users</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Type */}
        <div>
          <Label className="text-base font-medium">Message Type</Label>
          <RadioGroup value={messageType} onValueChange={setMessageType} className="flex space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="info" id="info" />
              <Label htmlFor="info" className="flex items-center space-x-2 cursor-pointer">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span>Info</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="warning" id="warning" />
              <Label htmlFor="warning" className="flex items-center space-x-2 cursor-pointer">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span>Warning</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="critical" id="critical" />
              <Label htmlFor="critical" className="flex items-center space-x-2 cursor-pointer">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span>Critical</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maintenance" id="maintenance" />
              <Label htmlFor="maintenance" className="flex items-center space-x-2 cursor-pointer">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span>Maintenance</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Target Audience */}
        <div>
          <Label className="text-base font-medium">Target Audience</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all-users" defaultChecked />
                <Label htmlFor="all-users">All Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fleet-operators" />
                <Label htmlFor="fleet-operators">Fleet Operators</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="passengers" />
                <Label htmlFor="passengers">Passengers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mot-officials" />
                <Label htmlFor="mot-officials">MoT Officials</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="conductors" />
                <Label htmlFor="conductors">Conductors</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Location Filters */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="province">Province</Label>
            <Input id="province" placeholder="Select province" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Select city" />
          </div>
          <div>
            <Label htmlFor="route">Route</Label>
            <Input id="route" placeholder="Select route" />
          </div>
        </div>

        {/* Subject */}
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter message subject..." />
        </div>

        {/* Message Content */}
        <div>
          <Label>Message Content</Label>
          <div className="border rounded-lg">
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
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Characters: 0/1000</span>
            <span>Estimated recipients: 12,847</span>
          </div>
        </div>

        {/* Scheduling */}
        <div>
          <Label className="text-base font-medium">Scheduling</Label>
          <RadioGroup value={scheduling} onValueChange={setScheduling} className="mt-2">
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
        <div className="flex justify-between pt-4">
          <Button variant="outline">📄 Save as Template</Button>
          <div className="flex space-x-3">
            <Button variant="outline">Preview</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">✉️ Send Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
