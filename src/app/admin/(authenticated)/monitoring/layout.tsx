"use client"

import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { Activity, Server, BarChart3 } from "lucide-react"

export default function MonitoringLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const breadcrumbItems = [{ label: "Dashboard", href: "/admin" }, { label: "System Monitoring" }]

    const activeTab = pathname.includes('/api-health') ? 'api-health' :
        pathname.includes('/microservice-uptime') ? 'microservice-uptime' :
            'resource-usage'

    const handleTabChange = (value: string) => {
        router.push(`/admin/monitoring/${value}`)
    }

    return (
        <div className="p-6">
            <NavigationBreadcrumb items={breadcrumbItems} />
            <Header title="System Monitoring" />

            <div className="bg-white rounded-lg shadow-sm border">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <div className="border-b px-6 py-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="api-health" className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                API Health
                            </TabsTrigger>
                            <TabsTrigger value="microservice-uptime" className="flex items-center gap-2">
                                <Server className="h-4 w-4" />
                                Microservice Uptime
                            </TabsTrigger>
                            <TabsTrigger value="resource-usage" className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Resource Usage
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
