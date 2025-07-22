"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import { ArrowLeft, Save, Send, Clock, Eye, AlertCircle, CheckCircle, Calendar } from "lucide-react"

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

// Sample message data - replace with actual API call
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

export default function EditMessages() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const messageId = searchParams.get("id")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    targetGroups: [] as string[],
    priority: "Medium" as "High" | "Medium" | "Low",
    category: "General",
    scheduledTime: "",
    sendImmediately: false,
  })

  const [originalMessage, setOriginalMessage] = useState<BroadcastMessage | null>(null)

  const targetGroupOptions = [
    "All Users",
    "Bus Operators",
    "Drivers",
    "Conductors",
    "Fleet Operators",
    "Passengers",
  ]

  const priorityOptions: ("High" | "Medium" | "Low")[] = ["High", "Medium", "Low"]
  const categoryOptions = [
    "Emergency",
    "Route Update", 
    "Policy",
    "Maintenance",
    "Training",
    "Technology",
    "General",
  ]

  useEffect(() => {
    if (messageId) {
      // Simulate API call to fetch message
      const message = broadcastMessages.find(msg => msg.id === messageId)
      if (message) {
        // Block access to sent messages
        if (message.status === "Sent") {
          router.push("/mot/broadcast-messages")
          return
        }

        setOriginalMessage(message)
        
        // Convert scheduled time to datetime-local format
        const scheduledDate = new Date(message.scheduledTime)
        const formattedScheduledTime = scheduledDate.toISOString().slice(0, 16)
        
        setFormData({
          title: message.title,
          body: message.body,
          targetGroups: message.targetGroups,
          priority: message.priority,
          category: message.category,
          scheduledTime: formattedScheduledTime,
          sendImmediately: false,
        })
      }
    }
    setIsLoading(false)
  }, [messageId, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters"
    } else if (formData.title.length > 100) {
      newErrors.title = "Title cannot exceed 100 characters"
    }

    if (!formData.body.trim()) {
      newErrors.body = "Message body is required"
    } else if (formData.body.length < 10) {
      newErrors.body = "Message body must be at least 10 characters"
    } else if (formData.body.length > 1000) {
      newErrors.body = "Message body cannot exceed 1000 characters"
    }

    if (formData.targetGroups.length === 0) {
      newErrors.targetGroups = "At least one target group must be selected"
    }

    if (!formData.sendImmediately && !formData.scheduledTime) {
      newErrors.scheduledTime = "Scheduled time is required when not sending immediately"
    }

    if (formData.scheduledTime && !formData.sendImmediately) {
      const scheduledDate = new Date(formData.scheduledTime)
      const now = new Date()
      if (scheduledDate <= now) {
        newErrors.scheduledTime = "Scheduled time must be in the future"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleTargetGroupChange = (group: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        targetGroups: [...prev.targetGroups, group]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        targetGroups: prev.targetGroups.filter(g => g !== group)
      }))
    }

    // Clear target groups error
    if (errors.targetGroups) {
      setErrors(prev => ({
        ...prev,
        targetGroups: ""
      }))
    }
  }

  const handleSave = async (sendNow = false) => {
    setShowValidation(true)
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`)
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const action = sendNow ? "sent" : "updated"
      console.log(`Message ${action}:`, { messageId, formData })
      
      // Show success message
      alert(`Message ${action} successfully!`)
      
      router.push("/mot/broadcast-messages")
    } catch (error) {
      console.error("Error saving message:", error)
      alert("Error saving message. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to discard your changes?")) {
      router.push("/mot/broadcast-messages")
    }
  }

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
    const hasError = showValidation && errors[fieldName]
    
    if (hasError) {
      return `${baseClass} border-red-300 focus:ring-red-500 focus:border-red-500`
    }
    return `${baseClass} border-gray-300 focus:ring-blue-500 focus:border-blue-500`
  }

  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (!showValidation || !errors[fieldName]) return null
    
    return (
      <div className="flex items-center gap-1 mt-1">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span className="text-sm text-red-600">{errors[fieldName]}</span>
      </div>
    )
  }

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (isLoading) {
    return (
      <Layout
        activeItem="broadcast-messages"
        pageTitle="Loading..."
        pageDescription="Loading message details"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading message details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!originalMessage) {
    return (
      <Layout
        activeItem="broadcast-messages"
        pageTitle="Message Not Found"
        pageDescription="The requested message could not be found"
        role="mot"
      >
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Message Not Found</h3>
          <p className="text-gray-500 mb-6">The message you're trying to edit doesn't exist or may have been deleted.</p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Messages
          </button>
        </div>
      </Layout>
    )
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <Layout
      activeItem="broadcast-messages"
      pageTitle={`Edit Message - ${originalMessage.id}`}
      pageDescription="Edit broadcast message details and scheduling"
      role="mot"
    >
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Broadcast Messages</span>
          </button>

          {/* Preview Toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>

        {/* Validation Summary */}
        {showValidation && hasErrors && (
          <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Please correct the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showValidation && !hasErrors && !isSaving && (
          <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-lg p-4">
            <div className="flex">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-green-800">
                  Form validation passed! Ready to save.
                </h3>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-blue-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit Message Details</h3>
                <p className="text-sm text-gray-600 mt-1">Message ID: {originalMessage.id}</p>
              </div>
              <div className="p-6 space-y-6">
                {/* Message Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Title *
                  </label>
                  <input
                    name="title"
                    type="text"
                    className={getInputClassName("title")}
                    placeholder="Enter a clear, concise title for your message"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    maxLength={100}
                  />
                  <ErrorMessage fieldName="title" />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Maximum 100 characters</p>
                    <span className={`text-xs ${formData.title.length > 80 ? 'text-orange-600' : 'text-gray-500'}`}>
                      {formData.title.length}/100
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Body *
                  </label>
                  <textarea
                    name="body"
                    rows={6}
                    className={getInputClassName("body")}
                    placeholder="Enter the detailed message content..."
                    value={formData.body}
                    onChange={(e) => handleInputChange("body", e.target.value)}
                    maxLength={1000}
                  />
                  <ErrorMessage fieldName="body" />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Maximum 1000 characters</p>
                    <span className={`text-xs ${formData.body.length > 800 ? 'text-orange-600' : 'text-gray-500'}`}>
                      {formData.body.length}/1000
                    </span>
                  </div>
                </div>

                {/* Target Groups */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Groups *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {targetGroupOptions.map((group) => (
                      <label key={group} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.targetGroups.includes(group)}
                          onChange={(e) => handleTargetGroupChange(group, e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{group}</span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage fieldName="targetGroups" />
                </div>

                {/* Priority and Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority *
                    </label>
                    <select
                      name="priority"
                      className={getInputClassName("priority")}
                      value={formData.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value as "High" | "Medium" | "Low")}
                    >
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                    <ErrorMessage fieldName="priority" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      className={getInputClassName("category")}
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <ErrorMessage fieldName="category" />
                  </div>
                </div>

                {/* Scheduling Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Scheduling Options
                  </label>
                  
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.sendImmediately}
                        onChange={(e) => handleInputChange("sendImmediately", e.target.checked)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Send immediately upon saving</span>
                    </label>

                    {!formData.sendImmediately && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scheduled Time *
                        </label>
                        <input
                          name="scheduledTime"
                          type="datetime-local"
                          className={getInputClassName("scheduledTime")}
                          value={formData.scheduledTime}
                          onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                        />
                        <ErrorMessage fieldName="scheduledTime" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => handleSave(false)}
                    disabled={isSaving}
                    className="px-4 py-2 border border-blue-300 text-blue-700 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving && !formData.sendImmediately && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  
                  <button
                    onClick={() => handleSave(true)}
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving && formData.sendImmediately && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    <Send className="w-4 h-4" />
                    Send Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Message Status */}
            <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-purple-500">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Message Status</h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message ID</label>
                  <p className="text-sm text-gray-900">{originalMessage.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                  <p className="text-sm text-gray-900">{formatDateTime(originalMessage.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-indigo-500">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Message Preview</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-400 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{formData.title || "Message Title"}</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      {formData.body || "Message body will appear here..."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.targetGroups.map((group) => (
                        <span key={group} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {group}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Priority: {formData.priority}</span>
                      <span>Category: {formData.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Help */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 border-l-4 border-l-orange-500 p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Editing Guidelines</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Only pending messages can be edited</li>
                <li>• Messages can be sent immediately or scheduled</li>
                <li>• High priority messages will be highlighted to recipients</li>
                <li>• Emergency category messages bypass scheduling restrictions</li>
                <li>• All changes are logged for audit purposes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}