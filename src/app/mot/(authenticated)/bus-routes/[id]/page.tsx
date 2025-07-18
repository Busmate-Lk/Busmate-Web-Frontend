'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, Bus, Calendar, Navigation, Route as RouteIcon, Edit, Save, X } from 'lucide-react';
import { Layout } from '@/components/shared/layout';

interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  group: string;
  stopsCount: number;
  status: 'Active' | 'Inactive' | 'Maintenance';
  operator: string;
  distance: string;
  estimatedTime: string;
  scheduleCount: number;
  lastUpdated: string;
  stops: string[];
  description?: string;
  frequency?: string;
  operatingDays?: string[];
}

interface Stop {
  id: string;
  name: string;
  order: number;
  arrivalTime: string;
  departureTime: string;
  distance: string;
  coordinates?: { lat: number; lng: number };
}

interface Schedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  busNumber: string;
  driverName: string;
  status: 'Active' | 'Delayed' | 'Cancelled';
  frequency: string;
  operatingDays: string[];
}

export default function SingleRouteViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeId = searchParams.get('id');
  
  const [activeTab, setActiveTab] = useState<'details' | 'stops' | 'schedules'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);
  const [editedRoute, setEditedRoute] = useState<Route | null>(null);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    const mockRoute: Route = {
      id: routeId || '1',
      routeName: 'Colombo - Galle Express',
      routeNumber: '001A',
      group: 'Express Routes',
      stopsCount: 15,
      status: 'Active',
      operator: 'Ceylon Transport Board',
      distance: '119 km',
      estimatedTime: '2h 30m',
      scheduleCount: 8,
      lastUpdated: '2024-01-15',
      stops: ['Colombo Fort', 'Mount Lavinia', 'Kalutara', 'Bentota', 'Hikkaduwa', 'Galle'],
      description: 'Express service connecting Colombo with the southern coastal city of Galle, serving major tourist destinations along the way.',
      frequency: 'Every 30 minutes during peak hours',
      operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    };
    
    setRoute(mockRoute);
    setEditedRoute(mockRoute);
  }, [routeId]);

  const stops: Stop[] = [
    { id: '1', name: 'Colombo Fort', order: 1, arrivalTime: '06:00', departureTime: '06:05', distance: '0 km' },
    { id: '2', name: 'Bambalapitiya', order: 2, arrivalTime: '06:15', departureTime: '06:17', distance: '5 km' },
    { id: '3', name: 'Wellawatte', order: 3, arrivalTime: '06:25', departureTime: '06:27', distance: '8 km' },
    { id: '4', name: 'Mount Lavinia', order: 4, arrivalTime: '06:35', departureTime: '06:40', distance: '12 km' },
    { id: '5', name: 'Kalutara', order: 5, arrivalTime: '07:20', departureTime: '07:25', distance: '45 km' },
    { id: '6', name: 'Bentota', order: 6, arrivalTime: '07:50', departureTime: '07:52', distance: '65 km' },
    { id: '7', name: 'Hikkaduwa', order: 7, arrivalTime: '08:15', departureTime: '08:17', distance: '85 km' },
    { id: '8', name: 'Galle', order: 8, arrivalTime: '08:30', departureTime: '-', distance: '119 km' },
  ];

  const schedules: Schedule[] = [
    {
      id: '1',
      departureTime: '06:00',
      arrivalTime: '08:30',
      busNumber: 'BUS-001',
      driverName: 'John Silva',
      status: 'Active',
      frequency: 'Daily',
      operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      id: '2',
      departureTime: '08:00',
      arrivalTime: '10:30',
      busNumber: 'BUS-002',
      driverName: 'Mary Fernando',
      status: 'Active',
      frequency: 'Daily',
      operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      id: '3',
      departureTime: '10:00',
      arrivalTime: '12:30',
      busNumber: 'BUS-003',
      driverName: 'David Perera',
      status: 'Delayed',
      frequency: 'Daily',
      operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
  ];

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

  const handleSave = () => {
    if (editedRoute) {
      setRoute(editedRoute);
      setIsEditing(false);
      // In real app, would make API call here
    }
  };

  const handleCancel = () => {
    setEditedRoute(route);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: RouteIcon },
    { id: 'stops', label: 'Stop Order', icon: MapPin },
    { id: 'schedules', label: 'Schedules Attached', icon: Calendar },
  ];

  if (!route) {
    return (
      <Layout activeItem="bus-routes" pageTitle="Route Details" pageDescription="Loading route information..." role="mot">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="bus-routes" pageTitle="Route Details" pageDescription={`Manage ${route.routeName}`} role="mot">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Routes
            </button>
            <div className="h-6 border-l border-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{route.routeName}</h1>
              <p className="text-gray-600">Route #{route.routeNumber} • {route.group}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="h-4 w-4" />
                Edit Route
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Stops</p>
                <p className="text-xl font-semibold text-gray-900">{route.stopsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <Navigation className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="text-xl font-semibold text-gray-900">{route.distance}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-xl font-semibold text-gray-900">{route.estimatedTime}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Schedules</p>
                <p className="text-xl font-semibold text-gray-900">{route.scheduleCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Route Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedRoute?.routeName || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, routeName: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{route.routeName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Route Number</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedRoute?.routeNumber || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, routeNumber: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{route.routeNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedRoute?.operator || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, operator: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{route.operator}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        {isEditing ? (
                          <textarea
                            value={editedRoute?.description || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, description: e.target.value} : null)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{route.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Performance */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Status & Performance</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        {isEditing ? (
                          <select
                            value={editedRoute?.status || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, status: e.target.value as any} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                        ) : (
                          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(route.status)}`}>
                            {route.status}
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                        <p className="text-gray-900">{route.distance}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                        <p className="text-gray-900">{route.estimatedTime}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedRoute?.frequency || ''}
                            onChange={(e) => setEditedRoute(prev => prev ? {...prev, frequency: e.target.value} : null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{route.frequency}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                        <p className="text-gray-900">{route.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Map Preview</h3>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border border-gray-200">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 font-medium">Interactive Map View</p>
                      <p className="text-sm text-gray-400">Route visualization with real-time tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stops' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Stop Order & Timing</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Edit className="h-4 w-4" />
                    Edit Stops
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stops.map((stop) => (
                        <tr key={stop.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                              <span className="text-sm font-medium text-blue-600">{stop.order}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{stop.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{stop.arrivalTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {stop.departureTime === '-' ? 'Final Stop' : stop.departureTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{stop.distance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'schedules' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Attached Schedules ({schedules.length})</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Calendar className="h-4 w-4" />
                    Add Schedule
                  </button>
                </div>
                
                <div className="grid gap-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {schedule.departureTime} - {schedule.arrivalTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bus className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{schedule.busNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{schedule.driverName}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(schedule.status)}`}>
                          {schedule.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Frequency: {schedule.frequency}</span>
                        <span>Duration: {route.estimatedTime}</span>
                        <span>Days: {schedule.operatingDays.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
