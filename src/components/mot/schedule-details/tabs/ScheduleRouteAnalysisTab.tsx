'use client';

import { useState, useEffect } from 'react';
import { 
  Route, 
  Calendar, 
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { ScheduleResponse, RouteResponse } from '@/lib/api-client/route-management';
import { ScheduleManagementService } from '@/lib/api-client/route-management/services/ScheduleManagementService';
import { TimeSpaceDiagram } from '../TimeSpaceDiagram';

interface ScheduleRouteAnalysisTabProps {
  schedule: ScheduleResponse;
  route?: RouteResponse | null;
  onRefresh?: () => void;
}

export function ScheduleRouteAnalysisTab({ 
  schedule, 
  route, 
  onRefresh 
}: ScheduleRouteAnalysisTabProps) {
  const [routeSchedules, setRouteSchedules] = useState<ScheduleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all schedules for the route
  const loadRouteSchedules = async () => {
    if (!schedule.routeId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch all schedules for the route
      const schedules = await ScheduleManagementService.getSchedulesByRoute(
        schedule.routeId,
        undefined, // status - get all statuses
        0, // page
        100, // size - get more schedules
        'name', // sortBy
        'asc' // sortDir
      );

      setRouteSchedules(schedules.content || []);
    } catch (err) {
      console.error('Error loading route schedules:', err);
      setError('Failed to load route schedules for analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRouteSchedules();
  }, [schedule.routeId]);

  const handleRefresh = async () => {
    await loadRouteSchedules();
    onRefresh?.();
  };

  // Filter out schedules without timing data
  const schedulesWithData = routeSchedules.filter(s => 
    s.scheduleStops && 
    s.scheduleStops.length > 0 && 
    s.scheduleStops.some(stop => stop.arrivalTime)
  );

  if (!route) {
    return (
      <div className="text-center py-12">
        <Route className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Route Not Found</h3>
        <p className="text-gray-500">
          Unable to load route information for schedule analysis.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button 
          onClick={handleRefresh}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Route className="w-5 h-5 mr-2" />
            Route Schedule Analysis
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Time-space diagram showing all schedules on route: {route.name}
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isLoading}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Route Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Route:</span>
            <div className="text-gray-900">{route.name}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Distance:</span>
            <div className="text-gray-900">{route.distanceKm?.toFixed(1)} km</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Direction:</span>
            <div className="text-gray-900 capitalize">{route.direction?.toLowerCase()}</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">From:</span>
              <div className="text-gray-900">{route.startStopName}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">To:</span>
              <div className="text-gray-900">{route.endStopName}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Analysis Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">{routeSchedules.length}</div>
          <div className="text-sm text-gray-600">Total Schedules</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-900">{schedulesWithData.length}</div>
          <div className="text-sm text-gray-600">With Timing Data</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-900">
            {routeSchedules.filter(s => s.status === 'ACTIVE').length}
          </div>
          <div className="text-sm text-gray-600">Active Schedules</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-900">
            {route.routeStops?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Route Stops</div>
        </div>
      </div>

      {/* Time-Space Diagram */}
      <TimeSpaceDiagram
        schedules={schedulesWithData}
        route={route}
        currentScheduleId={schedule.id}
        isLoading={isLoading}
      />

      {/* Analysis Insights */}
      {schedulesWithData.length > 1 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Schedule Analysis Insights
          </h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Compare frequency patterns across different schedules</p>
            <p>• Identify service gaps and potential optimization opportunities</p>
            <p>• Analyze headway consistency between consecutive services</p>
            <p>• Visualize peak vs off-peak service distribution</p>
            <p>• Current schedule is highlighted for easy comparison</p>
          </div>
        </div>
      )}

      {/* No Data Warning */}
      {routeSchedules.length > 0 && schedulesWithData.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Limited Analysis Data</p>
              <p className="text-yellow-700">
                Found {routeSchedules.length} schedule(s) on this route, but none have complete timing data 
                required for the time-space diagram. Schedules need arrival times for their stops to be visualized.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}