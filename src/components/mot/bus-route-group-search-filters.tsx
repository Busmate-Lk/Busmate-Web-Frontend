"use client";

import { Search, Plus, Download, X } from "lucide-react";

interface BusRouteGroupSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNewRouteGroup: () => void;
  onExportAll?: () => void;
}

export function BusRouteGroupSearchFilters({
  searchTerm,
  setSearchTerm,
  onAddNewRouteGroup,
  onExportAll,
}: BusRouteGroupSearchFiltersProps) {
  const hasActiveFilters = searchTerm;

  const clearAllFilters = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      {/* Search and Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search route groups by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onAddNewRouteGroup}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Route Group
          </button>
          {onExportAll && (
            <button
              onClick={onExportAll}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export All
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">Active filters:</span>
          <div className="flex items-center gap-2">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
