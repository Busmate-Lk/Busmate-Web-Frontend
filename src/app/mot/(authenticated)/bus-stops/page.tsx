'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BusStopStats from '@/components/mot/bus-stops/BusStopStats';
import BusStopFilters from '@/components/mot/bus-stops/BusStopFilters';
import BusStopTable from '@/components/mot/bus-stops/BusStopTable';
import Pagination from '@/components/shared/Pagination';
import { Layout } from '@/components/shared/layout';
import useBusStops from '@/hooks/use-bus-stops';
import { QueryParams } from '@/types/requestdto/pagination';

export default function BusStops() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'name',
    sortDir: 'asc',
    search: '',
  });

  // Additional filter states for the BusStopFilters component
  const [cityFilter, setCityFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [accessibilityFilter, setAccessibilityFilter] = useState('all');

  const { busStops, pagination, loading, refetch } = useBusStops();

  const loadData = useCallback(() => {
    refetch(queryParams);
  }, [queryParams, refetch]);

  // Filter bus stops based on filters
  const filteredBusStops = useMemo(() => {
    if (!busStops) return [];

    return busStops.filter((stop) => {
      // City filter
      if (cityFilter !== 'all' && stop.location.city !== cityFilter) {
        return false;
      }

      // State filter
      if (stateFilter !== 'all' && stop.location.state !== stateFilter) {
        return false;
      }

      // Accessibility filter
      if (accessibilityFilter !== 'all') {
        if (accessibilityFilter === 'accessible' && !stop.isAccessible) {
          return false;
        }
        if (accessibilityFilter === 'non-accessible' && stop.isAccessible) {
          return false;
        }
      }

      return true;
    });
  }, [busStops, cityFilter, stateFilter, accessibilityFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (searchTerm: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 0, // Reset to first page on search
    }));
  };

  const handleSort = (
    sortBy: QueryParams['sortBy'],
    sortDir: QueryParams['sortDir']
  ) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy,
      sortDir,
      page: 0, // Reset to first page on sort
    }));
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const handlePageSizeChange = (size: number) => {
    setQueryParams((prev) => ({
      ...prev,
      size,
      page: 0, // Reset to first page on page size change
    }));
  };

  // Handle edge case where current page doesn't exist after data changes
  useEffect(() => {
    if (
      pagination.totalPages > 0 &&
      queryParams.page !== undefined &&
      queryParams.page >= pagination.totalPages
    ) {
      setQueryParams((prev) => ({
        ...prev,
        page: Math.max(0, pagination.totalPages - 1),
      }));
    }
  }, [pagination.totalPages, queryParams.page]);

  if (loading && pagination.currentPage === 0) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stops Management"
        pageDescription="Manage and monitor bus stop locations and facilities"
        role="mot"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle="Bus Stops Management"
      pageDescription="Manage and monitor bus stop locations and facilities"
      role="mot"
    >
      <div className="space-y-6">
        <BusStopStats busStops={filteredBusStops} />

        {/* Filters and Add Button */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <BusStopFilters
              searchTerm={queryParams.search || ''}
              setSearchTerm={(searchTerm) => handleSearch(searchTerm)}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              accessibilityFilter={accessibilityFilter}
              setAccessibilityFilter={setAccessibilityFilter}
              busStops={busStops}
            />
          </div>
          <button
            onClick={() => router.push('/mot/bus-stop-form')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus Stop
          </button>
        </div>

        {/* Results indicator */}
        {(cityFilter !== 'all' ||
          stateFilter !== 'all' ||
          accessibilityFilter !== 'all' ||
          (queryParams.search && queryParams.search.length > 0)) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Showing {filteredBusStops.length} of {busStops?.length || 0} bus
                stops
              </span>
              <button
                onClick={() => {
                  setCityFilter('all');
                  setStateFilter('all');
                  setAccessibilityFilter('all');
                  handleSearch('');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <BusStopTable busStops={filteredBusStops} loading={loading} />

          {pagination.totalElements > 0 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
