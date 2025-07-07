import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { ComposeMessage } from "@/components/admin/broadcast"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComposeMessagePage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Broadcast Messaging", href: "/admin/broadcast/history" },
    { label: "Compose Message" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <Header title="Compose Message" />
      <ComposeMessage />
    </div>
  )
}
