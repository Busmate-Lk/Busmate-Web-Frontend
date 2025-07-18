import type React from "react"
import { Sidebar } from "@/components/admin/shared/sidebar"

// Add your authentication check here
export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // You can add authentication logic here
    // For example: redirect to login if not authenticated

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    )
}
