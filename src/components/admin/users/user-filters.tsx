import { Input } from "@/components/admin/ui/input"
import { Button } from "@/components/admin/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select"
import { Download, FileText } from "lucide-react"

export function UserFilters() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Input placeholder="Search users..." className="shadow-sm" />
        <Select>
          <SelectTrigger className="shadow-sm">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent className="shadow-lg">
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="passenger">Passengers</SelectItem>
            <SelectItem value="conductor">Conductors</SelectItem>
            <SelectItem value="fleet">Fleet Operators</SelectItem>
            <SelectItem value="mot">MoT Officials</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="shadow-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="shadow-lg">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="shadow-sm">
            <SelectValue placeholder="Registration" />
          </SelectTrigger>
          <SelectContent className="shadow-lg">
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline" className="shadow-sm">Apply Filters</Button>
          <Button variant="ghost" className="shadow-sm">Clear All</Button>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 shadow-sm">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
