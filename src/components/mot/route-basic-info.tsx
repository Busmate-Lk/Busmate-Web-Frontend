"use client";

import { RouteIcon, Bus, MapPin, Calendar, Clock } from 'lucide-react';

interface RouteBasicInfoProps {
  route: {
    routeName: string;
    routeNumber: string;
    routeGroup: string;
    startingPoint: string;
    endPoint: string;
    startLat: string;
    startLng: string;
    endLat: string;
    endLng: string;
    status: 'Active' | 'Inactive' | 'Maintenance';
    operator: string;
    intermediateStops: any[];
    scheduleCount: number;
    lastUpdated: string;
  };
}

export function RouteBasicInfo({ route }: RouteBasicInfoProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Route Information</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <RouteIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Route Name</p>
              <p className="text-sm text-gray-600">{route.routeName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Bus className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Route Number</p>
              <p className="text-sm text-gray-600">{route.routeNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RouteIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Route Group</p>
              <p className="text-sm text-gray-600">{route.routeGroup}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Starting Point</p>
              <p className="text-sm text-gray-600">{route.startingPoint}</p>
              <p className="text-xs text-gray-500">Lat: {route.startLat}, Lng: {route.startLng}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">End Point</p>
              <p className="text-sm text-gray-600">{route.endPoint}</p>
              <p className="text-xs text-gray-500">Lat: {route.endLat}, Lng: {route.endLng}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Status</p>
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(route.status)}`}>
              {route.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Bus className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Operator</p>
              <p className="text-sm text-gray-600">{route.operator}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Intermediate Stops</p>
              <p className="text-sm text-gray-600">{route.intermediateStops.length} stops</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Active Schedules</p>
              <p className="text-sm text-gray-600">{route.scheduleCount} schedules</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Last Updated</p>
              <p className="text-sm text-gray-600">{route.lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
