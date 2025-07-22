import { Filter, Search, Eye, Edit, Clock, Trash2 } from "lucide-react"
import type { BroadcastMessage } from "./MessageBox"

interface MessagesTableProps {
  messages: BroadcastMessage[]
  onEdit?: (message: BroadcastMessage) => void
  onView?: (message: BroadcastMessage) => void
  onDelete?: (message: BroadcastMessage) => void
  onSchedule?: (message: BroadcastMessage) => void
}

export default function MessagesTable({ 
  messages, 
  onEdit, 
  onView, 
  onDelete, 
  onSchedule 
}: MessagesTableProps) {
  const getTargetGroupBadge = (groups: string[]) => {
    const group = groups[0]
    const badgeClasses = {
      "Bus Operators": "bg-blue-100 text-blue-800",
      "Drivers": "bg-purple-100 text-purple-800",
      "All Users": "bg-gray-100 text-gray-800",
      "Fleet Operators": "bg-green-100 text-green-800",
      "Conductors": "bg-orange-100 text-orange-800",
      "Passengers": "bg-indigo-100 text-indigo-800",
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses[group as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
        {group}
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const badgeClasses = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800",
      "Low": "bg-green-100 text-green-800",
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses[priority as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
        {priority}
      </span>
    )
  }

  const getCategoryBadge = (category: string) => {
    const badgeClasses = {
      "Emergency": "bg-red-100 text-red-800",
      "Route Update": "bg-blue-100 text-blue-800",
      "Policy": "bg-purple-100 text-purple-800",
      "Maintenance": "bg-orange-100 text-orange-800",
      "Training": "bg-indigo-100 text-indigo-800",
      "Technology": "bg-cyan-100 text-cyan-800",
      "General": "bg-gray-100 text-gray-800",
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClasses[category as keyof typeof badgeClasses] || "bg-gray-100 text-gray-800"}`}>
        {category}
      </span>
    )
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

  const handleEdit = (message: BroadcastMessage) => {
    if (onEdit) {
      onEdit(message)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">All Broadcast Messages</h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Message ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Target Groups</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Scheduled/Sent</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900">{message.id}</td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-gray-900 truncate">{message.title}</p>
                      <p className="text-xs text-gray-500 truncate">{message.body.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {message.targetGroups.slice(0, 2).map((group) => (
                        <span key={group}>{getTargetGroupBadge([group])}</span>
                      ))}
                      {message.targetGroups.length > 2 && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                          +{message.targetGroups.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">{getPriorityBadge(message.priority)}</td>
                  <td className="py-4 px-4">{getCategoryBadge(message.category)}</td>
                  <td className="py-4 px-4">
                    {message.status === "Sent" ? (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {message.status === "Sent" ? formatDate(message.sentAt!) : formatDate(message.scheduledTime)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onView?.(message)}
                        className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="View message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {/* Only show edit button for pending messages */}
                      {message.status === "Pending" && (
                        <button 
                          onClick={() => handleEdit(message)}
                          className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded"
                          title="Edit message"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button 
                        onClick={() => onSchedule?.(message)}
                        className="p-1 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded"
                        title="Schedule message"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete?.(message)}
                        className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing 1 to {messages.length} of {messages.length} messages
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}