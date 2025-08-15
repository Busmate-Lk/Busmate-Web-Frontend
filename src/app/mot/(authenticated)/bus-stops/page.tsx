'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Plus, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BusStopStats from '@/components/mot/bus-stops/BusStopStats';
import BusStopFilters from '@/components/mot/bus-stops/BusStopFilters';
import BusStopTable from '@/components/mot/bus-stops/BusStopTable';
import DeleteBusStopModal from '@/components/mot/bus-stops/DeleteBusStopModal';
import Pagination from '@/components/shared/Pagination';
import { Layout } from '@/components/shared/layout';
import useBusStops from '@/hooks/use-bus-stops';
import { StopResponse } from '@/lib/api-client/route-management';

export default function BusStops() {
  const router = useRouter();
  
  // Local filter states (client-side filtering)
  const [localFilters, setLocalFilters] = useState({
    state: 'all',
    accessibility: 'all',
  });

  // UI states
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [busStopToDelete, setBusStopToDelete] = useState<StopResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hook usage - MOVED ALL HOOKS TO THE TOP
  const {
    busStops,
    filterOptions,
    pagination,
    loading,
    filterOptionsLoading,
    error,
    deleteBusStop,
    clearError,
    hasData,
    getCurrentParams,
    updateParams,
  } = useBusStops();

  // Get current query params for UI state
  const currentParams = getCurrentParams();

  // Apply local (client-side) filters to server-filtered bus stops
  const filteredBusStops = useMemo(() => {
    if (!busStops) return [];

    return busStops.filter((stop: StopResponse) => {
      // State filter
      if (localFilters.state !== 'all' && stop.location?.state !== localFilters.state) {
        return false;
      }

      // Accessibility filter
      if (localFilters.accessibility !== 'all') {
        if (localFilters.accessibility === 'accessible' && !stop.isAccessible) {
          return false;
        }
        if (localFilters.accessibility === 'non-accessible' && stop.isAccessible) {
          return false;
        }
      }

      return true;
    });
  }, [busStops, localFilters]);

  // Computed filter status
  const hasActiveFilters = useMemo(() => {
    return (
      (currentParams.search && currentParams.search.length > 0) ||
      localFilters.state !== 'all' ||
      localFilters.accessibility !== 'all'
    );
  }, [currentParams.search, localFilters]);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    clearError();
    
    try {
      await updateParams(getCurrentParams());
    } finally {
      setIsRefreshing(false);
    }
  }, [updateParams, getCurrentParams, clearError]);

  // Search handler (server-side search + reset to page 0)
  const handleSearch = useCallback(async (searchTerm: string) => {
    await updateParams({
      search: searchTerm,
      page: 0, // Reset to first page when searching
    });
  }, [updateParams]);

  // Sort handler (server-side sort + reset to page 0)
  const handleSort = useCallback(async (
    sortBy: string,
    sortDir: 'asc' | 'desc'
  ) => {
    await updateParams({
      sortBy,
      sortDir,
      page: 0, // Reset to first page when sorting
    });
  }, [updateParams]);

  // Local filter handlers (client-side only)
  const handleLocalFilterChange = useCallback((filterType: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(async () => {
    // Clear local filters
    setLocalFilters({
      state: 'all',
      accessibility: 'all',
    });
    
    // Clear server-side search and reset pagination
    await handleSearch('');
  }, [handleSearch]);

  // Pagination handlers (maintain current search/sort)
  const handlePageChange = useCallback(async (page: number) => {
    await updateParams({ page });
  }, [updateParams]);

  const handlePageSizeChange = useCallback(async (size: number) => {
    await updateParams({ 
      size, 
      page: 0 // Reset to first page when changing page size
    });
  }, [updateParams]);

  // Delete handlers
  const handleDeleteClick = useCallback((busStop: StopResponse) => {
    setBusStopToDelete(busStop);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setBusStopToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!busStopToDelete?.id) return;

    setIsDeleting(true);
    try {
      const success = await deleteBusStop(busStopToDelete.id);
      if (success) {
        setShowDeleteModal(false);
        setBusStopToDelete(null);
        // Optionally refresh the data
        await handleRefresh();
      }
    } catch (err) {
      console.error('Failed to delete bus stop:', err);
      // Keep the modal open on error so user can see what happened
    } finally {
      setIsDeleting(false);
    }
  }, [busStopToDelete, deleteBusStop, handleRefresh]);

  // Export functionality
  const handleExport = useCallback(async () => {
    try {
      const dataToExport = filteredBusStops.map(stop => ({
        ID: stop.id || '',
        Name: stop.name || '',
        Description: stop.description || '',
        Address: stop.location?.address || '',
        City: stop.location?.city || '',
        State: stop.location?.state || '',
        'Zip Code': stop.location?.zipCode || '',
        Country: stop.location?.country || '',
        Latitude: stop.location?.latitude || '',
        Longitude: stop.location?.longitude || '',
        Accessible: stop.isAccessible ? 'Yes' : 'No',
        'Created At': stop.createdAt ? new Date(stop.createdAt).toLocaleDateString() : '',
        'Updated At': stop.updatedAt ? new Date(stop.updatedAt).toLocaleDateString() : '',
        'Created By': stop.createdBy || '',
        'Updated By': stop.updatedBy || '',
      }));

      if (dataToExport.length === 0) {
        alert('No data to export');
        return;
      }

      const headers = Object.keys(dataToExport[0]);
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            // Escape commas and quotes in CSV
            return typeof value === 'string' && value.includes(',') 
              ? `"${value.replace(/"/g, '""')}"` 
              : value;
          }).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bus-stops-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  }, [filteredBusStops]);

  // CONDITIONAL RENDERING MOVED TO THE END AFTER ALL HOOKS
  // Loading state for initial load
  if (loading && pagination.currentPage === 0 && !hasData) {
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
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={clearError}
                  className="text-sm text-red-600 hover:text-red-800 underline mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <BusStopStats busStops={filteredBusStops} />

        {/* Header Actions */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            {hasData && (
              <button
                onClick={handleExport}
                className="flex items-center bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            )}
          </div>

          <button
            onClick={() => router.push('/mot/bus-stops/add-new')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus Stop
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <BusStopFilters
            searchTerm={currentParams.search || ''}
            setSearchTerm={handleSearch}
            stateFilter={localFilters.state}
            setStateFilter={(value) => handleLocalFilterChange('state', value)}
            accessibilityFilter={localFilters.accessibility}
            setAccessibilityFilter={(value) => handleLocalFilterChange('accessibility', value)}
            filterOptions={filterOptions}
            loading={filterOptionsLoading}
          />
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700">
                  {filteredBusStops.length} of {busStops?.length || 0} results shown
                </span>
                <span className="text-xs text-blue-600">
                  Total in database: {pagination.totalElements}
                </span>
              </div>
              <button
                onClick={handleClearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <BusStopTable 
            busStops={filteredBusStops} 
            loading={loading}
            onSort={handleSort}
            sortBy={currentParams.sortBy}
            sortDir={currentParams.sortDir}
            onDelete={handleDeleteClick}
          />

          {/* Pagination */}
          {pagination.totalElements > 0 && (
            <div className="border-t border-gray-200">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalElements={pagination.totalElements}
                pageSize={pagination.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={loading}
                searchActive={Boolean(currentParams.search)}
                filterCount={hasActiveFilters ? 1 : 0}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && !hasData && !error && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bus stops found</h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters 
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by adding your first bus stop."
                }
              </p>
              {!hasActiveFilters && (
                <button
                  onClick={() => router.push('/mot/bus-stops/add-new')}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Bus Stop
                </button>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteBusStopModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          busStop={busStopToDelete}
          isDeleting={isDeleting}
        />
      </div>
    </Layout>
  );
}
