"use client"

import { PageHeader } from "@/components/admin/page-header"
import { MessageHistory } from "@/components/admin/message-history"
import { Button } from "@/components/admin/ui/button"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MessageHistoryPage() {
  const router = useRouter()

  const handleSendMessage = () => {
    router.push("/admin/dashboard/broadcast/compose")
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Message History"
        subtitle="View and manage all broadcast messages"
        showSearch={true}
        showPerformanceIndicator={false}
      />

      {/* Send Message Button */}
      <div className="flex justify-end mb-6">
        <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>

      <MessageHistory />
    </div>
  )
}
