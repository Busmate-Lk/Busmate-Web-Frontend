"use client"

import { Card, CardContent } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import {
  Users,
  Activity,
  AlertTriangle,
  Bus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"
import { useState } from "react"

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    color: "blue",
    trend: [65, 78, 82, 95, 88, 92, 100],
    description: "Active users this month",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "+0.1%",
    changeType: "positive" as const,
    icon: Activity,
    color: "green",
    trend: [98, 99, 99.5, 99.8, 99.9, 99.9, 99.9],
    description: "Last 7 days average",
  },
  {
    title: "Critical Alerts",
    value: "3",
    change: "-2 from yesterday",
    changeType: "positive" as const,
    icon: AlertTriangle,
    color: "red",
    trend: [8, 6, 5, 4, 3, 3, 3],
    description: "Requires attention",
  },
  {
    title: "Active Buses",
    value: "342",
    change: "+5 new",
    changeType: "positive" as const,
    icon: Bus,
    color: "purple",
    trend: [320, 325, 330, 335, 337, 340, 342],
    description: "Currently in service",
  },
  {
    title: "Daily Revenue",
    value: "Rs 2.4M",
    change: "+15.7%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "yellow",
    trend: [2.1, 2.2, 2.0, 2.3, 2.2, 2.3, 2.4],
    description: "Today's earnings",
  },
]

export function ModernStatsCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const getColorClasses = (color: string, isHovered: boolean) => {
    const colors = {
      blue: {
        bg: isHovered ? "bg-blue-50" : "bg-white",
        icon: "bg-blue-100 text-blue-600",
        gradient: "from-blue-500 to-blue-600",
      },
      green: {
        bg: isHovered ? "bg-green-50" : "bg-white",
        icon: "bg-green-100 text-green-600",
        gradient: "from-green-500 to-green-600",
      },
      red: {
        bg: isHovered ? "bg-red-50" : "bg-white",
        icon: "bg-red-100 text-red-600",
        gradient: "from-red-500 to-red-600",
      },
      purple: {
        bg: isHovered ? "bg-purple-50" : "bg-white",
        icon: "bg-purple-100 text-purple-600",
        gradient: "from-purple-500 to-purple-600",
      },
      yellow: {
        bg: isHovered ? "bg-yellow-50" : "bg-white",
        icon: "bg-yellow-100 text-yellow-600",
        gradient: "from-yellow-500 to-yellow-600",
      },
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => {
        const isHovered = hoveredCard === index
        const colorClasses = getColorClasses(stat.color, isHovered)

        return (
          <Card
            key={stat.title}
            className={`relative overflow-hidden transition-all duration-300 ease-in-out cursor-pointer group hover:shadow-lg hover:-translate-y-1 ${colorClasses.bg} border-slate-200/60`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${colorClasses.icon} transition-transform duration-200 ${isHovered ? "scale-110" : ""}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Main content */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{stat.description}</p>
              </div>

              {/* Mini chart */}
              <div className="mt-4 flex items-end space-x-1 h-8">
                {stat.trend.map((value, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-t ${colorClasses.gradient} rounded-sm transition-all duration-300 w-2 opacity-60 hover:opacity-100`}
                    style={{ height: `${(value / Math.max(...stat.trend)) * 100}%` }}
                  />
                ))}
              </div>

              {/* Hover overlay */}
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
