"use client";

import { Search, ChevronDown, X, Filter } from "lucide-react"

interface FilterBarProps {
  searchTerm?: string
  setSearchTerm?: (value: string) => void
  groupFilter: string
  setGroupFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  dateFilter: string
  setDateFilter: (value: string) => void
  statusOptions?: { value: string; label: string }[]
  dateLabel?: string
  searchPlaceholder?: string
}

export default function FilterBar({
  searchTerm = "",
  setSearchTerm,
  groupFilter,
  setGroupFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  statusOptions = [
    { value: "", label: "All" },
    { value: "sent", label: "Sent" },
    { value: "pending", label: "Pending" }
  ],
  dateLabel = "Date",
  searchPlaceholder = "Search messages..."
}: FilterBarProps) {
  
  // Check if any filters are active
  const hasActiveFilters = 
    (searchTerm && searchTerm.trim() !== '') || 
    (groupFilter && groupFilter !== '') || 
    (statusFilter && statusFilter !== '') ||
    (dateFilter && dateFilter !== '');

  const clearAllFilters = () => {
    if (setSearchTerm) setSearchTerm('');
    setGroupFilter('');
    setStatusFilter('');
    setDateFilter('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input (Optional) */}
          {setSearchTerm && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
              />
            </div>
          )}
          
          {/* Target Group Filter */}
          <div className="relative">
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[150px]"
            >
              <option value="">All Groups</option>
              <option value="Bus Operators">Bus Operators</option>
              <option value="Drivers">Drivers</option>
              <option value="Conductors">Conductors</option>
              <option value="Fleet Operators">Fleet Operators</option>
              <option value="Passengers">Passengers</option>
              <option value="All Users">All Users</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Status/Priority Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[130px]"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[150px]"
              title={dateLabel}
            />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md border border-gray-300 flex items-center gap-1 transition-colors whitespace-nowrap"
              title="Clear all filters"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display with Colors */}
      {hasActiveFilters && (
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Active filters:</span>
          
          {searchTerm && searchTerm.trim() !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <Search className="w-3 h-3 mr-1" />
              Search: "{searchTerm}"
            </span>
          )}
          
          {groupFilter && groupFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
              Group: {groupFilter}
            </span>
          )}
          
          {statusFilter && statusFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
              Status: {statusOptions.find(opt => opt.value === statusFilter)?.label || statusFilter}
            </span>
          )}

          {dateFilter && dateFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <div className="w-2 h-2 bg-orange-600 rounded-full mr-1"></div>
              {dateLabel}: {new Date(dateFilter).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  )
}