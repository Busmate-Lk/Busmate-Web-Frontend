"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/admin/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    message: "Maintenance tonight from 2:00 AM to 4:00 AM",
    type: "warning",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    title: "New User Registration Spike",
    message: "150% increase in registrations detected",
    type: "info",
    time: "4h ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment Gateway Resolved",
    message: "Connectivity issue has been fixed",
    type: "success",
    time: "6h ago",
    read: true,
  },
]

export function NotificationDropdown() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notificationId: number) => {
    setIsOpen(false)
    router.push(`/admin/notifications/detail/${notificationId}`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full hover:bg-slate-100">
          <Bell className="h-4 w-4 text-slate-600" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-slate-50 hover:bg-slate-25 transition-colors cursor-pointer ${!notification.read ? "bg-blue-25" : ""
                }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className={`text-sm font-medium ${!notification.read ? "text-slate-900" : "text-slate-700"}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-slate-600">{notification.message}</p>
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100">
          <Link href="/admin/notifications/received">
            <Button variant="ghost" className="w-full justify-between text-slate-600 hover:text-slate-900">
              View all notifications
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
