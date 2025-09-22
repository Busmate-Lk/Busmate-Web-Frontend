'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  MapPin, 
  Users,
  RotateCcw,
  CheckCircle2,
  XCircle
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

export default function BusStopAdvancedFilters({
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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      } else {
        setSearchTerm(searchValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch, setSearchTerm]);

  // Update local search when prop changes
  useEffect(() => {
    setSearchValue(searchTerm);
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Compact Main Filter Section */}
      <div className="p-4">
        {/* Header with Count */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-900">Bus Stops</h3>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {filteredCount.toLocaleString()}
            </span>
            {hasActiveFilters ? (
              <> of {totalCount.toLocaleString()} stops</>
            ) : (
              <> total stops</>
            )}
          </div>
        </div>

        {/* Compact Filter Row */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search stops..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              disabled={loading}
              className="block w-full lg:w-40 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
            >
              <option value="all">All States</option>
              {filterOptions.states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Accessibility Filter */}
          <div className="relative">
            <select
              value={accessibilityFilter}
              onChange={(e) => setAccessibilityFilter(e.target.value)}
              className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
            >
              <option value="all">All Access Types</option>
              <option value="accessible">Accessible Only</option>
              <option value="non-accessible">Non-Accessible Only</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Active Filters Section */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100">
          <div className="p-3">
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isFilterExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Active Filter Tags */}
            {isFilterExpanded && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                    <Search className="w-3 h-3" />
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchValue('')}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {stateFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    <MapPin className="w-3 h-3" />
                    {stateFilter}
                    <button
                      onClick={() => setStateFilter('all')}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {accessibilityFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                    {getAccessibilityIcon(accessibilityFilter)}
                    {accessibilityFilter === 'accessible' ? 'Accessible' : 'Non-Accessible'}
                    <button
                      onClick={() => setAccessibilityFilter('all')}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
            <span className="text-xs text-blue-800">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}