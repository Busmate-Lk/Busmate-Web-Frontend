'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Plus, 
  Edit, 
  Trash2,
  MoreVertical
} from 'lucide-react';
import { ScheduleResponse, RouteResponse } from '@/lib/api-client/route-management';

interface ScheduleStopsTabProps {
  schedule: ScheduleResponse;
  route?: RouteResponse | null;
}

export function ScheduleStopsTab({ schedule, route }: ScheduleStopsTabProps) {
  const scheduleStops = schedule.scheduleStops || [];

  // Helper function to format time
  const formatTime = (timeString?: string | null) => {
    if (!timeString) return '--:--';
    try {
      return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return timeString;
    }
  };

  // Helper function to calculate duration between stops
  const calculateDuration = (arrivalTime?: string | null, departureTime?: string | null) => {
    if (!arrivalTime || !departureTime) return null;
    
    try {
      const arrival = new Date(`1970-01-01T${arrivalTime}`);
      const departure = new Date(`1970-01-01T${departureTime}`);
      const diffMs = departure.getTime() - arrival.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));
      
      if (diffMins > 0) {
        return `${diffMins}m`;
      }
      return null;
    } catch {
      return null;
    }
  };

  if (scheduleStops.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Stops</h3>
        <p className="text-gray-500 mb-6">
          This schedule doesn't have any stops configured yet.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule Stops
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Schedule Stops</h3>
          <p className="mt-1 text-sm text-gray-500">
            {scheduleStops.length} stops configured for this schedule
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Stop
        </button>
      </div>

      {/* Stops Timeline */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="relative">
          {scheduleStops
            .sort((a, b) => (a.stopOrder || 0) - (b.stopOrder || 0))
            .map((stop, index) => {
              const isLast = index === scheduleStops.length - 1;
              const duration = index > 0 ? calculateDuration(
                scheduleStops[index - 1]?.departureTime, 
                stop.arrivalTime
              ) : null;

              return (
                <div key={stop.id || index} className="relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-blue-300"></div>
                  )}

                  {/* Stop Card */}
                  <div className="relative flex items-start space-x-4 pb-8">
                    {/* Stop Number */}
                    <div className="flex-shrink-0 relative w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                      {stop.stopOrder || index + 1}
                    </div>

                    {/* Stop Details */}
                    <div className="flex-1 min-w-0 bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="text-base font-medium text-gray-900">
                              {stop.stopName || `Stop ${stop.stopOrder || index + 1}`}
                            </h4>
                            {stop.stopId && (
                              <span className="text-xs text-gray-500">
                                ID: {stop.stopId}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Arrival Time */}
                            <div>
                              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Arrival
                              </dt>
                              <dd className="mt-1 text-sm font-mono text-gray-900">
                                {formatTime(stop.arrivalTime)}
                              </dd>
                            </div>

                            {/* Departure Time */}
                            <div>
                              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Departure
                              </dt>
                              <dd className="mt-1 text-sm font-mono text-gray-900">
                                {formatTime(stop.departureTime)}
                              </dd>
                            </div>

                            {/* Dwell Time */}
                            <div>
                              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Dwell Time
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {calculateDuration(stop.arrivalTime, stop.departureTime) || '--'}
                              </dd>
                            </div>
                          </div>

                          {/* Location Info */}
                          {stop.location && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="text-sm text-gray-500">
                                Location: {stop.location.latitude?.toFixed(6)}, {stop.location.longitude?.toFixed(6)}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Travel Duration to Next Stop */}
                    {!isLast && duration && (
                      <div className="absolute left-6 top-16 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                        {duration}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{scheduleStops.length}</div>
            <div className="text-blue-600">Total Stops</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {formatTime(scheduleStops[0]?.arrivalTime)}
            </div>
            <div className="text-blue-600">First Stop</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">
              {formatTime(scheduleStops[scheduleStops.length - 1]?.departureTime)}
            </div>
            <div className="text-blue-600">Last Departure</div>
          </div>
        </div>
      </div>
    </div>
  );
}