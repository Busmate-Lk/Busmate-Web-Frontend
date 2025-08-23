'use client';

import { useState } from 'react';
import { X, MapPin, Clock, Users, Bus, Calendar, Navigation, Route as RouteIcon } from 'lucide-react';
import { BusRoute } from '@/components/mot/bus-routes-table';

interface Schedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  busNumber: string;
  driverName: string;
  status: 'Active' | 'Delayed' | 'Cancelled';
  frequency: string;
}

interface RouteDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  route: BusRoute | null;
}

export function RouteDetailsModal({ isOpen, onClose, route }: RouteDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'stops' | 'schedules'>('details');

  // Mock data for schedules
  const schedules: Schedule[] = [
    {
      id: '1',
      departureTime: '06:00',
      arrivalTime: '08:30',
      busNumber: 'BUS-001',
      driverName: 'John Silva',
      status: 'Active',
      frequency: 'Daily',
    },
    {
      id: '2',
      departureTime: '08:00',
      arrivalTime: '10:30',
      busNumber: 'BUS-002',
      driverName: 'Mary Fernando',
      status: 'Active',
      frequency: 'Daily',
    },
    {
      id: '3',
      departureTime: '10:00',
      arrivalTime: '12:30',
      busNumber: 'BUS-003',
      driverName: 'David Perera',
      status: 'Delayed',
      frequency: 'Daily',
    },
  ];

  // Mock detailed stops data
  const detailedStops = [
    { id: '1', name: 'Colombo Fort', order: 1, arrivalTime: '06:00', departureTime: '06:05', distance: '0 km' },
    { id: '2', name: 'Bambalapitiya', order: 2, arrivalTime: '06:15', departureTime: '06:17', distance: '5 km' },
    { id: '3', name: 'Wellawatte', order: 3, arrivalTime: '06:25', departureTime: '06:27', distance: '8 km' },
    { id: '4', name: 'Mount Lavinia', order: 4, arrivalTime: '06:35', departureTime: '06:40', distance: '12 km' },
    { id: '5', name: 'Kalutara', order: 5, arrivalTime: '07:20', departureTime: '07:25', distance: '45 km' },
    { id: '6', name: 'Bentota', order: 6, arrivalTime: '07:50', departureTime: '07:52', distance: '65 km' },
    { id: '7', name: 'Hikkaduwa', order: 7, arrivalTime: '08:15', departureTime: '08:17', distance: '85 km' },
    { id: '8', name: 'Galle', order: 8, arrivalTime: '08:30', departureTime: '-', distance: '119 km' },
  ];

  if (!isOpen || !route) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: RouteIcon },
    { id: 'stops', label: 'Stop Order', icon: MapPin },
    { id: 'schedules', label: 'Schedules Attached', icon: Calendar },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{route.routeName}</h2>
            <p className="text-sm text-gray-600">Route #{route.routeNumber} • {route.group}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Route Information</h3>
                  
                  <div className="space-y-3">
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
                        <p className="text-sm font-medium text-gray-900">Operator</p>
                        <p className="text-sm text-gray-600">{route.operator}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Distance</p>
                        <p className="text-sm text-gray-600">{route.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Estimated Time</p>
                        <p className="text-sm text-gray-600">{route.estimatedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Status & Statistics</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                        {route.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Total Stops</p>
                        <p className="text-sm text-gray-600">{route.stopsCount} stops</p>
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

              {/* Map Preview Placeholder */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Route Map Preview</h3>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Interactive map view coming soon</p>
                    <p className="text-sm text-gray-400">Route visualization with stops and real-time tracking</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stops' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Stop Order & Timing</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stop Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Arrival Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Departure Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Distance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {detailedStops.map((stop, index) => (
                        <tr key={stop.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">{stop.order}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{stop.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{stop.arrivalTime}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {stop.departureTime === '-' ? 'Final Stop' : stop.departureTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{stop.distance}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Attached Schedules</h3>
                <span className="text-sm text-gray-600">{schedules.length} active schedules</span>
              </div>
              
              <div className="grid gap-4">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {schedule.departureTime} - {schedule.arrivalTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bus className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{schedule.busNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{schedule.driverName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>Frequency: {schedule.frequency}</span>
                      <span>Duration: {route.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              {schedules.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No schedules attached to this route</p>
                  <p className="text-sm text-gray-400">Add schedules to start operations</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Route
          </button>
        </div>
      </div>
    </div>
  );
}
