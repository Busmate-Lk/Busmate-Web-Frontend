"use client"

import { Edit, RotateCcw, Trash2 } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  role: "Driver" | "Conductor"
  nic: string
  phone: string
  assignment: string
  status: "Assigned" | "Available"
  avatar: string
}

interface StaffTableProps {
  staff: StaffMember[]
  currentPage: number
  totalStaff: number
  onPageChange: (page: number) => void
  onEdit?: (staffId: string) => void
  onDelete?: (staffId: string) => void
}

export function StaffTable({ staff, currentPage, totalStaff, onPageChange, onEdit, onDelete }: StaffTableProps) {
  const getRoleColor = (role: string) => {
    return role === "Driver" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Assigned" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
  }

  return (
    <div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-gray-50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Staff</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Role</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">NIC</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Phone</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Assignment</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {staff.map((member) => (
              <tr key={member.id} className="border-b transition-colors hover:bg-gray-50">
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRoleColor(member.role)}`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="p-4 align-middle text-gray-600">{member.nic}</td>
                <td className="p-4 align-middle text-gray-600">{member.phone}</td>
                <td className="p-4 align-middle text-gray-600">{member.assignment}</td>
                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(member.status)}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => onEdit?.(member.id)}
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                      <RotateCcw className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => onDelete?.(member.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">Showing 1-10 of {totalStaff} staff members</div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">{currentPage}</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">2</button>
          <button
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
