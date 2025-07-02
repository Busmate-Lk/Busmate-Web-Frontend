import { PageHeader } from "@/components/admin/page-header"
import { Button } from "@/components/admin/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function UserManagementHeader() {
  return (
    <PageHeader
      title="User Management"
      subtitle="Manage system users and their permissions"
      showSearch={true}
      showPerformanceIndicator={false}
      actions={
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard/users/add-mot">
            <Plus className="h-4 w-4 mr-2" />
            Add MoT User
          </Link>
        </Button>
      }
    />
  )
}
