"use client";

import { Search, Plus, Download, ChevronDown, X } from "lucide-react";

interface ScheduleSearchFiltersProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  operatorFilter?: string;
  setOperatorFilter?: (operator: string) => void;
  routeFilter?: string;
  setRouteFilter?: (route: string) => void;
  onAddNew: () => void;
  onExportAll?: () => void;
}

export function ScheduleSearchFilters({
  searchTerm = '',
  setSearchTerm,
  statusFilter = '',
  setStatusFilter,
  operatorFilter = '',
  setOperatorFilter,
  routeFilter = '',
  setRouteFilter,
  onAddNew,
  onExportAll,
}: ScheduleSearchFiltersProps) {
  const hasActiveFilters = searchTerm || statusFilter || operatorFilter || routeFilter;

  const clearAllFilters = () => {
    setSearchTerm?.('');
    setStatusFilter?.('');
    setOperatorFilter?.('');
    setRouteFilter?.('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Search by schedule ID, bus no, or route name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter?.(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
          
          {/* Operator Filter */}
          <div className="relative">
            <select
              value={operatorFilter}
              onChange={(e) => setOperatorFilter?.(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Operators</option>
              <option value="SLTB">SLTB</option>
              <option value="Private">Private</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Route Filter */}
          <div className="relative">
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter?.(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Routes</option>
              <option value="001">Route 001</option>
              <option value="002">Route 002</option>
              <option value="003">Route 003</option>
              <option value="004">Route 004</option>
              <option value="005">Route 005</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md border border-gray-300 flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
        </div>
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
          <button
            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
            onClick={onAddNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Schedule
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
            </span>
          )}
          {statusFilter && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              Status: {statusFilter}
            </span>
          )}
          {operatorFilter && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
              Operator: {operatorFilter}
            </span>
          )}
          {routeFilter && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
              Route: {routeFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
