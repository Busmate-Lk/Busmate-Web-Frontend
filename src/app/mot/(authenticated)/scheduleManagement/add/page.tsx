'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import { ScheduleForm } from '@/components/mot/schedule-form/ScheduleForm';
import { ScheduleManagementService } from '@/lib/api-client/route-management';

export default function AddSchedulePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (scheduleData: any) => {
    setIsLoading(true);
    try {
      const response = await ScheduleManagementService.createScheduleFull(scheduleData);
      // Show success message (you can integrate with a toast system)
      console.log('Schedule created successfully:', response);
      
      // Redirect to schedule management page
      router.push('/mot/scheduleManagement');
    } catch (error) {
      console.error('Error creating schedule:', error);
      // Show error message
      throw error; // Re-throw to let the form handle it
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/mot/scheduleManagement');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCancel}
                className="inline-flex items-center text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Schedules
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Plus className="w-6 h-6 mr-2 text-blue-600" />
                  Add New Schedule
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new schedule template with route stops and timing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <ScheduleForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}