"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import FilterBar from "@/components/mot/FilterBar"
import MessageTabs from "@/components/mot/MessageTabs"
import MessageManagementTable from "@/components/mot/MessageManagementTable"

// Type definition for broadcast messages
type BroadcastMessage = {
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

// Data directly in the page
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

export default function MessageManagement() {
    const router = useRouter()
    const [groupFilter, setGroupFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [activeTab, setActiveTab] = useState<"pending" | "sent">("pending")

    const filteredMessages = broadcastMessages.filter((message) => {
        if (activeTab === "pending") return message.status === "Pending"
        if (activeTab === "sent") return message.status === "Sent"
        return true
    })

    const pendingCount = broadcastMessages.filter((m) => m.status === "Pending").length
    const sentCount = broadcastMessages.filter((m) => m.status === "Sent").length

    const tabs = [
        {
            id: "pending" as const,
            label: "Pending Messages",
            count: pendingCount,
            active: activeTab === "pending",
            onClick: () => {
                setActiveTab("pending")
                router.push('/mot/Pending-Messages')
            },
        },
        {
            id: "sent" as const,
            label: "Sent Messages",
            count: sentCount,
            active: activeTab === "sent",
            onClick: () => {
                setActiveTab("sent")
                router.push('/mot/Sent-Messages')
            },
        },
    ]

    const handleView = (message: BroadcastMessage) => {
        console.log("Viewing message:", message.id)
    }

    const handleEdit = (message: BroadcastMessage) => {
        console.log("Editing message:", message.id)
    }

    const handleSend = (message: BroadcastMessage) => {
        console.log("Sending message:", message.id)
        // Add send logic here
    }

    const handleDelete = (message: BroadcastMessage) => {
        console.log("Deleting message:", message.id)
        // Add delete logic here
    }

    return (
        <Layout
            activeItem="broadcast"
            pageTitle="Message Management"
            pageDescription="Manage broadcast messages for bus operators, drivers, and passengers"
            role="mot"
        >
            <div className="space-y-6">
                {/* Quick Navigation */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => router.push('/mot/Pending-Messages')}
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
                    >
                        📝 View Pending ({pendingCount})
                    </button>
                    <button
                        onClick={() => router.push('/mot/Sent-Messages')}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
                    >
                        ✅ View Sent ({sentCount})
                    </button>
                </div>

                <FilterBar
                    groupFilter={groupFilter}
                    setGroupFilter={setGroupFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />

                <MessageTabs tabs={tabs} />

                <MessageManagementTable
                    messages={filteredMessages}
                    onView={handleView}
                    onEdit={handleEdit}
                    onSend={handleSend}
                    onDelete={handleDelete}
                />

                {/* Message count display */}
                <div className="text-sm text-gray-600">
                    Showing {filteredMessages.length} of {broadcastMessages.length} messages
                </div>
            </div>
        </Layout>
    )
}