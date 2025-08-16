'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  Calendar, 
  Route as RouteIcon,
  User,
  Navigation,
  Map,
  List,
  MoreHorizontal,
  ChevronRight,
  Bus,
  Timer,
  Users
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { RouteManagementService } from '@/lib/api-client/route-management';
import type { RouteGroupResponse, RouteResponse } from '@/lib/api-client/route-management';

// Types
interface TabType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface RouteTabType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function RouteGroupDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const routeGroupId = params.routeGroupId as string;

  // State
  const [routeGroup, setRouteGroup] = useState<RouteGroupResponse | null>(null);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRouteTab, setActiveRouteTab] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<string>('details');

  // Tab definitions
  const subTabs: RouteTabType[] = [
    { id: 'details', label: 'Route Details', icon: <List className="w-4 h-4" /> },
    { id: 'map', label: 'Visual View', icon: <Map className="w-4 h-4" /> },
    { id: 'schedules', label: 'Schedules', icon: <Clock className="w-4 h-4" /> },
    { id: 'more', label: 'More', icon: <MoreHorizontal className="w-4 h-4" /> },
  ];

  // 🔌 API INTEGRATION POINT 1: Fetch Route Group Details
  const loadRouteGroupDetails = useCallback(async () => {
    if (!routeGroupId) return;

    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call
      const routeGroupData = await RouteManagementService.getRouteGroupById(routeGroupId);
      setRouteGroup(routeGroupData);

      // 🔌 API INTEGRATION POINT 2: Fetch Routes by Route Group ID
      const routesData = await RouteManagementService.getRoutesByRouteGroupId(routeGroupId);
      setRoutes(routesData);

      // Set the first route as active tab if available
      if (routesData.length > 0) {
        setActiveRouteTab(routesData[0].id || '');
      }

    } catch (err) {
      console.error('Error loading route group details:', err);
      setError('Failed to load route group details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [routeGroupId]);

  useEffect(() => {
    loadRouteGroupDetails();
  }, [loadRouteGroupDetails]);

  // Utility functions
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getActiveRoute = () => {
    return routes.find(route => route.id === activeRouteTab);
  };

  const getTotalDistance = () => {
    return routes.reduce((total, route) => total + (route.distanceKm || 0), 0);
  };

  const getAverageDuration = () => {
    if (routes.length === 0) return 0;
    const totalDuration = routes.reduce((total, route) => total + (route.estimatedDurationMinutes || 0), 0);
    return Math.round(totalDuration / routes.length);
  };

  // Handlers
  const handleEdit = () => {
    router.push(`/mot/route-group-form?id=${routeGroupId}`);
  };

  const handleAddRoute = () => {
    router.push(`/mot/route-form?groupId=${routeGroupId}`);
  };

  const handleDelete = () => {
    // TODO: Implement delete confirmation modal
    console.log('Delete route group:', routeGroupId);
  };

  const handleBack = () => {
    router.back();
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout
        activeItem="routes"
        pageTitle="Loading..."
        pageDescription="Loading route group details"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading route group details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !routeGroup) {
    return (
      <Layout
        activeItem="routes"
        pageTitle="Error"
        pageDescription="Failed to load route group"
        role="mot"
      >
        <div className="text-center py-12">
          <div className="text-red-600 text-lg mb-4">
            {error || 'Route group not found'}
          </div>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  const activeRoute = getActiveRoute();

  return (
    <Layout
      activeItem="routes"
      pageTitle={routeGroup.name || 'Route Group Details'}
      pageDescription="Detailed view of route group and its routes"
      role="mot"
    >
      <div className="space-y-6">
        {/* 1. Header Section - Breadcrumbs + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button 
              onClick={() => router.push('/mot')}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => router.push('/mot/routes')}
              className="hover:text-blue-600 transition-colors"
            >
              Route Management
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {routeGroup.name || 'Route Group'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Group
            </button>
            <button
              onClick={handleAddRoute}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Route
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* 2. Route Group Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                <Bus className="w-4 h-4" />
                Group Name
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {routeGroup.name || 'Unnamed Group'}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                <RouteIcon className="w-4 h-4" />
                Total Routes
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {routes.length}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                <MapPin className="w-4 h-4" />
                Total Distance
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {getTotalDistance().toFixed(1)} km
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                <Timer className="w-4 h-4" />
                Avg Duration
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {Math.floor(getAverageDuration() / 60)}h {getAverageDuration() % 60}m
              </div>
            </div>
          </div>

          {routeGroup.description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-1">Description</div>
              <div className="text-gray-700">{routeGroup.description}</div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <span className="ml-2 text-gray-900">
                {formatDate(routeGroup.updatedAt)}
                {routeGroup.updatedBy && ` by ${routeGroup.updatedBy}`}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Created:</span>
              <span className="ml-2 text-gray-900">
                {formatDate(routeGroup.createdAt)}
                {routeGroup.createdBy && ` by ${routeGroup.createdBy}`}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Routes Tabs Section */}
        {routes.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Route Tabs (Outbound/Inbound) */}
            <div className="border-b border-gray-200">
              <div className="flex flex-wrap gap-1 p-1">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setActiveRouteTab(route.id || '')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeRouteTab === route.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Navigation className={`w-4 h-4 ${route.direction === 'OUTBOUND' ? 'rotate-45' : 'rotate-225'}`} />
                      <span>{route.direction === 'OUTBOUND' ? 'Outbound' : 'Inbound'}</span>
                      <span className="text-xs text-gray-500">
                        {route.startStopName} → {route.endStopName}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub Tabs */}
            {activeRoute && (
              <>
                <div className="border-b border-gray-200">
                  <div className="flex gap-1 p-1">
                    {subTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                          activeSubTab === tab.id
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Route Details Tab */}
                  {activeSubTab === 'details' && (
                    <div className="space-y-6">
                      {/* Route Info Bar */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Route Name</div>
                            <div className="text-gray-900">{activeRoute.name || 'Unnamed Route'}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Direction</div>
                            <div className="text-gray-900">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                activeRoute.direction === 'OUTBOUND' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {activeRoute.direction}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Distance</div>
                            <div className="text-gray-900">{activeRoute.distanceKm || 0} km</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Duration</div>
                            <div className="text-gray-900">
                              {Math.floor((activeRoute.estimatedDurationMinutes || 0) / 60)}h{' '}
                              {(activeRoute.estimatedDurationMinutes || 0) % 60}m
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stops Timeline */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Stops</h3>
                        <div className="space-y-3">
                          {/* Start Stop */}
                          <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {activeRoute.startStopName || 'Start Stop'}
                              </div>
                              <div className="text-sm text-gray-600">0 km • Starting Point</div>
                            </div>
                            <div className="text-sm font-medium text-green-700">START</div>
                          </div>

                          {/* Intermediate Stops */}
                          {activeRoute.routeStops && activeRoute.routeStops.length > 0 && (
                            <>
                              {activeRoute.routeStops.map((stop, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                      {stop.stopName || `Stop ${index + 1}`}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {stop.distanceFromStartKm || 0} km from start
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Stop #{stop.stopOrder || index + 1}
                                  </div>
                                </div>
                              ))}
                            </>
                          )}

                          {/* End Stop */}
                          <div className="flex items-center gap-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {activeRoute.endStopName || 'End Stop'}
                              </div>
                              <div className="text-sm text-gray-600">
                                {activeRoute.distanceKm || 0} km • Final Destination
                              </div>
                            </div>
                            <div className="text-sm font-medium text-red-700">END</div>
                          </div>
                        </div>
                      </div>

                      {/* Route Metadata */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Route Metadata</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Route ID:</span>
                            <span className="ml-2 text-gray-900 font-mono">{activeRoute.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Created:</span>
                            <span className="ml-2 text-gray-900">
                              {formatDate(activeRoute.createdAt)}
                              {activeRoute.createdBy && ` by ${activeRoute.createdBy}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Updated:</span>
                            <span className="ml-2 text-gray-900">
                              {formatDate(activeRoute.updatedAt)}
                              {activeRoute.updatedBy && ` by ${activeRoute.updatedBy}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Route Group:</span>
                            <span className="ml-2 text-gray-900">{activeRoute.routeGroupName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual Map Tab */}
                  {activeSubTab === 'map' && (
                    <div className="space-y-4">
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map View</h3>
                        <p className="text-gray-600 mb-4">
                          🔌 <strong>API Integration Point:</strong> Implement map component here
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>• Use Google Maps, Leaflet, or Mapbox</p>
                          <p>• Show route path with start/end markers</p>
                          <p>• Display all intermediate stops</p>
                          <p>• Add fullscreen toggle functionality</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Schedules Tab */}
                  {activeSubTab === 'schedules' && (
                    <div className="space-y-4">
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Route Schedules</h3>
                        <p className="text-gray-600 mb-4">
                          🔌 <strong>API Integration Point:</strong> Fetch and display route schedules
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>• Show bus schedules for this route</p>
                          <p>• Display departure/arrival times</p>
                          <p>• Filter by date range</p>
                          <p>• Add/edit schedule functionality</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* More Tab */}
                  {activeSubTab === 'more' && (
                    <div className="space-y-4">
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <MoreHorizontal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h3>
                        <p className="text-gray-600 mb-4">
                          🔌 <strong>API Integration Point:</strong> Add more route-related features
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>• Route analytics and statistics</p>
                          <p>• Historical data and reports</p>
                          <p>• Performance metrics</p>
                          <p>• Route optimization suggestions</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          /* No Routes Available */
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <RouteIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Routes Found</h3>
            <p className="text-gray-600 mb-6">
              This route group doesn't have any routes yet. Create your first route to get started.
            </p>
            <button
              onClick={handleAddRoute}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add First Route
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}