'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Clock,
  AlertCircle
} from 'lucide-react';
import { RouteResponse } from '@/lib/api-client/route-management';
import { ScheduleFormData } from './ScheduleForm';

interface ScheduleStopsFormProps {
  formData: ScheduleFormData;
  onChange: (data: ScheduleFormData) => void;
  selectedRoute: RouteResponse | null;
  validationErrors: Record<string, string>;
}

export function ScheduleStopsForm({
  formData,
  onChange,
  selectedRoute,
  validationErrors
}: ScheduleStopsFormProps) {
  const [stopSearch, setStopSearch] = useState('');

  // Get route stops from selected route
  const routeStops = selectedRoute?.routeStops || [];

  const handleAddStop = () => {
    const newStop = {
      stopId: '',
      stopOrder: formData.scheduleStops.length + 1,
      arrivalTime: '',
      departureTime: ''
    };

    onChange({
      ...formData,
      scheduleStops: [...formData.scheduleStops, newStop]
    });
  };

  const handleRemoveStop = (index: number) => {
    const updatedStops = formData.scheduleStops.filter((_, i) => i !== index);
    // Reorder remaining stops
    const reorderedStops = updatedStops.map((stop, i) => ({
      ...stop,
      stopOrder: i + 1
    }));

    onChange({
      ...formData,
      scheduleStops: reorderedStops
    });
  };

  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.scheduleStops.length) return;

    const updatedStops = [...formData.scheduleStops];
    const [movedStop] = updatedStops.splice(index, 1);
    updatedStops.splice(newIndex, 0, movedStop);

    // Reorder all stops
    const reorderedStops = updatedStops.map((stop, i) => ({
      ...stop,
      stopOrder: i + 1
    }));

    onChange({
      ...formData,
      scheduleStops: reorderedStops
    });
  };

  const handleStopChange = (index: number, field: keyof (typeof formData.scheduleStops)[0], value: string | number) => {
    const updatedStops = formData.scheduleStops.map((stop, i) => 
      i === index ? { ...stop, [field]: value } : stop
    );

    onChange({
      ...formData,
      scheduleStops: updatedStops
    });
  };

  const getStopName = (stopId: string) => {
    const routeStop = routeStops.find(rs => rs.stopId === stopId);
    return routeStop?.stopName || 'Unknown Stop';
  };

  const filteredStops = routeStops.filter(routeStop => 
    routeStop.stopName?.toLowerCase().includes(stopSearch.toLowerCase()) ||
    routeStop.stopId?.toLowerCase().includes(stopSearch.toLowerCase())
  );

  const calculateDuration = (arrivalTime: string, departureTime: string) => {
    if (!arrivalTime || !departureTime) return null;
    
    try {
      const arrival = new Date(`1970-01-01T${arrivalTime}`);
      const departure = new Date(`1970-01-01T${departureTime}`);
      const diffMs = departure.getTime() - arrival.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));
      
      if (diffMins >= 0) {
        return `${diffMins}m`;
      }
      return null;
    } catch {
      return null;
    }
  };

  const getTotalJourneyTime = () => {
    if (formData.scheduleStops.length < 2) return null;
    
    const firstStop = formData.scheduleStops[0];
    const lastStop = formData.scheduleStops[formData.scheduleStops.length - 1];
    
    if (!firstStop.arrivalTime || !lastStop.departureTime) return null;
    
    try {
      const start = new Date(`1970-01-01T${firstStop.arrivalTime}`);
      const end = new Date(`1970-01-01T${lastStop.departureTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));
      
      if (diffMins >= 0) {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      }
      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Route Stops & Timing
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Add arrival and departure times for the stops on this route. 
          All times are required for schedule generation.
        </p>
      </div>

      {/* Route Selection Validation */}
      {!selectedRoute && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              Please select a route first to configure stop timings.
            </p>
          </div>
        </div>
      )}

      {/* No Route Stops */}
      {selectedRoute && routeStops.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-sm text-yellow-800">
              The selected route has no stops configured. Please configure route stops first.
            </p>
          </div>
        </div>
      )}

      {/* Route Stops List */}
      {selectedRoute && routeStops.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Route: <span className="font-medium">{selectedRoute.name}</span>
              <span className="ml-2">• {routeStops.length} stops</span>
              {getTotalJourneyTime() && (
                <span className="ml-2 text-blue-600 font-medium">
                  • Total journey: {getTotalJourneyTime()}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                // Auto-fill all route stops with empty times
                const allStops = routeStops
                  .filter(routeStop => routeStop.stopId && routeStop.stopOrder !== undefined)
                  .map((routeStop, index) => ({
                    stopId: routeStop.stopId!,
                    stopOrder: routeStop.stopOrder!,
                    arrivalTime: '',
                    departureTime: ''
                  }));
                onChange({
                  ...formData,
                  scheduleStops: allStops
                });
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Add All Stops
            </button>
          </div>

          {/* Validation Error */}
          {validationErrors.scheduleStops && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                <p className="text-sm text-red-600">{validationErrors.scheduleStops}</p>
              </div>
            </div>
          )}

          {/* Route Stops with Timing */}
          <div className="space-y-3">
            {routeStops.map((routeStop, index) => {
              const scheduleStop = formData.scheduleStops.find(ss => ss.stopId === routeStop.stopId);
              const stopError = validationErrors[`stop_${index}_arrival`] || 
                               validationErrors[`stop_${index}_departure`];
              
              return (
                <div
                  key={routeStop.stopId}
                  className={`border rounded-lg p-4 ${stopError ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Stop Order */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {routeStop.stopOrder}
                      </div>
                    </div>

                    {/* Stop Info */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900">{routeStop.stopName}</h4>
                        <p className="text-sm text-gray-500">
                          Distance: {routeStop.distanceFromStartKm?.toFixed(1) || '0.0'} km
                        </p>
                      </div>

                      {/* Timing Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Arrival Time *
                          </label>
                          <input
                            type="time"
                            value={scheduleStop?.arrivalTime || ''}
                            onChange={(e) => {
                              const existingIndex = formData.scheduleStops.findIndex(ss => ss.stopId === routeStop.stopId);
                              if (existingIndex >= 0) {
                                handleStopChange(existingIndex, 'arrivalTime', e.target.value);
                              } else if (routeStop.stopId && routeStop.stopOrder !== undefined) {
                                // Add new schedule stop
                                const newScheduleStop = {
                                  stopId: routeStop.stopId,
                                  stopOrder: routeStop.stopOrder,
                                  arrivalTime: e.target.value,
                                  departureTime: ''
                                };
                                onChange({
                                  ...formData,
                                  scheduleStops: [...formData.scheduleStops, newScheduleStop]
                                });
                              }
                            }}
                            className={`
                              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${validationErrors[`stop_${index}_arrival`] 
                                ? 'border-red-300 focus:border-red-500' 
                                : 'border-gray-300 focus:border-blue-500'
                              }
                            `}
                          />
                          {validationErrors[`stop_${index}_arrival`] && (
                            <p className="mt-1 text-xs text-red-600">
                              {validationErrors[`stop_${index}_arrival`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Departure Time *
                          </label>
                          <input
                            type="time"
                            value={scheduleStop?.departureTime || ''}
                            onChange={(e) => {
                              const existingIndex = formData.scheduleStops.findIndex(ss => ss.stopId === routeStop.stopId);
                              if (existingIndex >= 0) {
                                handleStopChange(existingIndex, 'departureTime', e.target.value);
                              } else if (routeStop.stopId && routeStop.stopOrder !== undefined) {
                                // Add new schedule stop
                                const newScheduleStop = {
                                  stopId: routeStop.stopId,
                                  stopOrder: routeStop.stopOrder,
                                  arrivalTime: scheduleStop?.arrivalTime || '',
                                  departureTime: e.target.value
                                };
                                onChange({
                                  ...formData,
                                  scheduleStops: [...formData.scheduleStops, newScheduleStop]
                                });
                              }
                            }}
                            className={`
                              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${validationErrors[`stop_${index}_departure`] 
                                ? 'border-red-300 focus:border-red-500' 
                                : 'border-gray-300 focus:border-blue-500'
                              }
                            `}
                          />
                          {validationErrors[`stop_${index}_departure`] && (
                            <p className="mt-1 text-xs text-red-600">
                              {validationErrors[`stop_${index}_departure`]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dwell Time
                          </label>
                          <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600">
                            {calculateDuration(scheduleStop?.arrivalTime || '', scheduleStop?.departureTime || '') || '--'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0">
                      {scheduleStop && (
                        <button
                          type="button"
                          onClick={() => {
                            const updatedStops = formData.scheduleStops.filter(ss => ss.stopId !== routeStop.stopId);
                            onChange({
                              ...formData,
                              scheduleStops: updatedStops
                            });
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Remove stop timing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Schedule Timing Guidelines
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Configure timing for stops in route sequence order</li>
              <li>• Departure time must be equal to or later than arrival time</li>
              <li>• Times should be realistic for passenger boarding/alighting</li>
              <li>• You can skip stops that won't be used in this schedule</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}