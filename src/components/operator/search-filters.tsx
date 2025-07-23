"use client"

import { Search, ChevronDown, X } from "lucide-react"
import { useState } from "react"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  dateFilter: string
  onDateChange: (date: string) => void
  searchPlaceholder?: string
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateFilter,
  onDateChange,
  searchPlaceholder = "Search...",
}: SearchFiltersProps) {
  const [statusOpen, setStatusOpen] = useState(false)

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <button
          onClick={() => setStatusOpen(!statusOpen)}
          className="flex h-10 w-32 text-gray-400 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>{statusOptions.find((opt) => opt.value === statusFilter)?.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50 " />
        </button>
        {statusOpen && (
          <div className="absolute top-full mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg z-50">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onStatusChange(option.value)
                  setStatusOpen(false)
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Filter */}
      <div className="relative">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          className="flex h-10 w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
        />
        {!dateFilter && (
          <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
            <span className="text-gray-400 text-sm">Select date</span>
          </div>
        )}
        {dateFilter && (
          <button
            onClick={() => onDateChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
