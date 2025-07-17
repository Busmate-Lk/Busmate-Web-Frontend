import { Eye, Edit, Trash2, Send } from "lucide-react"
import { getTargetGroupBadge, getStatusBadge } from "@/components/mot/BadgeUtils"
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

interface MessageManagementTableProps {
  messages: BroadcastMessage[]
  onView?: (message: BroadcastMessage) => void
  onEdit?: (message: BroadcastMessage) => void
  onSend?: (message: BroadcastMessage) => void
  onDelete?: (message: BroadcastMessage) => void
}

export default function MessageManagementTable({ 
  messages,
  onView = () => {},
  onEdit = () => {},
  onSend = () => {},
  onDelete = () => {}
}: MessageManagementTableProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Target Group</th>
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
                      <p className="text-sm text-gray-500">{message.body.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">{getTargetGroupBadge(message.targetGroups)}</td>
                  <td className="py-4 px-4 text-gray-600">{message.scheduledTime}</td>
                  <td className="py-4 px-4">{getStatusBadge(message.status)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {message.status === "Pending" && (
                        <button 
                          onClick={() => onSend(message)}
                          className="px-3 py-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded flex items-center gap-1"
                          title="Send message now"
                        >
                          <Send className="w-4 h-4" />
                          Send Now
                        </button>
                      )}
                      <button 
                        onClick={() => onView(message)}
                        className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                        title="View message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(message)}
                        className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded"
                        title="Edit message"
                      >
                        <Edit className="w-4 h-4" />
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