import { PassengerProfile } from "@/components/admin/profile"
import { NavigationBreadcrumb } from "@/components/admin/shared"

export default function PassengerProfilePage({ params }: { params: { id: string } }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "User Management", href: "/admin/users" },
    { label: "Passenger Profile" },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <PassengerProfile userId={params.id} />
    </div>
  )
}
