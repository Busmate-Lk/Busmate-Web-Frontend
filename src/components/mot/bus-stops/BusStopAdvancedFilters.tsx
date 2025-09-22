'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  MapPin, 
  Calendar,
  Users,
  RotateCcw,
  Eye,
  EyeOff,
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Search & Filter Bus Stops</h3>
              <p className="text-sm text-gray-500">
                Find specific bus stops using search and filtering options
              </p>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {filteredCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {hasActiveFilters ? (
                <>of {totalCount.toLocaleString()} stops</>
              ) : (
                <>total stops</>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, address, city, state, or zip code..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full pl-12 pr-12 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Filters Section */}
      <div className="p-6 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Quick Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {activeFilterCount} active
              </span>
            )}
          </div>
          
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {isFilterExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isFilterExpanded ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {/* Filter Pills - Always Visible */}
        <div className="flex flex-wrap gap-3">
          {/* State Filter Pill */}
          <div className="relative">
            <button
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                stateFilter !== 'all'
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>
                {stateFilter !== 'all' ? `State: ${stateFilter}` : 'All States'}
              </span>
            </button>
          </div>

          {/* Accessibility Filter Pill */}
          <div className="relative">
            <button
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                accessibilityFilter !== 'all'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {getAccessibilityIcon(accessibilityFilter)}
              <span>{getAccessibilityLabel(accessibilityFilter)}</span>
            </button>
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters Section */}
      {isFilterExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Filter by State/Province
              </label>
              <div className="relative">
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                >
                  <option value="all">All States</option>
                  {filterOptions.states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500">
                {filterOptions.states.length} states available
              </p>
            </div>

            {/* Accessibility Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Accessibility Requirements
              </label>
              <div className="relative">
                <select
                  value={accessibilityFilter}
                  onChange={(e) => setAccessibilityFilter(e.target.value)}
                  className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                >
                  <option value="all">All Accessibility Types</option>
                  <option value="accessible">Wheelchair Accessible Only</option>
                  <option value="non-accessible">Non-Accessible Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500">
                Filter stops by accessibility features
              </p>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Search className="w-3 h-3" />
                    Search: "{searchTerm}"
                  </span>
                )}
                {stateFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <MapPin className="w-3 h-3" />
                    State: {stateFilter}
                  </span>
                )}
                {accessibilityFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {getAccessibilityIcon(accessibilityFilter)}
                    {getAccessibilityLabel(accessibilityFilter)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
            <span className="text-sm text-yellow-800">Loading filter options...</span>
          </div>
        </div>
      )}
    </div>
  );
}