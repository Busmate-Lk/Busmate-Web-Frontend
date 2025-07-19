import { Search, Filter } from "lucide-react"

interface FareFiltersProps {
  searchTerm: string
  busTypeFilter: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onBusTypeChange: (value: string) => void
  onStatusChange: (value: string) => void
  onApplyFilters: () => void
}

export default function FareFilters({
  searchTerm,
  busTypeFilter,
  statusFilter,
  onSearchChange,
  onBusTypeChange,
  onStatusChange,
  onApplyFilters
}: FareFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by route, operator, or fare ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bus Type Filter */}
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bus Type
          </label>
          <select
            value={busTypeFilter}
            onChange={(e) => onBusTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Semi-Luxury">Semi-Luxury</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <div className="sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2 sm:invisible">
            Apply
          </label>
          <button
            onClick={onApplyFilters}
            className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center gap-2 transition-colors duration-200"
          >
            <Filter className="w-4 h-4" />
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}