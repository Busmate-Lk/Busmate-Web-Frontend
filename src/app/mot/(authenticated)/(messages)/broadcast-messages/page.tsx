"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import BroadcastStats from "@/components/mot/BroadcastStats"
import CreateMessageForm from "@/components/mot/CreateMessageForm"
import MessageBox, { BroadcastMessage } from "@/components/mot/MessageBox"
import BroadcastFilters from "@/components/mot/BroadcastFilters"
import MessagesTable from "@/components/mot/MessagesTable"
/*import QuickTemplates from "@/components/mot/QuickTemplates"*/
import {
    DeleteConfirmationModal,
} from '@/components/mot/confirmation-modals'
import {
    sendNotification,
    mapTargetGroupsToAudience,
    mapPriorityToMessageType,
    mapCategoryToMessageType
} from '@/lib/services/notificationService'

// Data directly in main file
const initialBroadcastMessages: BroadcastMessage[] = [
    {
        id: "BM001",
        title: "Route 02 Service Disruption - Colombo to Matara",
        body: "Due to road construction on Galle Road near Kalutara, Route 02 services will be delayed by 30-45 minutes from 9:00 AM to 5:00 PM today. Alternative routes via A2 highway are recommended. Passengers are advised to plan accordingly.",
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
        body: "The Ministry of Transport announces new fare structures for all SLTB and private bus services effective January 1st, 2025. AC buses: Rs. 3.50 per km, Non-AC buses: Rs. 2.80 per km. Student discounts remain at 50%. Please update your fare collection systems accordingly.",
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
        body: "All bus operators are reminded that annual vehicle inspections must be completed before December 31st, 2024. Inspection centers are available in Colombo, Kandy, Galle, and Kurunegala. Book your appointments early to avoid last-minute rush.",
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
        body: "The National Transport Commission is conducting mandatory road safety training for all bus drivers. Sessions will be held from January 15-30, 2025, across all provinces. Registration is now open. Contact your regional transport office for details.",
        targetGroups: ["Drivers", "Bus Operators"],
        priority: "Medium",
        category: "Training",
        scheduledTime: "2024-12-10 14:00",
        status: "Pending",
        createdAt: "2024-11-30 11:15",
    },
    {
        id: "BM005",
        title: "Fuel Subsidy Program Update - December 2024",
        body: "The government fuel subsidy program for public transport continues for December 2024. Eligible operators can claim Rs. 15 per liter subsidy for diesel. Submit your monthly fuel consumption reports by the 5th of each month to qualify.",
        targetGroups: ["Bus Operators", "Fleet Operators"],
        priority: "Medium",
        category: "Policy",
        scheduledTime: "2024-12-01 12:00",
        status: "Sent",
        createdAt: "2024-11-28 09:30",
        sentAt: "2024-12-01 12:00",
    },
    {
        id: "BM006",
        title: "Emergency Contact System Activation",
        body: "New emergency contact system is now active. In case of accidents or breakdowns, drivers can call 1919 for immediate assistance. GPS tracking will help locate vehicles quickly. All buses must have emergency contact stickers displayed.",
        targetGroups: ["Drivers", "Conductors", "Bus Operators"],
        priority: "High",
        category: "Emergency",
        scheduledTime: "2024-12-02 08:00",
        status: "Pending",
        createdAt: "2024-12-01 15:20",
    },
    {
        id: "BM007",
        title: "Holiday Schedule Changes - Christmas & New Year 2024",
        body: "Special holiday schedules will be in effect from December 24th to January 2nd. Increased frequency on popular routes to Kandy, Galle, and Anuradhapura. Night services extended until 11:00 PM. Check with your depot for specific route changes.",
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
        body: "Phase 2 of digital ticketing system launches in Colombo, Kandy, and Galle from January 2025. QR code payments and mobile apps will be available. Training sessions for conductors scheduled for December 15-20. Contact IT support for device installation.",
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

export default function Broadcast() {
    const router = useRouter()

    // State management for messages and modals
    const [broadcastMessages, setBroadcastMessages] = useState<BroadcastMessage[]>(initialBroadcastMessages)
    const [messageToDelete, setMessageToDelete] = useState<BroadcastMessage | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Filter states
    const [searchTerm, setSearchTerm] = useState("")
    const [priorityFilter, setPriorityFilter] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [targetGroupFilter, setTargetGroupFilter] = useState("")

    // Filter messages using useMemo for better performance
    const filteredMessages = useMemo(() => {
        return broadcastMessages.filter((message) => {
            // Search filter
            const matchesSearch = !searchTerm || searchTerm.trim() === '' ||
                message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.id.toLowerCase().includes(searchTerm.toLowerCase())

            // Priority filter
            const matchesPriority = !priorityFilter || priorityFilter === '' ||
                message.priority === priorityFilter

            // Category filter
            const matchesCategory = !categoryFilter || categoryFilter === '' ||
                message.category === categoryFilter

            // Status filter
            const matchesStatus = !statusFilter || statusFilter === '' ||
                message.status === statusFilter

            // Target group filter
            const matchesTargetGroup = !targetGroupFilter || targetGroupFilter === '' ||
                message.targetGroups.includes(targetGroupFilter)

            return matchesSearch && matchesPriority && matchesCategory && matchesStatus && matchesTargetGroup
        })
    }, [broadcastMessages, searchTerm, priorityFilter, categoryFilter, statusFilter, targetGroupFilter])

    const sentMessages = filteredMessages.filter((message) => message.status === "Sent")
    const pendingMessages = filteredMessages.filter((message) => message.status === "Pending")

    const handleSendMessage = async (messageData: any) => {
        try {
            console.log("Sending message:", messageData)

            // Map UI data to API format
            const targetAudience = mapTargetGroupsToAudience(messageData.selectedGroups)

            // Use category to determine message type if it's more specific, otherwise use priority
            let messageType = mapCategoryToMessageType(messageData.category)
            if (messageData.category === 'General') {
                messageType = mapPriorityToMessageType(messageData.priority)
            }

            // Send notification via the service
            const response = await sendNotification({
                title: messageData.messageTitle,
                subject: messageData.messageTitle, // Using title as subject
                body: messageData.messageBody,
                messageType: messageType,
                targetAudience: targetAudience,
            })

            console.log("Notification sent successfully:", response)

            // Create a new message record with the response data
            const newMessage: BroadcastMessage = {
                id: response.notificationId,
                title: messageData.messageTitle,
                body: messageData.messageBody,
                targetGroups: messageData.selectedGroups,
                priority: messageData.priority,
                category: messageData.category,
                scheduledTime: messageData.isScheduled ? messageData.scheduledTime : undefined,
                status: messageData.isScheduled ? "Pending" : "Sent",
                createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
                sentAt: messageData.isScheduled ? undefined : new Date().toISOString().replace('T', ' ').substring(0, 16),
            }

            // Add to the messages list
            setBroadcastMessages(prev => [newMessage, ...prev])

            // Show success message
            alert(`Message sent successfully!\n\nTotal Sent: ${response.stats.totalSent}\nSuccessful: ${response.stats.successful}\nFailed: ${response.stats.failed}\n\nWeb: ${response.stats.web.successful} successful, ${response.stats.web.failed} failed\nMobile: ${response.stats.mobile.successful} successful, ${response.stats.mobile.failed} failed`)

        } catch (error: any) {
            console.error("Error sending message:", error)
            alert(`Failed to send message: ${error.message || 'Unknown error occurred'}`)
            throw error // Re-throw to let the form handle it
        }
    }

    const handleSaveDraft = (messageData: any) => {
        console.log("Saving draft:", messageData)

        // Create a draft message record
        const draftMessage: BroadcastMessage = {
            id: `BM${String(broadcastMessages.length + 1).padStart(3, '0')}`,
            title: messageData.messageTitle,
            body: messageData.messageBody,
            targetGroups: messageData.selectedGroups,
            priority: messageData.priority,
            category: messageData.category,
            scheduledTime: messageData.isScheduled ? messageData.scheduledTime : undefined,
            status: "Pending",
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        }

        // Add to the messages list
        setBroadcastMessages(prev => [draftMessage, ...prev])

        alert("Draft saved successfully!")
    }

    // Edit handler function
    const handleEditMessage = (message: BroadcastMessage) => {
        // Only allow editing of pending messages
        if (message.status === "Sent") {
            alert("Sent messages cannot be edited. Please create a new message instead.")
            return
        }
        router.push(`/mot/edit-messages?id=${message.id}`)
    }

    // View handler function
    const handleViewMessage = (message: BroadcastMessage) => {
        router.push(`/mot/broadcast-message-view?id=${message.id}`)
    }

    // Delete handler function
    const handleDeleteMessage = (message: BroadcastMessage) => {
        setMessageToDelete(message)
        setShowDeleteModal(true)
    }

    // Confirm delete function
    const handleConfirmDelete = async () => {
        if (!messageToDelete) return

        setIsDeleting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Remove message from state
            setBroadcastMessages(prev =>
                prev.filter(msg => msg.id !== messageToDelete.id)
            )

            // Close modal and reset state
            setShowDeleteModal(false)
            setMessageToDelete(null)

            console.log("Message deleted successfully:", messageToDelete.id)
        } catch (error) {
            console.error("Error deleting message:", error)
            alert("Error deleting message. Please try again.")
        } finally {
            setIsDeleting(false)
        }
    }

    // Cancel delete function
    const handleCancelDelete = () => {
        setShowDeleteModal(false)
        setMessageToDelete(null)
    }

    // Schedule handler function
    const handleScheduleMessage = (message: BroadcastMessage) => {
        console.log("Schedule message:", message.id)
        // Implement scheduling logic here
    }

    return (
        <Layout
            activeItem="broadcast"
            pageTitle="Broadcast Messages"
            pageDescription="Manage and send notifications to bus operators, drivers, and passengers"
            role="mot"
        >
            <div className="space-y-6">
                <BroadcastStats
                    totalMessages={broadcastMessages.length}
                    sentMessages={sentMessages.length}
                    pendingMessages={pendingMessages.length}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CreateMessageForm
                        onSendMessage={handleSendMessage}
                        onSaveDraft={handleSaveDraft}
                    />

                    <MessageBox
                        messages={broadcastMessages}
                        sentMessages={sentMessages}
                        pendingMessages={pendingMessages}
                    />
                </div>

                {/* Filters Section */}
                <div className="mt-6">

                    <BroadcastFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                        categoryFilter={categoryFilter}
                        setCategoryFilter={setCategoryFilter}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        targetGroupFilter={targetGroupFilter}
                        setTargetGroupFilter={setTargetGroupFilter}
                    />

                </div>

                <div className="mt-6">
                    <MessagesTable
                        messages={filteredMessages}
                        onEdit={handleEditMessage}
                        onView={handleViewMessage}
                        onDelete={handleDeleteMessage}
                        onSchedule={handleScheduleMessage}
                    />
                </div>

                {/* <div className="mt-6">
                    <QuickTemplates />
                </div> */}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Delete Broadcast Message"
                itemName={
                    messageToDelete
                        ? `"${messageToDelete.title}"`
                        : "this message"
                }
            />
        </Layout>
    )
}