'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, X, AlertCircle, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { BusForm } from '@/components/mot/buses/bus-form';
import { 
  BusManagementService, 
  BusRequest,
  BusResponse,
  OperatorManagementService,
  OperatorResponse
} from '@/lib/api-client/route-management';

export default function EditBusPage() {
  const router = useRouter();
  const params = useParams();
  const busId = params.busId as string;
  
  // State
  const [bus, setBus] = useState<BusResponse | null>(null);
  const [operators, setOperators] = useState<OperatorResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [operatorsLoading, setOperatorsLoading] = useState(true);

  // Load bus details and operators
  const loadData = useCallback(async () => {
    if (!busId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load bus details and operators in parallel
      const [busData, operatorsList] = await Promise.all([
        BusManagementService.getBusById(busId),
        OperatorManagementService.getAllOperatorsAsList()
      ]);

      setBus(busData);
      setOperators(operatorsList || []);

    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load bus details. Please try again.');
    } finally {
      setIsLoading(false);
      setOperatorsLoading(false);
    }
  }, [busId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle form submission
  const handleSubmit = async (busData: BusRequest): Promise<void> => {
    if (!busId) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await BusManagementService.updateBus(busId, busData);
      
      // Redirect back to bus details page
      router.push(`/mot/buses/${busId}`);
    } catch (err) {
      console.error('Error updating bus:', err);
      setError(err instanceof Error ? err.message : 'Failed to update bus. Please try again.');
      throw err; // Re-throw to let form handle the error state
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      router.push(`/mot/buses/${busId}`);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout
        activeItem="buses"
        pageTitle="Loading..."
        pageDescription="Loading bus details for editing"
        role="mot"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error && !bus) {
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
            Failed to Load Bus Details
          </h2>
          <p className="text-gray-600 mb-6">
            The bus you're trying to edit doesn't exist or there was an error loading the details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.back()}
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
      pageTitle={`Edit ${bus?.plateNumber || bus?.ntcRegistrationNumber || 'Bus'}`}
      pageDescription="Update bus registration and operational details"
      role="mot"
    >
      <div className="space-y-6">
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
            onClick={() => router.push('/mot/buses')}
            className="hover:text-blue-600 transition-colors"
          >
            Bus Management
          </button>
          <ChevronRight className="w-4 h-4" />
          <button 
            onClick={() => router.push(`/mot/buses/${busId}`)}
            className="hover:text-blue-600 transition-colors"
          >
            {bus?.plateNumber || bus?.ntcRegistrationNumber || 'Bus Details'}
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Edit</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Bus: {bus?.plateNumber || bus?.ntcRegistrationNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Update the bus registration and operational details
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">Error Updating Bus</h3>
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

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Bus Information</h2>
            <p className="text-sm text-gray-600 mt-1">
              Update the bus registration and operational details
            </p>
          </div>

          <div className="p-6">
            {bus && (
              <BusForm
                bus={bus}
                operators={operators}
                operatorsLoading={operatorsLoading}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
                submitButtonText="Update Bus"
                mode="edit"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}