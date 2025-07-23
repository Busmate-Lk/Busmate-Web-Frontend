import { MessageSquare, CheckCircle, Clock, Users } from "lucide-react"

interface BroadcastStatsProps {
  totalMessages: number
  sentMessages: number
  pendingMessages: number
}

export default function BroadcastStats({ totalMessages, sentMessages, pendingMessages }: BroadcastStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{totalMessages}</p>
              <p className="text-sm text-green-600 mt-1">+12% this month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent Messages</p>
              <p className="text-3xl font-bold text-gray-900">{sentMessages}</p>
              <p className="text-sm text-green-600 mt-1">+8% this week</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-yellow-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Messages</p>
              <p className="text-3xl font-bold text-gray-900">{pendingMessages}</p>
              <p className="text-sm text-yellow-600 mt-1">Scheduled</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Recipients</p>
              <p className="text-3xl font-bold text-gray-900">6</p>
              <p className="text-sm text-purple-600 mt-1">All stakeholders</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}