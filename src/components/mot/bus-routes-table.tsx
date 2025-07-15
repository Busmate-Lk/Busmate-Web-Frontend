"use client";

import { Eye, Edit, Trash2, MapPin, Clock, Users, Filter, Calendar } from "lucide-react";
import { Pagination } from "./pagination";

export interface BusRoute {
  id: string;
  routeName: string;
  routeNumber: string;
  group: string;
  stopsCount: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
   
  distance: string;
  estimatedTime: string;
  scheduleCount: number;
  lastUpdated: string;
  stops: string[];
}

interface BusRoutesTableProps {
  routes: BusRoute[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onView: (routeId: string) => void;
  onEdit: (routeId: string) => void;
  onDelete: (routeId: string, routeName: string) => void;
  onAddSchedule: (routeId: string) => void;
  activeFilters?: {
    status?: string;
    group?: string;
    search?: string;
  };
  routeGroups?: Array<{ id: string; name: string; color: string }>;
}

export function BusRoutesTable({
  routes,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
  onAddSchedule,
  activeFilters = {},
  routeGroups = [],
}: BusRoutesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGroupColor = (groupName: string) => {
    const group = routeGroups.find(g => g.name === groupName);
    return group?.color || '#6B7280';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Bus Routes</h3>
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
            {routes.length} routes
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
                  <div className="flex items-center gap-2">
                    Route Details
                    {activeFilters.search && (
                      <div title="Filtered by search">
                        <Filter className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    Group
                    {activeFilters.group && (
                      <div title={`Filtered by: ${activeFilters.group}`}>
                        <Filter className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Stops
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    Status
                    {activeFilters.status && (
                      <div title={`Filtered by: ${activeFilters.status}`}>
                        <Filter className="h-3 w-3 text-blue-500" />
                      </div>
                    )}
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Performance
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr
                  key={route.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {route.routeName}
                      </div>
                      <div className="text-sm text-gray-500">#{route.routeNumber}</div>
                     </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: getGroupColor(route.group)
                        }}
                      ></div>
                      <span className="text-sm text-gray-900">{route.group}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{route.stopsCount} stops</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        route.status
                      )}`}
                    >
                      {route.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{route.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>{route.scheduleCount} schedules</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-purple-50 rounded transition-colors"
                        onClick={() => onAddSchedule(route.id)}
                        title="Add Schedule"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => onView(route.id)}
                        title="View Route"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        onClick={() => onEdit(route.id)}
                        title="Edit Route"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        onClick={() => onDelete(route.id, route.routeName)}
                        title="Delete Route"
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={[5, 10, 15, 20]}
          />
        </div>
      </div>
    </div>
  );
}
