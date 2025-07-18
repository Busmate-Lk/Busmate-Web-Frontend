import { Filter } from "lucide-react"

interface FilterBarProps {
  groupFilter: string
  setGroupFilter: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  dateFilter: string
  setDateFilter: (value: string) => void
  statusOptions?: { value: string; label: string }[]
  dateLabel?: string
}

export default function FilterBar({
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
  dateLabel = "Date"
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter by Group:</span>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Groups</option>
              <option value="bus-operators">Bus Operators</option>
              <option value="drivers">Drivers</option>
              <option value="passengers">Passengers</option>
              <option value="fleet-operators">Fleet Operators</option>
              <option value="conductors">Conductors</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{dateLabel}:</span>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}