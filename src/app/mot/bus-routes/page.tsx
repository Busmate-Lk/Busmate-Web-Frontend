'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Eye, Edit, Trash2, MapPin, Clock, Users, Route as RouteIcon } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { CreateRouteGroupModal } from '@/components/mot/create-route-group-modal';
import { EditRouteGroupModal } from '@/components/mot/edit-route-group-modal';
import { DeleteConfirmationModal } from '@/components/mot/delete-confirmation-modal';
import { RouteDetailsModal } from '@/components/mot/route-details-modal';
import { DeleteConfirmationModal as RouteDeleteModal } from '@/components/mot/confirmation-modals';

export interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  group: string;
  stopsCount: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  operator: string;
  distance: string;
  estimatedTime: string;
  scheduleCount: number;
  lastUpdated: string;
  stops: string[];
}

export interface RouteGroup {
  id: string;
  name: string;
  description: string;
  routeCount: number;
  color: string;
}

export default function BusRoutesPage() {
  const router = useRouter();
  
  const [routes, setRoutes] = useState<Route[]>([
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
      stops: ['Colombo Fort', 'Mount Lavinia', 'Kalutara', 'Bentota', 'Hikkaduwa', 'Galle'],
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
      stops: ['Kandy Bus Stand', 'Temple of Tooth', 'University of Peradeniya', 'Botanical Gardens'],
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
  ]);

  const [routeGroups, setRouteGroups] = useState<RouteGroup[]>([
    { id: '1', name: 'Express Routes', description: 'Long distance express services', routeCount: 5, color: '#3B82F6' },
    { id: '2', name: 'City Routes', description: 'Urban and suburban routes', routeCount: 12, color: '#10B981' },
    { id: '3', name: 'Special Routes', description: 'Airport and special services', routeCount: 3, color: '#F59E0B' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRouteDetailsModal, setShowRouteDetailsModal] = useState(false);
  const [showRouteDeleteModal, setShowRouteDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedRouteGroup, setSelectedRouteGroup] = useState<RouteGroup | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter routes based on search and filters
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = !selectedGroup || route.group === selectedGroup;
    const matchesStatus = !selectedStatus || route.status === selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRoutes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoutes = filteredRoutes.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewRoute = (route: Route) => {
    // Navigate to single route view page
    router.push(`/mot/route-details?id=${route.id}`);
  };

  const handleEditRoute = (route: Route) => {
    router.push(`/mot/route-form?routeId=${route.id}`);
  };

  const handleDeleteRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowRouteDeleteModal(true);
  };

  const confirmDeleteRoute = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    if (selectedRoute) {
      setRoutes(routes.filter(r => r.id !== selectedRoute.id));
      setShowRouteDeleteModal(false);
      setSelectedRoute(null);
      alert(`Route "${selectedRoute.routeName}" has been deleted successfully.`);
    }
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
      setRouteGroups(routeGroups.filter(group => group.id !== selectedRouteGroup.id));
      setShowDeleteModal(false);
      setSelectedRouteGroup(null);
    }
  };

  return (
    <Layout activeItem="bus-routes" pageTitle="Routes Management" pageDescription="Manage bus routes and route groups" role="mot">
      <div className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <RouteIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Routes</p>
                <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Routes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {routes.filter(r => r.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Route Groups</p>
                <p className="text-2xl font-bold text-gray-900">{routeGroups.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Schedules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {routes.reduce((sum, route) => sum + route.scheduleCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Groups</option>
              {routeGroups.map((group) => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Route Group
            </button>
            <button
              onClick={() => router.push('/mot/route-form')}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Route
            </button>
          </div>
        </div>

        {/* Route Groups Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routeGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-4">
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
              <p className="text-sm font-medium text-gray-900">{group.routeCount} routes</p>
            </div>
          ))}
        </div>

        {/* Routes Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stops
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {route.routeName}
                        </div>
                        <div className="text-sm text-gray-500">#{route.routeNumber}</div>
                        <div className="text-xs text-gray-400">{route.operator}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ 
                            backgroundColor: routeGroups.find(g => g.name === route.group)?.color || '#6B7280'
                          }}
                        ></div>
                        <span className="text-sm text-gray-900">{route.group}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{route.stopsCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {route.distance}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          {route.estimatedTime}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Users className="h-3 w-3" />
                          {route.scheduleCount} schedules
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewRoute(route)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditRoute(route)}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Edit Route"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRoute(route)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete Route"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(startIndex + itemsPerPage, filteredRoutes.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredRoutes.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateRouteGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onSuccess={(newGroup: { name: string; description: string; color: string }) => {
          setRouteGroups([...routeGroups, { ...newGroup, id: Date.now().toString(), routeCount: 0 }]);
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
          setRouteGroups(routeGroups.map(group => 
            group.id === updatedGroup.id ? updatedGroup : group
          ));
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
        message={`Are you sure you want to delete "${selectedRouteGroup?.name}"? This action cannot be undone.`}
        itemName={selectedRouteGroup?.name || ''}
        referenceCount={selectedRouteGroup?.routeCount || 0}
        referenceType="routes"
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
        isOpen={showRouteDeleteModal}
        onClose={() => {
          setShowRouteDeleteModal(false);
          setSelectedRoute(null);
        }}
        onConfirm={confirmDeleteRoute}
        title="Delete Route"
        itemName={selectedRoute?.routeName || ''}
        isLoading={isLoading}
      />
    </Layout>
  );
}