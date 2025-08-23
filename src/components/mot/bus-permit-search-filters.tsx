"use client";

import { Search, Plus, Download, ChevronDown, X, Filter } from "lucide-react";

interface BusPermitSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNewPermit: () => void;
  onExportAll?: () => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  operatorFilter: string;
  setOperatorFilter: (operator: string) => void;
}

export function BusPermitSearchFilters({
  searchTerm,
  setSearchTerm,
  onAddNewPermit,
  onExportAll,
  statusFilter,
  setStatusFilter,
  operatorFilter,
  setOperatorFilter,
}: BusPermitSearchFiltersProps) {
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || operatorFilter;

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setOperatorFilter('');
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'expired', label: 'Expired' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-4">
        {/* Primary Filter Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search by permit number, operator name, or route group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
            
            {/* Operator Filter */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by Operator ID"
                value={operatorFilter}
                onChange={(e) => setOperatorFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-300 flex items-center gap-2 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {onExportAll && (
              <button
                onClick={onExportAll}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent inline-flex items-center transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </button>
            )}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center transition-colors"
              onClick={onAddNewPermit}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Permit
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Active filters:</span>
            </div>

            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Search className="w-3 h-3 mr-1" />
                Search: "{searchTerm}"
              </span>
            )}

            {statusFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                Status: {statusOptions.find(opt => opt.value === statusFilter)?.label}
              </span>
            )}

            {operatorFilter && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
                Operator: {operatorFilter}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}