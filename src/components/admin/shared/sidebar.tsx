"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, MessageSquare, BarChart3, Settings, ChevronRight, FileText } from "lucide-react"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Notification Center",
    href: "/admin/notifications",
    icon: MessageSquare,
  },
  {
    name: "System Monitoring",
    href: "/admin/monitoring",
    icon: BarChart3,
  },
  {
    name: "System Logs",
    href: "/admin/logs",
    icon: FileText,
  },
  {
    name: "System Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-80 bg-[#1E40AE] text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="px-8 py-3 bg-[#1E40AE] border-b border-blue-700">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-lg flex items-center justify-center">
            <Image
              src="/Busmate Lk.svg"
              alt="Busmate LK Logo"
              width={96}
              height={96}
              className="w-20 h-20"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">BUSMATE LK</h1>
            <p className="text-blue-200 text-sm font-medium">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/admin" && pathname === "/admin") ||
              (item.href === "/admin/notifications" && pathname.startsWith("/admin/notifications")) ||
              (item.href === "/admin/users" && pathname.startsWith("/admin/users")) ||
              (item.href === "/admin/monitoring" && pathname.startsWith("/admin/monitoring")) ||
              (item.href === "/admin/logs" && pathname.startsWith("/admin/logs")) ||
              (item.href === "/admin/settings" && pathname.startsWith("/admin/settings"))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ease-in-out",
                  isActive
                    ? "bg-white text-[#1E40AE]"
                    : "text-white hover:bg-blue-700 hover:text-white"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isActive
                    ? "text-[#1E40AE]"
                    : "text-blue-200 group-hover:text-white"
                )} />
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-blue-700">
        <div className="flex items-center space-x-3 p-4 bg-blue-700 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">System Online</p>
            <p className="text-xs text-blue-200">All services operational</p>
          </div>
        </div>
      </div>
    </div>
  )
}
