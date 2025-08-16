'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { RouteForm, type RouteGroupFormData } from '@/components/mot/routes/route-form/RouteForm';
import { RouteManagementService } from '@/lib/api-client/route-management';
import type { RouteGroupRequest } from '@/lib/api-client/route-management';

export default function AddNewRouteGroupPage() {
  const router = useRouter();
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Helper function to build complete route stops array
  const buildCompleteRouteStops = (routeData: RouteGroupFormData['outboundRoute']) => {
    const allStops = [];
    
    // 1. Add start stop (order 0)
    allStops.push({
      stopId: routeData.startStopId,
      stopOrder: 0,
      distanceFromStartKm: 0
    });
    
    // 2. Add intermediate stops (order 1, 2, 3, ...)
    routeData.routeStops.forEach((stop, index) => {
      allStops.push({
        stopId: stop.stopId,
        stopOrder: index + 1,
        distanceFromStartKm: stop.distanceFromStartKm
      });
    });
    
    // 3. Add end stop (final order)
    allStops.push({
      stopId: routeData.endStopId,
      stopOrder: routeData.routeStops.length + 1,
      distanceFromStartKm: routeData.distanceKm
    });
    
    return allStops;
  };

  // Create Route Group
  const handleCreateRouteGroup = async (formData: RouteGroupFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Prepare route group data for API
      const routeGroupRequest: RouteGroupRequest = {
        name: formData.name,
        description: formData.description,
        routes: [
          // Outbound route
          {
            name: formData.outboundRoute.name,
            description: formData.outboundRoute.description,
            direction: formData.outboundRoute.direction,
            startStopId: formData.outboundRoute.startStopId,
            endStopId: formData.outboundRoute.endStopId,
            distanceKm: formData.outboundRoute.distanceKm,
            estimatedDurationMinutes: formData.outboundRoute.estimatedDurationMinutes,
            routeStops: buildCompleteRouteStops(formData.outboundRoute)
          },
          // Inbound route
          {
            name: formData.inboundRoute.name,
            description: formData.inboundRoute.description,
            direction: formData.inboundRoute.direction,
            startStopId: formData.inboundRoute.startStopId,
            endStopId: formData.inboundRoute.endStopId,
            distanceKm: formData.inboundRoute.distanceKm,
            estimatedDurationMinutes: formData.inboundRoute.estimatedDurationMinutes,
            routeStops: buildCompleteRouteStops(formData.inboundRoute)
          }
        ]
      };

      const createdRouteGroup = await RouteManagementService.createRouteGroup(routeGroupRequest);
      
      // Redirect to the created route group details page
      router.push(`/mot/routes/${createdRouteGroup.id}`);
      
    } catch (error) {
      console.error('Error creating route group:', error);
      setError('Failed to create route group. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save Draft
  const handleSaveDraft = async (formData: RouteGroupFormData) => {
    try {
      setIsSavingDraft(true);
      
      // For now, just save to localStorage (could be extended to API)
      const draftData = {
        ...formData,
        lastSaved: new Date().toISOString(),
        isDraft: true
      };
      
      localStorage.setItem('routeGroupDraft', JSON.stringify(draftData));
      
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleCancel = () => {
    // Clear any draft
    localStorage.removeItem('routeGroupDraft');
    router.push('/mot/routes');
  };

  return (
    <Layout
      activeItem="routes"
      pageTitle="Add New Route Group"
      pageDescription="Create a new route group with outbound and inbound routes"
      role="mot"
    >
      <div className="space-y-6">
        {/* Header Section - Breadcrumbs */}
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
          <span className="text-gray-900 font-medium">Add New Route Group</span>
        </div>

        {/* Route Form */}
        <RouteForm
          mode="create"
          onSubmit={handleCreateRouteGroup}
          onCancel={handleCancel}
          onSaveDraft={handleSaveDraft}
          isLoading={isLoading}
          isSavingDraft={isSavingDraft}
          error={error}
          validationErrors={validationErrors}
          onErrorChange={setError}
          onValidationErrorsChange={setValidationErrors}
        />
      </div>
    </Layout>
  );
}