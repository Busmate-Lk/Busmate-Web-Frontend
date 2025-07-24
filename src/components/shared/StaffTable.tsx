'use client';

import { TimeKeeper, Operator } from '@/types/models/staff';
import { Edit2, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

interface StaffTableProps {
  staff: (TimeKeeper | Operator)[];
  type: 'timekeeper' | 'operator';
  onDelete: (id: string) => void;
}

export function StaffTable({ staff, type, onDelete }: StaffTableProps) {
  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getExperienceBadge = (years: number) => {
    if (years <= 2) return 'bg-yellow-100 text-yellow-800';
    if (years <= 5) return 'bg-blue-100 text-blue-800';
    if (years <= 10) return 'bg-purple-100 text-purple-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {type === 'timekeeper' ? 'Time Keeper' : 'Operator'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {type === 'timekeeper' ? 'Bus Station' : 'License & Experience'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      NIC: {member.nic}
                    </div>
                    <div className="text-sm text-gray-500">
                      DOB: {new Date(member.dateOfBirth).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.email}</div>
                  <div className="text-sm text-gray-500">
                    {member.contactNo}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {type === 'timekeeper' ? (
                    <div className="text-sm text-gray-900">
                      {(member as TimeKeeper).workingBusStation}
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-900">
                        {(member as Operator).licenseNumber}
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getExperienceBadge(
                          (member as Operator).experienceYears || 0
                        )}`}
                      >
                        {(member as Operator).experienceYears} years
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(member.status)}>
                    {member.status.charAt(0).toUpperCase() +
                      member.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/mot/staff-details?id=${member.id}&type=${type}`}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/mot/staff-form?id=${member.id}&type=${type}`}
                      className="text-green-600 hover:text-green-900 p-1 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {staff.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No {type === 'timekeeper' ? 'time keepers' : 'operators'} found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by adding a new{' '}
            {type === 'timekeeper' ? 'time keeper' : 'operator'}.
          </p>
        </div>
      )}
    </div>
  );
}
