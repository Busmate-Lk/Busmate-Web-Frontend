"use client"

import { Bus, Users, BarChart3, Calendar, MapPin, Route } from "lucide-react"
import Link from "next/link"

interface SidebarItem {
    icon: any
    label: string
    active: boolean
    href: string
}

interface SidebarProps {
    activeItem?: string
}

export function Sidebar({ activeItem = "dashboard" }: SidebarProps) {
    const sidebarItems: SidebarItem[] = [
        { icon: BarChart3, label: "Dashboard", active: activeItem === "dashboard", href: "/operator/dashboard" },
        { icon: Calendar, label: "Schedule Management", active: activeItem === "schedule", href: "/operator/scheduleManagement" },
        { icon: Bus, label: "Fleet management", active: activeItem === "fleet", href: "/operator/fleetmanagement" },
        { icon: MapPin, label: "Bus Tracking", active: activeItem === "tracking", href: "/operator/busTracking" },
        { icon: Users, label: "Staff management", active: activeItem === "staff", href: "/operator/staffManagement" },
        { icon: Route, label: "Route Permit management", active: activeItem === "permits", href: "/operator/routepermit" },
    ]

    return (
        <div className="w-64 bg-blue-900 text-white">
            <div className="p-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                        <Bus className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">BUSMATE LK</h1>
                        {/* <p className="text-blue-200 text-sm">Admin Portal</p> */}
                    </div>
                </div>

                <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        
                            <Link
                                key={index}
                                href={item.href}
                                className={`w-full flex items-center justify-start gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${item.active ? "bg-yellow-500 text-blue-900 hover:bg-yellow-500" : "text-white hover:bg-blue-800"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        
                    ))}
                </nav>
            </div>
        </div>
    )
}
