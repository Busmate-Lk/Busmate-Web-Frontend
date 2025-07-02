import { BusDetails } from "@/components/admin/bus-details"
import { NavigationBreadcrumb } from "@/components/admin/navigation-breadcrumb"

export default function BusDetailsPage({
  params,
}: {
  params: { id: string; busId: string }
}) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "User Management", href: "/admin/dashboard/users" },
    { label: "Fleet Manager", href: `/admin/dashboard/users/fleet/${params.id}` },
    { label: `Bus ${params.busId}` },
  ]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <BusDetails fleetId={params.id} busId={params.busId} />
    </div>
  )
}
