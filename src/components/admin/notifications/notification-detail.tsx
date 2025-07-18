"use client"

import { Button } from "@/components/admin/ui/button"
import { Card, CardContent } from "@/components/admin/ui/card"
import { Badge } from "@/components/admin/ui/badge"
import { ArrowLeft, Clock, AlertTriangle, Info, CheckCircle, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data - in real app this would come from API
const notifications = [
    {
        id: 1,
        title: "System Maintenance Scheduled",
        message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. During this time, some services may be temporarily unavailable. We apologize for any inconvenience this may cause.",
        type: "warning",
        time: "2 hours ago",
        date: "2024-01-15 14:30",
        read: false,
        priority: "high",
        sender: "System Administrator",
        category: "Maintenance",
        details: "The maintenance will include database optimization, security updates, and server infrastructure improvements. All user data will remain safe during this process.",
    },
    {
        id: 2,
        title: "New User Registration Spike",
        message: "Unusual increase in user registrations detected - 150% above normal levels. This may indicate increased interest in the platform or potential security concerns.",
        type: "info",
        time: "4 hours ago",
        date: "2024-01-15 12:30",
        read: false,
        priority: "medium",
        sender: "Analytics System",
        category: "User Activity",
        details: "The spike started at 10:00 AM and has continued throughout the day. Recommended actions include monitoring for suspicious activity and ensuring server capacity can handle the increased load.",
    },
    {
        id: 3,
        title: "Payment Gateway Issue Resolved",
        message: "The payment gateway connectivity issue has been successfully resolved. All payment processing has returned to normal operation.",
        type: "success",
        time: "6 hours ago",
        date: "2024-01-15 10:30",
        read: true,
        priority: "high",
        sender: "Payment Team",
        category: "Payment System",
        details: "The issue was caused by a temporary network connectivity problem with our payment provider. No transactions were lost and all pending payments have been processed successfully.",
    },
]

interface NotificationDetailProps {
    notificationId: string
}

export function NotificationDetail({ notificationId }: NotificationDetailProps) {
    const router = useRouter()
    const notification = notifications.find(n => n.id === parseInt(notificationId))

    if (!notification) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Notification Not Found</h2>
                <p className="text-gray-600 mb-4">The notification you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => router.push("/admin/notifications/received")} className="bg-blue-500/90 text-white hover:bg-blue-600 shadow-md">
                    Back to Notifications
                </Button>
            </div>
        )
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "warning":
                return <AlertTriangle className="h-6 w-6 text-yellow-600" />
            case "success":
                return <CheckCircle className="h-6 w-6 text-green-600" />
            default:
                return <Info className="h-6 w-6 text-blue-600" />
        }
    }

    const getNotificationBadge = (type: string) => {
        switch (type) {
            case "warning":
                return "bg-yellow-100 text-yellow-800"
            case "success":
                return "bg-green-100 text-green-800"
            case "info":
                return "bg-blue-100 text-blue-800"
            default:
                return "bg-gray-100 text-gray-800"
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
            case "low":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" asChild className="bg-gray-500/20 text-gray-600 hover:bg-gray-500/30 shadow-md">
                        <Link href="/admin/notifications/received">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Notifications
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    {!notification.read && (
                        <Button variant="outline" size="sm" className="bg-blue-500/20 text-blue-600 border-blue-200 hover:bg-blue-500/30 shadow-md">
                            Mark as Read
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 shadow-md">
                        Archive
                    </Button>
                </div>
            </div>

            {/* Notification Detail Card */}
            <Card className="shadow-lg">
                <CardContent className="p-8 bg-gradient-to-br from-white to-gray-50/30">
                    {/* Title and Icon */}
                    <div className="flex items-start space-x-4 mb-6">
                        <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {notification.title}
                                    </h1>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Badge className={getNotificationBadge(notification.type)}>
                                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                        </Badge>
                                        <Badge className={getPriorityBadge(notification.priority)}>
                                            {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                                        </Badge>
                                        <Badge variant="outline" className="shadow-sm">
                                            {notification.category}
                                        </Badge>
                                    </div>
                                </div>
                                {!notification.read && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Message Content */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {notification.message}
                            </p>

                            {notification.details && (
                                <>
                                    <h4 className="text-md font-semibold text-gray-900 mb-2">Additional Details</h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {notification.details}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <Calendar className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Date & Time</p>
                                        <p className="text-sm text-gray-600">{notification.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <Clock className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Received</p>
                                        <p className="text-sm text-gray-600">{notification.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Sender</p>
                                        <p className="text-sm text-gray-600">{notification.sender}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                                    <div className="h-5 w-5 flex items-center justify-center">
                                        <div className={`h-3 w-3 rounded-full ${notification.read ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Status</p>
                                        <p className="text-sm text-gray-600">{notification.read ? 'Read' : 'Unread'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
