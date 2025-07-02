"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Badge } from "@/components/admin/ui/badge"
import { Radio, BarChart3, Wrench, FileText, Users, Settings, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Send Broadcast",
    description: "Send notifications to users",
    icon: Radio,
    color: "blue",
    href: "/dashboard/broadcast/compose",
    badge: "3 pending",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Generate Report",
    description: "Create analytics reports",
    icon: BarChart3,
    color: "green",
    href: "/dashboard/analytics",
    badge: "New data",
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "User Management",
    description: "Manage user accounts",
    icon: Users,
    color: "purple",
    href: "/dashboard/users",
    badge: "12.8K users",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "System Settings",
    description: "Configure system",
    icon: Settings,
    color: "orange",
    href: "/dashboard/settings",
    badge: null,
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Maintenance Mode",
    description: "System maintenance",
    icon: Wrench,
    color: "yellow",
    href: "/dashboard/maintenance",
    badge: "Scheduled",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    title: "View Logs",
    description: "System logs & events",
    icon: FileText,
    color: "slate",
    href: "/dashboard/analytics",
    badge: "Live",
    gradient: "from-slate-500 to-slate-600",
  },
]

export function ModernQuickActions() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Frequently used admin functions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-slate-600">Fast Access</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
                />

                {/* Content */}
                <div className="relative space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${action.gradient} shadow-sm`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                        {action.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>

                  {/* Action indicator */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">Click to access</span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
