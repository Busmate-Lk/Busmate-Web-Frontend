"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Layout } from "@/components/shared/layout";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock, 
  Route,
  ArrowRight,
  Navigation,
  Users,
  Calendar,
  MoreVertical
} from "lucide-react";
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';
import { dummyRouteGroups } from '@/lib/data/route-groups-dummy';

export default function BusRouteGroupDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const routeGroupId = params?.id as string;

  const [routeGroup, setRouteGroup] = useState<BusRouteGroupResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'stops'>('overview');

  // Load route group data
  useEffect(() => {
    const loadRouteGroup = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundGroup = dummyRouteGroups.find(group => String(group.id) === routeGroupId);
        setRouteGroup(foundGroup || null);
      } catch (error) {
        console.error('Failed to load route group:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (routeGroupId) {
      loadRouteGroup();
    }
  }, [routeGroupId]);

  const handleEdit = () => {
    router.push(`/mot/bus-route-group-form?routeGroupId=${routeGroupId}`);
  };

  const handleDelete = () => {
    // Handle delete (show confirmation modal)
    console.log('Delete route group:', routeGroupId);
  };

  const getCategoryBadge = (category: 'expressway' | 'normal') => {
    return category === 'expressway' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  const getCategoryIcon = (category: 'expressway' | 'normal') => {
    return category === 'expressway' ? '🛣️' : '🚌';
  };

  if (isLoading) {
    return (
      <Layout
        activeItem="bus-route-groups"
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

  if (!routeGroup) {
    return (
      <Layout
        activeItem="bus-route-groups"
        pageTitle="Route Group Not Found"
        pageDescription="The requested route group could not be found"
        role="mot"
      >
        <div className="text-center py-12">
          <Route className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Route Group Not Found</h3>
          <p className="text-gray-600 mb-4">
            The route group you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/mot/bus-route-groups')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Route Groups
          </button>
        </div>
      </Layout>
    );
  }

  const totalStops = routeGroup.routes.reduce((acc, route) => acc + route.routeStops.length + 2, 0); // +2 for start and end stops
  const totalDistance = routeGroup.routes.reduce((acc, route) => acc + route.distanceKm, 0);
  const averageDuration = routeGroup.routes.reduce((acc, route) => acc + route.estimatedDurationMinutes, 0) / routeGroup.routes.length || 0;

  return (
    <Layout
      activeItem="bus-route-groups"
      pageTitle="Route Group Details"
      pageDescription="View detailed information about the route group"
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-route-groups")}
          >
            Route Groups Management
          </button>
          <span>/</span>
          <span>{String(routeGroup.name)}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => router.push('/mot/bus-route-groups')}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(routeGroup.category)}</span>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{String(routeGroup.name)}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(routeGroup.category)}`}>
                        {routeGroup.category === 'expressway' ? 'Expressway' : 'Normal'}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {String(routeGroup.routeNumber)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{String(routeGroup.description)}</p>
              
              <div className="text-sm text-gray-500">
                Created on {new Date(routeGroup.createdAt).toLocaleDateString()} by {String(routeGroup.createdBy)}
                {routeGroup.updatedAt !== routeGroup.createdAt && (
                  <span> • Updated on {new Date(routeGroup.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-3 py-2 text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Routes</p>
                <p className="text-2xl font-bold text-gray-900">{routeGroup.routes.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Route className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Stops</p>
                <p className="text-2xl font-bold text-gray-900">{totalStops}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold text-gray-900">{totalDistance.toFixed(1)} km</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Navigation className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(averageDuration)} min</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Route },
                { id: 'routes', label: 'Routes Details', icon: Navigation },
                { id: 'stops', label: 'All Stops', icon: MapPin }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {routeGroup.routes.map((route) => (
                    <div key={String(route.id)} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{String(route.name)}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          route.direction === 'forward' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {route.direction}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{String(route.description)}</p>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{String(route.startStopName)}</span>
                        <ArrowRight className="h-4 w-4 mx-2" />
                        <span>{String(route.endStopName)}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Distance</p>
                          <p className="font-medium">{route.distanceKm} km</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{route.estimatedDurationMinutes} min</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Stops</p>
                          <p className="font-medium">{route.routeStops.length} intermediate</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Routes Details Tab */}
            {activeTab === 'routes' && (
              <div className="space-y-6">
                {routeGroup.routes.map((route) => (
                  <div key={String(route.id)} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900">{String(route.name)}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            route.direction === 'forward' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {route.direction}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {route.distanceKm} km • {route.estimatedDurationMinutes} min
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{String(route.description)}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Start Stop */}
                        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            S
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Start: {String(route.startStopName)}</h4>
                            <p className="text-sm text-gray-600">
                              {String(route.startStopLocation.address)}, {String(route.startStopLocation.city)}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">0.0 km</div>
                        </div>

                        {/* Intermediate Stops */}
                        {route.routeStops
                          .sort((a, b) => a.stopOrder - b.stopOrder)
                          .map((stop, index) => (
                            <div key={`${String(stop.stopId)}-${index}`} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {stop.stopOrder}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{String(stop.stopName)}</h4>
                                <p className="text-sm text-gray-600">
                                  {String(stop.location.address)}, {String(stop.location.city)}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">{stop.distanceFromStartKm} km</div>
                            </div>
                          ))}

                        {/* End Stop */}
                        <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg">
                          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            E
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">End: {String(route.endStopName)}</h4>
                            <p className="text-sm text-gray-600">
                              {String(route.endStopLocation.address)}, {String(route.endStopLocation.city)}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">{route.distanceKm} km</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* All Stops Tab */}
            {activeTab === 'stops' && (
              <div className="space-y-4">
                {/* Collect all unique stops */}
                {(() => {
                  const allStops = new Map();
                  
                  routeGroup.routes.forEach((route) => {
                    // Add start stop
                    allStops.set(String(route.startStopId), {
                      id: String(route.startStopId),
                      name: String(route.startStopName),
                      location: route.startStopLocation,
                      routes: allStops.get(String(route.startStopId))?.routes || []
                    });
                    allStops.get(String(route.startStopId)).routes.push(String(route.name));

                    // Add end stop
                    allStops.set(String(route.endStopId), {
                      id: String(route.endStopId),
                      name: String(route.endStopName),
                      location: route.endStopLocation,
                      routes: allStops.get(String(route.endStopId))?.routes || []
                    });
                    allStops.get(String(route.endStopId)).routes.push(String(route.name));

                    // Add intermediate stops
                    route.routeStops.forEach((stop) => {
                      allStops.set(String(stop.stopId), {
                        id: String(stop.stopId),
                        name: String(stop.stopName),
                        location: stop.location,
                        routes: allStops.get(String(stop.stopId))?.routes || []
                      });
                      allStops.get(String(stop.stopId)).routes.push(String(route.name));
                    });
                  });

                  return Array.from(allStops.values()).map((stop) => (
                    <div key={stop.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{stop.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {String(stop.location.address)}, {String(stop.location.city)}, {String(stop.location.state)} {String(stop.location.zipCode)}
                          </p>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Used in routes:</p>
                            <div className="flex flex-wrap gap-1">
                              {[...new Set(stop.routes)].map((routeName) => (
                                <span key={String(routeName)} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  {String(routeName)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>Lat: {stop.location.latitude}</p>
                          <p>Lng: {stop.location.longitude}</p>
                          <p className="mt-1">{[...new Set(stop.routes)].length} route(s)</p>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
