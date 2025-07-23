"use client";

import { Search, Plus, Download, ChevronDown, X } from "lucide-react";

interface BusFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  busTypeFilter: string;
  setBusTypeFilter: (type: string) => void;
  operatorTypeFilter: string;
  setOperatorTypeFilter: (operator: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onAddNewBus?: () => void;
  onExportAll?: () => void;
}

export default function BusFilters({
  searchTerm,
  setSearchTerm,
  busTypeFilter,
  setBusTypeFilter,
  operatorTypeFilter,
  setOperatorTypeFilter,
  statusFilter,
  setStatusFilter,
  onAddNewBus,
  onExportAll,
}: BusFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters = searchTerm || busTypeFilter || operatorTypeFilter || statusFilter;

  const clearAllFilters = () => {
    setSearchTerm('');
    setBusTypeFilter('');
    setOperatorTypeFilter('');
    setStatusFilter('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Search by bus number, route, or operator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          
          {/* Bus Type Filter */}
          <div className="relative">
            <select
              value={busTypeFilter}
              onChange={(e) => setBusTypeFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Types</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
              <option value="Luxury">Luxury</option>
              <option value="Semi-Luxury">Semi-Luxury</option>
              <option value="Sleeper">Sleeper</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
          
          {/* Operator Type Filter */}
          <div className="relative">
            <select
              value={operatorTypeFilter}
              onChange={(e) => setOperatorTypeFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Operators</option>
              <option value="SLTB">SLTB</option>
              <option value="Private">Private</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md border border-gray-300 flex items-center gap-1 transition-colors"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {onExportAll && (
            <button
              onClick={onExportAll}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 inline-flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Export All
            </button>
          )}
          {onAddNewBus && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
              onClick={onAddNewBus}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Bus
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display with Colors */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <Search className="w-3 h-3 mr-1" />
              Search: "{searchTerm}"
            </span>
          )}
          
          {busTypeFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
              Type: {busTypeFilter}
            </span>
          )}
          
          {operatorTypeFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
              Operator: {operatorTypeFilter}
            </span>
          )}
          
          {statusFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <div className="w-2 h-2 bg-orange-600 rounded-full mr-1"></div>
              Status: {statusFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}