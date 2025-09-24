'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, X, Bus, CheckCircle, XCircle, Users, Clock } from 'lucide-react';

interface FilterOptions {
  statuses: Array<string>;
  operators: Array<{ id: string; name: string; type?: string }>;
  models: Array<string>;
  capacityRanges: Array<string>;
}

interface BusAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  operatorFilter: string;
  setOperatorFilter: (value: string) => void;
  minCapacity: string;
  setMinCapacity: (value: string) => void;
  maxCapacity: string;
  setMaxCapacity: (value: string) => void;
  modelFilter: string;
  setModelFilter: (value: string) => void;

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

export default function BusAdvancedFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  operatorFilter,
  setOperatorFilter,
  minCapacity,
  setMinCapacity,
  maxCapacity,
  setMaxCapacity,
  modelFilter,
  setModelFilter,
  filterOptions,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: BusAdvancedFiltersProps) {
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
    modelFilter !== 'all' ||
    minCapacity ||
    maxCapacity
  );

  const activeFilterCount = [
    searchTerm && 'search',
    statusFilter !== 'all' && 'status',
    operatorFilter !== 'all' && 'operator',
    modelFilter !== 'all' && 'model',
    minCapacity && 'min-capacity',
    maxCapacity && 'max-capacity'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStatusFilter('all');
    setOperatorFilter('all');
    setModelFilter('all');
    setMinCapacity('');
    setMaxCapacity('');
    if (onClearAll) {
      onClearAll();
    }
  }, [setStatusFilter, setOperatorFilter, setModelFilter, setMinCapacity, setMaxCapacity, onClearAll]);

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

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Compact Main Filter Section */}
      <div className="p-4">
        {/* Header with Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bus className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Bus Filters</h3>
          </div>
          <div className="text-sm text-gray-600">
            {filteredCount !== totalCount ? (
              <>Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} buses</>
            ) : (
              <>{totalCount.toLocaleString()} buses</>
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
              placeholder="Search by registration number, plate number, model, or operator..."
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

            {/* Capacity Range */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Capacity:</label>
              <input
                type="number"
                placeholder="Min"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-16"
                min="0"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-16"
                min="0"
              />
            </div>

            {/* Model Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Model:</label>
              <div className="relative">
                <select
                  value={modelFilter}
                  onChange={(e) => setModelFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]"
                >
                  <option value="all">All Models</option>
                  {filterOptions.models.map((model) => (
                    <option key={model} value={model}>
                      {model}
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
              
              {modelFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                  <Bus className="h-3 w-3" />
                  Model: {modelFilter}
                  <button
                    onClick={() => setModelFilter('all')}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {(minCapacity || maxCapacity) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-md">
                  Capacity: {minCapacity || '0'} - {maxCapacity || '∞'}
                  <button
                    onClick={() => {
                      setMinCapacity('');
                      setMaxCapacity('');
                    }}
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
            <span className="text-xs text-blue-800">Updating bus list...</span>
          </div>
        </div>
      )}
    </div>
  );
}