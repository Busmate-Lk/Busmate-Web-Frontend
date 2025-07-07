import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { AddMotForm } from "@/components/admin/users"
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
        <Header title="Add MoT User" />
        <AddMotForm />
      </div>
    </div>
  )
}
