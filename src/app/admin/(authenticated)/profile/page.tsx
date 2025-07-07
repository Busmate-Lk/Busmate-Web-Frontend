import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { AdminProfile } from "@/components/admin/profile"
import { Button } from "@/components/admin/ui/button"
import { Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const breadcrumbItems = [{ label: "Dashboard", href: "/admin" }, { label: "Admin Profile" }]

  return (
    <div className="p-6">
      <NavigationBreadcrumb items={breadcrumbItems} />
      <Header title="Admin Profile" />
      <AdminProfile />
    </div>
  )
}
