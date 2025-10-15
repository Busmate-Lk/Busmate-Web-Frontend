'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, CheckCircle, XCircle, Clock } from 'lucide-react';

interface FleetAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  minCapacity: string;
  setMinCapacity: (value: string) => void;
  maxCapacity: string;
  setMaxCapacity: (value: string) => void;
  modelFilter: string;
  setModelFilter: (value: string) => void;

  // Data
  models: Array<string>;
  loading: boolean;

  // Stats for display
  totalCount?: number;
  filteredCount?: number;

  // Event handlers
  onClearAll?: () => void;
  onSearch?: (term: string) => void;
}

export default function FleetAdvancedFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  minCapacity,
  setMinCapacity,
  maxCapacity,
  setMaxCapacity,
  modelFilter,
  setModelFilter,
  models,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: FleetAdvancedFiltersProps) {
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
    modelFilter !== 'all' ||
    minCapacity ||
    maxCapacity
  );

  const activeFilterCount = [
    searchTerm && 'search',
    statusFilter !== 'all' && 'status',
    modelFilter !== 'all' && 'model',
    minCapacity && 'min-capacity',
    maxCapacity && 'max-capacity'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStatusFilter('all');
    setModelFilter('all');
    setMinCapacity('');
    setMaxCapacity('');
    if (onClearAll) {
      onClearAll();
    }
  }, [setStatusFilter, setModelFilter, setMinCapacity, setMaxCapacity, onClearAll]);

  const getStatusIcon = (value: string) => {
    switch (value) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Filter className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'active':
        return 'Active Only';
      case 'inactive':
        return 'Inactive Only';
      case 'pending':
        return 'Pending Only';
      case 'cancelled':
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
            <Search className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Fleet Search & Filters</h3>
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
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by registration number, plate number, or model..."
              className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white min-w-32"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {getStatusIcon(statusFilter)}
              </div>
            </div>

            {/* Model Filter */}
            <div className="relative">
              <select
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white min-w-32"
              >
                <option value="all">All Models</option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Capacity Range */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="0"
              />
              <span className="text-gray-500 text-sm">to</span>
              <input
                type="number"
                placeholder="Max"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="0"
              />
              <span className="text-gray-500 text-sm">seats</span>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
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
              <span className="text-sm font-medium text-gray-700">
                Active Filters ({activeFilterCount})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => {
                      setSearchValue('');
                      setSearchTerm('');
                    }}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Status: {getStatusLabel(statusFilter)}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {modelFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Model: {modelFilter}
                  <button
                    onClick={() => setModelFilter('all')}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(minCapacity || maxCapacity) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  Capacity: {minCapacity || '0'}-{maxCapacity || '∞'}
                  <button
                    onClick={() => {
                      setMinCapacity('');
                      setMaxCapacity('');
                    }}
                    className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
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
            <span className="text-xs text-blue-800">Searching your fleet...</span>
          </div>
        </div>
      )}
    </div>
  );
}