"use client"

import { useState } from "react"
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
  const [groupFilter, setGroupFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const pendingMessages = broadcastMessages.filter((message) => message.status === "Pending")

  const handleEdit = (message: BroadcastMessage) => {
    console.log("Editing message:", message.id)
  }

  const handleView = (message: BroadcastMessage) => {
    console.log("Viewing message:", message.id)
  }

  const handleSend = (message: BroadcastMessage) => {
    console.log("Sending message:", message.id)
    // Add send logic here
  }

  const handleDelete = (message: BroadcastMessage) => {
    console.log("Deleting message:", message.id)
    // Add delete logic here
  }

  const tabs = [
    {
      id: "pending",
      label: "Pending Messages",
      count: pendingMessages.length,
      active: true,
      onClick: () => {}
    }
  ]

  const priorityOptions = [
    { value: "", label: "All" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ]

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Pending Messages"
      pageDescription="Manage pending broadcast messages"
      role="mot"
    >
      <div className="space-y-6">
        <FilterBar
          groupFilter={groupFilter}
          setGroupFilter={setGroupFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusOptions={priorityOptions}
          dateLabel="Scheduled Date"
        />

        <MessageTabs tabs={tabs} />

        <PendingMessagesTable 
          messages={pendingMessages} 
          onEdit={handleEdit}
          onView={handleView}
          onSend={handleSend}
          onDelete={handleDelete}
        />

        {/* Message count display */}
        <div className="text-sm text-gray-600">
          Showing {pendingMessages.length} pending messages
        </div>
      </div>
    </Layout>
  )
}