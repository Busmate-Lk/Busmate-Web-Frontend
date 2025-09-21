'use client';

import { Search, Filter, X, RotateCcw } from 'lucide-react';

interface FilterOptions {
  statuses: string[];
  scheduleTypes: string[];
}

interface ScheduleFiltersProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  routeFilter?: string;
  setRouteFilter?: (route: string) => void;
  scheduleTypeFilter?: string;
  setScheduleTypeFilter?: (type: string) => void;
  filterOptions?: FilterOptions;
  onClearFilters?: () => void;
  isLoading?: boolean;
}

export function ScheduleFilters({
  searchTerm = '',
  setSearchTerm,
  statusFilter = '',
  setStatusFilter,
  routeFilter = '',
  setRouteFilter,
  scheduleTypeFilter = '',
  setScheduleTypeFilter,
  filterOptions,
  onClearFilters,
  isLoading = false,
}: ScheduleFiltersProps) {
  const hasActiveFilters = searchTerm || statusFilter || routeFilter || scheduleTypeFilter;

  const handleClearFilters = () => {
    setSearchTerm?.('');
    setStatusFilter?.('');
    setRouteFilter?.('');
    setScheduleTypeFilter?.('');
    onClearFilters?.();
  };

  // Sample route options - in real app, this would come from API
  const routeOptions = [
    { value: "RG001", label: "Colombo - Kandy" },
    { value: "RG002", label: "Galle - Matara" },
    { value: "RG003", label: "Colombo - Kataragama" },
    { value: "RG004", label: "Colombo - Mannar" },
    { value: "RG005", label: "Colombo - Kurunegala" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Search & Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear all
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search schedules by name, route, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm?.('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter?.(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 text-sm"
            >
              <option value="">All Statuses</option>
              {filterOptions?.statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Type
            </label>
            <select
              value={scheduleTypeFilter}
              onChange={(e) => setScheduleTypeFilter?.(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 text-sm"
            >
              <option value="">All Types</option>
              {filterOptions?.scheduleTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Route Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Route Group
            </label>
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter?.(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 text-sm"
            >
              <option value="">All Route Groups</option>
              {routeOptions.map((route) => (
                <option key={route.value} value={route.value}>
                  {route.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm?.('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {statusFilter && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter?.('')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {scheduleTypeFilter && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Type: {scheduleTypeFilter}
                <button
                  onClick={() => setScheduleTypeFilter?.('')}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {routeFilter && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Route: {routeOptions.find(r => r.value === routeFilter)?.label || routeFilter}
                <button
                  onClick={() => setRouteFilter?.('')}
                  className="ml-1 text-orange-600 hover:text-orange-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}