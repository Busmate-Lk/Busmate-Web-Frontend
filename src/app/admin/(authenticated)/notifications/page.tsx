import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { NotificationPanel } from "@/components/admin/notifications"
import { Button } from "@/components/admin/ui/button"
import { Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/admin" }, { label: "Notifications" }]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <Header title="Notifications" />
      <NotificationPanel />
    </div>
  )
}
