"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { Button } from "@/components/admin/ui/button"
import { NotificationDropdown } from "@/components/admin/notifications/notification-dropdown"
import { User, LogOut, Settings } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
    title: string
    description?: string
}

export function Header({ title, description }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl mb-6">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Left section - Dashboard Title */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {description && <p className="text-sm text-gray-600 mt-0.5">{description}</p>}
                </div>

                {/* Right section - Notifications & Profile */}
                <div className="flex items-center space-x-3">
                    {/* Notifications */}
                    <NotificationDropdown />

                    {/* User Profile Menu */}
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
                                <Link href="/admin/profile" className="flex items-center space-x-2 p-2 rounded-md">
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
