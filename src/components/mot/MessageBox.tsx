import { MessageSquare, CheckCircle, Clock, Filter, Search, AlertTriangle, Eye, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

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

interface MessageBoxProps {
  messages: BroadcastMessage[]
  sentMessages: BroadcastMessage[]
  pendingMessages: BroadcastMessage[]
}

export default function MessageBox({ messages, sentMessages, pendingMessages }: MessageBoxProps) {
  const router = useRouter()
  const recentMessages = messages.slice(0, 5)

  const handleSentMessagesClick = () => {
    router.push('/mot/Sent-Messages')  
  }

  const handlePendingMessagesClick = () => {
    router.push('/mot/Pending-Messages') 
  }

  const handleViewMessage = (messageId: string) => {
    router.push(`/mot/broadcast-message-view?id=${messageId}`)
  }

  const handleEditMessage = (messageId: string) => {
    router.push(`/mot/edit-messages?id=${messageId}`)
  }

  const getTargetGroupBadge = (groups: string[]) => {
    const group = groups[0]
    switch (group) {
      case "Bus Operators":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
            Bus Operators
          </span>
        )
      case "Drivers":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
            Drivers
          </span>
        )
      case "All Users":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            All Users
          </span>
        )
      case "Fleet Operators":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
            Fleet Operators
          </span>
        )
      case "Conductors":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-orange-100 text-orange-800">
            Conductors
          </span>
        )
      case "Passengers":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800">
            Passengers
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            {group}
          </span>
        )
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        )
      case "Medium":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        )
      case "Low":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            {priority}
          </span>
        )
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Emergency":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
            Emergency
          </span>
        )
      case "Route Update":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
            Route Update
          </span>
        )
      case "Policy":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
            Policy
          </span>
        )
      case "Maintenance":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-orange-100 text-orange-800">
            Maintenance
          </span>
        )
      case "Training":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800">
            Training
          </span>
        )
      case "Technology":
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-cyan-100 text-cyan-800">
            Technology
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
            {category}
          </span>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Message Box</h3>
          </div>
          
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            onClick={handleSentMessagesClick}
            className="p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Sent Messages</p>
                <p className="text-2xl font-bold text-green-900">{sentMessages.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">Click to view all →</p>
          </div>

          <div 
            onClick={handlePendingMessagesClick}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pending Messages</p>
                <p className="text-2xl font-bold text-yellow-900">{pendingMessages.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-xs text-yellow-600 mt-2">Click to view all →</p>
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Messages</h4>
          <div className="space-y-3">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  {message.priority === "High" ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : message.status === "Sent" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{message.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.body.substring(0, 60)}...</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getTargetGroupBadge(message.targetGroups)}
                    {getPriorityBadge(message.priority)}
                    {getCategoryBadge(message.category)}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.status === "Sent"
                      ? `Sent: ${formatDate(message.sentAt!)}`
                      : `Scheduled: ${formatDate(message.scheduledTime)}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleViewMessage(message.id)}
                    className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    title="View message details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {/* Only show edit button for pending messages */}
                  {message.status === "Pending" && (
                    <button 
                      onClick={() => handleEditMessage(message.id)}
                      className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded"
                      title="Edit message"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between gap-2">
              <button 
                onClick={handleSentMessagesClick}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                View All Sent Messages
              </button>
              <button 
                onClick={handlePendingMessagesClick}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                View Pending Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}