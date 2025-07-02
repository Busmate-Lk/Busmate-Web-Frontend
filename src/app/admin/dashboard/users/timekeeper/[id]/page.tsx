import { TimekeeperProfile } from "@/components/admin/timekeeper-profile"
import { NavigationBreadcrumb } from "@/components/admin/navigation-breadcrumb"

export default function TimekeeperProfilePage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "User Management", href: "/admin/dashboard/users" },
    { label: "Timekeeper Profile" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <TimekeeperProfile userId={params.id} />
    </div>
  )
}
