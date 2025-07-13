"use client"

import { MessageHistory } from "@/components/admin/broadcast"
import { Button } from "@/components/admin/ui/button"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SentNotificationsPage() {
    const router = useRouter()

    const handleSendMessage = () => {
        router.push("/admin/broadcast/compose")
    }

    return (
        <div className="space-y-6">
            {/* Send Message Button */}
            <div className="flex justify-end">
                <Button onClick={handleSendMessage} className="bg-blue-500/90 text-white hover:bg-blue-600 shadow-md">
                    <Send className="h-4 w-4 mr-2" />
                    Send New Message
                </Button>
            </div>

            <MessageHistory />
        </div>
    )
}
