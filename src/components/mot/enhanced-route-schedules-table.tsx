'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Clock,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScheduleManagementResponse } from '@/types/responsedto/schedule-management';
import { getSchedulesByRouteId } from '@/lib/data/schedules-dummy';

interface EnhancedRouteSchedulesTableProps {
  routeId: string;
  routeName: string;
}

export function EnhancedRouteSchedulesTable({
  routeId,
  routeName,
}: EnhancedRouteSchedulesTableProps) {
  const router = useRouter();
  const [expandedSchedules, setExpandedSchedules] = useState<Set<string>>(
    new Set()
  );

  const schedules = getSchedulesByRouteId(routeId);
  const forwardSchedules = schedules.filter(
    (s) => s.scheduleType === 'forward'
  );
  const backwardSchedules = schedules.filter(
    (s) => s.scheduleType === 'backward'
  );

  const toggleExpanded = (scheduleId: string) => {
    const newExpanded = new Set(expandedSchedules);
    if (newExpanded.has(scheduleId)) {
      newExpanded.delete(scheduleId);
    } else {
      newExpanded.add(scheduleId);
    }
    setExpandedSchedules(newExpanded);
  };

  const handleAddSchedule = () => {
    router.push(`/mot/enhanced-schedule-form?routeId=${routeId}`);
  };

  const handleViewSchedule = (scheduleId: string) => {
    router.push(`/mot/schedule-details/${scheduleId}`);
  };

  const handleEditSchedule = (scheduleId: string) => {
    router.push(`/mot/enhanced-schedule-form?scheduleId=${scheduleId}`);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      // Delete logic would go here
      console.log('Deleting schedule:', scheduleId);
    }
  };

  const formatTime = (timeString: string) => {
    // Convert 24-hour format to 12-hour format if needed
    return timeString;
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-gray-100 text-gray-800',
      Suspended: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  const ScheduleRow = ({
    schedule,
  }: {
    schedule: ScheduleManagementResponse;
  }) => {
    const isExpanded = expandedSchedules.has(String(schedule.id));
    const firstStop = schedule.scheduleStops[0];
    const lastStop = schedule.scheduleStops[schedule.scheduleStops.length - 1];

    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
        <div className="bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Schedule Name & Direction */}
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-900">
                  {schedule.name}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {schedule.scheduleType === 'forward' ? 'Forward' : 'Backward'}
                </div>
              </div>

              {/* Route */}
              <div className="space-y-1">
                <div className="text-sm text-gray-900">
                  {firstStop?.stopName} → {lastStop?.stopName}
                </div>
                <div className="text-xs text-gray-500">
                  {schedule.scheduleStops.length} stops
                </div>
              </div>

              {/* Timing */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-gray-900">
                  <Clock className="h-3 w-3" />
                  {formatTime(String(firstStop?.departureTime))} -{' '}
                  {formatTime(String(lastStop?.arrivalTime))}
                </div>
                <div className="text-xs text-gray-500">
                  Duration:{' '}
                  {schedule.scheduleStops.length > 1
                    ? `~${Math.round(
                        (schedule.scheduleStops.length - 1) * 15
                      )} min`
                    : 'N/A'}
                </div>
              </div>

              {/* Validity */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm text-gray-900">
                  <Calendar className="h-3 w-3" />
                  {schedule.effectiveStartDate.toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  to {schedule.effectiveEndDate.toLocaleDateString()}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1">
                {getStatusBadge(String(schedule.status))}
                <div className="text-xs text-gray-500">
                  Updated {schedule.updatedAt.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => toggleExpanded(String(schedule.id))}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => handleViewSchedule(String(schedule.id))}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleEditSchedule(String(schedule.id))}
                className="p-1 text-green-600 hover:text-green-800 transition-colors"
                title="Edit Schedule"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteSchedule(String(schedule.id))}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Delete Schedule"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="space-y-4">
              {/* Stop Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Stop Schedule ({schedule.scheduleStops.length} stops)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {schedule.scheduleStops.map((stop, index) => (
                    <div
                      key={index}
                      className="bg-white p-2 rounded border text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {stop.stopOrder}. {stop.stopName}
                      </div>
                      <div className="text-gray-600">
                        Arr: {formatTime(String(stop.arrivalTime))} | Dep:{' '}
                        {formatTime(String(stop.departureTime))}
                      </div>
                      <div className="text-gray-500">{stop.location.city}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-medium text-gray-900">
                    Route Group:
                  </span>
                  <div className="text-gray-600">{schedule.routeGroupName}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Created by:</span>
                  <div className="text-gray-600">{schedule.createdBy}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Last updated:
                  </span>
                  <div className="text-gray-600">
                    {schedule.updatedAt.toLocaleDateString()} by{' '}
                    {schedule.updatedBy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (schedules.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Schedules Yet
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          This route doesn't have any schedules planned yet. Start by adding a
          schedule for either direction.
        </p>
        <button
          onClick={handleAddSchedule}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add First Schedule
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Route Schedules
          </h2>
          <button
            onClick={handleAddSchedule}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Schedule
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-semibold text-blue-600">
              {schedules.length}
            </div>
            <div className="text-sm text-blue-800">Total Schedules</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-semibold text-green-600">
              {forwardSchedules.length}
            </div>
            <div className="text-sm text-green-800">Forward Routes</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-semibold text-purple-600">
              {backwardSchedules.length}
            </div>
            <div className="text-sm text-purple-800">Backward Routes</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-2xl font-semibold text-orange-600">
              {schedules.filter((s) => s.status === 'Active').length}
            </div>
            <div className="text-sm text-orange-800">Active Schedules</div>
          </div>
        </div>
      </div>

      {/* Forward Schedules */}
      {forwardSchedules.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              🔄 Forward Direction Schedules
              <span className="text-sm font-normal text-gray-500">
                ({forwardSchedules.length})
              </span>
            </h3>
          </div>
          <div className="p-6 space-y-0">
            {forwardSchedules.map((schedule) => (
              <ScheduleRow key={String(schedule.id)} schedule={schedule} />
            ))}
          </div>
        </div>
      )}

      {/* Backward Schedules */}
      {backwardSchedules.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              🔄 Backward Direction Schedules
              <span className="text-sm font-normal text-gray-500">
                ({backwardSchedules.length})
              </span>
            </h3>
          </div>
          <div className="p-6 space-y-0">
            {backwardSchedules.map((schedule) => (
              <ScheduleRow key={String(schedule.id)} schedule={schedule} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
