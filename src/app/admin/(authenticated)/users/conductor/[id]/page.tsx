import { ConductorProfile } from "@/components/admin/profile"
import { NavigationBreadcrumb } from "@/components/admin/shared"

export default function ConductorProfilePage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "User Management", href: "/admin/dashboard/users" },
    { label: "Conductor Profile" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <ConductorProfile userId={params.id} />
    </div>
  )
}
