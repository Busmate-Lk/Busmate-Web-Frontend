"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Switch } from "@/components/admin/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { Badge } from "@/components/admin/ui/badge"
import {
  Clock,
  Download,
  Settings,
  Database,
  HardDrive,
  Shield,
  RefreshCw,
  Play,
  AlertTriangle,
  CheckCircle,
  Upload,
} from "lucide-react"

const backupHistory = [
  {
    id: 1,
    type: "Full System Backup",
    date: "2024-01-15 02:00",
    size: "2.4 GB",
    status: "Completed",
    duration: "45 min",
    location: "AWS S3 Bucket",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    type: "Database Backup",
    date: "2024-01-14 02:00",
    size: "890 MB",
    status: "Completed",
    duration: "12 min",
    location: "Local Storage",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    type: "Configuration Backup",
    date: "2024-01-13 02:00",
    size: "45 MB",
    status: "Failed",
    duration: "0 min",
    location: "AWS S3 Bucket",
    statusColor: "bg-red-100 text-red-800",
  },
]

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [encryptBackups, setEncryptBackups] = useState(true)

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center space-x-8 border-b mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center space-x-2 pb-2 ${activeTab === "general" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
        >
          <Settings className="h-4 w-4" />
          <span>General Settings</span>
        </button>
        <button
          onClick={() => setActiveTab("backup")}
          className={`flex items-center space-x-2 pb-2 ${activeTab === "backup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
        >
          <Database className="h-4 w-4" />
          <span>Backup & Recovery</span>
        </button>
      </div>

      {activeTab === "general" && (
        <div className="bg-white rounded-lg shadow p-6">
          {/* System Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="systemName">System Name</Label>
                <Input id="systemName" defaultValue="BUSMATE LK Production" />
              </div>
              <div>
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Asia/Colombo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/colombo">Asia/Colombo</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Maintenance Windows */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Maintenance Windows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <div className="relative">
                  <Input id="startTime" defaultValue="02:00" />
                  <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Input id="endTime" defaultValue="04:00" />
                  <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Global Notifications */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Global Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="text-base font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Send system alerts via email</p>
                </div>
                <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smsAlerts" className="text-base font-medium">
                    SMS Alerts
                  </Label>
                  <p className="text-sm text-gray-600">Send critical alerts via SMS</p>
                </div>
                <Switch id="smsAlerts" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>
        </div>
      )}

      {activeTab === "backup" && (
        <>
          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Backup</p>
                    <p className="font-semibold">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Backup Size</p>
                    <p className="font-semibold">2.4 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <HardDrive className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Storage Used</p>
                    <p className="font-semibold">45.2 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Shield className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Retention</p>
                    <p className="font-semibold">30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Backup Configuration */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Auto Backup */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoBackup" className="text-base font-medium">
                        Automatic Backup
                      </Label>
                      <p className="text-sm text-gray-600">Enable scheduled backups</p>
                    </div>
                    <Switch id="autoBackup" checked={autoBackup} onCheckedChange={setAutoBackup} />
                  </div>

                  {/* Backup Frequency */}
                  <div>
                    <Label htmlFor="frequency">Backup Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Daily" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Backup Time */}
                  <div>
                    <Label htmlFor="backupTime">Backup Time</Label>
                    <div className="relative">
                      <Input id="backupTime" defaultValue="02:00" />
                      <Clock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Encryption */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption" className="text-base font-medium">
                        Encrypt Backups
                      </Label>
                      <p className="text-sm text-gray-600">Enable backup encryption</p>
                    </div>
                    <Switch id="encryption" checked={encryptBackups} onCheckedChange={setEncryptBackups} />
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Database Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Full System Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Configuration Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-orange-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Backup History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Backup History</CardTitle>
                      <p className="text-sm text-gray-600">Recent backup operations and their status</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Backup
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {backupHistory.map((backup) => (
                        <TableRow key={backup.id}>
                          <TableCell className="font-medium">{backup.type}</TableCell>
                          <TableCell>{backup.date}</TableCell>
                          <TableCell>{backup.size}</TableCell>
                          <TableCell>{backup.duration}</TableCell>
                          <TableCell>
                            <Badge className={backup.statusColor}>{backup.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Upload className="h-4 w-4 text-green-600" />
                              </Button>
                              {backup.status === "Failed" && (
                                <Button variant="ghost" size="sm">
                                  <RefreshCw className="h-4 w-4 text-orange-600" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Recovery Options */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    Recovery Options
                  </CardTitle>
                  <p className="text-sm text-gray-600">System recovery and disaster management</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Point-in-Time Recovery</h4>
                      <p className="text-sm text-blue-700 mb-3">Restore system to a specific date and time</p>
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                        Configure Recovery Point
                      </Button>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">Disaster Recovery</h4>
                      <p className="text-sm text-green-700 mb-3">Full system recovery procedures</p>
                      <Button size="sm" variant="outline" className="border-green-300 text-green-700">
                        View Recovery Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
