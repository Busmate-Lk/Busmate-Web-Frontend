'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Layout } from '@/components/shared/layout';
import { BusRouteStatsCards } from '@/components/mot/bus-route-stats-cards';
import { BusRouteSearchFilters } from '@/components/mot/bus-route-search-filters';
import { BusRoutesTable, BusRoute } from '@/components/mot/bus-routes-table';
import { CreateRouteGroupModal } from '@/components/mot/create-route-category-modal';
import { EditRouteGroupModal } from '@/components/mot/edit-route-category-modal';
import { DeleteConfirmationModal } from '@/components/mot/confirmation-modals';
import { RouteDetailsModal } from '@/components/mot/route-details-modal';
import { RouteDeleteModal } from '@/components/mot/route-delete-modal';
import { usePagination } from '@/components/mot/pagination';
import { Edit, Trash2, Plus } from 'lucide-react';
import { defaultRouteCategories, routes } from './data';

export interface RouteCategory {
  id: string;
  name: string;
  description: string;
  routeCount: number;
  color: string;
}

export default function BusRoutesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [routeCategory, setRouteGroups] = useState<RouteCategory[]>(defaultRouteCategories);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    routeId: '',
    routeName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRouteDetailsModal, setShowRouteDetailsModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedRouteGroup, setSelectedRouteGroup] =
    useState<RouteCategory | null>(null);

  // Filter routes based on search term, status, and category
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      searchTerm === '' ||
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === '' || route.status === selectedStatus;
    const matchesGroup = selectedGroup === '' || route.category === selectedGroup;

    return matchesSearch && matchesStatus && matchesGroup;
  });

  // Use pagination hook with initial page size of 5
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedRoutes,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredRoutes, 5); // Start with 5 items per page

  // Calculate stats from filtered route data
  const calculateStats = () => {
    const totalCount = filteredRoutes.length;
    const activeCount = filteredRoutes.filter(
      (route) => route.status === 'Active'
    ).length;
    const inactiveCount = filteredRoutes.filter(
      (route) => route.status === 'Inactive'
    ).length;
    const maintenanceCount = filteredRoutes.filter(
      (route) => route.status === 'Maintenance'
    ).length;

    return {
      total: { count: totalCount, change: '+2 this month' },
      active: { count: activeCount, change: '+1 this month' },
      inactive: { count: inactiveCount },
      maintenance: { count: maintenanceCount },
    };
  };

  const stats = calculateStats();

  const handleDeleteClick = (routeId: string, routeName: string) => {
    setDeleteModal({ isOpen: true, routeId, routeName });
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDeleteModal({ isOpen: false, routeId: '', routeName: '' });
    alert(`Route "${deleteModal.routeName}" has been permanently deleted.`);
  };

  const handleView = (routeId: string) => {
    router.push(`/mot/route-details?id=${routeId}`);
  };

  const handleEdit = (routeId: string) => {
    router.push(`/mot/route-form?routeId=${routeId}`);
  };

  const handleAddNewRoute = () => {
    router.push('/mot/route-form');
  };

  const handleExportAll = () => {
    // Handle export functionality
    console.log('Exporting all routes...');
  };

  const handleAddSchedule = (routeId: string) => {
    router.push(`/mot/route-schedule/${routeId}`);
  };

  const handleEditGroup = (category: RouteCategory) => {
    setSelectedRouteGroup(category);
    setShowEditGroupModal(true);
  };

  const handleDeleteGroup = (category: RouteCategory) => {
    setSelectedRouteGroup(category);
    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = () => {
    if (selectedRouteGroup) {
      setRouteGroups(
        routeCategory.filter((category) => category.id !== selectedRouteGroup.id)
      );
      setShowDeleteModal(false);
      setSelectedRouteGroup(null);
    }
  };

  return (
    <Layout
      activeItem="bus-routes"
      pageTitle="Routes Management"
      pageDescription="Manage bus routes and route groups"
      role="mot"
    >
      <div className="space-y-6">
        {/* Quick Stats Cards */}
        <BusRouteStatsCards stats={stats} />

        {/* Search and Filters + Add Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <BusRouteSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={selectedStatus}
              setStatusFilter={setSelectedStatus}
              groupFilter={selectedGroup}
              setGroupFilter={setSelectedGroup}
              routeCategory={routeCategory}
              onAddNewRoute={handleAddNewRoute}
              onExportAll={handleExportAll}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Route Category
            </button>
          </div>
        </div>

        {/* Route Groups Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routeCategory.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditGroup(category)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(category)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              <p className="text-sm font-medium text-gray-900">
                {category.routeCount} routes
              </p>
            </div>
          ))}
        </div>

        {/* Routes Table */}
        <BusRoutesTable
          routes={paginatedRoutes}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onAddSchedule={handleAddSchedule}
          activeFilters={{
            status: selectedStatus,
            category: selectedGroup,
            search: searchTerm,
          }}
          routeCategory={routeCategory}
        />
      </div>

      {/* Modals */}
      <CreateRouteGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onSuccess={(newGroup: {
          name: string;
          description: string;
          color: string;
        }) => {
          setRouteGroups([
            ...routeCategory,
            { ...newGroup, id: Date.now().toString(), routeCount: 0 },
          ]);
          setShowCreateGroupModal(false);
        }}
      />

      <EditRouteGroupModal
        isOpen={showEditGroupModal}
        onClose={() => {
          setShowEditGroupModal(false);
          setSelectedRouteGroup(null);
        }}
        routeCategory={selectedRouteGroup}
        onSuccess={(updatedGroup: RouteCategory) => {
          setRouteGroups(
            routeCategory.map((category) =>
              category.id === updatedGroup.id ? updatedGroup : category
            )
          );
          setShowEditGroupModal(false);
          setSelectedRouteGroup(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRouteGroup(null);
        }}
        onConfirm={confirmDeleteGroup}
        title="Delete Route Category"
        itemName={selectedRouteGroup?.name || ''}
        isLoading={false}
      />

      <RouteDetailsModal
        isOpen={showRouteDetailsModal}
        onClose={() => {
          setShowRouteDetailsModal(false);
          setSelectedRoute(null);
        }}
        route={selectedRoute}
      />

      {/* Route Delete Confirmation Modal */}
      <RouteDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, routeId: '', routeName: '' })
        }
        onConfirm={handleDeleteConfirm}
        title="Delete Route"
        itemName={deleteModal.routeName}
        isLoading={isLoading}
      />
    </Layout>
  );
}
