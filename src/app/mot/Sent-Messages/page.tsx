"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import FilterBar from "@/components/mot/FilterBar"
import MessageTabs from "@/components/mot/MessageTabs"
import SentMessagesTable from "@/components/mot/SentMessagesTable"
import { usePagination, Pagination } from '@/components/mot/pagination'

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
    id: "BM001",
    title: "Route 138 Service Disruption - Colombo to Matara",
    body: "Due to road construction on Galle Road near Kalutara, Route 138 services will be delayed by 30-45 minutes from 9:00 AM to 5:00 PM today. Alternative routes via A2 highway are recommended.",
    targetGroups: ["Bus Operators", "Drivers", "Passengers"],
    priority: "High",
    category: "Route Update",
    scheduledTime: "2024-12-01 08:00",
    status: "Sent",
    createdAt: "2024-12-01 07:30",
    sentAt: "2024-12-01 08:00",
  },
  {
    id: "BM003",
    title: "Mandatory Vehicle Inspection Reminder - December 2024",
    body: "All bus operators are reminded that annual vehicle inspections must be completed before December 31st, 2024. Inspection centers are available in Colombo, Kandy, Galle, and Kurunegala.",
    targetGroups: ["Bus Operators", "Fleet Operators"],
    priority: "Medium",
    category: "Maintenance",
    scheduledTime: "2024-12-01 10:00",
    status: "Sent",
    createdAt: "2024-11-25 16:45",
    sentAt: "2024-12-01 10:00",
  },
  {
    id: "BM006",
    title: "Fuel Subsidy Program Update - December 2024",
    body: "The government fuel subsidy program for public transport continues for December 2024. Eligible operators can claim Rs. 15 per liter subsidy for diesel.",
    targetGroups: ["Bus Operators", "Fleet Operators"],
    priority: "Medium",
    category: "Policy",
    scheduledTime: "2024-12-01 12:00",
    status: "Sent",
    createdAt: "2024-11-28 09:30",
    sentAt: "2024-12-01 12:00",
  },
  {
    id: "BM007",
    title: "Holiday Schedule Changes - Christmas & New Year 2024",
    body: "Special holiday schedules will be in effect from December 24th to January 2nd. Increased frequency on popular routes to Kandy, Galle, and Anuradhapura.",
    targetGroups: ["All Users"],
    priority: "Medium",
    category: "General",
    scheduledTime: "2024-12-01 16:00",
    status: "Sent",
    createdAt: "2024-11-29 13:45",
    sentAt: "2024-12-01 16:00",
  },
]

export default function SentMessages() {
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
        label: "Sent Messages",
        href: null,
        current: true
      }
    ]
  }

  // Filter messages using useMemo for better performance
  const filteredMessages = useMemo(() => {
    return broadcastMessages.filter((message) => {
      // Only show sent messages
      if (message.status !== "Sent") return false;

      // Search filter
      const matchesSearch = !searchTerm || searchTerm.trim() === '' ||
        message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.id.toLowerCase().includes(searchTerm.toLowerCase())

      // Group filter
      const matchesGroup = !groupFilter || groupFilter === '' ||
        message.targetGroups.includes(groupFilter)

      // Status/Priority filter (repurposed for priority)
      const matchesStatus = !statusFilter || statusFilter === '' ||
        (statusFilter === "high" && message.priority === "High") ||
        (statusFilter === "medium" && message.priority === "Medium") ||
        (statusFilter === "low" && message.priority === "Low")

      // Date filter (check sent date)
      const matchesDate = !dateFilter || dateFilter === '' ||
        (message.sentAt && message.sentAt.startsWith(dateFilter))

      return matchesSearch && matchesGroup && matchesStatus && matchesDate
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

  const handleView = (message: BroadcastMessage) => {
    console.log("Viewing message:", message.id)
    router.push(`/mot/broadcast-message-view?id=${message.id}`)
  }

  const handleDelete = (message: BroadcastMessage) => {
    console.log("Deleting message:", message.id)
    // Add delete logic here
  }

  const tabs = [
    {
      id: "sent",
      label: "Sent Messages",
      count: filteredMessages.length,
      active: true,
      onClick: () => { }
    }
  ]

  const statusOptions = [
    { value: "", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]

  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Sent Messages"
      pageDescription="View sent broadcast messages"
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

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          groupFilter={groupFilter}
          setGroupFilter={setGroupFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusOptions={statusOptions}
          dateLabel="Sent Date"
          searchPlaceholder="Search by title, content, or message ID..."
        />

        <MessageTabs tabs={tabs} />

        <SentMessagesTable
          messages={paginatedMessages}
          onView={handleView}
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
      </div>
    </Layout>
  )
}