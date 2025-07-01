"use client"

import { MOTLayout } from "@/components/mot/layout"
import { Button } from "@/components/mot/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/mot/card"
import { Badge } from "@/components/mot/badge"
import { 
  Bus,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  Wrench,
  TrendingUp,
  Users,
  DollarSign,
  Route,
  MoreHorizontal 
} from "lucide-react"

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Active Buses",
      value: "1,247",
      subtitle: "+12% from last month",
      icon: Bus,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-800",
      trend: "+12%",
      trendColor: "text-green-600"
    },
    {
      title: "Approved Routes",
      value: "342",
      subtitle: "+5% from last month",
      icon: Route,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-600",
      trend: "+5%",
      trendColor: "text-green-600"
    },
    {
      title: "Today's Ridership",
      value: "89,432",
      subtitle: "+8% from yesterday",
      icon: Users,
      color: "text-slate-700",
      bgColor: "bg-slate-50",
      borderColor: "border-l-slate-500",
      trend: "+8%",
      trendColor: "text-green-600"
    },
    {
      title: "Total Fare Collected",
      value: "₹2.4M",
      subtitle: "+15% from last week",
      icon: DollarSign,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-800",
      trend: "+15%",
      trendColor: "text-green-600"
    },
  ]

  const broadcastMessages = [
    {
      title: "Route Maintenance Alert",
      type: "Priority",
      time: "2 hours ago",
      description: "Scheduled Today 2:00 PM",
    },
    {
      title: "SMS URGENT Notification",
      type: "Alert",
      time: "3 hours ago",
      description: "Go to All Messages",
    },
  ]

  const routeAlerts = [
    {
      route: "Route 45A",
      status: "Expires in 3 days",
      type: "warning",
    },
    {
      route: "Route 126",
      status: "Permit expired",
      type: "danger",
    },
  ]

  const maintenanceBuses = [
    {
      bus: "Bus TN-09-1234",
      status: "Engine Service due",
      type: "warning",
    },
    {
      bus: "Bus TN-09-5678",
      status: "Routine checkup",
      type: "info",
    },
  ]

  const chartData = [
    { day: "Mon", value: 85000, height: "h-16" },
    { day: "Tue", value: 92000, height: "h-20" },
    { day: "Wed", value: 78000, height: "h-14" },
    { day: "Thu", value: 88000, height: "h-18" },
    { day: "Fri", value: 95000, height: "h-22" },
    { day: "Sat", value: 89000, height: "h-19" },
    { day: "Sun", value: 89432, height: "h-24", isToday: true }
  ]

  return (
    <MOTLayout activeItem="dashboard">
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className={`relative overflow-hidden border-l-4 ${metric.borderColor}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">...</span>
                        </div>
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                      <p className="text-sm font-medium text-black">{metric.title}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className={`text-xs font-medium ${metric.trendColor}`}>
                          {metric.trend} {metric.subtitle.split(' ').slice(-3).join(' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-black font-semibold">Ridership Trend (Last 7 Days)</CardTitle>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <div className="flex items-center gap-1">
                  <span className="text-xs">...</span>
                </div>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center gap-2 px-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-32 rounded-t"></div>
                  <span className="text-xs text-slate-600">Mon</span>
                  <span className="text-xs font-medium text-gray-900">85,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-36 rounded-t"></div>
                  <span className="text-xs text-slate-600">Tue</span>
                  <span className="text-xs font-medium text-gray-900">92,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-28 rounded-t"></div>
                  <span className="text-xs text-slate-600">Wed</span>
                  <span className="text-xs font-medium text-gray-900">78,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-34 rounded-t"></div>
                  <span className="text-xs text-slate-600">Thu</span>
                  <span className="text-xs font-medium text-gray-900">88,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-38 rounded-t"></div>
                  <span className="text-xs text-slate-600">Fri</span>
                  <span className="text-xs font-medium text-gray-900">95,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-blue-800 w-8 h-35 rounded-t"></div>
                  <span className="text-xs text-slate-600">Sat</span>
                  <span className="text-xs font-medium text-gray-900">89,000</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-green-600 w-8 h-40 rounded-t"></div>
                  <span className="text-xs text-slate-600">Sun</span>
                  <span className="text-xs font-medium text-gray-900">89,432</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-black font-semibold">Bus Types Distribution</CardTitle>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <div className="flex items-center gap-1">
                  <span className="text-xs">...</span>
                </div>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-blue-200"></div>
                  <div className="absolute inset-2 rounded-full border-8 border-blue-600" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 60%, 50% 50%)' }}></div>
                  <div className="absolute inset-4 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1,247</div>
                      <div className="text-sm text-gray-600">Total Buses</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Regular</span>
                    <span className="text-slate-600 ml-2">520</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Express</span>
                    <span className="text-slate-600 ml-2">280</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Top Routes Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg text-black font-semibold">Top 5 Routes by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Broadcast Center */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-black">Broadcast Center</CardTitle>
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent className="space-y-4">
                {broadcastMessages.map((message, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm text-black">{message.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {message.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{message.time}</p>
                    <p className="text-xs text-gray-600">{message.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Route Permit Expiry Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-black">Route Permit Expiry Alerts</CardTitle>
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </CardHeader>
              <CardContent className="space-y-4">
                {routeAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-black">{alert.route}</p>
                      <p className="text-xs text-gray-500">{alert.status}</p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${alert.type === "warning" ? "bg-yellow-400" : "bg-red-400"}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Buses Marked for Maintenance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-black">Buses Marked for Maintenance</CardTitle>
                <Wrench className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent className="space-y-4">
                {maintenanceBuses.map((bus, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-black">{bus.bus}</p>
                      <p className="text-xs text-gray-500">{bus.status}</p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${bus.type === "warning" ? "bg-orange-400" : "bg-blue-400"}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </MOTLayout>
  )
}
