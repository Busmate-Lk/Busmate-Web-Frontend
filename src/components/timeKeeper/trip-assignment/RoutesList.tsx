'use client';

import { Search } from 'lucide-react';
import type { RouteGroupResponse } from '@/lib/api-client/route-management/models/RouteGroupResponse';

interface RoutesListProps {
  routeGroups: RouteGroupResponse[];
  selectedRoute: string | null;
  onRouteSelect: (routeId: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function RoutesList({
  routeGroups,
  selectedRoute,
  onRouteSelect,
  searchValue,
  onSearchChange,
  isLoading = false,
  error = null,
}: RoutesListProps) {
  // Filter routes based on search input
  const filteredRouteGroups = routeGroups.filter(
    (group) =>
      group.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      group.routes?.some((route) =>
        route.name?.toLowerCase().includes(searchValue.toLowerCase())
      )
  );

  if (isLoading) {
    return (
      <div className="w-1/5 bg-white p-6 border-r border-gray-100 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Routes</h2>
          <p className="text-sm text-gray-500">
            Select a route to manage trip assignments
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading routes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-1/5 bg-white p-6 border-r border-gray-100 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Routes</h2>
          <p className="text-sm text-gray-500">
            Select a route to manage trip assignments
          </p>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">⚠️ Error</div>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/5 bg-white p-6 border-r border-gray-100 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Routes</h2>
        <p className="text-sm text-gray-500">
          Select a route to manage trip assignments
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search routes..."
          className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredRouteGroups.map((group) => (
          <div
            key={group.id}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="font-semibold text-green-900 text-lg mb-3 flex items-center">
              <div className="w-full truncate" title={group.name}>
                {group.name}
              </div>
            </div>
            <div className="space-y-2">
              {group.routes?.map((route) => (
                <div
                  key={route.id}
                  className={`p-2 rounded-md flex justify-between items-center cursor-pointer transition-all duration-200 ${
                    selectedRoute === route.id
                      ? 'bg-green-600 text-white shadow-md transform scale-[1.02]'
                      : 'bg-white hover:bg-green-50 hover:shadow-sm border border-gray-100'
                  }`}
                  onClick={() => route.id && onRouteSelect(route.id)}
                >
                  <div
                    className="font-medium max-w-44 truncate"
                    title={
                      route.name +
                      ' (' +
                      (route.direction === 'OUTBOUND'
                        ? 'Outbound'
                        : 'Inbound') +
                      ')'
                    }
                  >
                    {route.name}
                  </div>
                  <div
                    className={`text-xs mt-1 flex items-center ${
                      selectedRoute === route.id
                        ? 'text-green-100'
                        : 'text-gray-500'
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedRoute === route.id
                          ? 'bg-green-500 text-white'
                          : route.direction === 'OUTBOUND'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {route.direction === 'OUTBOUND' ? 'Out' : 'In'}
                    </span>
                  </div>
                </div>
              )) || (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No routes available
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
