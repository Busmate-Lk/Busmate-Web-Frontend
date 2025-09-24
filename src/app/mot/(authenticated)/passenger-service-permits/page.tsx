'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  RefreshCw, 
  Download, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { PermitStatsCards } from '@/components/mot/permits/PermitStatsCards';
import { PermitAdvancedFilters } from '@/components/mot/permits/PermitAdvancedFilters';
import { PermitActionButtons } from '@/components/mot/permits/PermitActionButtons';
import { PermitsTable } from '@/components/mot/permits/PermitsTable';
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
  routeGroupId: string;
  permitType: string;
  expiryWithin?: number; // days
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export default function PassengerServicePermitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Data states
  const [permits, setPermits] = useState<PassengerServicePermitResponse[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [filterOptions, setFilterOptions] = useState<any>({
    statuses: ['ACTIVE', 'INACTIVE', 'PENDING', 'EXPIRED'],
    operators: [],
    routeGroups: [],
    permitTypes: []
  });
  
  // Filter states with URL sync
  const [filters, setFilters] = useState<PermitFilters>({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || 'all',
    operatorId: searchParams.get('operator') || 'all',
    routeGroupId: searchParams.get('routeGroup') || 'all',
    permitType: searchParams.get('permitType') || 'all',
    expiryWithin: searchParams.get('expiryWithin') ? parseInt(searchParams.get('expiryWithin')!) : undefined
  });
  
  // Pagination and sort states with URL sync
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: parseInt(searchParams.get('page') || '1'),
    totalPages: 0,
    totalElements: 0,
    pageSize: parseInt(searchParams.get('size') || '10')
  });
  
  const [sort, setSort] = useState<SortState>({
    field: searchParams.get('sortBy') || 'createdAt',
    direction: (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc'
  });
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [permitToDelete, setPermitToDelete] = useState<PassengerServicePermitResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.status !== 'all') params.set('status', filters.status);
    if (filters.operatorId !== 'all') params.set('operator', filters.operatorId);
    if (filters.routeGroupId !== 'all') params.set('routeGroup', filters.routeGroupId);
    if (filters.permitType !== 'all') params.set('permitType', filters.permitType);
    if (filters.expiryWithin) params.set('expiryWithin', filters.expiryWithin.toString());
    if (pagination.currentPage > 1) params.set('page', pagination.currentPage.toString());
    if (pagination.pageSize !== 10) params.set('size', pagination.pageSize.toString());
    if (sort.field !== 'createdAt') params.set('sortBy', sort.field);
    if (sort.direction !== 'desc') params.set('sortDir', sort.direction);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters, pagination.currentPage, pagination.pageSize, sort]);

  // Load statistics
  const loadStatistics = useCallback(async () => {
    try {
      const stats = await PermitManagementService.getPermitStatistics();
      setStatistics(stats);
    } catch (err) {
      console.error('Error loading statistics:', err);
      // Set default statistics if API fails
      setStatistics({
        totalPermits: 0,
        activePermits: 0,
        inactivePermits: 0,
        expiringSoonPermits: 0,
        permitsByOperator: {},
        permitsByRouteGroup: {}
      });
    }
  }, []);

  // Load filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      const options = await PermitManagementService.getPermitFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error('Error loading filter options:', err);
      // Set default filter options if API fails
      setFilterOptions({
        statuses: ['ACTIVE', 'INACTIVE', 'PENDING', 'EXPIRED'],
        operators: [],
        routeGroups: [],
        permitTypes: []
      });
    }
  }, []);

  // Load permits data from API with server-side filtering/pagination
  const loadPermits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare filters for API call
      const apiFilters: any = {};
      if (filters.search) apiFilters.search = filters.search;
      if (filters.status !== 'all') apiFilters.status = filters.status;
      if (filters.operatorId !== 'all') apiFilters.operatorId = filters.operatorId;
      if (filters.routeGroupId !== 'all') apiFilters.routeGroupId = filters.routeGroupId;
      if (filters.permitType !== 'all') apiFilters.permitType = filters.permitType;
      if (filters.expiryWithin) apiFilters.expiryWithin = filters.expiryWithin;
      
      const response = await PermitManagementService.getPermits(
        pagination.currentPage - 1, // Convert to 0-based for API
        pagination.pageSize,
        sort.field,
        sort.direction,
        apiFilters
      );
      
      const permitsData = response.content || [];
      setPermits(permitsData);
      setPagination(prev => ({
        ...prev,
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0
      }));
      
    } catch (err) {
      console.error('Error loading permits:', err);
      // Set error message and empty data when API fails
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load permits. The API service may not be available.');
      }
      setPermits([]);
      setPagination(prev => ({
        ...prev,
        totalPages: 0,
        totalElements: 0
      }));
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.currentPage, pagination.pageSize, sort]);

  // Load initial data
  useEffect(() => {
    loadStatistics();
    loadFilterOptions();
  }, []);

  // Load permits when dependencies change
  useEffect(() => {
    loadPermits();
  }, [loadPermits]);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    await Promise.all([
      loadStatistics(),
      loadFilterOptions(),
      loadPermits()
    ]);
  }, [loadStatistics, loadFilterOptions, loadPermits]);

  // Filter handlers
  const handleFilterChange = useCallback((newFilters: Partial<PermitFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
  }, []);

  // Sort handlers
  const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSort({ field, direction });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Action handlers
  const handleView = useCallback((permitId: string) => {
    router.push(`/mot/passenger-service-permits/${permitId}`);
  }, [router]);

  const handleEdit = useCallback((permitId: string) => {
    router.push(`/mot/passenger-service-permits/${permitId}/edit`);
  }, [router]);

  const handleDelete = useCallback((permitId: string, permitNumber: string) => {
    const permit = permits.find(p => p.id === permitId);
    if (permit) {
      setPermitToDelete(permit);
      setShowDeleteModal(true);
    }
  }, [permits]);

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
    } finally {
      setIsDeleting(false);
    }
  }, [permitToDelete, handleRefresh]);

  const handleAddNew = useCallback(() => {
    router.push('/mot/passenger-service-permits/add-new');
  }, [router]);

  const handleAssignBus = useCallback((permitId: string, permitNumber: string) => {
    // Navigate to assign bus page or open modal
    router.push(`/mot/passenger-service-permits/${permitId}/assign-bus`);
  }, [router]);

  // Export functionality
  const handleExport = useCallback(async () => {
    try {
      // Export current page data or make a separate API call for all filtered data
      const dataToExport = permits.map(permit => ({
        'Permit Number': permit.permitNumber || '',
        'Operator Name': permit.operatorName || '',
        'Route Group': permit.routeGroupName || '',
        'Permit Type': permit.permitType || '',
        'Issue Date': permit.issueDate || '',
        'Expiry Date': permit.expiryDate || '',
        'Maximum Buses': permit.maximumBusAssigned || 0,
        'Status': permit.status || '',
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
  }, [permits]);

  // Import functionality
  const handleImport = useCallback(() => {
    // Open import dialog or navigate to import page
    alert('Import functionality will be implemented');
  }, []);

  // Bulk operations
  const handleBulkDelete = useCallback((selectedIds: string[]) => {
    // Handle bulk delete
    alert(`Bulk delete ${selectedIds.length} permits`);
  }, []);

  const handleBulkStatusUpdate = useCallback((selectedIds: string[], newStatus: string) => {
    // Handle bulk status update
    alert(`Update ${selectedIds.length} permits to ${newStatus}`);
  }, []);

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || 
           filters.status !== 'all' || 
           filters.operatorId !== 'all' ||
           filters.routeGroupId !== 'all' ||
           filters.permitType !== 'all' ||
           !!filters.expiryWithin;
  }, [filters]);

  const activeFiltersObject = useMemo(() => ({
    search: filters.search || undefined,
    status: filters.status !== 'all' ? filters.status : undefined,
    operator: filters.operatorId !== 'all' ? filters.operatorId : undefined,
    routeGroup: filters.routeGroupId !== 'all' ? filters.routeGroupId : undefined,
    permitType: filters.permitType !== 'all' ? filters.permitType : undefined,
    expiryWithin: filters.expiryWithin
  }), [filters]);

  // Loading state for initial load
  if (loading && pagination.currentPage === 1 && permits.length === 0) {
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
        <PermitStatsCards stats={statistics} loading={!statistics} />

        {/* Action Buttons */}
        <PermitActionButtons
          onAddPermit={handleAddNew}
          onImportPermits={handleImport}
          onExportAll={handleExport}
          isLoading={loading}
        />

        {/* Advanced Filters */}
        <PermitAdvancedFilters
          searchTerm={filters.search}
          setSearchTerm={(value) => handleFilterChange({ search: value })}
          statusFilter={filters.status}
          setStatusFilter={(value) => handleFilterChange({ status: value })}
          operatorFilter={filters.operatorId}
          setOperatorFilter={(value) => handleFilterChange({ operatorId: value })}
          routeGroupFilter={filters.routeGroupId}
          setRouteGroupFilter={(value) => handleFilterChange({ routeGroupId: value })}
          permitTypeFilter={filters.permitType}
          setPermitTypeFilter={(value) => handleFilterChange({ permitType: value })}
          filterOptions={filterOptions}
          loading={loading}
          totalCount={pagination.totalElements}
          filteredCount={pagination.totalElements}
          onClearAll={() => {
            setFilters({
              search: '',
              status: 'all',
              operatorId: 'all',
              routeGroupId: 'all',
              permitType: 'all'
            });
            setPagination(prev => ({ ...prev, currentPage: 1 }));
          }}
        />

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700 font-medium">
                  {pagination.totalElements} permits found with active filters
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <PermitsTable
            permits={permits}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAssignBus={handleAssignBus}
            onSort={handleSort}
            activeFilters={activeFiltersObject}
            loading={loading}
            currentSort={sort}
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
          {!loading && permits.length === 0 && !error && (
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
                          setFilters({ 
                            search: '', 
                            status: 'all', 
                            operatorId: 'all',
                            routeGroupId: 'all',
                            permitType: 'all'
                          });
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