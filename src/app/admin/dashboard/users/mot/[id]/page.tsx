import { MotAdminProfile } from "@/components/admin/profile"
import { NavigationBreadcrumb } from "@/components/admin/shared"

export default function MotAdminProfilePage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "User Management", href: "/admin/dashboard/users" },
    { label: "MoT Admin Profile" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <MotAdminProfile userId={params.id} />
    </div>
  )
}
