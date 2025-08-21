'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Plus, RefreshCw, Download, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StaffStats } from '@/components/shared/StaffStats';
import { StaffFilters } from '@/components/shared/StaffFilters';
import { StaffTable } from '@/components/shared/StaffTable';
import Pagination from '@/components/shared/Pagination';
import { Layout } from '@/components/shared/layout';
import { OperatorManagementService, OperatorResponse } from '@/lib/api-client/route-management';

interface OperatorFilters {
  search: string;
  status: string;
  operatorType: string;
  region: string;
}

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

export default function OperatorsPage() {
  const router = useRouter();
  
  // Data states
  const [operators, setOperators] = useState<OperatorResponse[]>([]);
  const [filteredOperators, setFilteredOperators] = useState<OperatorResponse[]>([]);
  
  // Filter states
  const [filters, setFilters] = useState<OperatorFilters>({
    search: '',
    status: 'all',
    operatorType: 'all',
    region: 'all',
  });
  
  // Pagination states
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });
  
  // Sort states
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter options for dropdowns
  const [filterOptions, setFilterOptions] = useState({
    operatorTypes: [] as string[],
    regions: [] as string[],
  });

  // Load operators data
  const loadOperators = useCallback(async (resetPage = false) => {
    setLoading(true);
    setError(null);

    try {
      const page = resetPage ? 0 : pagination.currentPage;
      
      const response = await OperatorManagementService.getAllOperators(
        page,
        pagination.pageSize,
        sortBy,
        sortDir,
        filters.search || undefined,
        filters.operatorType !== 'all' ? filters.operatorType : undefined,
        filters.status !== 'all' ? filters.status : undefined
      );

      setOperators(response.content || []);
      setPagination({
        currentPage: response.number || 0,
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0,
        pageSize: response.size || 10,
      });

      // Extract filter options
      const allOperators = response.content || [];
      const operatorTypes = [...new Set(allOperators.map(op => op.operatorType).filter(Boolean))];
      const regions = [...new Set(allOperators.map(op => op.region).filter(Boolean))];
      
      setFilterOptions({
        operatorTypes,
        regions,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load operators');
      setOperators([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.pageSize, sortBy, sortDir, filters]);

  // Apply client-side filters (for regions since it's not in the API)
  useEffect(() => {
    let filtered = [...operators];

    // Apply region filter (client-side)
    if (filters.region !== 'all') {
      filtered = filtered.filter(op => op.region === filters.region);
    }

    setFilteredOperators(filtered);
  }, [operators, filters.region]);

  // Load data on mount and when dependencies change
  useEffect(() => {
    loadOperators();
  }, [loadOperators]);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadOperators();
    } finally {
      setIsRefreshing(false);
    }
  }, [loadOperators]);

  // Search handler
  const handleSearchChange = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadOperators(true); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search, filters.status, filters.operatorType]);

  // Status filter handler
  const handleStatusChange = useCallback((status: string) => {
    setFilters(prev => ({ ...prev, status }));
  }, []);

  // Operator type filter handler
  const handleOperatorTypeChange = useCallback((operatorType: string) => {
    setFilters(prev => ({ ...prev, operatorType }));
  }, []);

  // Region filter handler (client-side)
  const handleRegionChange = useCallback((region: string) => {
    setFilters(prev => ({ ...prev, region }));
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

  // Delete handler
  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this operator? This action cannot be undone.')) {
      return;
    }

    try {
      await OperatorManagementService.deleteOperator(id);
      await handleRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete operator');
    }
  }, [handleRefresh]);

  // Export functionality
  const handleExport = useCallback(async () => {
    try {
      const dataToExport = filteredOperators.map(operator => ({
        ID: operator.id || '',
        Name: operator.name || '',
        'Operator Type': operator.operatorType || '',
        Region: operator.region || '',
        Status: operator.status || '',
        'Created At': operator.createdAt ? new Date(operator.createdAt).toLocaleDateString() : '',
        'Updated At': operator.updatedAt ? new Date(operator.updatedAt).toLocaleDateString() : '',
        'Created By': operator.createdBy || '',
        'Updated By': operator.updatedBy || '',
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
      link.download = `operators-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  }, [filteredOperators]);

  // Transform operators for StaffStats and StaffTable components
  const transformedOperators = useMemo(() => {
    return filteredOperators.map(operator => ({
      id: operator.id || '',
      name: operator.name || '',
      nic: '', // Not available in operator model
      email: '', // Not available in operator model
      contactNo: '', // Not available in operator model
      dateOfBirth: '', // Not available in operator model
      status: operator.status || 'active',
      operatorType: operator.operatorType,
      region: operator.region,
      experienceYears: 0, // Would need to be calculated or stored separately
    }));
  }, [filteredOperators]);

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || 
           filters.status !== 'all' || 
           filters.operatorType !== 'all' || 
           filters.region !== 'all';
  }, [filters]);

  const hasData = operators.length > 0;

  // Loading state for initial load
  if (loading && pagination.currentPage === 0 && !hasData) {
    return (
      <Layout
        activeItem="operators"
        pageTitle="Operators Management"
        pageDescription="Manage and monitor bus operators"
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
      activeItem="operators"
      pageTitle="Operators Management"
      pageDescription="Manage and monitor bus operators"
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

        {/* Stats */}
        <StaffStats
          operators={transformedOperators}
          type="operator"
        />

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
            onClick={() => router.push('/mot/users/operators/add-new')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Operator
          </button>
        </div>

        {/* Filters */}
        <StaffFilters
          searchTerm={filters.search}
          onSearchChange={handleSearchChange}
          statusFilter={filters.status}
          onStatusChange={handleStatusChange}
          additionalFilter={{
            value: filters.operatorType,
            onChange: handleOperatorTypeChange,
            options: filterOptions.operatorTypes.map(type => ({ value: type, label: type })),
            placeholder: 'All Operator Types',
          }}
          secondaryFilter={{
            value: filters.region,
            onChange: handleRegionChange,
            options: filterOptions.regions.map(region => ({ value: region, label: region })),
            placeholder: 'All Regions',
          }}
        />

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-blue-700">
                  {filteredOperators.length} of {operators.length} results shown
                </span>
                <span className="text-xs text-blue-600">
                  Total in database: {pagination.totalElements}
                </span>
              </div>
              <button
                onClick={() => setFilters({ search: '', status: 'all', operatorType: 'all', region: 'all' })}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <StaffTable
            staff={transformedOperators}
            type="operator"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No operators found</h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters 
                  ? "Try adjusting your search or filter criteria." 
                  : "Get started by adding your first operator."
                }
              </p>
              {!hasActiveFilters && (
                <button
                  onClick={() => router.push('/mot/users/operators/add-new')}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Operator
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}