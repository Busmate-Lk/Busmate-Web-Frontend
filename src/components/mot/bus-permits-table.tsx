"use client";

import { Eye, Edit, Trash2, Power } from "lucide-react";

export interface BusPermit {
  id: string;
  routeNo: string;
  routeName: string;
  operator: string;
  validFrom: string;
  validUntil: string;
  status: string;
}

interface BusPermitsTableProps {
  permits: BusPermit[];
  onView: (permitId: string) => void;
  onEdit: (permitId: string) => void;
  onDelete: (permitId: string, routeName: string) => void;
  onDeactivate: (permitId: string, routeName: string) => void;
}

export function BusPermitsTable({
  permits,
  onView,
  onEdit,
  onDelete,
  onDeactivate,
}: BusPermitsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Route Permits</h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
            {permits.length} permits
          </span>
        </div>
        <button className="p-0 h-auto text-gray-400 hover:text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Route No.
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Route Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Operator
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Valid From
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Valid Until
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {permits.map((permit) => (
                <tr
                  key={permit.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      {permit.routeNo}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      {permit.routeName}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                      {permit.operator}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {permit.validFrom}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {permit.validUntil}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        permit.status
                      )}`}
                    >
                      {permit.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => onView(permit.id)}
                        title="View Permit"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        onClick={() => onEdit(permit.id)}
                        title="Edit Permit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors"
                        onClick={() =>
                          onDeactivate(permit.id, permit.routeName)
                        }
                        title="Deactivate Permit"
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        onClick={() => onDelete(permit.id, permit.routeName)}
                        title="Delete Permit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing 1 to {permits.length} of {permits.length} results
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-blue-600 text-white">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                2
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                3
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
