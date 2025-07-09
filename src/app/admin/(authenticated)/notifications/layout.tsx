"use client"

import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { Send, Bell } from "lucide-react"

export default function NotificationsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const breadcrumbItems = [{ label: "Dashboard", href: "/admin" }, { label: "Notification Center" }]

    const activeTab = pathname.includes('/sent') ? 'sent' : 'received'

    const handleTabChange = (value: string) => {
        router.push(`/admin/notifications/${value}`)
    }

    return (
        <div className="p-6">
            <NavigationBreadcrumb items={breadcrumbItems} />
            <Header title="Notification Center" />

            <div className="bg-white rounded-lg shadow-sm border">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div className="border-b px-6 py-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="sent" className="flex items-center gap-2">
                                <Send className="h-4 w-4" />
                                Sent Notifications
                            </TabsTrigger>
                            <TabsTrigger value="received" className="flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                Received Notifications
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6">
                        {children}
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
