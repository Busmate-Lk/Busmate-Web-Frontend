"use client"

import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { User, Code, Shield } from "lucide-react"

export default function LogsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const breadcrumbItems = [{ label: "Dashboard", href: "/admin" }, { label: "System Logs" }]

    const activeTab = pathname.includes('/user-activity') ? 'user-activity' :
        pathname.includes('/application') ? 'application' :
            'security'

    const handleTabChange = (value: string) => {
        router.push(`/admin/logs/${value}`)
    }

    return (
        <div className="p-6">
            <NavigationBreadcrumb items={breadcrumbItems} />
            <Header title="System Logs" />

            <div className="bg-white rounded-lg shadow-sm border">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div className="border-b px-6 py-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="user-activity" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                User Activity Logs
                            </TabsTrigger>
                            <TabsTrigger value="application" className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                Application Logs
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Security Logs
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
