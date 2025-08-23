'use client';

// import { TimeKeeper, Operator } from '@/types/models/staff';
import { TimeKeeper } from '@/types/models/staff';
import { OperatorResponse as Operator } from "@/lib/api-client/route-management";
import { Edit2, Trash2, Eye, ChevronUp, ChevronDown, Building2, MapPin } from 'lucide-react';
import Link from 'next/link';

interface StaffTableProps {
  staff: (TimeKeeper | Operator)[];
  type: 'timekeeper' | 'operator';
  onDelete: (id: string) => void;
  loading?: boolean;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export function StaffTable({ 
  staff, 
  type, 
  onDelete, 
  loading = false,
  onSort,
  sortBy = 'name',
  sortDir = 'asc'
}: StaffTableProps) {
  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getOperatorTypeBadge = (operatorType?: string) => {
    if (!operatorType) return null;
    
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (operatorType.toUpperCase()) {
      case 'PRIVATE':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'CTB':
        return `${baseClasses} bg-indigo-100 text-indigo-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleSort = (field: string) => {
    if (onSort) {
      const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
      onSort(field, newSortDir);
    }
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {type === 'timekeeper' ? 'Time Keepers' : 'Operators'} Directory
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {staff.length} {type === 'timekeeper' ? 'time keepers' : 'operators'} found
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="name">
                {type === 'timekeeper' ? 'Time Keeper' : 'Operator'}
              </SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {type === 'timekeeper' ? 'Bus Station' : 'Type & Region'}
              </th>
              <SortableHeader field="status">Status</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-500">
                      Loading {type === 'timekeeper' ? 'time keepers' : 'operators'}...
                    </span>
                  </div>
                </td>
              </tr>
            ) : staff.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <div className="text-lg font-medium">
                      No {type === 'timekeeper' ? 'time keepers' : 'operators'} found
                    </div>
                    <div className="text-sm">
                      Try adjusting your search criteria or add a new {type === 'timekeeper' ? 'time keeper' : 'operator'}.
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              staff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {member.name || 'Unknown Name'}
                      </div>
                      {member.nic && (
                        <div className="text-sm text-gray-500">
                          NIC: {member.nic}
                        </div>
                      )}
                      {member.dateOfBirth && (
                        <div className="text-sm text-gray-500">
                          DOB: {new Date(member.dateOfBirth).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {member.email && (
                        <div className="text-sm text-gray-900">{member.email}</div>
                      )}
                      {member.contactNo && (
                        <div className="text-sm text-gray-500">{member.contactNo}</div>
                      )}
                      {!member.email && !member.contactNo && (
                        <div className="text-sm text-gray-400">No contact info</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {type === 'timekeeper' ? (
                      <div className="flex items-center text-sm text-gray-900">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        {(member as TimeKeeper).workingBusStation || 'Not assigned'}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {(member as Operator).operatorType && 
                            <span className={getOperatorTypeBadge((member as Operator).operatorType)}>
                              {(member as Operator).operatorType}
                            </span>
                          }
                        </div>
                        {(member as Operator).region && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {(member as Operator).region}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/mot/users/${type === 'timekeeper' ? 'timekeepers' : 'operators'}/${member.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/mot/users/${type === 'timekeeper' ? 'timekeepers' : 'operators'}/${member.id}/edit`}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onDelete(member.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
