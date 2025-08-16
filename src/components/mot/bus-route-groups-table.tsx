'use client';

import {
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Calendar,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Route,
} from 'lucide-react';
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
    <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}>
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
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
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
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-left">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </th>
            <th className="px-6 py-3 text-right">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse ml-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="ml-3">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
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

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Route Groups
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                  Loading route groups...
                </span>
              ) : (
                `Showing ${routeGroups?.length || 0} route groups`
              )}
            </p>
          </div>
          
          {activeFilters?.search && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
          <button
            onClick={() => {/* Add new route group logic */}}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MapPin className="h-4 w-4" />
            Create Route Group
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <SortableHeader
                  field="name"
                  currentSort={currentSort}
                  onSort={onSort}
                >
                  Route Group
                </SortableHeader>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Routes
                </th>
                
                <SortableHeader
                  field="createdAt"
                  currentSort={currentSort}
                  onSort={onSort}
                >
                  Created
                </SortableHeader>
                
                <SortableHeader
                  field="updatedAt"
                  currentSort={currentSort}
                  onSort={onSort}
                >
                  Last Updated
                </SortableHeader>
                
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {routeGroup.name || 'Unnamed Group'}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {routeGroup.id || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <div className="truncate" title={routeGroup.description || 'No description'}>
                        {routeGroup.description || 'No description provided'}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {routeGroup.routes?.length || 0}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        {(routeGroup.routes?.length || 0) === 1 ? 'route' : 'routes'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{formatDate(routeGroup.createdAt)}</div>
                        {routeGroup.createdBy && (
                          <div className="text-xs text-gray-500">
                            by {routeGroup.createdBy}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{formatDate(routeGroup.updatedAt)}</div>
                        {routeGroup.updatedBy && (
                          <div className="text-xs text-gray-500">
                            by {routeGroup.updatedBy}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView(String(routeGroup.id))}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(String(routeGroup.id))}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Route Group"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          onDelete(
                            String(routeGroup.id),
                            String(routeGroup.name || 'Unnamed Group')
                          )
                        }
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Route Group"
                      >
                        <Trash2 className="h-4 w-4" />
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
