'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Layout } from "@/components/shared/layout";
import { MapPin, Clock, Users, Bus, Calendar, Edit, ArrowLeft } from 'lucide-react';
import { useBusRouteGroups } from '@/hooks/use-bus-route-group';
import { BusRouteGroupResponse } from '@/types/responsedto/bus-route-group';

export default function BusRouteGroupDetailsPage() {
  const [routeGroup, setRouteGroup] = useState<BusRouteGroupResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const routeGroupId = searchParams?.get('id');
  const { loadBusRouteGroupbyId } = useBusRouteGroups();

  useEffect(() => {
    const fetchRouteGroupData = async () => {
      if (routeGroupId) {
        try {
          setLoading(true);
          const data = await loadBusRouteGroupbyId(routeGroupId);
          setRouteGroup(data || null);
        } catch (error) {
          console.error('Failed to load route group:', error);
          setRouteGroup(null);
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/mot/bus-route-groups');
      }
    };

    fetchRouteGroupData();
  }, [routeGroupId, router, loadBusRouteGroupbyId]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/mot/bus-route-group-form?routeGroupId=${routeGroupId}`);
  };

  if (loading) {
    return (
      <Layout 
        activeItem="bus-route-groups" 
        pageTitle="Route Group Details" 
        pageDescription="Loading route group information..."
        role="mot"
      >
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading route group details...</p>
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
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Route Group not found</h2>
            <p className="text-gray-600 mb-4">The requested route group could not be found.</p>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      activeItem="bus-route-groups" 
      pageTitle="Route Group Details" 
      pageDescription="View and manage route group information"
      role="mot"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-route-groups")}
          >
            Route Groups Management
          </button>
          <span>/</span>
          <span>Route Group Details</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{routeGroup.name}</h1>
                  <p className="text-sm text-gray-600 mt-1">Route Group ID: {routeGroup.id}</p>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Route Group
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-sm text-gray-900 mt-1">{routeGroup.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{routeGroup.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created By</label>
                    <p className="text-sm text-gray-900 mt-1">{routeGroup.createdBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Updated By</label>
                    <p className="text-sm text-gray-900 mt-1">{routeGroup.updatedBy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Routes in this Group */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Routes in this Group</h2>
                <p className="text-sm text-gray-600 mt-1">{routeGroup.routes.length} routes</p>
              </div>
              <div className="px-6 py-4">
                {routeGroup.routes.length? (
                  <div className="text-center py-8">
                    <Bus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No routes in this group yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {routeGroup.routes.map((route) => (
                      <div key={String(route.id)} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{route.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{route.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {route.startStopName} → {route.endStopName}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {route.estimatedDurationMinutes} min
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {route.routeStops.length} stops
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Routes</span>
                  <span className="text-sm font-medium text-gray-900">{routeGroup.routes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Stops</span>
                  <span className="text-sm font-medium text-gray-900">
                    {routeGroup.routes.reduce((total, route) => total + route.routeStops.length, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Distance</span>
                  <span className="text-sm font-medium text-gray-900">
                    {routeGroup.routes.length > 0 
                      ? (routeGroup.routes.reduce((total, route) => total + route.distanceKm, 0) / routeGroup.routes.length).toFixed(1)
                      : 0} km
                  </span>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Timestamps</h2>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{formatDate(routeGroup.createdAt)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{formatDate(routeGroup.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
