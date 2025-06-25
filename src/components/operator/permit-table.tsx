"use client"

import { Eye } from "lucide-react"

interface RoutePermit {
  id: string
  permitId: string
  routeId: string
  routeName: string
  startPoint: string
  endPoint: string
  operator: string
  expiryDate: string
  isExpired: boolean
}

interface PermitTableProps {
  permits: RoutePermit[]
  onViewPermit: (permitId: string) => void
}

export function PermitTable({ permits, onViewPermit }: PermitTableProps) {
  const getOperatorColor = (operator: string) => {
    return operator === "SLTB" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
  }

  const getExpiryDateColor = (isExpired: boolean) => {
    return isExpired ? "text-red-600" : "text-gray-900"
  }

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-gray-50">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Permit ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Route ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Route Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Start Point</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">End Point</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Operator</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Expiry Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {permits.map((permit) => (
            <tr key={permit.id} className="border-b transition-colors hover:bg-gray-50">
              <td className="p-4 align-middle font-medium text-gray-900">{permit.permitId}</td>
              <td className="p-4 align-middle text-gray-900">{permit.routeId}</td>
              <td className="p-4 align-middle text-gray-900">{permit.routeName}</td>
              <td className="p-4 align-middle text-gray-600">{permit.startPoint}</td>
              <td className="p-4 align-middle text-gray-600">{permit.endPoint}</td>
              <td className="p-4 align-middle">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getOperatorColor(permit.operator)}`}
                >
                  {permit.operator}
                </span>
              </td>
              <td className={`p-4 align-middle font-medium ${getExpiryDateColor(permit.isExpired)}`}>
                {permit.expiryDate}
              </td>
              <td className="p-4 align-middle">
                <button
                  className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => onViewPermit(permit.id)}
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
