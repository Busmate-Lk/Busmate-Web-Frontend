"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar"
import { UserPlus, Bus, CreditCard, AlertTriangle, Route, Database, ArrowRight, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "user",
    title: "New user registration",
    description: "John Silva registered from Colombo",
    time: "2 minutes ago",
    icon: UserPlus,
    color: "green",
    avatar: "JS",
    priority: "normal",
  },
  {
    id: 2,
    type: "bus",
    title: "Bus B-247 departed",
    description: "Route 001 - On schedule",
    time: "5 minutes ago",
    icon: Bus,
    color: "blue",
    avatar: "B2",
    priority: "normal",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment processed",
    description: "Rs 450 - Transaction successful",
    time: "8 minutes ago",
    icon: CreditCard,
    color: "yellow",
    avatar: "₹",
    priority: "normal",
  },
  {
    id: 4,
    type: "alert",
    title: "High traffic detected",
    description: "Network congestion on Route 138",
    time: "12 minutes ago",
    icon: AlertTriangle,
    color: "red",
    avatar: "!",
    priority: "high",
  },
  {
    id: 5,
    type: "route",
    title: "Route update completed",
    description: "Route 045 - Schedule optimized",
    time: "15 minutes ago",
    icon: Route,
    color: "purple",
    avatar: "R4",
    priority: "normal",
  },
  {
    id: 6,
    type: "system",
    title: "Database backup completed",
    description: "Daily backup - 2.4GB archived",
    time: "20 minutes ago",
    icon: Database,
    color: "green",
    avatar: "DB",
    priority: "normal",
  },
]

const getColorClasses = (color: string) => {
  const colors = {
    green: "bg-green-100 text-green-700 border-green-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
  }
  return colors[color as keyof typeof colors]
}

export function ModernActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Live Activity Feed</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Real-time system events and updates</p>
          </div>
          <Button variant="outline" size="sm" className="hover:bg-slate-50">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className={`h-10 w-10 border-2 ${getColorClasses(activity.color)}`}>
                <AvatarFallback className={`${getColorClasses(activity.color)} font-semibold text-xs`}>
                  {activity.avatar}
                </AvatarFallback>
              </Avatar>
              {activity.priority === "high" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-sm text-slate-600">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{activity.time}</span>
                    {activity.priority === "high" && (
                      <Badge variant="destructive" className="text-xs px-2 py-0">
                        High Priority
                      </Badge>
                    )}
                  </div>
                </div>
                <activity.icon
                  className={`h-4 w-4 mt-1 opacity-60 group-hover:opacity-100 transition-opacity ${activity.color === "green"
                    ? "text-green-600"
                    : activity.color === "blue"
                      ? "text-blue-600"
                      : activity.color === "yellow"
                        ? "text-yellow-600"
                        : activity.color === "red"
                          ? "text-red-600"
                          : "text-purple-600"
                    }`}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Load more */}
        <div className="pt-4 border-t border-slate-100">
          <Button variant="ghost" className="w-full text-slate-600 hover:text-slate-900">
            Load more activities
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
