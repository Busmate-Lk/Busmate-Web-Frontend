import { NavigationBreadcrumb } from "@/components/admin/shared"
import { NotificationDetail } from "@/components/admin/notifications"

export default function NotificationDetailPage({ params }: { params: { id: string } }) {
    const breadcrumbItems = [
        { label: "Dashboard", href: "/admin" },
        { label: "Notification Center", href: "/admin/notifications" },
        { label: "Received Notifications", href: "/admin/notifications/received" },
        { label: "Notification Details" },
    ]

    return (
        <div className="p-6">
            <NavigationBreadcrumb items={breadcrumbItems} />
            <NotificationDetail notificationId={params.id} />
        </div>
    )
}
