'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Plus, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import BusStatsCards from '@/components/mot/BusStatsCards';
import BusFilters from '@/components/mot/BusFilters';
import BusTable from '@/components/mot/BusTable';
import Pagination from '@/components/shared/Pagination';
import DeleteBusModal from '@/components/mot/buses/DeleteBusModal';
import { 
  BusManagementService,
  BusResponse,
  PageBusResponse 
} from '@/lib/api-client/route-management';

interface BusFilters {
  search: string;
  status: string;
  minCapacity: string;
  maxCapacity: string;
  operatorId: string;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

export default function BusesPage() {
  const router = useRouter();
  
  // Data states
  const [buses, setBuses] = useState<BusResponse[]>([]);
  const [allBuses, setAllBuses] = useState<BusResponse[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState<BusFilters>({
    search: '',
    status: 'all',
    minCapacity: '',
    maxCapacity: '',
    operatorId: '',
  });
  
  // Pagination states
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });
  
  // Sort states
  const [sortBy, setSortBy] = useState('ntc_registration_number');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [busToDelete, setBusToDelete] = useState<BusResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load buses data
  const loadBuses = useCallback(async (resetPage = false) => {
    console.log('Loading buses with filters:', filters, 'Pagination:', pagination, 'Sort:', sortBy, sortDir);
    setLoading(true);
    setError(null);

    try {
      const page = resetPage ? 0 : pagination.currentPage;
      
      const response = await BusManagementService.getAllBuses(
        page,
        pagination.pageSize,
        sortBy,
        sortDir,
        filters.search || undefined,
        filters.operatorId || undefined,
        filters.status !== 'all' ? filters.status : undefined,
        filters.minCapacity ? parseInt(filters.minCapacity) : undefined,
        filters.maxCapacity ? parseInt(filters.maxCapacity) : undefined
      );

      setBuses(response.content || []);
      setPagination({
        currentPage: response.number || 0,
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0,
        pageSize: response.size || 10,
      });

    } catch (err) {
      console.error('Error loading buses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load buses');
      setBuses([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize, sortBy, sortDir, filters]);

  // Load all buses for stats (without pagination)
  const loadAllBusesForStats = useCallback(async () => {
    try {
      const response = await BusManagementService.getAllBusesAsList();
      setAllBuses(response || []);
    } catch (err) {
      console.error('Error loading all buses:', err);
    }
  }, []);

  // Load data on mount and when dependencies change
  useEffect(() => {
    loadBuses();
    loadAllBusesForStats();
  }, [loadBuses, loadAllBusesForStats]);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([loadBuses(), loadAllBusesForStats()]);
    } finally {
      setIsRefreshing(false);
    }
  }, [loadBuses, loadAllBusesForStats]);

  // Search handler
  const handleSearchChange = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadBuses(true); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.status, filters.operatorId, filters.minCapacity, filters.maxCapacity]);

  // Filter handlers
  const handleStatusChange = useCallback((status: string) => {
    setFilters(prev => ({ ...prev, status }));
  }, []);

  const handleMinCapacityChange = useCallback((minCapacity: string) => {
    setFilters(prev => ({ ...prev, minCapacity }));
  }, []);

  const handleMaxCapacityChange = useCallback((maxCapacity: string) => {
    setFilters(prev => ({ ...prev, maxCapacity }));
  }, []);

  const handleOperatorChange = useCallback((operatorId: string) => {
    setFilters(prev => ({ ...prev, operatorId }));
  }, []);

  // Sort handler
  const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDir(direction);
  }, []);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, currentPage: 0 }));
  }, []);

  // Action handlers
  const handleView = useCallback((bus: BusResponse) => {
    router.push(`/mot/buses/${bus.id}`);
  }, [router]);

  const handleEdit = useCallback((bus: BusResponse) => {
    router.push(`/mot/buses/${bus.id}/edit`);
  }, [router]);

  const handleDelete = useCallback(async (bus: BusResponse) => {
    setBusToDelete(bus);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setBusToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!busToDelete?.id) return;

    try {
      setIsDeleting(true);
      await BusManagementService.deleteBus(busToDelete.id);
      await handleRefresh();
      setShowDeleteModal(false);
      setBusToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete bus');
      // Keep modal open on error
    } finally {
      setIsDeleting(false);
    }
  }, [busToDelete, handleRefresh]);

  const handleAddNew = useCallback(() => {
    router.push('/mot/buses/add-new');
  }, [router]);

  // Export functionality
  const handleExport = useCallback(async () => {
    try {
      const dataToExport = buses.map(bus => ({
        ID: bus.id || '',
        'NTC Registration': bus.ntcRegistrationNumber || '',
        'Plate Number': bus.plateNumber || '',
        'Operator ID': bus.operatorId || '',
        'Operator Name': bus.operatorName || '',
        Capacity: bus.capacity || 0,
        Model: bus.model || '',
        Status: bus.status || '',
        'Created At': bus.createdAt ? new Date(bus.createdAt).toLocaleDateString() : '',
        'Updated At': bus.updatedAt ? new Date(bus.updatedAt).toLocaleDateString() : '',
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
      link.download = `buses-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  }, [buses]);

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || 
           filters.status !== 'all' || 
           filters.minCapacity !== '' ||
           filters.maxCapacity !== '' ||
           filters.operatorId !== '';
  }, [filters]);

  const hasData = buses.length > 0;

  // Loading state for initial load
  if (loading && pagination.currentPage === 0 && !hasData) {
    return (
      <Layout
        activeItem="buses"
        pageTitle="Buses Management"
        pageDescription="Manage and monitor bus fleet"
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
      activeItem="buses"
      pageTitle="Buses Management"
      pageDescription="Manage and monitor bus fleet across all operators"
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
                  onClick={() => setError(null)}
                  className="text-sm text-red-600 hover:text-red-800 underline mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <BusStatsCards buses={allBuses} />

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
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bus
          </button>
        </div>

        {/* Filters */}
        <BusFilters
          searchTerm={filters.search}
          onSearchChange={handleSearchChange}
          statusFilter={filters.status}
          onStatusChange={handleStatusChange}
          minCapacity={filters.minCapacity}
          onMinCapacityChange={handleMinCapacityChange}
          maxCapacity={filters.maxCapacity}
          onMaxCapacityChange={handleMaxCapacityChange}
          operatorId={filters.operatorId}
          onOperatorChange={handleOperatorChange}
        />

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700">
                  {buses.length} results shown
                </span>
                <span className="text-xs text-blue-600">
                  Total in database: {pagination.totalElements}
                </span>
              </div>
              <button
                onClick={() => setFilters({ 
                  search: '', 
                  status: 'all', 
                  minCapacity: '', 
                  maxCapacity: '', 
                  operatorId: '' 
                })}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <BusTable
            buses={buses}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            onSort={handleSort}
            sortBy={sortBy}
            sortDir={sortDir}
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
                searchActive={Boolean(filters.search)}
                filterCount={hasActiveFilters ? 1 : 0}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && !hasData && !error && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters 
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by adding your first bus."
                }
              </p>
              {!hasActiveFilters && (
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Bus
                </button>
              )}
            </div>
          )}
        </div>

        {/* Delete Bus Modal */}
        <DeleteBusModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          bus={busToDelete}
          isDeleting={isDeleting}
          tripCount={0} // TODO: Get trip count if needed
        />
      </div>
    </Layout>
  );
}