"use client"

import { NotificationDropdown } from "@/components/admin/notification-dropdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Badge } from "@/components/admin/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { User, LogOut, Search, Settings, Command } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
    title: string
    subtitle?: string
    showSearch?: boolean
    showPerformanceIndicator?: boolean
    actions?: React.ReactNode
    className?: string
}

export function PageHeader({
    title,
    subtitle,
    showSearch = true,
    showPerformanceIndicator = false,
    actions,
    className = ""
}: PageHeaderProps) {
    return (
        <header className={`sticky top-0 z-50 px-2 py-3 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl mb-6 ${className}`}>
            <div className="flex h-16 items-center justify-between px-6">
                {/* Left section */}
                <div className="flex items-center space-x-6">
                    {/* Title section */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
                        )}
                    </div>

                    {/* Search bar */}
                    {showSearch && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Search anything... (⌘K)"
                                className="w-80 pl-10 pr-4 bg-slate-50/50 border-slate-200/60 focus:bg-white transition-colors"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-600">
                                    <Command className="h-3 w-3 mr-1" />K
                                </Badge>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-3">
                    {/* Custom actions */}
                    {actions && (
                        <div className="flex items-center space-x-3 mr-3">
                            {actions}
                        </div>
                    )}

                    {/* Notifications */}
                    <NotificationDropdown />

                    {/* User menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-auto rounded-full pl-2 pr-3 hover:bg-slate-100">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <Avatar className="h-8 w-8 ring-2 ring-white shadow-md">
                                            <AvatarImage src="/placeholder.svg" />
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                                AU
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-slate-900">Admin User</p>
                                        <p className="text-xs text-slate-500">System Administrator</p>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-2" align="end">
                            <DropdownMenuLabel className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            AU
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-slate-900">Admin User</p>
                                        <p className="text-sm text-slate-500">admin@busmate.lk</p>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/dashboard/profile" className="flex items-center space-x-2 p-2 rounded-md">
                                    <User className="h-4 w-4" />
                                    <span>Profile Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="h-4 w-4 mr-2" />
                                <span>Account Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                <LogOut className="h-4 w-4 mr-2" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
