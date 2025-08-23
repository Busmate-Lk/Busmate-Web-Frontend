"use client"

import { Header } from "@/components/admin/shared"
import { MessageHistory } from "@/components/admin/broadcast"
import { Button } from "@/components/admin/ui/button"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MessageHistoryPage() {
  const router = useRouter()

  const handleSendMessage = () => {
    router.push("/admin/broadcast/compose")
  }

  return (
    <div className="p-6">
      <Header title="Message History" />

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
