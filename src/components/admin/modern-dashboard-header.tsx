"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/ui/avatar"
import { Badge } from "@/components/admin/ui/badge"
import { Search, Settings, User, LogOut, Moon, Sun, Command, Zap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu"
import { NotificationDropdown } from "@/components/admin/notification-dropdown"
import Link from "next/link"

export function ModernDashboardHeader() {
  const [isDark, setIsDark] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
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
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Performance indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">99.9% Uptime</span>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="relative h-9 w-9 rounded-full hover:bg-slate-100"
          >
            {isDark ? <Sun className="h-4 w-4 text-slate-600" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </Button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Settings */}
          <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full hover:bg-slate-100">
            <Settings className="h-4 w-4 text-slate-600" />
          </Button>

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
