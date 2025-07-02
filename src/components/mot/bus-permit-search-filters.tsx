"use client";

import { Search, Plus, Download } from "lucide-react";

interface BusPermitSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNewPermit: () => void;
  onExportAll?: () => void;
}

export function BusPermitSearchFilters({
  searchTerm,
  setSearchTerm,
  onAddNewPermit,
  onExportAll,
}: BusPermitSearchFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            placeholder="Search permits by route, operator, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          Filter by Status
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          Filter by Operator
        </button>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
          onClick={onAddNewPermit}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Route Permit
        </button>
      </div>
    </div>
  );
}
