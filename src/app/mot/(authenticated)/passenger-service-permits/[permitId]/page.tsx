'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ChevronRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { PermitSummary } from '@/components/mot/passenger-service-permits/PermitSummary';
import { PermitTabsSection } from '@/components/mot/passenger-service-permits/PermitTabsSection';
import { 
  PermitManagementService,
  OperatorManagementService,
  RouteManagementService,
  BusManagementService,
  PassengerServicePermitResponse,
  OperatorResponse,
  RouteGroupResponse,
  BusResponse
} from '@/lib/api-client/route-management';

export default function PermitDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const permitId = params.permitId as string;

  // State
  const [permit, setPermit] = useState<PassengerServicePermitResponse | null>(null);
  const [operator, setOperator] = useState<OperatorResponse | null>(null);
  const [routeGroup, setRouteGroup] = useState<RouteGroupResponse | null>(null);
  const [assignedBuses, setAssignedBuses] = useState<BusResponse[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [operatorLoading, setOperatorLoading] = useState(false);
  const [routeGroupLoading, setRouteGroupLoading] = useState(false);
  const [busesLoading, setBusesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load permit details
  const loadPermitDetails = useCallback(async () => {
    if (!permitId) return;

    try {
      setIsLoading(true);
      setError(null);

      const permitData = await PermitManagementService.getPermitById(permitId);
      setPermit(permitData);

      return permitData;
    } catch (err) {
      console.error('Error loading permit details:', err);
      setError('Failed to load permit details. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [permitId]);

  // Load operator details
  const loadOperatorDetails = useCallback(async (operatorId: string) => {
    try {
      setOperatorLoading(true);
      const operatorData = await OperatorManagementService.getOperatorById(operatorId);
      setOperator(operatorData);
    } catch (err) {
      console.error('Error loading operator details:', err);
      // Don't set main error for operator loading failure
    } finally {
      setOperatorLoading(false);
    }
  }, []);

  // Load route group details
  const loadRouteGroupDetails = useCallback(async (routeGroupId: string) => {
    try {
      setRouteGroupLoading(true);
      const routeGroupData = await RouteManagementService.getRouteGroupById(routeGroupId);
      setRouteGroup(routeGroupData);
    } catch (err) {
      console.error('Error loading route group details:', err);
      // Don't set main error for route group loading failure
    } finally {
      setRouteGroupLoading(false);
    }
  }, []);

  // Load assigned buses (simulated - would need actual API endpoint)
  const loadAssignedBuses = useCallback(async (operatorId: string) => {
    try {
      setBusesLoading(true);
      // For now, load all buses for the operator
      // In reality, this would be filtered by permit assignment
      const busesResponse = await BusManagementService.getAllBuses(
        0, // page
        100, // size
        'ntc_registration_number', // sortBy
        'asc', // sortDir
        undefined, // search
        operatorId, // operatorId filter
        'active' // status - only active buses
      );
      
      setAssignedBuses(busesResponse.content || []);
    } catch (err) {
      console.error('Error loading assigned buses:', err);
      // Don't set main error for buses loading failure
    } finally {
      setBusesLoading(false);
    }
  }, []);

  // Load related data when permit is loaded
  useEffect(() => {
    if (permit) {
      // Load operator details if operatorId exists
      if (permit.operatorId) {
        loadOperatorDetails(permit.operatorId);
        loadAssignedBuses(permit.operatorId);
      }
      
      // Load route group details if routeGroupId exists
      if (permit.routeGroupId) {
        loadRouteGroupDetails(permit.routeGroupId);
      }
    }
  }, [permit, loadOperatorDetails, loadRouteGroupDetails, loadAssignedBuses]);

  // Initial load
  useEffect(() => {
    loadPermitDetails();
  }, [loadPermitDetails]);

  // Handlers
  const handleEdit = () => {
    router.push(`/mot/passenger-service-permits/${permitId}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!permit?.id) return;

    try {
      setIsDeleting(true);
      await PermitManagementService.deletePermit(permit.id);
      
      // Navigate back to permits list after successful deletion
      router.push('/mot/passenger-service-permits');
      
    } catch (error) {
      console.error('Error deleting permit:', error);
      setError('Failed to delete permit. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleRefresh = async () => {
    const permitData = await loadPermitDetails();
    if (permitData) {
      // Reload related data
      if (permitData.operatorId) {
        await Promise.all([
          loadOperatorDetails(permitData.operatorId),
          loadAssignedBuses(permitData.operatorId)
        ]);
      }
      if (permitData.routeGroupId) {
        await loadRouteGroupDetails(permitData.routeGroupId);
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout
        activeItem="passenger-service-permits"
        pageTitle="Loading..."
        pageDescription="Loading permit details"
        role="mot"
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading permit details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !permit) {
    return (
      <Layout
        activeItem="passenger-service-permits"
        pageTitle="Error"
        pageDescription="Failed to load permit"
        role="mot"
      >
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <div className="text-red-600 text-lg mb-4">
            {error || 'Permit not found'}
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
      activeItem="passenger-service-permits"
      pageTitle={permit.permitNumber || 'Permit Details'}
      pageDescription="Detailed view of passenger service permit and related information"
      role="mot"
    >
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-sm text-red-600 hover:text-red-800 underline mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header Section - Breadcrumbs + Actions */}
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
              onClick={() => router.push('/mot/passenger-service-permits')}
              className="hover:text-blue-600 transition-colors"
            >
              Passenger Service Permits
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {permit.permitNumber || 'Permit Details'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Permit
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

        {/* Permit Summary Card */}
        <PermitSummary 
          permit={permit} 
          operator={operator}
          routeGroup={routeGroup}
          assignedBuses={assignedBuses}
        />

        {/* Permit Tabs Section */}
        <PermitTabsSection 
          permit={permit}
          operator={operator}
          routeGroup={routeGroup}
          assignedBuses={assignedBuses}
          operatorLoading={operatorLoading}
          routeGroupLoading={routeGroupLoading}
          busesLoading={busesLoading}
          onRefresh={handleRefresh}
        />

        {/* Delete Permit Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Permit
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete permit "{permit.permitNumber}"? 
                This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {isDeleting ? 'Deleting...' : 'Delete Permit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}