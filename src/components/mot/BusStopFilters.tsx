import { Search, Filter } from "lucide-react"

export default function BusStopFilters({
  searchTerm,
  setSearchTerm,
  cityFilter,
  setCityFilter,
  provinceFilter,
  setProvinceFilter,
}: {
  searchTerm: string
  setSearchTerm: (v: string) => void
  cityFilter: string
  setCityFilter: (v: string) => void
  provinceFilter: string
  setProvinceFilter: (v: string) => void
}) {
  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Bus Stops</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Stop ID or Name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by City</label>
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Cities</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
            <option value="Negombo">Negombo</option>
            <option value="Anuradhapura">Anuradhapura</option>
            <option value="Matara">Matara</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Ratnapura">Ratnapura</option>
            <option value="Badulla">Badulla</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Province</label>
          <select
            value={provinceFilter}
            onChange={e => setProvinceFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="all">All Provinces</option>
            <option value="Western">Western</option>
            <option value="Central">Central</option>
            <option value="Southern">Southern</option>
            <option value="North Central">North Central</option>
            <option value="North Western">North Western</option>
            <option value="Sabaragamuwa">Sabaragamuwa</option>
            <option value="Uva">Uva</option>
            <option value="Northern">Northern</option>
            <option value="Eastern">Eastern</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="flex items-center w-full border border-gray-300 rounded px-3 py-2 bg-white hover:bg-gray-100 text-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}