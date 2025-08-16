'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import { BusRouteGroupSearchFilters } from '@/components/mot/bus-route-group-search-filters';
import { BusRouteGroupStatsCards } from '@/components/mot/bus-route-group-stats-cards';
import { BusRouteGroupsTable } from '@/components/mot/bus-route-groups-table';
import Pagination from '@/components/shared/Pagination';
import {
  DeleteConfirmationModal,
} from '@/components/mot/confirmation-modals';
import { RouteManagementService } from '@/lib/api-client/route-management';
import type { RouteGroupResponse, PageRouteGroupResponse } from '@/lib/api-client/route-management';

interface QueryParams {
  page: number;
  size: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  search: string;
}

export default function RouteGroupsPage() {
  const router = useRouter();
  const [routeGroups, setRouteGroups] = useState<RouteGroupResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'name',
    sortDir: 'asc',
    search: '',
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  // State for modals
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    routeGroupId?: string;
    routeGroupName?: string;
  }>({ isOpen: false });

  const [isDeleting, setIsDeleting] = useState(false);

  // Load route groups from API
  const loadRouteGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: PageRouteGroupResponse = await RouteManagementService.getAllRouteGroups(
        queryParams.page,
        queryParams.size,
        queryParams.sortBy,
        queryParams.sortDir,
        queryParams.search || undefined
      );

      setRouteGroups(response.content || []);
      setPagination({
        currentPage: response.number || 0,
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0,
        pageSize: response.size || 10,
      });
    } catch (err) {
      console.error('Error loading route groups:', err);
      setError('Failed to load route groups. Please try again.');
      setRouteGroups([]);
      setPagination({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10,
      });
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    loadRouteGroups();
  }, [loadRouteGroups]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 0, // Reset to first page on search
    }));
  };

  const handleSort = (sortBy: string, sortDir: 'asc' | 'desc') => {
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

  const handleExportAll = async () => {
    try {
      // Get all route groups without pagination for export
      const allRouteGroups = await RouteManagementService.getAllRouteGroupsAsList();
      
      // Create CSV content
      const csvHeaders = ['ID', 'Name', 'Description', 'Routes Count', 'Created At', 'Updated At'];
      const csvRows = allRouteGroups.map(group => [
        group.id || '',
        group.name || '',
        group.description || '',
        group.routes?.length || 0,
        group.createdAt || '',
        group.updatedAt || ''
      ]);

      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `route-groups-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting route groups:', error);
      setError('Failed to export route groups. Please try again.');
    }
  };

  const handleAddNewRouteGroup = () => {
    router.push('/mot/route-group-form');
  };

  const handleView = (routeGroupId: string) => {
    router.push(`/mot/routes/${routeGroupId}`);
  };

  const handleEdit = (routeGroupId: string) => {
    router.push(`/mot/route-group-form?id=${routeGroupId}`);
  };

  const handleDelete = (routeGroupId: string, routeGroupName: string) => {
    setDeleteModal({
      isOpen: true,
      routeGroupId,
      routeGroupName,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.routeGroupId) return;

    try {
      setIsDeleting(true);
      await RouteManagementService.deleteRouteGroup(deleteModal.routeGroupId);
      
      // Refresh the list after successful deletion
      await loadRouteGroups();
      
      setDeleteModal({ isOpen: false });
    } catch (error) {
      console.error('Error deleting route group:', error);
      setError('Failed to delete route group. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate stats for the stats cards
  const stats = useMemo(() => {
    const totalRoutes = routeGroups.reduce((acc, group) => acc + (group.routes?.length || 0), 0);
    const activeGroups = routeGroups.filter((g) => (g.routes?.length || 0) > 0).length;

    return {
      total: { 
        count: pagination.totalElements, 
        change: routeGroups.length > 0 ? '+' + Math.ceil(routeGroups.length * 0.1) + ' this month' : 'No data'
      },
      active: {
        count: activeGroups,
        change: activeGroups > 0 ? '+' + Math.ceil(activeGroups * 0.08) + ' this month' : 'No data',
      },
      routes: {
        count: totalRoutes,
      },
      groups: { 
        count: pagination.totalElements 
      },
    };
  }, [routeGroups, pagination.totalElements]);

  if (isLoading && routeGroups.length === 0) {
    return (
      <Layout
        activeItem="routes"
        pageTitle="Loading..."
        pageDescription="Loading route groups"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading route groups...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="routes"
      pageTitle="Route Groups"
      pageDescription="Manage bus route groups and their associated routes"
      role="mot"
    >
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-600 text-sm">{error}</div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <BusRouteGroupStatsCards stats={stats} />

        {/* Search Filters */}
        <BusRouteGroupSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          onAddNewRouteGroup={handleAddNewRouteGroup}
          onExportAll={handleExportAll}
          isLoading={isLoading}
        />

        {/* Results indicator */}
        {searchTerm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Showing {pagination.totalElements} route groups matching "{searchTerm}"
              </span>
              <button
                onClick={() => handleSearch('')}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Route Groups Table */}
        <div className="bg-white rounded-lg shadow">
          <BusRouteGroupsTable
            routeGroups={routeGroups}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={handleSort}
            activeFilters={{ search: searchTerm }}
            loading={isLoading}
            currentSort={{ field: queryParams.sortBy, direction: queryParams.sortDir }}
          />

          {pagination.totalElements > 0 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              loading={isLoading}
              searchActive={!!searchTerm}
            />
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false })}
          onConfirm={confirmDelete}
          title="Delete Route Group"
          itemName={deleteModal.routeGroupName || ''}
          isLoading={isDeleting}
        />
      </div>
    </Layout>
  );
}