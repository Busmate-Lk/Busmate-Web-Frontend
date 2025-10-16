"use client"

import { useState } from "react"
import { Button } from "@/components/admin/ui/button"
import { Input } from "@/components/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table"
import { Checkbox } from "@/components/admin/ui/checkbox"
import { Badge } from "@/components/admin/ui/badge"
import { Calendar, Search, Eye, Edit, Trash2, Send, Filter } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const messages = [
  {
    id: 1,
    dateTime: "2024-01-15 14:30",
    title: "System Maintenance Scheduled",
    type: "Maintenance",
    targetAudience: "All Users",
    recipients: "12,847",
    status: "Delivered",
    openRate: "84.2%",
    typeColor: "bg-purple-100 text-purple-800",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    dateTime: "2024-01-14 09:15",
    title: "Service Alert: Route 138 Delay",
    type: "Warning",
    targetAudience: "Western Province",
    recipients: "8,456",
    status: "Delivered",
    openRate: "91.5%",
    typeColor: "bg-yellow-100 text-yellow-800",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    dateTime: "2024-01-13 16:45",
    title: "New Feature Release Announcement",
    type: "Info",
    targetAudience: "All Users",
    recipients: "12,847",
    status: "Failed",
    openRate: "0%",
    typeColor: "bg-blue-100 text-blue-800",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: 4,
    dateTime: "2024-01-12 11:30",
    title: "Security Update Required",
    type: "Critical",
    targetAudience: "Admin Users",
    recipients: "24",
    status: "Delivered",
    openRate: "100%",
    typeColor: "bg-red-100 text-red-800",
    statusColor: "bg-green-100 text-green-800",
  },
]

export function MessageHistory() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const handleSendMessage = () => {
    const base = pathname?.startsWith('/mot') ? '/mot' : '/admin'
    router.push(`${base}/notifications/compose`)
  }

  const handleMessageClick = (messageId: number) => {
    const base = pathname?.startsWith('/mot') ? '/mot' : '/admin'
    router.push(`${base}/notifications/detail/${messageId}`)
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
            <div className="flex items-center space-x-4">
              <Checkbox />
              <span className="text-sm text-gray-600 font-medium">Select All</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-red-50 text-red-700 hover:bg-red-100 shadow-sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Message Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Recipients</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleMessageClick(message.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{message.dateTime}</TableCell>
                <TableCell>
                  <div className="font-semibold text-gray-900">{message.title}</div>
                  <div className="text-sm text-gray-500 font-medium">{message.targetAudience}</div>
                </TableCell>
                <TableCell>
                  <Badge className={message.typeColor}>
                    {message.type === "Maintenance" && "🔧"}
                    {message.type === "Critical" && "🚨"}
                    {message.type === "Warning" && "⚠️"}
                    {message.type === "Info" && "ℹ️"}
                    {" " + message.type}
                  </Badge>
                </TableCell>
                <TableCell>{message.recipients}</TableCell>
                <TableCell>
                  <Badge className={message.statusColor}>
                    {message.status === "Delivered" && "✓"}
                    {message.status === "Failed" && "✗"}
                    {" " + message.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={message.status === "Delivered" ? "text-green-600" : "text-gray-400"}>
                    {message.openRate}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleMessageClick(message.id)}>
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm">
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
          <p className="text-sm text-gray-600 font-medium">Showing 1 to 4 of 97 results</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="shadow-sm">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
              1
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              2
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              3
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
