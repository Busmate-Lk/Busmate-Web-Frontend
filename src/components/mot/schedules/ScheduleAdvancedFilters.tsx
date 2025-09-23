'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle,
  XCircle,
  Route,
  Users
} from 'lucide-react';

interface FilterOptions {
  statuses: Array<'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED'>;
  scheduleTypes: Array<'REGULAR' | 'SPECIAL'>;
  routes: Array<{ id: string; name: string; routeGroup?: string }>;
}

interface ScheduleAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  scheduleTypeFilter: string;
  setScheduleTypeFilter: (value: string) => void;
  routeFilter: string;
  setRouteFilter: (value: string) => void;
  effectiveStartDate: string;
  setEffectiveStartDate: (value: string) => void;
  effectiveEndDate: string;
  setEffectiveEndDate: (value: string) => void;

  // Data
  filterOptions: FilterOptions;
  loading: boolean;

  // Stats for display
  totalCount?: number;
  filteredCount?: number;

  // Event handlers
  onClearAll?: () => void;
  onSearch?: (term: string) => void;
}

export default function ScheduleAdvancedFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  scheduleTypeFilter,
  setScheduleTypeFilter,
  routeFilter,
  setRouteFilter,
  effectiveStartDate,
  setEffectiveStartDate,
  effectiveEndDate,
  setEffectiveEndDate,
  filterOptions,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: ScheduleAdvancedFiltersProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(searchTerm);

  // Debounced search effect
  useEffect(() => {
    if (searchValue !== searchTerm) {
      const handler = setTimeout(() => {
        setSearchTerm(searchValue);
        if (onSearch) {
          onSearch(searchValue);
        }
      }, 400);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [searchValue, searchTerm, setSearchTerm, onSearch]);

  // Update local search when prop changes (but avoid infinite loops)
  useEffect(() => {
    if (searchTerm !== searchValue) {
      setSearchValue(searchTerm);
    }
  }, [searchTerm]);

  const hasActiveFilters = Boolean(
    searchTerm ||
    statusFilter !== 'all' ||
    scheduleTypeFilter !== 'all' ||
    routeFilter !== 'all' ||
    effectiveStartDate ||
    effectiveEndDate
  );

  const activeFilterCount = [
    searchTerm && 'search',
    statusFilter !== 'all' && 'status',
    scheduleTypeFilter !== 'all' && 'schedule-type',
    routeFilter !== 'all' && 'route',
    effectiveStartDate && 'start-date',
    effectiveEndDate && 'end-date'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStatusFilter('all');
    setScheduleTypeFilter('all');
    setRouteFilter('all');
    setEffectiveStartDate('');
    setEffectiveEndDate('');
    if (onClearAll) {
      onClearAll();
    }
  }, [setStatusFilter, setScheduleTypeFilter, setRouteFilter, setEffectiveStartDate, setEffectiveEndDate, onClearAll]);

  const getStatusIcon = (value: string) => {
    switch (value) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'INACTIVE':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Filter className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'ACTIVE':
        return 'Active Only';
      case 'INACTIVE':
        return 'Inactive Only';
      case 'PENDING':
        return 'Pending Only';
      case 'CANCELLED':
        return 'Cancelled Only';
      default:
        return 'All Statuses';
    }
  };

  const getScheduleTypeIcon = (value: string) => {
    switch (value) {
      case 'REGULAR':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'SPECIAL':
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <Filter className="w-4 h-4 text-gray-600" />;
    }
  };

  const getScheduleTypeLabel = (value: string) => {
    switch (value) {
      case 'REGULAR':
        return 'Regular Only';
      case 'SPECIAL':
        return 'Special Only';
      default:
        return 'All Types';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Compact Main Filter Section */}
      <div className="p-4">
        {/* Header with Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Search & Filters</h3>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {filteredCount.toLocaleString()}
            </span>
            <> of {totalCount.toLocaleString()} schedules</>
          </div>
        </div>

        {/* Compact Filter Row */}
        <div className="flex flex-col gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search schedules by name, description, or route name..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="block w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {/* Show loading indicator when search value differs from current search term */}
              {searchValue !== searchTerm && searchValue && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              )}
              {searchValue && (
                <button
                  onClick={() => setSearchValue('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                disabled={loading}
                className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              >
                <option value="all">All Statuses</option>
                {filterOptions.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Schedule Type Filter */}
            <div className="relative">
              <select
                value={scheduleTypeFilter}
                onChange={(e) => setScheduleTypeFilter(e.target.value)}
                className="block w-full lg:w-40 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
              >
                <option value="all">All Types</option>
                {filterOptions.scheduleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Route Filter */}
            <div className="relative">
              <select
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
              >
                <option value="all">All Routes</option>
                {filterOptions.routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name} {route.routeGroup && `(${route.routeGroup})`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={effectiveStartDate}
                  onChange={(e) => setEffectiveStartDate(e.target.value)}
                  className="block w-36 pl-3 pr-2 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="relative">
                <input
                  type="date"
                  placeholder="End Date"
                  value={effectiveEndDate}
                  onChange={(e) => setEffectiveEndDate(e.target.value)}
                  className="block w-36 pl-3 pr-2 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Active Filters Section */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100">
          <div className="p-3">
            <div className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
                <div className='flex items-center gap-2 ml-4 flex-wrap'>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800">
                      <Search className="w-3 h-3 mr-1" />
                      "{searchTerm}"
                      <button
                        onClick={() => setSearchValue('')}
                        className="ml-1 hover:text-blue-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 text-green-800">
                      {getStatusIcon(statusFilter)}
                      <span className="ml-1">{getStatusLabel(statusFilter)}</span>
                      <button
                        onClick={() => setStatusFilter('all')}
                        className="ml-1 hover:text-green-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {scheduleTypeFilter !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-800">
                      {getScheduleTypeIcon(scheduleTypeFilter)}
                      <span className="ml-1">{getScheduleTypeLabel(scheduleTypeFilter)}</span>
                      <button
                        onClick={() => setScheduleTypeFilter('all')}
                        className="ml-1 hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {routeFilter !== 'all' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-100 text-indigo-800">
                      <Route className="w-3 h-3 mr-1" />
                      {filterOptions.routes.find(r => r.id === routeFilter)?.name || routeFilter}
                      <button
                        onClick={() => setRouteFilter('all')}
                        className="ml-1 hover:text-indigo-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {effectiveStartDate && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-orange-100 text-orange-800">
                      <Calendar className="w-3 h-3 mr-1" />
                      From: {new Date(effectiveStartDate).toLocaleDateString()}
                      <button
                        onClick={() => setEffectiveStartDate('')}
                        className="ml-1 hover:text-orange-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {effectiveEndDate && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-orange-100 text-orange-800">
                      <Calendar className="w-3 h-3 mr-1" />
                      Until: {new Date(effectiveEndDate).toLocaleDateString()}
                      <button
                        onClick={() => setEffectiveEndDate('')}
                        className="ml-1 hover:text-orange-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
              {/* Clear All Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-auto"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
            <span className="text-xs text-blue-800">Loading filter options...</span>
          </div>
        </div>
      )}
    </div>
  );
}