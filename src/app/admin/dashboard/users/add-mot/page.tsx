import { PageHeader } from "@/components/admin/page-header"
import { AddMotForm } from "@/components/admin/add-mot-form"
import { NavigationBreadcrumb } from "@/components/admin/navigation-breadcrumb"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddMotUserPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "User Management", href: "/admin/dashboard/users" },
    { label: "Add MoT User" },
  ]

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <NavigationBreadcrumb items={breadcrumbItems} />
      </div>
      <div className="p-6">
        <PageHeader
          title="Add MoT User"
          subtitle="Create a new Ministry of Transport user account"
          showSearch={false}
          showPerformanceIndicator={false}
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard/users">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Link>
            </Button>
          }
        />
        <AddMotForm />
      </div>
    </div>
  )
}
