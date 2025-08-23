"use client";

import { Search, Plus, Download, X, Filter } from "lucide-react";

interface BusRouteGroupSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNewRouteGroup: () => void;
  onExportAll?: () => void;
  isLoading?: boolean;
}

export function BusRouteGroupSearchFilters({
  searchTerm,
  setSearchTerm,
  onAddNewRouteGroup,
  onExportAll,
  isLoading = false,
}: BusRouteGroupSearchFiltersProps) {
  const hasActiveFilters = searchTerm;

  const clearAllFilters = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      {/* Search and Action Buttons */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search route groups by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
          {searchTerm && !isLoading && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onAddNewRouteGroup}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Route Group</span>
            <span className="sm:hidden">Add</span>
          </button>
          
          {onExportAll && (
            <button
              onClick={onExportAll}
              disabled={isLoading}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export All</span>
              <span className="sm:hidden">Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Active filters:</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:text-blue-600 ml-1"
                  title="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats Summary */}
      {hasActiveFilters && (
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-2">
          Use the search bar to find specific route groups by name or description.
        </div>
      )}
    </div>
  );
}
