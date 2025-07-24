"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import FilterBar from "@/components/mot/FilterBar"
import MessageTabs from "@/components/mot/MessageTabs"
import PendingMessagesTable from "@/components/mot/PendingMessagesTable"
import { usePagination, Pagination } from '@/components/mot/pagination'

// Data directly in the page
import type { BroadcastMessage } from "@/components/mot/PendingMessagesTable"

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
    {
        id: "BM009",
        title: "Weather Alert - Heavy Rains Expected in Southern Province",
        body: "Meteorological Department warns of heavy rainfall in Southern Province from December 3-5. Routes to Galle, Matara, and Hambantota may experience delays. Drivers are advised to exercise caution and reduce speed on wet roads.",
        targetGroups: ["Drivers", "Bus Operators", "Passengers"],
        priority: "High",
        category: "Emergency",
        scheduledTime: "2024-12-03 06:00",
        status: "Pending",
        createdAt: "2024-12-02 18:30",
    },
    {
        id: "BM010",
        title: "New Bus Terminal Opening - Maharagama",
        body: "The new Maharagama Bus Terminal will commence operations from December 15th, 2024. All routes currently terminating at Maharagama Junction will be redirected to the new terminal. Updated route maps and schedules are available at regional offices.",
        targetGroups: ["Bus Operators", "Drivers", "Passengers"],
        priority: "Medium",
        category: "Route Update",
        scheduledTime: "2024-12-10 09:00",
        status: "Pending",
        createdAt: "2024-12-01 12:45",
    },
]

export default function PendingMessages() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // Breadcrumb configuration
  const getBreadcrumbs = () => {
    return [
      {
        label: "Broadcast Messages",
        href: "/mot/broadcast-messages",
        current: false
      },
      {
        label: "Pending Messages",
        href: null,
        current: true
      }
    ]
  }

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

  // Pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedMessages,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredMessages, 10) // 10 items per page by default

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
      count: filteredMessages.length, // Show filtered count in tab
      active: true,
      onClick: () => { }
    }
  ]

  const priorityOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]

  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Pending Messages"
      pageDescription="Manage pending broadcast messages"
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="text-gray-400 mx-2">/</span>
                  )}

                  {breadcrumb.current ? (
                    <span className="text-sm font-medium text-gray-900">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => router.push(breadcrumb.href!)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {breadcrumb.label}
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Message Count Summary */}
        <div className="flex items-center justify-between">

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
          messages={paginatedMessages} // Changed from filteredMessages to paginatedMessages
          onEdit={handleEdit}
          onView={handleView}
          onSend={handleSend}
          onDelete={handleDelete}
        />

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />

        {/* Optional: Add filter status if needed (only when no results) */}
        {(searchTerm || groupFilter || statusFilter || dateFilter) && totalItems === 0 && (
          <div className="text-center text-sm text-gray-500 py-4">
            <span className="text-blue-600">No pending messages match the selected filters</span>
          </div>
        )}
      </div>
    </Layout>
  )
}