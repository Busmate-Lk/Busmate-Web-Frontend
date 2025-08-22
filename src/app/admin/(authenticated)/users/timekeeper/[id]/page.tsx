import { TimekeeperProfile } from "@/components/admin/profile"
import { NavigationBreadcrumb } from "@/components/admin/shared"

export default function TimekeeperProfilePage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "User Management", href: "/admin/users" },
    { label: "Timekeeper Profile" },
  ]

  return (
    <div className="p-6">
      {/* <NavigationBreadcrumb items={breadcrumbItems} /> */}
      <TimekeeperProfile userId={params.id} />
    </div>
  )
}
