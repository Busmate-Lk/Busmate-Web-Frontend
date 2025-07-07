import { Header } from "@/components/admin/shared"
import { UserStats, UserFilters, UserTable } from "@/components/admin/users"
import { Button } from "@/components/admin/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  return (
    <div className="p-6">
      <Header title="User Management" />
      <UserStats />

      {/* Add User Button */}
      <div className="flex justify-end mb-6">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/users/add-mot">
            <Plus className="h-4 w-4 mr-2" />
            Add MoT User
          </Link>
        </Button>
      </div>

      <UserFilters />
      <UserTable />
    </div>
  )
}
