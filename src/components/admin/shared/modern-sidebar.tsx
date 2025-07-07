"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/admin/ui/button"
import { Badge } from "@/components/admin/ui/badge"
import {
  Bus,
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
    description: "Overview & Analytics",
  },
  {
    name: "User Management",
    href: "/dashboard/users",
    icon: Users,
    badge: "12.8K",
    description: "Manage all users",
  },
  {
    name: "Broadcast Messaging",
    href: "/dashboard/broadcast/history",
    icon: MessageSquare,
    badge: "3",
    description: "Send notifications",
  },
  {
    name: "System Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: null,
    description: "Logs & Reports",
  },
  {
    name: "System Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
    description: "Configuration",
  },
]

export function ModernSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72",
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  BUSMATE LK
                </h1>
                <p className="text-slate-400 text-sm">Admin Portal</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard/broadcast/history" && pathname.startsWith("/dashboard/broadcast")) ||
            (item.href === "/dashboard/users" && pathname.startsWith("/dashboard/users")) ||
            (item.href === "/dashboard/analytics" && pathname.startsWith("/dashboard/analytics")) ||
            (item.href === "/dashboard/settings" && pathname.startsWith("/dashboard/settings"))

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "group relative flex items-center rounded-xl transition-all duration-200 ease-in-out",
                  isCollapsed ? "p-3 justify-center" : "p-4",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 text-white"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={cn(
                      "transition-transform duration-200",
                      isActive ? "h-5 w-5 scale-110" : "h-5 w-5 group-hover:scale-105",
                    )}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                    </div>
                  )}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        {!isCollapsed ? (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">System Status</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Performance</span>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="text-yellow-400 font-medium">Excellent</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Security</span>
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-blue-400" />
                <span className="text-blue-400 font-medium">Protected</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Zap className="h-4 w-4 text-yellow-400" />
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
        )}
      </div>
    </div>
  )
}
