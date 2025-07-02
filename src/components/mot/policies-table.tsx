"use client";

import { FileText, Eye, Edit, Download, Trash2 } from "lucide-react";

export interface Policy {
  id: string;
  title: string;
  type: string;
  publishedDate: string;
  lastModified: string;
  status: string;
  version: string;
  author: string;
}

interface PoliciesTableProps {
  policies: Policy[];
  onView: (policyId: string) => void;
  onEdit: (policyId: string) => void;
  onDelete: (policy: Policy) => void;
  onDownload?: (policyId: string) => void;
}

export function PoliciesTable({
  policies,
  onView,
  onEdit,
  onDelete,
  onDownload,
}: PoliciesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "under review":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Policy Documents
          </h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
            {policies.length} policies
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
                  Policy Title
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Published Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Last Modified
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Version
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Author
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">
                        {policy.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                      {policy.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {policy.publishedDate}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {policy.lastModified}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                      {policy.version}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        policy.status
                      )}`}
                    >
                      {policy.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {policy.author}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => onView(policy.id)}
                        title="View Policy"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        onClick={() => onEdit(policy.id)}
                        title="Edit Policy"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {onDownload && (
                        <button
                          className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors"
                          onClick={() => onDownload(policy.id)}
                          title="Download Policy"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        onClick={() => onDelete(policy)}
                        title="Delete Policy"
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
              Showing 1 to {policies.length} of 25 results
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
