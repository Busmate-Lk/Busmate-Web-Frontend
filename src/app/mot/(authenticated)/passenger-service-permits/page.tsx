'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  RefreshCw, 
  Download, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { BusPermitStatsCards } from '@/components/mot/bus-permit-stats-cards';
import { BusPermitSearchFilters } from '@/components/mot/bus-permit-search-filters';
import { BusPermitsTable } from '@/components/mot/bus-permits-table';
import { Pagination } from '@/components/mot/pagination';
import { 
  PermitManagementService,
  PassengerServicePermitResponse 
} from '@/lib/api-client/route-management';
import { DeletePermitModal } from '@/components/mot/passenger-service-permits/DeletePermitModal';

interface PermitFilters {
  search: string;
  status: string;
  operatorId: string;
}

interface PaginationState {
  currentPage: number;  // 1-based to match pagination component
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

export default function PassengerServicePermitsPage() {
  const router = useRouter();
  
  // Data states
  const [permits, setPermits] = useState<PassengerServicePermitResponse[]>([]);
  const [allPermits, setAllPermits] = useState<PassengerServicePermitResponse[]>([]);
  const [filteredPermits, setFilteredPermits] = useState<PassengerServicePermitResponse[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState<PermitFilters>({
    search: '',
    status: 'all',
    operatorId: '',
  });
  
  // Pagination states (1-based to match pagination component)
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,  // Start from 1, not 0
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [permitToDelete, setPermitToDelete] = useState<PassengerServicePermitResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply filters to permits
  const applyFilters = useCallback((permitsData: PassengerServicePermitResponse[]) => {
    let filtered = [...permitsData];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(permit => 
        permit.permitNumber?.toLowerCase().includes(searchTerm) ||
        permit.operatorName?.toLowerCase().includes(searchTerm) ||
        permit.routeGroupName?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(permit => 
        permit.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    // Operator filter
    if (filters.operatorId) {
      filtered = filtered.filter(permit => 
        permit.operatorId?.includes(filters.operatorId)
      );
    }
    
    return filtered;
  }, [filters]);

  // Apply pagination to filtered data
  const applyPagination = useCallback((filteredData: PassengerServicePermitResponse[]) => {
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / pagination.pageSize);
    
    // Convert 1-based page to 0-based index for slicing
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return {
      paginatedData,
      totalElements,
      totalPages,
    };
  }, [pagination.currentPage, pagination.pageSize]);

  // Load permits data from API
  const loadPermitsFromAPI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await PermitManagementService.getAllPermits();
      const permitsData = response || [];
      
      setAllPermits(permitsData);
      return permitsData;
    } catch (err) {
      console.error('Error loading permits:', err);
      setError(err instanceof Error ? err.message : 'Failed to load permits');
      setAllPermits([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Process data with filters and pagination
  const processData = useCallback((permitsData: PassengerServicePermitResponse[]) => {
    // Apply filters
    const filtered = applyFilters(permitsData);
    setFilteredPermits(filtered);
    
    // Apply pagination
    const { paginatedData, totalElements, totalPages } = applyPagination(filtered);
    
    setPermits(paginatedData);
    setPagination(prev => ({
      ...prev,
      totalPages,
      totalElements
    }));
  }, [applyFilters, applyPagination]);

  // Load and process permits
  const loadPermits = useCallback(async () => {
    const permitsData = await loadPermitsFromAPI();
    processData(permitsData);
  }, [loadPermitsFromAPI, processData]);

  // Process data when filters or pagination change (without API call)
  const reprocessData = useCallback(() => {
    processData(allPermits);
  }, [processData, allPermits]);

  // Load data on mount
  useEffect(() => {
    loadPermits();
  }, []); // Only on mount

  // Reprocess when filters or pagination change
  useEffect(() => {
    if (allPermits.length > 0) {
      reprocessData();
    }
  }, [filters, pagination.currentPage, pagination.pageSize, reprocessData]);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadPermits();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadPermits]);

  // Search handler (with debouncing logic)
  const handleSearchChange = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  }, []);

  // Filter handlers
  const handleStatusChange = useCallback((status: string) => {
    setFilters(prev => ({ ...prev, status }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  }, []);

  const handleOperatorChange = useCallback((operatorId: string) => {
    setFilters(prev => ({ ...prev, operatorId }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  }, []);

  // Pagination handlers (1-based)
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 })); // Reset to first page
  }, []);

  // Action handlers
  const handleView = useCallback((permit: PassengerServicePermitResponse) => {
    router.push(`/mot/passenger-service-permits/${permit.id}`);
  }, [router]);

  const handleEdit = useCallback((permit: PassengerServicePermitResponse) => {
    router.push(`/mot/passenger-service-permits/${permit.id}/edit`);
  }, [router]);

  const handleDelete = useCallback(async (permit: PassengerServicePermitResponse) => {
    setPermitToDelete(permit);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setPermitToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!permitToDelete?.id) return;

    try {
      setIsDeleting(true);
      await PermitManagementService.deletePermit(permitToDelete.id);
      await handleRefresh();
      setShowDeleteModal(false);
      setPermitToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete permit');
      // Keep modal open on error
    } finally {
      setIsDeleting(false);
    }
  }, [permitToDelete, handleRefresh]);

  const handleAddNew = useCallback(() => {
    router.push('/mot/passenger-service-permits/add-new');
  }, [router]);

  // Export functionality (export filtered data, not just current page)
  const handleExport = useCallback(async () => {
    try {
      const dataToExport = filteredPermits.map(permit => ({
        'Permit Number': permit.permitNumber || '',
        'Operator Name': permit.operatorName || '',
        'Route Group': permit.routeGroupName || '',
        'Issue Date': permit.issueDate || '',
        'Expiry Date': permit.expiryDate || '',
        'Maximum Buses': permit.maximumBusAssigned || 0,
        'Status': permit.status || '',
        'Permit Type': permit.permitType || '',
        'Created At': permit.createdAt ? new Date(permit.createdAt).toLocaleDateString() : '',
        'Updated At': permit.updatedAt ? new Date(permit.updatedAt).toLocaleDateString() : '',
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
      link.download = `passenger-service-permits-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  }, [filteredPermits]);

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || 
           filters.status !== 'all' || 
           filters.operatorId !== '';
  }, [filters]);

  const hasData = permits.length > 0;
  const hasFilteredData = filteredPermits.length > 0;

  // Calculate statistics
  const permitStats = useMemo(() => {
    const active = allPermits.filter(p => p.status?.toLowerCase() === 'active').length;
    const pending = allPermits.filter(p => p.status?.toLowerCase() === 'pending').length;
    const expired = allPermits.filter(p => {
      if (!p.expiryDate) return false;
      return new Date(p.expiryDate) < new Date();
    }).length;
    const total = allPermits.length;

    return {
      active: { count: active, change: "+2 this month" },
      pending: { count: pending },
      expired: { count: expired },
      total: { count: total, change: "No change from last month" },
    };
  }, [allPermits]);

  // Loading state for initial load
  if (loading && pagination.currentPage === 1 && !hasData) {
    return (
      <Layout
        activeItem="passenger-service-permits"
        pageTitle="Passenger Service Permits"
        pageDescription="Manage passenger service permits"
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
      activeItem="passenger-service-permits"
      pageTitle="Passenger Service Permits Management"
      pageDescription="Manage and monitor passenger service permits for all operators"
      role="mot"
    >
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
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

        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <button 
            onClick={() => router.push('/mot')}
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">
            Passenger Service Permits Management
          </span>
        </div>

        {/* Stats Cards */}
        <BusPermitStatsCards stats={permitStats} />

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
            
            {hasFilteredData && (
              <button
                onClick={handleExport}
                className="flex items-center bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV ({filteredPermits.length} items)
              </button>
            )}
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Permit
          </button>
        </div>

        {/* Search and Filters */}
        <BusPermitSearchFilters
          searchTerm={filters.search}
          setSearchTerm={handleSearchChange}
          onAddNewPermit={handleAddNew}
          onExportAll={hasFilteredData ? handleExport : undefined}
          statusFilter={filters.status}
          setStatusFilter={handleStatusChange}
          operatorFilter={filters.operatorId}
          setOperatorFilter={handleOperatorChange}
        />

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700 font-medium">
                  {pagination.totalElements} permits found with active filters
                </span>
                {pagination.totalElements !== allPermits.length && (
                  <span className="text-sm text-blue-600">
                    (filtered from {allPermits.length} total)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <BusPermitsTable
            permits={permits}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalElements}
            itemsPerPage={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
            activeFilters={{
              status: filters.status !== 'all' ? filters.status : undefined,
              operator: filters.operatorId || undefined,
              search: filters.search || undefined,
            }}
          />

          {/* Pagination */}
          {pagination.totalElements > 0 && (
            <div className="border-t border-gray-200 p-4">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalElements}
                itemsPerPage={pagination.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}

          {/* Empty State */}
          {!loading && !hasData && !error && (
            <div className="text-center py-12 px-4">
              <div className="text-gray-500">
                {!hasActiveFilters ? (
                  <div>
                    <div className="text-lg font-medium mb-2">No permits found</div>
                    <div className="text-sm mb-4">Get started by adding your first passenger service permit.</div>
                    <button
                      onClick={handleAddNew}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add First Permit
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-lg font-medium mb-2">No permits match your search</div>
                    <div className="text-sm mb-4">Try adjusting your search criteria or add a new permit.</div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setFilters({ search: '', status: 'all', operatorId: '' });
                          setPagination(prev => ({ ...prev, currentPage: 1 }));
                        }}
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                      <span className="text-gray-400">or</span>
                      <button
                        onClick={handleAddNew}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add New Permit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Delete Permit Modal */}
        <DeletePermitModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          permit={permitToDelete}
          isDeleting={isDeleting}
        />
      </div>
    </Layout>
  );
}