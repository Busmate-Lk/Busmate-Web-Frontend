'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, X, FileText, CheckCircle, XCircle, Users, MapPin, Clock } from 'lucide-react';

interface FilterOptions {
  statuses: Array<string>;
  operators: Array<{ id: string; name: string; operatorType?: string }>;
  routeGroups: Array<{ id: string; name: string; code?: string }>;
  permitTypes: Array<string>;
}

interface PermitAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  operatorFilter: string;
  setOperatorFilter: (value: string) => void;
  routeGroupFilter: string;
  setRouteGroupFilter: (value: string) => void;
  permitTypeFilter: string;
  setPermitTypeFilter: (value: string) => void;

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

export function PermitAdvancedFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  operatorFilter,
  setOperatorFilter,
  routeGroupFilter,
  setRouteGroupFilter,
  permitTypeFilter,
  setPermitTypeFilter,
  filterOptions,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: PermitAdvancedFiltersProps) {
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
    operatorFilter !== 'all' ||
    routeGroupFilter !== 'all' ||
    permitTypeFilter !== 'all'
  );

  const activeFilterCount = [
    searchTerm && 'search',
    statusFilter !== 'all' && 'status',
    operatorFilter !== 'all' && 'operator',
    routeGroupFilter !== 'all' && 'route-group',
    permitTypeFilter !== 'all' && 'permit-type'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStatusFilter('all');
    setOperatorFilter('all');
    setRouteGroupFilter('all');
    setPermitTypeFilter('all');
    if (onClearAll) {
      onClearAll();
    }
  }, [setStatusFilter, setOperatorFilter, setRouteGroupFilter, setPermitTypeFilter, onClearAll]);

  const getStatusIcon = (value: string) => {
    switch (value?.toUpperCase()) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'INACTIVE':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'EXPIRED':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Filter className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (value: string) => {
    switch (value?.toUpperCase()) {
      case 'ACTIVE':
        return 'Active Only';
      case 'INACTIVE':
        return 'Inactive Only';
      case 'PENDING':
        return 'Pending Only';
      case 'EXPIRED':
        return 'Expired Only';
      default:
        return 'All Statuses';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Compact Main Filter Section */}
      <div className="p-4">
        {/* Header with Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Permit Filters</h3>
          </div>
          <div className="text-sm text-gray-600">
            {filteredCount !== totalCount ? (
              <>Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} permits</>
            ) : (
              <>{totalCount.toLocaleString()} permits</>
            )}
          </div>
        </div>

        {/* Compact Filter Row */}
        <div className="flex flex-col gap-3">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by permit number, operator, or route group..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Inline Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                >
                  <option value="all">All Statuses</option>
                  {filterOptions.statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Operator Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Operator:</label>
              <div className="relative">
                <select
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="all">All Operators</option>
                  {filterOptions.operators.map((operator) => (
                    <option key={operator.id} value={operator.id}>
                      {operator.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Route Group Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Route Group:</label>
              <div className="relative">
                <select
                  value={routeGroupFilter}
                  onChange={(e) => setRouteGroupFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
                >
                  <option value="all">All Route Groups</option>
                  {filterOptions.routeGroups.map((routeGroup) => (
                    <option key={routeGroup.id} value={routeGroup.id}>
                      {routeGroup.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Permit Type Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Type:</label>
              <div className="relative">
                <select
                  value={permitTypeFilter}
                  onChange={(e) => setPermitTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                >
                  <option value="all">All Types</option>
                  {filterOptions.permitTypes.map((permitType) => (
                    <option key={permitType} value={permitType}>
                      {permitType}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="h-3 w-3" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Section */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Active Filters ({activeFilterCount})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                  <Search className="h-3 w-3" />
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchValue('')}
                    className="ml-1 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                  {getStatusIcon(statusFilter)}
                  {getStatusLabel(statusFilter)}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="ml-1 hover:text-green-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {operatorFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-md">
                  <Users className="h-3 w-3" />
                  {filterOptions.operators.find(op => op.id === operatorFilter)?.name || 'Unknown Operator'}
                  <button
                    onClick={() => setOperatorFilter('all')}
                    className="ml-1 hover:text-indigo-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {routeGroupFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                  <MapPin className="h-3 w-3" />
                  {filterOptions.routeGroups.find(rg => rg.id === routeGroupFilter)?.name || 'Unknown Route Group'}
                  <button
                    onClick={() => setRouteGroupFilter('all')}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {permitTypeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-md">
                  <FileText className="h-3 w-3" />
                  Type: {permitTypeFilter}
                  <button
                    onClick={() => setPermitTypeFilter('all')}
                    className="ml-1 hover:text-orange-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
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
            <span className="text-xs text-blue-800">Updating permit list...</span>
          </div>
        </div>
      )}
    </div>
  );
}