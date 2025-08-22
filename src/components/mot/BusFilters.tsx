"use client";

import { Search, X, Filter } from "lucide-react";

interface BusFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  minCapacity: string;
  onMinCapacityChange: (value: string) => void;
  maxCapacity: string;
  onMaxCapacityChange: (value: string) => void;
  operatorId: string;
  onOperatorChange: (value: string) => void;
}

export default function BusFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  minCapacity,
  onMinCapacityChange,
  maxCapacity,
  onMaxCapacityChange,
  operatorId,
  onOperatorChange,
}: BusFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "all" ||
    minCapacity ||
    maxCapacity ||
    operatorId;

  const clearAllFilters = () => {
    onSearchChange("");
    onStatusChange("all");
    onMinCapacityChange("");
    onMaxCapacityChange("");
    onOperatorChange("");
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="space-y-4">
        {/* Search and Primary Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by registration, plate, model, or operator..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Min Capacity */}
          <input
            type="number"
            placeholder="Min capacity"
            value={minCapacity}
            onChange={(e) => onMinCapacityChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />

          {/* Max Capacity */}
          <input
            type="number"
            placeholder="Max capacity"
            value={maxCapacity}
            onChange={(e) => onMaxCapacityChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />
        </div>

        {/* Secondary Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Operator Filter */}
          <input
            type="text"
            placeholder="Operator ID"
            value={operatorId}
            onChange={(e) => onOperatorChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-300 flex items-center gap-2 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </button>
          )}
        </div>

        {/* Active Filters Display */}
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

            {statusFilter !== "all" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                Status:{" "}
                {
                  statusOptions.find((opt) => opt.value === statusFilter)
                    ?.label
                }
              </span>
            )}

            {minCapacity && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
                Min Capacity: {minCapacity}
              </span>
            )}

            {maxCapacity && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
                Max Capacity: {maxCapacity}
              </span>
            )}

            {operatorId && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                <div className="w-2 h-2 bg-orange-600 rounded-full mr-1"></div>
                Operator: {operatorId}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}