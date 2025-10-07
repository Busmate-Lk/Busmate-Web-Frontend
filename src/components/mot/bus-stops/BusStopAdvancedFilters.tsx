'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  XCircle,
  Users,
  MapPin,
  Building
} from 'lucide-react';

interface FilterOptions {
  states: string[];
  accessibilityStatuses: boolean[];
}

interface BusStopAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  stateFilter: string;
  setStateFilter: (value: string) => void;
  accessibilityFilter: string;
  setAccessibilityFilter: (value: string) => void;

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

export function BusStopAdvancedFilters({
  searchTerm,
  setSearchTerm,
  stateFilter,
  setStateFilter,
  accessibilityFilter,
  setAccessibilityFilter,
  filterOptions,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: BusStopAdvancedFiltersProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(searchTerm);

  // Debounced search effect
  useEffect(() => {
    if (searchValue !== searchTerm) {
      const timer = setTimeout(() => {
        if (onSearch) {
          onSearch(searchValue);
        } else {
          setSearchTerm(searchValue);
        }
      }, 300);

      return () => clearTimeout(timer);
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
    stateFilter !== 'all' ||
    accessibilityFilter !== 'all'
  );

  const activeFilterCount = [
    searchTerm && 'search',
    stateFilter !== 'all' && 'state',
    accessibilityFilter !== 'all' && 'accessibility'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStateFilter('all');
    setAccessibilityFilter('all');
    if (onClearAll) {
      onClearAll();
    }
  }, [setStateFilter, setAccessibilityFilter, onClearAll]);

  const getAccessibilityIcon = (value: string) => {
    switch (value) {
      case 'accessible':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'non-accessible':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Users className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAccessibilityLabel = (value: string) => {
    switch (value) {
      case 'accessible':
        return 'Accessible Only';
      case 'non-accessible':
        return 'Non-Accessible Only';
      default:
        return 'All Accessibility Types';
    }
  };

  const getStateIcon = (value: string) => {
    return value === 'all' ? 
      <Building className="w-4 h-4 text-gray-600" /> : 
      <MapPin className="w-4 h-4 text-blue-600" />;
  };

  const getStateLabel = (value: string) => {
    return value === 'all' ? 'All States' : value;
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
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} stops
            </span>
          </div>
        </div>

        {/* Main Filter Row */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name, address, city, or state..."
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="lg:w-48">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All States</option>
              {filterOptions.states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Accessibility Filter */}
          <div className="lg:w-48">
            <select
              value={accessibilityFilter}
              onChange={(e) => setAccessibilityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Accessibility</option>
              <option value="accessible">Accessible Only</option>
              <option value="non-accessible">Non-Accessible Only</option>
            </select>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className={`
              flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors
              ${hasActiveFilters
                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">
              {hasActiveFilters ? `Filters (${activeFilterCount})` : 'More Filters'}
            </span>
            {isFilterExpanded ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Active Filters:</span>
              <button
                onClick={handleClearAll}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Search Filter */}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                  <Search className="h-3 w-3" />
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchValue('')}>
                    <X className="h-3 w-3 hover:text-blue-600" />
                  </button>
                </span>
              )}

              {/* State Filter */}
              {stateFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
                  {getStateIcon(stateFilter)}
                  State: {getStateLabel(stateFilter)}
                  <button onClick={() => setStateFilter('all')}>
                    <X className="h-3 w-3 hover:text-purple-600" />
                  </button>
                </span>
              )}

              {/* Accessibility Filter */}
              {accessibilityFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                  {getAccessibilityIcon(accessibilityFilter)}
                  {getAccessibilityLabel(accessibilityFilter)}
                  <button onClick={() => setAccessibilityFilter('all')}>
                    <X className="h-3 w-3 hover:text-green-600" />
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
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Loading bus stops...</span>
          </div>
        </div>
      )}
    </div>
  );
}