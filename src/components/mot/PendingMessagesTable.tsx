import { Eye, Edit, Trash2, Send, Clock } from "lucide-react"
import { getTargetGroupBadge, getPriorityBadge, getCategoryBadge } from "@/components/mot/BadgeUtils"
import TablePagination from "@/components/mot/TablePagination"

// Define BroadcastMessage interface directly in this component
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

interface PendingMessagesTableProps {
  messages: BroadcastMessage[]
  onEdit: (message: BroadcastMessage) => void
  onView: (message: BroadcastMessage) => void
  onSend?: (message: BroadcastMessage) => void
  onDelete?: (message: BroadcastMessage) => void
}

export default function PendingMessagesTable({ 
  messages, 
  onEdit, 
  onView,
  onSend = () => {},
  onDelete = () => {}
}: PendingMessagesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Target Group</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Priority</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Scheduled Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{message.title}</p>
                      <p className="text-sm text-gray-500">{message.body.substring(0, 80)}...</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getTargetGroupBadge(message.targetGroups)}</td>
                  <td className="py-4 px-4">{getPriorityBadge(message.priority)}</td>
                  <td className="py-4 px-4">{getCategoryBadge(message.category)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      {message.scheduledTime}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Pending
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onView(message)}
                        className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="View message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(message)}
                        className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Edit message"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onSend(message)}
                        className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                        title="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(message)}
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

        <TablePagination 
          currentPage={1}
          totalItems={messages.length}
          itemsPerPage={10}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  )
}