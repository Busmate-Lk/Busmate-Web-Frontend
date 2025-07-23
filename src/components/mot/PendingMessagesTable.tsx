import { useState } from "react"
import { Eye, Edit, Trash2, Send, Clock } from "lucide-react"
import { getTargetGroupBadge, getPriorityBadge, getCategoryBadge } from "@/components/mot/BadgeUtils"
import {
  DeleteConfirmationModal,
  SendConfirmationModal,
} from '@/components/mot/confirmation-modals'

// Import the interface from the parent page
import { BroadcastMessage } from "@/app/mot/Sent-Messages/page"

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
  
  // State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<BroadcastMessage | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // State for send modal
  const [showSendModal, setShowSendModal] = useState(false)
  const [messageToSend, setMessageToSend] = useState<BroadcastMessage | null>(null)
  const [isSending, setIsSending] = useState(false)

  // Update the PendingMessagesTable to navigate properly:
  const handleEdit = (message: BroadcastMessage) => {
    if (onEdit) {
      onEdit(message)
    }
  }

  // Handle delete button click
  const handleDeleteClick = (message: BroadcastMessage) => {
    setMessageToDelete(message)
    setShowDeleteModal(true)
  }

  // Handle send button click
  const handleSendClick = (message: BroadcastMessage) => {
    setMessageToSend(message)
    setShowSendModal(true)
  }

  // Confirm delete function
  const handleConfirmDelete = async () => {
    if (!messageToDelete) return

    setIsDeleting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 5% chance of failure for testing
          if (Math.random() < 0.05) {
            reject(new Error("Network error"))
          } else {
            resolve(true)
          }
        }, 1500)
      })
      
      // Call the parent's onDelete function
      onDelete(messageToDelete)
      
      // Close modal and reset state
      setShowDeleteModal(false)
      setMessageToDelete(null)
      
      console.log("Pending message deleted successfully:", messageToDelete.id)
      
    } catch (error) {
      console.error("Error deleting pending message:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Failed to delete message: ${errorMessage}. Please try again.`)
    } finally {
      setIsDeleting(false)
    }
  }

  // Confirm send function
  const handleConfirmSend = async () => {
    if (!messageToSend) return

    setIsSending(true)
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 5% chance of failure for testing
          if (Math.random() < 0.05) {
            reject(new Error("Network error"))
          } else {
            resolve(true)
          }
        }, 2000)
      })
      
      // Call the parent's onSend function
      onSend(messageToSend)
      
      // Close modal and reset state
      setShowSendModal(false)
      setMessageToSend(null)
      
      console.log("Message sent successfully:", messageToSend.id)
      
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`Failed to send message: ${errorMessage}. Please try again.`)
    } finally {
      setIsSending(false)
    }
  }

  // Cancel delete function
  const handleCancelDelete = () => {
    if (isDeleting) {
      return // Prevent closing while deletion is in progress
    }
    
    setShowDeleteModal(false)
    setMessageToDelete(null)
  }

  // Cancel send function
  const handleCancelSend = () => {
    if (isSending) {
      return // Prevent closing while sending is in progress
    }
    
    setShowSendModal(false)
    setMessageToSend(null)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-orange-500">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Messages</h3>
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
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                      No pending messages found
                    </td>
                  </tr>
                ) : (
                  messages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{message.title}</p>
                          <p className="text-sm text-gray-500">
                            {message.body.length > 80 
                              ? `${message.body.substring(0, 80)}...` 
                              : message.body
                            }
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">{getTargetGroupBadge(message.targetGroups)}</td>
                      <td className="py-4 px-4">{getPriorityBadge(message.priority)}</td>
                      <td className="py-4 px-4">{getCategoryBadge(message.category)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-900">
                            {new Date(message.scheduledTime).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onView(message)}
                            className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                            title="View message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(message)}
                            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            title="Edit message"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleSendClick(message)}
                            className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            title="Send message now"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(message)}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Pending Message"
        itemName={
          messageToDelete 
            ? `"${messageToDelete.title}"` 
            : "this message"
        }
      />

      {/* Send Confirmation Modal */}
      <SendConfirmationModal
        isOpen={showSendModal}
        onClose={handleCancelSend}
        onConfirm={handleConfirmSend}
        isLoading={isSending}
        title="Send Message Now"
        itemName={
          messageToSend 
            ? `"${messageToSend.title}"` 
            : "this message"
        }
      />
    </>
  )
}