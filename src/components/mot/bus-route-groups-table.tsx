'use client';

import {
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  ChevronUp,
  ChevronDown,
  Route,
  User,
  FileText,
  MoreVertical,
} from 'lucide-react';
import { useState } from 'react';
import type { RouteGroupResponse } from '@/lib/api-client/route-management';

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface BusRouteGroupsTableProps {
  routeGroups: RouteGroupResponse[];
  onView: (routeGroupId: string) => void;
  onEdit: (routeGroupId: string) => void;
  onDelete: (routeGroupId: string, routeGroupName: string) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  activeFilters?: {
    search?: string;
  };
  loading?: boolean;
  currentSort?: SortConfig;
}

interface SortableHeaderProps {
  field: string;
  children: React.ReactNode;
  currentSort?: SortConfig;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

function SortableHeader({ field, children, currentSort, onSort, className = '' }: SortableHeaderProps) {
  const isActive = currentSort?.field === field;
  const direction = isActive ? currentSort.direction : 'asc';
  const nextDirection = isActive && direction === 'asc' ? 'desc' : 'asc';

  const handleClick = () => {
    if (onSort) {
      onSort(field, nextDirection);
    }
  };

  return (
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors ${className}`}>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
        disabled={!onSort}
      >
        {children}
        {onSort && (
          <span className="ml-1">
            {isActive ? (
              direction === 'asc' ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )
            ) : (
              <ChevronUp className="h-3 w-3 opacity-0 group-hover:opacity-50" />
            )}
          </span>
        )}
      </button>
    </th>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-48 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  {[...Array(3)].map((_, btnIndex) => (
                    <div key={btnIndex} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionDropdown({ 
  routeGroup, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  routeGroup: RouteGroupResponse;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="More actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <button
                onClick={() => {
                  onView(String(routeGroup.id));
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Eye className="w-4 h-4 mr-3" />
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit(String(routeGroup.id));
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Edit className="w-4 h-4 mr-3" />
                Edit Group
              </button>
              <hr className="my-1" />
              <button
                onClick={() => {
                  onDelete(String(routeGroup.id), String(routeGroup.name || 'Unnamed Group'));
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-3" />
                Delete Group
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getRouteCountBadge(count: number) {
  if (count === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <Route className="w-3 h-3 mr-1" />
        No routes
      </span>
    );
  } else if (count <= 3) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <Route className="w-3 h-3 mr-1" />
        {count} {count === 1 ? 'route' : 'routes'}
      </span>
    );
  } else if (count <= 10) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Route className="w-3 h-3 mr-1" />
        {count} routes
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <Route className="w-3 h-3 mr-1" />
        {count} routes
      </span>
    );
  }
}

export function BusRouteGroupsTable({
  routeGroups,
  onView,
  onEdit,
  onDelete,
  onSort,
  activeFilters,
  loading,
  currentSort,
}: BusRouteGroupsTableProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Today';
      } else if (diffDays <= 7) {
        return `${diffDays} days ago`;
      } else if (diffDays <= 30) {
        return `${Math.ceil(diffDays / 7)} weeks ago`;
      } else {
        return formatDate(dateString);
      }
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Route Groups Directory
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                  Loading route groups...
                </span>
              ) : (
                `${routeGroups?.length || 0} route groups found`
              )}
            </p>
          </div>
          
          {activeFilters?.search && (
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              <span>Filtered by: "{activeFilters.search}"</span>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : routeGroups?.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="text-gray-400 mb-4">
            <Route className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No route groups found
          </h3>
          <p className="text-gray-600 mb-4">
            {activeFilters?.search
              ? 'Try adjusting your search criteria or create a new route group.'
              : 'Get started by creating your first route group to organize your bus routes.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader
                  field="name"
                  currentSort={currentSort}
                  onSort={onSort}
                >
                  Route Group
                </SortableHeader>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Description
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Routes
                </th>
                
                <SortableHeader
                  field="createdAt"
                  currentSort={currentSort}
                  onSort={onSort}
                >
                  Created
                </SortableHeader>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routeGroups?.map((routeGroup) => (
                <tr
                  key={String(routeGroup.id)}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Route Group Name & ID */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {routeGroup.name || 'Unnamed Group'}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                          ID: {routeGroup.id ? String(routeGroup.id).slice(0, 8) + '...' : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Description */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      {routeGroup.description ? (
                        <div>
                          <div className="truncate font-medium mb-1" title={routeGroup.description}>
                            {routeGroup.description}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <FileText className="w-3 h-3 mr-1" />
                            Description provided
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">
                          No description provided
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Routes Count */}
                  <td className="px-6 py-4">
                    {getRouteCountBadge(routeGroup.routes?.length || 0)}
                  </td>
                  
                  {/* Created Date & By */}
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {formatRelativeTime(routeGroup.createdAt)}
                      </div>
                      {routeGroup.createdBy && (
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {/* {routeGroup.createdBy} */}
                          {routeGroup.createdBy ? String(routeGroup.createdBy).slice(0, 15) + '...' : 'N/A'}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onView(String(routeGroup.id))}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(String(routeGroup.id))}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          onDelete(
                            String(routeGroup.id),
                            String(routeGroup.name || 'Unnamed Group')
                          )
                        }
                        className="text-red-600 hover:text-red-700 transition-colors"
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
      )}
    </div>
  );
}
