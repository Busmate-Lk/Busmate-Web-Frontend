'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Trash2, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { BusSummary } from '@/components/mot/buses/BusSummary';
import { BusTabsSection } from '@/components/mot/buses/BusTabsSection';
import { 
  BusManagementService, 
  BusResponse,
  OperatorManagementService,
  OperatorResponse
} from '@/lib/api-client/route-management';

export default function BusDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const busId = params.busId as string;

  // State
  const [bus, setBus] = useState<BusResponse | null>(null);
  const [operator, setOperator] = useState<OperatorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load bus details
  const loadBusDetails = useCallback(async () => {
    if (!busId) return;

    try {
      setIsLoading(true);
      setError(null);

      const busData = await BusManagementService.getBusById(busId);
      setBus(busData);

      // Load operator details if operatorId exists
      if (busData.operatorId) {
        try {
          const operatorData = await OperatorManagementService.getOperatorById(busData.operatorId);
          setOperator(operatorData);
        } catch (operatorErr) {
          console.warn('Could not load operator details:', operatorErr);
          // Don't set main error for operator loading failure
        }
      }

    } catch (err) {
      console.error('Error loading bus details:', err);
      setError('Failed to load bus details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [busId]);

  useEffect(() => {
    loadBusDetails();
  }, [loadBusDetails]);

  // Handlers
  const handleEdit = () => {
    router.push(`/mot/buses/${busId}/edit`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!bus?.id) return;

    try {
      setIsDeleting(true);
      await BusManagementService.deleteBus(bus.id);
      
      // Navigate back to buses list after successful deletion
      router.push('/mot/buses');
      
    } catch (error) {
      console.error('Error deleting bus:', error);
      setError('Failed to delete bus. Please try again.');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleRefresh = async () => {
    await loadBusDetails();
  };

  const handleViewOperator = () => {
    if (operator?.id) {
      router.push(`/mot/users/operators/${operator.id}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout
        activeItem="buses"
        pageTitle="Loading..."
        pageDescription="Loading bus details"
        role="mot"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !bus) {
    return (
      <Layout
        activeItem="buses"
        pageTitle="Error"
        pageDescription="Failed to load bus details"
        role="mot"
      >
        <div className="max-w-md mx-auto text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error || 'Bus not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            The bus you're looking for doesn't exist or there was an error loading the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleBack}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <button
              onClick={() => router.push('/mot/buses')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Buses
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      activeItem="buses"
      pageTitle={bus.plateNumber || bus.ntcRegistrationNumber || 'Bus Details'}
      pageDescription="Detailed view of bus information and related data"
      role="mot"
    >
      <div className="space-y-6">
        {/* Header with Navigation and Actions */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <button
              onClick={handleRefresh}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div> */}
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
              onClick={() => router.push('/mot/users/operators')}
              className="hover:text-blue-600 transition-colors"
            >
              Bus Management
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">
              {bus.id || 'Bus Details'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Bus
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

        {/* Bus Summary */}
        <BusSummary bus={bus} operator={operator} onViewOperator={handleViewOperator} />

        {/* Tabs Section */}
        <BusTabsSection 
          bus={bus} 
          operator={operator}
          onRefresh={handleRefresh}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Bus
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete bus "{bus.plateNumber || bus.ntcRegistrationNumber}"? 
                This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Bus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}