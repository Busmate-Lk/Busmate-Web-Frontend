"use client";

import { Search, ChevronDown, X } from "lucide-react";

interface BroadcastFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  targetGroupFilter: string;
  setTargetGroupFilter: (group: string) => void;
}

export default function BroadcastFilters({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  targetGroupFilter,
  setTargetGroupFilter,
}: BroadcastFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters = 
    (searchTerm && searchTerm.trim() !== '') || 
    (priorityFilter && priorityFilter !== '') || 
    (categoryFilter && categoryFilter !== '') ||
    (statusFilter && statusFilter !== '') ||
    (targetGroupFilter && targetGroupFilter !== '');

  const clearAllFilters = () => {
    setSearchTerm('');
    setPriorityFilter('');
    setCategoryFilter('');
    setStatusFilter('');
    setTargetGroupFilter('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by title, body, or message ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          
          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[120px]"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[130px]"
            >
              <option value="">All Categories</option>
              <option value="Route Update">Route Update</option>
              <option value="Policy">Policy</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Training">Training</option>
              <option value="Emergency">Emergency</option>
              <option value="General">General</option>
              <option value="Technology">Technology</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[120px]"
            >
              <option value="">All Statuses</option>
              <option value="Sent">Sent</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Target Group Filter */}
          <div className="relative">
            <select
              value={targetGroupFilter}
              onChange={(e) => setTargetGroupFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
            >
              <option value="">All Target Groups</option>
              <option value="Bus Operators">Bus Operators</option>
              <option value="Drivers">Drivers</option>
              <option value="Conductors">Conductors</option>
              <option value="Fleet Operators">Fleet Operators</option>
              <option value="Passengers">Passengers</option>
              <option value="All Users">All Users</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md border border-gray-300 flex items-center gap-1 transition-colors whitespace-nowrap"
              title="Clear all filters and show all messages"
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
          
          {priorityFilter && priorityFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
              <div className="w-2 h-2 bg-red-600 rounded-full mr-1"></div>
              Priority: {priorityFilter}
            </span>
          )}
          
          {categoryFilter && categoryFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-1"></div>
              Category: {categoryFilter}
            </span>
          )}

          {statusFilter && statusFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
              Status: {statusFilter}
            </span>
          )}

          {targetGroupFilter && targetGroupFilter !== '' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <div className="w-2 h-2 bg-orange-600 rounded-full mr-1"></div>
              Target: {targetGroupFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}