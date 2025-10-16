"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { Badge } from "@/components/admin/ui/badge"
import { Calendar, Search, Eye, Edit, Trash2, Send, Filter } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { listNotifications, deleteNotification as apiDeleteNotification, type NotificationListItem } from "@/lib/services/notificationService"
import { useAuth } from "@/context/AuthContext"

function formatDate(dt?: string) {
  if (!dt) return ''
  const d = new Date(dt)
  if (isNaN(d.getTime())) return dt
  return d.toLocaleString()
}

export function MessageHistory() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [items, setItems] = useState<NotificationListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          setLoading(true)
          const data = await listNotifications(100)
          if (mounted) setItems(data)
        } catch (e: any) {
          if (mounted) setError(e?.message || 'Failed to load sent notifications')
        } finally {
          if (mounted) setLoading(false)
        }
      })()
    return () => { mounted = false }
  }, [])

  const handleSendMessage = () => {
    const base = pathname?.startsWith('/mot') ? '/mot' : '/admin'
    router.push(`${base}/notifications/compose`)
  }

  const handleMessageClick = (messageId: string | number) => {
    const base = pathname?.startsWith('/mot') ? '/mot' : '/admin'
    router.push(`${base}/notifications/detail/${messageId}`)
  }

  const filtered = useMemo(() => {
    const mine = items.filter(m => !user?.id || !m.adminId ? true : m.adminId === user.id)
    return mine.filter(m => {
      const s = searchTerm.trim().toLowerCase()
      if (!s) return true
      return m.title.toLowerCase().includes(s) || m.body.toLowerCase().includes(s)
    })
  }, [items, searchTerm, user?.id])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notification?')) return
    try {
      await apiDeleteNotification(id)
      setItems(prev => prev.filter(x => x.notificationId !== id))
    } catch (e: any) {
      alert(e?.message || 'Failed to delete')
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 shadow-sm"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`shadow-sm ${showFilters ? "bg-blue-50" : ""}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message Type</label>
              <Select>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <Select>
                <SelectTrigger className="shadow-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="shadow-lg">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
              <div className="relative">
                <Input placeholder="Select date range" className="shadow-sm" />
                <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="bg-blue-500/90 text-white hover:bg-blue-600 w-full shadow-md">Apply Filters</Button>
            </div>
          </div>
        )}
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4" />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleSendMessage} className="shadow-sm">
                <Send className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date/Time</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
            )}
            {error && !loading && (
              <TableRow><TableCell colSpan={5} className="text-red-600">{error}</TableCell></TableRow>
            )}
            {!loading && !error && filtered.length === 0 && (
              <TableRow><TableCell colSpan={5}>No sent notifications</TableCell></TableRow>
            )}
            {!loading && !error && filtered.map((m) => (
              <TableRow
                key={m.notificationId}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleMessageClick(m.notificationId)}
              >
                <TableCell className="font-medium">{formatDate(m.createdAt)}</TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-900">{m.title}</div>
                </TableCell>
                <TableCell>
                  <Badge className={
                    (m.messageType === 'critical' && 'bg-red-100 text-red-800') ||
                    (m.messageType === 'warning' && 'bg-yellow-100 text-yellow-800') ||
                    (m.messageType === 'info' && 'bg-blue-100 text-blue-800') ||
                    'bg-gray-100 text-gray-800'}>
                    {m.messageType || 'info'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{m.targetAudience || 'all'}</Badge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleMessageClick(m.notificationId)}>
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(m.notificationId)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-b-lg flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">Showing {filtered.length} result(s)</p>
          <div className="flex items-center space-x-2">
            {/* Pagination can be added when backend supports it */}
          </div>
        </div>
      </div>
    </div>
  )
}
