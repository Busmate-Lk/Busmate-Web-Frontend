import { Search, Filter } from "lucide-react"

export default function BusFilters({
  searchTerm,
  setSearchTerm,
  busTypeFilter,
  setBusTypeFilter,
  operatorTypeFilter,
  setOperatorTypeFilter,
  statusFilter,
  setStatusFilter,
}: {
  searchTerm: string
  setSearchTerm: (v: string) => void
  busTypeFilter: string
  setBusTypeFilter: (v: string) => void
  operatorTypeFilter: string
  setOperatorTypeFilter: (v: string) => void
  statusFilter: string
  setStatusFilter: (v: string) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Bus Number</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter bus number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
          <select
            value={busTypeFilter}
            onChange={(e) => setBusTypeFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="All Types">All Types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Luxury">Luxury</option>
            <option value="Semi-Luxury">Semi-Luxury</option>
            <option value="Sleeper">Sleeper</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operator Type</label>
          <select
            value={operatorTypeFilter}
            onChange={(e) => setOperatorTypeFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="All Operators">All Operators</option>
            <option value="SLTB">SLTB</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex items-end mt-4">
        <button className="flex items-center w-full border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-100 text-gray-700">
          <Filter className="w-4 h-4 mr-2" />
          Apply Filters
        </button>
      </div>
    </div>
  )
}