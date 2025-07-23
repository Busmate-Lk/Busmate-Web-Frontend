'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import { BusRouteGroupSearchFilters } from '@/components/mot/bus-route-group-search-filters';
import { BusRouteGroupStatsCards } from '@/components/mot/bus-route-group-stats-cards';
import { BusRouteGroupsTable } from '@/components/mot/bus-route-groups-table';
import { usePagination } from '@/components/mot/pagination';
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals';
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { dummyRouteGroups } from '@/lib/data/route-groups-dummy';

export default function BusRouteGroupsPage() {
  const router = useRouter();
  const [routeGroups, setRouteGroups] = useState<BusRouteGroupResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // State for modals
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    routeGroupId?: string;
    routeGroupName?: string;
  }>({ isOpen: false });

  // Load dummy data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRouteGroups(dummyRouteGroups);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter route groups based on search
  const filteredRouteGroups = routeGroups.filter((group) => {
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

  // Use pagination on filtered data
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedRouteGroups,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination(filteredRouteGroups, 10);

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
          setSearchTerm={setSearchTerm}
          onAddNewRouteGroup={handleAddNewRouteGroup}
          onExportAll={handleExportAll}
        />

        {/* Route Groups Table */}
        <BusRouteGroupsTable
          routeGroups={paginatedRouteGroups}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          activeFilters={{ search: searchTerm }}
        />

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
