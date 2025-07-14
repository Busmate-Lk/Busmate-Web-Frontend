import { Bus, ChevronDown, Bell, User, LogOut } from "lucide-react"
import { useState } from "react"

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

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 h-20 flex items-center sticky top-0 z-40">
      <div className="flex items-center justify-between w-full">
      <div>
              {pageTitle ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
                  {pageDescription && <p className="text-slate-600">{pageDescription}</p>}
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}, Admin!</h1>
                  <p className="text-slate-600">Welcome back to BUSMATE LK Transportation Dashboard</p>
                </>
              )}
            </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell 
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100">
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
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
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

          <div className="relative">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JM</span>
              </div>
              <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Admin User</div>
                    <div className="text-xs text-slate-500">Administrator</div>
              </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
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