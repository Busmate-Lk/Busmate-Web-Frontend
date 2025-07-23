"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import FilterBar from "@/components/mot/FilterBar"
import MessageTabs from "@/components/mot/MessageTabs"
import SentMessagesTable from "@/components/mot/SentMessagesTable"

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
  const [groupFilter, setGroupFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const sentMessages = broadcastMessages.filter((message) => message.status === "Sent")

  const handleView = (message: BroadcastMessage) => {
    console.log("Viewing message:", message.id)
  }

  const handleDelete = (message: BroadcastMessage) => {
    console.log("Deleting message:", message.id)
    // Add delete logic here
  }

  const tabs = [
    {
      id: "sent",
      label: "Sent Messages",
      count: sentMessages.length,
      active: true,
      onClick: () => {}
    }
  ]

  const statusOptions = [
    { value: "", label: "All" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ]

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Sent Messages"
      pageDescription="View sent broadcast messages"
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

        <FilterBar
          groupFilter={groupFilter}
          setGroupFilter={setGroupFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusOptions={statusOptions}
          dateLabel="Sent Date"
        />

        <MessageTabs tabs={tabs} />

        <SentMessagesTable 
          messages={sentMessages}
          onView={handleView}
          onDelete={handleDelete}
        />

        {/* Message count display */}
        <div className="text-sm text-gray-600">
          Showing {sentMessages.length} sent messages
        </div>
      </div>
    </Layout>
  )
}