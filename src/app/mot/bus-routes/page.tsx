'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Layout } from '@/components/shared/layout';
import { BusRouteStatsCards } from '@/components/mot/bus-route-stats-cards';
import { BusRouteSearchFilters } from '@/components/mot/bus-route-search-filters';
import { BusRoutesTable, BusRoute } from '@/components/mot/bus-routes-table';
import { CreateRouteGroupModal } from '@/components/mot/create-route-group-modal';
import { EditRouteGroupModal } from '@/components/mot/edit-route-group-modal';
import { DeleteConfirmationModal } from '@/components/mot/confirmation-modals';
import { RouteDetailsModal } from '@/components/mot/route-details-modal';
import { RouteDeleteModal } from '@/components/mot/route-delete-modal';
import { usePagination } from '@/components/mot/pagination';
import { Edit, Trash2, Plus } from 'lucide-react';

export interface RouteGroup {
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
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    routeId: '',
    routeName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const routes: BusRoute[] = [
    {
      id: '1',
      routeName: 'Colombo - Galle Express',
      routeNumber: '001A',
      group: 'Express Routes',
      stopsCount: 15,
      status: 'Active',
      operator: 'Ceylon Transport Board',
      distance: '119 km',
      estimatedTime: '2h 30m',
      scheduleCount: 8,
      lastUpdated: '2024-01-15',
      stops: [
        'Colombo Fort',
        'Mount Lavinia',
        'Kalutara',
        'Bentota',
        'Hikkaduwa',
        'Galle',
      ],
    },
    {
      id: '2',
      routeName: 'Kandy Circular Route',
      routeNumber: '145B',
      group: 'City Routes',
      stopsCount: 22,
      status: 'Active',
      operator: 'Private Bus Association',
      distance: '25 km',
      estimatedTime: '1h 15m',
      scheduleCount: 12,
      lastUpdated: '2024-01-14',
      stops: [
        'Kandy Bus Stand',
        'Temple of Tooth',
        'University of Peradeniya',
        'Botanical Gardens',
      ],
    },
    {
      id: '3',
      routeName: 'Airport Shuttle',
      routeNumber: '187',
      group: 'Special Routes',
      stopsCount: 8,
      status: 'Maintenance',
      operator: 'Airport Express Ltd',
      distance: '35 km',
      estimatedTime: '45m',
      scheduleCount: 6,
      lastUpdated: '2024-01-13',
      stops: ['Colombo Fort', 'Negombo', 'Katunayake Airport'],
    },
  ];

  const [routeGroups, setRouteGroups] = useState<RouteGroup[]>([
    {
      id: '1',
      name: 'Express Routes',
      description: 'Long distance express services',
      routeCount: 5,
      color: '#3B82F6',
    },
    {
      id: '2',
      name: 'City Routes',
      description: 'Urban and suburban routes',
      routeCount: 12,
      color: '#10B981',
    },
    {
      id: '3',
      name: 'Special Routes',
      description: 'Airport and special services',
      routeCount: 3,
      color: '#F59E0B',
    },
  ]);

  // Modal states
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRouteDetailsModal, setShowRouteDetailsModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedRouteGroup, setSelectedRouteGroup] =
    useState<RouteGroup | null>(null);

  // Filter routes based on search term, status, and group
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      searchTerm === '' ||
      route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === '' || route.status === selectedStatus;
    const matchesGroup = selectedGroup === '' || route.group === selectedGroup;

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

  const handleEditGroup = (group: RouteGroup) => {
    setSelectedRouteGroup(group);
    setShowEditGroupModal(true);
  };

  const handleDeleteGroup = (group: RouteGroup) => {
    setSelectedRouteGroup(group);
    setShowDeleteModal(true);
  };

  const confirmDeleteGroup = () => {
    if (selectedRouteGroup) {
      setRouteGroups(
        routeGroups.filter((group) => group.id !== selectedRouteGroup.id)
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
          <div className="flex-1">
            <BusRouteSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={selectedStatus}
              setStatusFilter={setSelectedStatus}
              groupFilter={selectedGroup}
              setGroupFilter={setSelectedGroup}
              routeGroups={routeGroups}
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
              Create Route Group
            </button>
          </div>
        </div>

        {/* Route Groups Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routeGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  ></div>
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEditGroup(group)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{group.description}</p>
              <p className="text-sm font-medium text-gray-900">
                {group.routeCount} routes
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
          activeFilters={{
            status: selectedStatus,
            group: selectedGroup,
            search: searchTerm,
          }}
          routeGroups={routeGroups}
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
            ...routeGroups,
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
        routeGroup={selectedRouteGroup}
        onSuccess={(updatedGroup: RouteGroup) => {
          setRouteGroups(
            routeGroups.map((group) =>
              group.id === updatedGroup.id ? updatedGroup : group
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
        title="Delete Route Group"
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
