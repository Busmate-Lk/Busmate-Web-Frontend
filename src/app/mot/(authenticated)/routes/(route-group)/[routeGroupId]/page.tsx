'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  Trash2, 
  ChevronRight
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { RouteGroupSummaryCard } from '@/components/mot/routes/RouteGroupSummaryCard';
import { RoutesTabsSection } from '@/components/mot/routes/RoutesTabsSection';
import { RouteManagementService } from '@/lib/api-client/route-management';
import type { RouteGroupResponse, RouteResponse } from '@/lib/api-client/route-management';

export default function RouteGroupDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const routeGroupId = params.routeGroupId as string;

  // State
  const [routeGroup, setRouteGroup] = useState<RouteGroupResponse | null>(null);
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Handlers
  const handleEdit = () => {
    router.push(`/mot/routes/${routeGroupId}/edit`);
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
        <RouteGroupSummaryCard routeGroup={routeGroup} routes={routes} />

        {/* 3. Routes Tabs Section */}
        <RoutesTabsSection routes={routes} onAddRoute={handleAddRoute} />
      </div>
    </Layout>
  );
}