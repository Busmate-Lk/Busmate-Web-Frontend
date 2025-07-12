"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Card, CardContent } from "@/components/admin/ui/card"
import { Badge } from "@/components/admin/ui/badge"
import { ArrowLeft, Search, Filter, Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
    type: "warning",
    time: "2 hours ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    title: "New User Registration Spike",
    message: "Unusual increase in user registrations detected - 150% above normal",
    type: "info",
    time: "4 hours ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Payment Gateway Issue Resolved",
    message: "The payment gateway connectivity issue has been successfully resolved",
    type: "success",
    time: "6 hours ago",
    read: true,
    priority: "high",
  },
  {
    id: 4,
    title: "Database Backup Completed",
    message: "Daily database backup completed successfully at 2:00 AM",
    type: "success",
    time: "8 hours ago",
    read: true,
    priority: "low",
  },
  {
    id: 5,
    title: "Security Alert: Failed Login Attempts",
    message: "Multiple failed login attempts detected from IP 192.168.1.100",
    type: "error",
    time: "1 day ago",
    read: false,
    priority: "critical",
  },
]

export function NotificationPanel() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const handleNotificationClick = (notificationId: number) => {
    router.push(`/admin/notifications/detail/${notificationId}`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      {/* Filters */}
      <Card className="mb-6 shadow-lg">
        <CardContent className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 shadow-sm"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="error">Errors</SelectItem>
                  <SelectItem value="warning">Warnings</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`${!notification.read ? "border-l-4 border-l-blue-500" : ""} cursor-pointer hover:shadow-lg transition-all duration-200 shadow-md`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`text-lg font-semibold ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center space-x-3">
                        <Badge className={getNotificationBadge(notification.type)}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </Badge>
                        <Badge className={getPriorityBadge(notification.priority)}>
                          {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="shadow-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle mark as read
                          }}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shadow-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleNotificationClick(notification.id)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-6">
        <Button variant="outline" className="shadow-sm">Load More Notifications</Button>
      </div>
    </div>
  )
}
