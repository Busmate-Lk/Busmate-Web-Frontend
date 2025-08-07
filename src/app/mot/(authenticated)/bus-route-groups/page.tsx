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
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals';
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { dummyRouteGroups } from '@/lib/data/route-groups-dummy';
import { QueryParams } from '@/types/requestdto/pagination';

export default function BusRouteGroupsPage() {
  const router = useRouter();
  const [routeGroups, setRouteGroups] = useState<BusRouteGroupResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'name',
    sortDir: 'asc',
    search: '',
  });

  // State for modals
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    routeGroupId?: string;
    routeGroupName?: string;
  }>({ isOpen: false });

  // Load dummy data
  const loadData = useCallback(() => {
    const loadDataAsync = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRouteGroups(dummyRouteGroups);
      setIsLoading(false);
    };
    loadDataAsync();
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter route groups based on search
  const filteredRouteGroups = useMemo(() => {
    return routeGroups.filter((group) => {
      const matchesSearch =
        String(group.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(group.routeNumber)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(group.description)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [routeGroups, searchTerm]);

  // Calculate pagination values
  const totalElements = filteredRouteGroups.length;
  const pageSize = queryParams.size || 10;
  const totalPages = Math.ceil(totalElements / pageSize);
  const currentPage = queryParams.page || 0;
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRouteGroups = filteredRouteGroups.slice(startIndex, endIndex);

  // Pagination object to match the bus stops pattern
  const pagination = {
    currentPage,
    totalPages,
    totalElements,
    pageSize,
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 0, // Reset to first page on search
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
      totalPages > 0 &&
      queryParams.page !== undefined &&
      queryParams.page >= totalPages
    ) {
      setQueryParams((prev) => ({
        ...prev,
        page: Math.max(0, totalPages - 1),
      }));
    }
  }, [totalPages, queryParams.page]);

  const handleExportAll = () => {
    // Handle export functionality
    console.log('Exporting all route groups:', routeGroups);
    // You can implement CSV/Excel export logic here
  };

  const handleAddNewRouteGroup = () => {
    router.push('/mot/bus-route-group-form');
  };

  const handleView = (routeGroupId: string) => {
    router.push(`/mot/bus-route-groups/${routeGroupId}`);
  };

  const handleEdit = (routeGroupId: string) => {
    router.push(`/mot/bus-route-group-form?routeGroupId=${routeGroupId}`);
  };

  const handleDelete = (routeGroupId: string, routeGroupName: string) => {
    setDeleteModal({
      isOpen: true,
      routeGroupId,
      routeGroupName,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.routeGroupId) {
      // Handle actual delete logic here
      console.log('Deleting route group:', deleteModal.routeGroupId);
      setRouteGroups((prev) =>
        prev.filter((group) => String(group.id) !== deleteModal.routeGroupId)
      );
    }
    setDeleteModal({ isOpen: false });
  };

  // Calculate stats for the stats cards
  const stats = {
    total: { count: routeGroups.length, change: '+2 this month' },
    active: {
      count: routeGroups.filter((g) => g.routes.length > 0).length,
      change: '+1 this month',
    },
    routes: {
      count: routeGroups.reduce((acc, group) => acc + group.routes.length, 0),
    },
    groups: { count: routeGroups.length },
  };

  if (isLoading) {
    return (
      <Layout
        activeItem="bus-route-groups"
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
      activeItem="bus-route-groups"
      pageTitle="Bus Route Groups"
      pageDescription="Manage bus route groups and their associated routes"
      role="mot"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <BusRouteGroupStatsCards stats={stats} />

        {/* Search Filters */}
        <BusRouteGroupSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          onAddNewRouteGroup={handleAddNewRouteGroup}
          onExportAll={handleExportAll}
        />

        {/* Results indicator */}
        {searchTerm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Showing {filteredRouteGroups.length} of {routeGroups.length}{' '}
                route groups
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
            routeGroups={paginatedRouteGroups}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            activeFilters={{ search: searchTerm }}
            loading={isLoading}
          />

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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false })}
          onConfirm={confirmDelete}
          title="Delete Route Group"
          itemName={deleteModal.routeGroupName || ''}
          isLoading={false}
        />
      </div>
    </Layout>
  );
}
