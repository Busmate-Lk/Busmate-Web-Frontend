"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import FilterBar from "@/components/mot/FilterBar"
import MessageTabs from "@/components/mot/MessageTabs"
import PendingMessagesTable from "@/components/mot/PendingMessagesTable"

// Data directly in the page
export interface BroadcastMessage {
  id: string
  title: string
  body: string
  targetGroups: string[]
  priority: "High" | "Medium" | "Low"
  category: string
  scheduledTime: string
  status: "Sent" | "Pending"
  createdAt: string
  sentAt?: string
}

const broadcastMessages: BroadcastMessage[] = [
  {
    id: "BM002",
    title: "New Fare Structure Implementation - Effective January 1st, 2025",
    body: "The Ministry of Transport announces new fare structures for all SLTB and private bus services effective January 1st, 2025. AC buses: Rs. 3.50 per km, Non-AC buses: Rs. 2.80 per km.",
    targetGroups: ["Bus Operators", "Conductors", "Fleet Operators"],
    priority: "High",
    category: "Policy",
    scheduledTime: "2024-12-15 09:00",
    status: "Pending",
    createdAt: "2024-11-28 14:20",
  },
  {
    id: "BM004",
    title: "Driver Training Program - Road Safety Initiative",
    body: "The National Transport Commission is conducting mandatory road safety training for all bus drivers. Sessions will be held from January 15-30, 2025, across all provinces.",
    targetGroups: ["Drivers", "Bus Operators"],
    priority: "Medium",
    category: "Training",
    scheduledTime: "2024-12-10 14:00",
    status: "Pending",
    createdAt: "2024-11-30 11:15",
  },
  {
    id: "BM005",
    title: "Emergency Contact System Activation",
    body: "New emergency contact system is now active. In case of accidents or breakdowns, drivers can call 1919 for immediate assistance. GPS tracking will help locate vehicles quickly.",
    targetGroups: ["Drivers", "Conductors", "Bus Operators"],
    priority: "High",
    category: "Emergency",
    scheduledTime: "2024-12-02 08:00",
    status: "Pending",
    createdAt: "2024-12-01 15:20",
  },
  {
    id: "BM008",
    title: "Digital Ticketing System Rollout - Phase 2",
    body: "Phase 2 of digital ticketing system launches in Colombo, Kandy, and Galle from January 2025. QR code payments and mobile apps will be available.",
    targetGroups: ["Conductors", "Bus Operators"],
    priority: "Medium",
    category: "Technology",
    scheduledTime: "2024-12-05 11:00",
    status: "Pending",
    createdAt: "2024-12-01 08:15",
  },
]

export default function PendingMessages() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // Filter messages using useMemo for better performance
  const filteredMessages = useMemo(() => {
    return broadcastMessages.filter((message) => {
      // Only show pending messages
      if (message.status !== "Pending") return false;

      // Search filter
      const matchesSearch = !searchTerm || searchTerm.trim() === '' ||
        message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Group filter
      const matchesGroup = !groupFilter || groupFilter === '' || 
        message.targetGroups.includes(groupFilter)

      // Priority filter (repurposed statusFilter for priority)
      const matchesPriority = !statusFilter || statusFilter === '' || 
        (statusFilter === "high" && message.priority === "High") ||
        (statusFilter === "medium" && message.priority === "Medium") ||
        (statusFilter === "low" && message.priority === "Low")

      // Date filter (check scheduled date)
      const matchesDate = !dateFilter || dateFilter === '' ||
        (message.scheduledTime && message.scheduledTime.startsWith(dateFilter))

      return matchesSearch && matchesGroup && matchesPriority && matchesDate
    })
  }, [broadcastMessages, searchTerm, groupFilter, statusFilter, dateFilter])

  const handleEdit = (message: BroadcastMessage) => {
    console.log("Editing message:", message.id)
    router.push(`/mot/edit-messages?id=${message.id}`)
  }

  const handleView = (message: BroadcastMessage) => {
    console.log("Viewing message:", message.id)
    router.push(`/mot/broadcast-message-view?id=${message.id}`)
  }

  const handleSend = (message: BroadcastMessage) => {
    console.log("Sending message:", message.id)
    // Add send logic here - could update message status to "Sent"
  }

  const handleDelete = (message: BroadcastMessage) => {
    console.log("Deleting message:", message.id)
    // Add delete logic here
  }

  const tabs = [
    {
      id: "pending",
      label: "Pending Messages",
      count: filteredMessages.length,
      active: true,
      onClick: () => {}
    }
  ]

  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Pending Messages"
      pageDescription="Manage pending broadcast messages"
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/mot/broadcast-messages')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Broadcast Messages
          </button>
        </div>

        {/* Enhanced Filter Bar with Search */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          groupFilter={groupFilter}
          setGroupFilter={setGroupFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusOptions={priorityOptions}
          dateLabel="Scheduled Date"
          searchPlaceholder="Search by title, content, category, or message ID..."
        />

        <MessageTabs tabs={tabs} />

        <PendingMessagesTable 
          messages={filteredMessages} 
          onEdit={handleEdit}
          onView={handleView}
          onSend={handleSend}
          onDelete={handleDelete}
        />

        {/* Enhanced Message count display with filter info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredMessages.length} of {broadcastMessages.filter(m => m.status === "Pending").length} pending messages
          </span>
          {(searchTerm || groupFilter || statusFilter || dateFilter) && (
            <span className="text-blue-600">
              {filteredMessages.length === 0 ? "No matches found" : "Filtered results"}
            </span>
          )}
        </div>
      </div>
    </Layout>
  )
}