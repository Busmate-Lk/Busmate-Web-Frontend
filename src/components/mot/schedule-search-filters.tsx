"use client";

import { Search, Plus, Download, ChevronDown, X, Filter, RotateCcw } from "lucide-react";

interface FilterOptions {
  statuses: string[];
  scheduleTypes: string[];
}

interface ScheduleSearchFiltersProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  routeFilter?: string;
  setRouteFilter?: (route: string) => void;
  scheduleTypeFilter?: string;
  setScheduleTypeFilter?: (type: string) => void;
  filterOptions?: FilterOptions;
  onAddNew: () => void;
  onExportAll?: () => void;
  onClearFilters?: () => void;
  isLoading?: boolean;
}

export function ScheduleSearchFilters({
  searchTerm = '',
  setSearchTerm,
  statusFilter = '',
  setStatusFilter,
  routeFilter = '',
  setRouteFilter,
  scheduleTypeFilter = '',
  setScheduleTypeFilter,
  filterOptions,
  onAddNew,
  onExportAll,
  onClearFilters,
  isLoading = false,
}: ScheduleSearchFiltersProps) {
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
    { value: "001", label: "Route 001 - Colombo - Kandy" },
    { value: "002", label: "Route 002 - Galle - Matara" },
    { value: "003", label: "Route 003 - Colombo - Kataragama" },
    { value: "004", label: "Route 004 - Colombo - Mannar" },
    { value: "005", label: "Route 005 - Colombo - Kurunegala" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="space-y-4">
        {/* Main Controls Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search schedules, routes, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm?.(e.target.value)}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 text-sm"
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            {onExportAll && (
              <button
                onClick={onExportAll}
                disabled={isLoading}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center text-sm font-medium transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
            )}
            
            <button
              onClick={onAddNew}
              disabled={isLoading}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center text-sm font-medium transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Schedule
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter className="h-4 w-4" />
            <span>Filters:</span>
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter?.(e.target.value)}
              disabled={isLoading}
              className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Status</option>
              {filterOptions?.statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Schedule Type Filter */}
          <div className="relative min-w-[140px]">
            <select
              value={scheduleTypeFilter}
              onChange={(e) => setScheduleTypeFilter?.(e.target.value)}
              disabled={isLoading}
              className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Types</option>
              {filterOptions?.scheduleTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Route Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter?.(e.target.value)}
              disabled={isLoading}
              className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Routes</option>
              {routeOptions.map((route) => (
                <option key={route.value} value={route.value}>
                  {route.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              disabled={isLoading}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-300 flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-500">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm?.('')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {statusFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter?.('')}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {scheduleTypeFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                Type: {scheduleTypeFilter}
                <button
                  onClick={() => setScheduleTypeFilter?.('')}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {routeFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                Route: {routeFilter}
                <button
                  onClick={() => setRouteFilter?.('')}
                  className="hover:bg-orange-200 rounded-full p-0.5"
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
