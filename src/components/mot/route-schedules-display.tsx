"use client";

import { Clock, Bus, Calendar } from 'lucide-react';

interface Schedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  busType: string;
  frequency: string;
  operatingDays: string[];
  busNumber?: string;
  driverName?: string;
  status?: 'Active' | 'Delayed' | 'Cancelled';
}

interface RouteSchedulesDisplayProps {
  route: {
    schedules: Schedule[];
    estimatedTravelTime: string;
  };
  formatOperatingDays: (days: string[]) => string;
  getStatusColor: (status: string) => string;
}

export function RouteSchedulesDisplay({ 
  route, 
  formatOperatingDays, 
  getStatusColor 
}: RouteSchedulesDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-gray-900">Attached Schedules</h3>
        <span className="text-sm text-gray-600">{route.schedules.length} active schedules</span>
      </div>
      
      <div className="grid gap-4">
        {route.schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-base font-medium text-gray-900">
                    {schedule.departureTime} - {schedule.arrivalTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600 capitalize">{schedule.busType}</span>
                </div>
                {schedule.busNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{schedule.busNumber}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {schedule.status && (
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Frequency</p>
                <p className="text-gray-600 capitalize">{schedule.frequency}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Operating Days</p>
                <p className="text-gray-600">{formatOperatingDays(schedule.operatingDays)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Duration</p>
                <p className="text-gray-600">{route.estimatedTravelTime}</p>
              </div>
              {schedule.driverName && (
                <div>
                  <p className="font-medium text-gray-700">Driver</p>
                  <p className="text-gray-600">{schedule.driverName}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {route.schedules.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-500 mb-2">No schedules attached to this route</p>
          <p className="text-sm text-gray-400">Add schedules to start operations</p>
        </div>
      )}
    </div>
  );
}
