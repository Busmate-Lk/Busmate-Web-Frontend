"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Edit, 
  Send, 
  Copy,
  Trash2,
  Eye,
  Tag,
  MessageSquare
} from "lucide-react"
import {
  DeleteConfirmationModal,
} from '@/components/mot/confirmation-modals'

// BroadcastMessage interface
interface BroadcastMessage {
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

// Data (same as in main broadcast page)
const broadcastMessages: BroadcastMessage[] = [
  {
    id: "BM001",
    title: "Route 138 Service Disruption - Colombo to Matara",
    body: "Due to road construction on Galle Road near Kalutara, Route 138 services will be delayed by 30-45 minutes from 9:00 AM to 5:00 PM today. Alternative routes via A2 highway are recommended. Passengers are advised to plan accordingly.",
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

export default function MessageView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const messageId = searchParams.get('id') as string

  // State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Find the message by ID
  const message = broadcastMessages.find(m => m.id === messageId)

  if (!message) {
    return (
      <Layout
        activeItem="broadcast"
        pageTitle="Message Not Found"
        pageDescription="The requested message could not be found"
        role="mot"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Message Not Found</h2>
          <p className="text-gray-600 mb-6">The message with ID "{messageId}" does not exist.</p>
          <button
            onClick={() => router.push('/mot/broadcast-messages')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Messages
          </button>
        </div>
      </Layout>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: "bg-red-100 text-red-800 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-green-100 text-green-800 border-green-200"
    }
    
    const icons = {
      High: <AlertTriangle className="w-3 h-3" />,
      Medium: <Clock className="w-3 h-3" />,
      Low: <CheckCircle className="w-3 h-3" />
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colors[priority as keyof typeof colors]}`}>
        {icons[priority as keyof typeof icons]}
        {priority}
      </span>
    )
  }

  const getStatusBadge = (status: string) => {
    if (status === "Sent") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          Sent
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
        <Clock className="w-4 h-4" />
        Pending
      </span>
    )
  }

  const getCategoryBadge = (category: string) => {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
        <Tag className="w-3 h-3" />
        {category}
      </span>
    )
  }

  const getTargetGroupBadges = (groups: string[]) => {
    return groups.map((group, index) => (
      <span 
        key={index}
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200"
      >
        <Users className="w-3 h-3" />
        {group}
      </span>
    ))
  }

  const handleEdit = () => {
    // Only allow editing of pending messages
    if (message.status === "Sent") {
      alert("Sent messages cannot be edited. Please create a new message instead.")
      return
    }
    router.push(`/mot/edit-messages?id=${message.id}`)
  }

  const handleSend = () => {
    console.log("Send message:", message.id)
    // Add send logic - could open a confirmation modal
    alert("Send functionality would be implemented here")
  }

  const handleCopy = () => {
    console.log("Copy message:", message.id)
    // Add copy logic - could duplicate the message
    alert("Copy functionality would be implemented here")
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("Message deleted successfully:", message.id)
      
      // Close modal and navigate back
      setShowDeleteModal(false)
      router.push('/mot/broadcast-messages')
      
    } catch (error) {
      console.error("Error deleting message:", error)
      alert("Error deleting message. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <Layout
      activeItem="broadcast"
      pageTitle={`Message - ${message.id}`}
      pageDescription="View broadcast message details"
      role="mot"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/mot/broadcast-messages')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Messages
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {message.status === "Pending" && (
              <button
                onClick={handleSend}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Now
              </button>
            )}
            
            {/* Only show Edit button for pending messages */}
            {message.status === "Pending" && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            )}
            
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Message Details Card */}
        <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-blue-500">
          <div className="p-6">
            {/* Message Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{message.title}</h1>
                  {getStatusBadge(message.status)}
                </div>
                <p className="text-sm text-gray-500">Message ID: {message.id}</p>
              </div>
            </div>

            {/* Message Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Priority */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Priority</p>
                  {getPriorityBadge(message.priority)}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Tag className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  {getCategoryBadge(message.category)}
                </div>
              </div>

              {/* Scheduled Time */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Scheduled Time</p>
                  <p className="text-sm text-gray-600">{message.scheduledTime}</p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Created At</p>
                  <p className="text-sm text-gray-600">{message.createdAt}</p>
                </div>
              </div>

              {/* Sent At (if sent) */}
              {message.sentAt && (
                <div className="flex items-center gap-3 md:col-span-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Sent At</p>
                    <p className="text-sm text-gray-600">{message.sentAt}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Target Groups */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Target Groups</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {getTargetGroupBadges(message.targetGroups)}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Message Content</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 border-l-4 border-l-indigo-400">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{message.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Actions */}
        <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-orange-500 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-600">See delivery stats</p>
              </div>
            </button>
            
            <button 
              onClick={handleCopy}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Duplicate Message</p>
                <p className="text-sm text-gray-600">Create a copy</p>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Create Template</p>
                <p className="text-sm text-gray-600">Save as template</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Broadcast Message"
        itemName={
          message 
            ? `"${message.title}"` 
            : "this message"
        }
      />
    </Layout>
  )
}