import { PageHeader } from "@/components/admin/page-header"
import { ComposeMessage } from "@/components/admin/compose-message"
import { NavigationBreadcrumb } from "@/components/admin/navigation-breadcrumb"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComposeMessagePage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Broadcast Messaging", href: "/admin/dashboard/broadcast/history" },
    { label: "Compose Message" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <PageHeader
        title="Compose Message"
        subtitle="Create and send broadcast messages to users"
        showSearch={false}
        showPerformanceIndicator={false}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/dashboard/broadcast/history">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to History
            </Link>
          </Button>
        }
      />
      <ComposeMessage />
    </div>
  )
}
