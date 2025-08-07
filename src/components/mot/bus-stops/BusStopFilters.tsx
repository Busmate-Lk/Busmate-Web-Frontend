import { Search, ChevronDown, X } from 'lucide-react';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { useMemo } from 'react';

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
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  cityFilter: string;
  setCityFilter: (v: string) => void;
  stateFilter: string;
  setStateFilter: (v: string) => void;
  accessibilityFilter: string;
  setAccessibilityFilter: (v: string) => void;
  busStops: BusStopResponse[];
}) {
  const { uniqueCities, uniqueStates } = useMemo(() => {
    const cities = Array.from(
      new Set(busStops?.map((stop) => stop.location.city) || [])
    ).sort();
    const states = Array.from(
      new Set(busStops?.map((stop) => stop.location.state) || [])
    ).sort();
    return {
      uniqueCities: cities,
      uniqueStates: states,
    };
  }, [busStops]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setStateFilter('all');
    setAccessibilityFilter('all');
  };

  const hasActiveFilters =
    searchTerm ||
    cityFilter !== 'all' ||
    stateFilter !== 'all' ||
    accessibilityFilter !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Stop ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* City Filter */}
          <div className="relative">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* State Filter */}
          <div className="relative">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All States</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Accessibility Filter */}
          <div className="relative">
            <select
              value={accessibilityFilter}
              onChange={(e) => setAccessibilityFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All Types</option>
              <option value="accessible">Accessible</option>
              <option value="non-accessible">Non-Accessible</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md border border-gray-300 flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          )}
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
          {cityFilter !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              City: {cityFilter}
            </span>
          )}
          {stateFilter !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              State: {stateFilter}
            </span>
          )}
          {accessibilityFilter !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Accessibility:{' '}
              {accessibilityFilter === 'accessible'
                ? 'Accessible'
                : 'Non-Accessible'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
