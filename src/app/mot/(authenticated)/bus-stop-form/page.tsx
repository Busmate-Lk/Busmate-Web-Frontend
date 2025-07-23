'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import AddBusStopBasicInfo from '@/components/mot/bus-stop-form/AddBusStopBasicInfo';
import AddBusStopLocation from '@/components/mot/bus-stop-form/AddBusStopLocation';
import useBusStops from '@/hooks/use-bus-stops';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import { BusStopRequest } from '@/types/requestdto/bus-stop';

export default function BusStopForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busStopId = searchParams.get('id'); // Get ID for editing
  const isEditing = !!busStopId;
  const { loadBusStopById, addBusStop, updateBusStop } = useBusStops();
  const [selectedBusStop, setSelectedBusStop] = useState<BusStopResponse>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBusStop = async () => {
    if (busStopId) {
      try {
        const busStop = await loadBusStopById(busStopId);
        setSelectedBusStop(busStop);
      } catch (error) {
        console.error('Failed to load bus stop:', error);
        // You might want to show an error message to the user
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      loadBusStop();
    }
  }, [busStopId, isEditing]);

  const [formData, setFormData] = useState<BusStopRequest>({
    id: '',
    name: '',
    description: '',
    location: {
      latitude: 0,
      longitude: 0,
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Sri Lanka',
    },
    isAccessible: true,
  });

  // Update form data when selectedBusStop changes
  useEffect(() => {
    if (selectedBusStop) {
      setFormData({
        id: selectedBusStop.id || '',
        name: selectedBusStop.name || '',
        description: selectedBusStop.description || '',
        location: {
          latitude: selectedBusStop.location?.latitude || 0,
          longitude: selectedBusStop.location?.longitude || 0,
          address: selectedBusStop.location?.address || '',
          city: selectedBusStop.location?.city || '',
          state: selectedBusStop.location?.state || '',
          zipCode: selectedBusStop.location?.zipCode || '',
          country: selectedBusStop.location?.country || 'Sri Lanka',
        },
        isAccessible: selectedBusStop.isAccessible || true,
      });
    }
  }, [selectedBusStop]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    if (field.startsWith('location.')) {
      const locationField = field.replace('location.', '');
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing && busStopId) {
        await updateBusStop(formData, busStopId);
        console.log('Bus stop updated successfully');
      } else {
        await addBusStop(formData);
        console.log('Bus stop created successfully');
      }
      router.push('/mot/bus-stops');
    } catch (error) {
      console.error('Failed to save bus stop:', error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/mot/bus-stops');
  };

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle={isEditing ? 'Edit Bus Stop' : 'Add Bus Stop'}
      pageDescription={
        isEditing
          ? 'Update bus stop information and facilities'
          : 'Create a new bus stop with location and facility details'
      }
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push('/mot/bus-stops')}
          >
            Bus Stops
          </button>
          <span>/</span>
          <span>
            {isEditing ? `Edit Bus Stop #${busStopId}` : 'Add New Bus Stop'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AddBusStopBasicInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <AddBusStopLocation
            formData={formData}
            handleInputChange={handleInputChange}
          />
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg text-gray-900">
                Accessibility
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAccessible}
                onChange={(e) =>
                  handleInputChange('isAccessible', e.target.checked)
                }
                className="accent-blue-600 w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-700">
                This bus stop is wheelchair accessible
              </span>
            </label>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isEditing ? 'Update Bus Stop' : 'Add Bus Stop'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
