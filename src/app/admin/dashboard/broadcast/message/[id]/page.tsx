import { MessageDetail } from "@/components/admin/broadcast"
import { NavigationBreadcrumb } from "@/components/admin/shared"

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Broadcast Messaging", href: "/admin/dashboard/broadcast/history" },
    { label: "Message Details" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <MessageDetail messageId={params.id} />
    </div>
  )
}
