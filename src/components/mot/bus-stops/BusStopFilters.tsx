import { Search, Filter, RotateCcw } from "lucide-react"
import { BusStopResponse } from "@/types/responsedto/bus-stop"
import { useMemo } from "react"

export default function BusStopFilters({
  searchTerm,
  setSearchTerm,
  cityFilter,
  setCityFilter,
  stateFilter,
  setStateFilter,
  accessibilityFilter,
  setAccessibilityFilter,
  busStops,
}: {
  searchTerm: string
  setSearchTerm: (v: string) => void
  cityFilter: string
  setCityFilter: (v: string) => void
  stateFilter: string
  setStateFilter: (v: string) => void
  accessibilityFilter: string
  setAccessibilityFilter: (v: string) => void
  busStops: BusStopResponse[]
}) {
  const { uniqueCities, uniqueStates } = useMemo(() => {
    const cities = Array.from(new Set(busStops?.map(stop => stop.location.city) || [])).sort()
    const states = Array.from(new Set(busStops?.map(stop => stop.location.state) || [])).sort()
    return {
      uniqueCities: cities,
      uniqueStates: states
    }
  }, [busStops])

  const handleClearFilters = () => {
    setSearchTerm("")
    setCityFilter("all")
    setStateFilter("all")
    setAccessibilityFilter("all")
  }

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Bus Stops</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Stop ID or Name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
          <select
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility</label>
          <select
            value={accessibilityFilter}
            onChange={e => setAccessibilityFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="accessible">Accessible</option>
            <option value="non-accessible">Non-Accessible</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button 
            onClick={handleClearFilters}
            className="flex items-center px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-700 transition-colors"
            title="Clear all filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}