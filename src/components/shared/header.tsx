"use client"

import { Bus, ChevronDown, Bell, User, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"

interface HeaderProps{
  pageTitle?:string
  pageDescription?:string
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'info' | 'warning' | 'success' | 'error'
  redirectUrl?: string
  isRead: boolean
}

export function Header({pageTitle,pageDescription}:HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const { user, signOut } = useAuth()
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  
  // Sample notifications - replace with actual data from your API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Bus Registration',
      message: 'Bus #LK-1234 has been registered successfully',
      time: '2 minutes ago',
      type: 'success',
      redirectUrl: '/buses',
      isRead: false
    },
    {
      id: '2',
      title: 'Route Update',
      message: 'Route Colombo-Kandy has been modified',
      time: '1 hour ago',
      type: 'info',
      redirectUrl: '/routes',
      isRead: false
    },
    {
      id: '3',
      title: 'Maintenance Alert',
      message: 'Bus #LK-5678 requires maintenance',
      time: '3 hours ago',
      type: 'warning',
      redirectUrl: '/maintenance',
      isRead: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) {
      return "Good morning"
    } else if (hour < 17) {
      return "Good afternoon"
    } else {
      return "Good evening"
    }
  }

  const getUserDisplayName = () => {
    if (!user) return "User"
    
    // Extract first name from email or use email
    const emailName = user.email.split('@')[0]
    return emailName.charAt(0).toUpperCase() + emailName.slice(1)
  }

  const getUserInitials = () => {
    if (!user) return "U"
    
    const displayName = getUserDisplayName()
    const parts = displayName.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return displayName.substring(0, 2).toUpperCase()
  }

  const getRoleDisplayName = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'systemadmin':
      case 'system-admin':
        return 'System Administrator'
      case 'fleetoperator':
      case 'operator':
        return 'Fleet Operator'
      case 'timekeeper':
        return 'Timekeeper'
      case 'mot':
        return 'MOT Official'
      default:
        return role || 'User'
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    )
    
    // Redirect to relevant page
    if (notification.redirectUrl) {
      // Replace with your routing logic (e.g., router.push for Next.js)
      window.location.href = notification.redirectUrl
    }
    
    setIsNotificationOpen(false)
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return 'ℹ️'
    }
  }

  const handleLogout = async () => {
    try {
      // Close dropdown first
      setIsDropdownOpen(false)
      
      // Use the signOut function from useAuth hook
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, still try to clear everything and redirect
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 h-20 flex items-center sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        <div>
          {pageTitle ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
              {pageDescription && <p className="text-sm text-slate-600 mt-0.5">{pageDescription}</p>}
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, {getUserDisplayName()}!
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">Welcome back to BUSMATE LK Transportation Dashboard</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen)
                setIsDropdownOpen(false) // Close other dropdown
              }}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>
            
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No notifications yet</p>
                    <p className="text-xs text-gray-400 mt-1">We'll notify you when something important happens</p>
                  </div>
                ) : (
                  <div className="py-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors ${
                          notification.isRead 
                            ? 'border-transparent bg-gray-50/50' 
                            : 'border-blue-500 bg-blue-50/30'
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${
                                notification.isRead ? 'text-gray-600' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className={`text-xs mt-1 ${
                              notification.isRead ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
                setIsNotificationOpen(false) // Close other dropdown
              }}
              aria-label="User menu"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-semibold">{getUserInitials()}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">{getUserDisplayName()}</div>
                <div className="text-xs text-slate-500">
                  {user ? getRoleDisplayName(user.user_role) : 'User'}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{getUserInitials()}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{getUserDisplayName()}</p>
                      <p className="text-sm text-gray-500">{user?.email || "user@busmate.lk"}</p>
                    </div>
                  </div>
                </div>
                
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button 
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}