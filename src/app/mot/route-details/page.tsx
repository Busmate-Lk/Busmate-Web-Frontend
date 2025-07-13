'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, Bus, Calendar, Navigation, Route as RouteIcon } from 'lucide-react';

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
}

interface Schedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  busNumber: string;
  driverName: string;
  status: 'Active' | 'Delayed' | 'Cancelled';
  frequency: string;
}

export default function RouteDetailsPage() {
  const [activeTab, setActiveTab] = useState<'details' | 'stops' | 'schedules'>('details');
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const routeId = searchParams.get('id');

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

  // Mock route data - in real app, this would come from API based on routeId
  const mockRoute: Route = {
    id: routeId || '1',
    routeName: 'Colombo - Galle Express',
    routeNumber: '001',
    group: 'Main Routes',
    stopsCount: 8,
    status: 'Active',
    operator: 'Lanka Bus Services',
    distance: '119 km',
    estimatedTime: '2h 30m',
    scheduleCount: 3,
    lastUpdated: '2024-12-15',
    stops: ['Colombo Fort', 'Bambalapitiya', 'Wellawatte', 'Mount Lavinia', 'Kalutara', 'Bentota', 'Hikkaduwa', 'Galle'],
  };

  useEffect(() => {
    // Simulate API call to fetch route data
    const fetchRouteData = async () => {
      setLoading(true);
      // In real app, make API call here using routeId
      setTimeout(() => {
        setRoute(mockRoute);
        setLoading(false);
      }, 500);
    };

    if (routeId) {
      fetchRouteData();
    } else {
      // If no routeId, redirect to routes list or show error
      router.push('/mot/bus-routes');
    }
  }, [routeId, router]);

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

  const handleBack = () => {
    router.back();
  };

  const handleEditRoute = () => {
    // Navigate to edit route page
    router.push(`/mot/bus-routes/edit?id=${routeId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading route details...</p>
        </div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Route not found</h2>
          <p className="text-gray-600 mb-4">The requested route could not be found.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{route.routeName}</h1>
                <p className="text-sm text-gray-600">Route #{route.routeNumber} • {route.group}</p>
              </div>
            </div>
            <button
              onClick={handleEditRoute}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Route
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
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
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Route Information</h3>
                    
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
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Status</p>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(route.status)}`}>
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
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Route Map Preview</h3>
                  <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg text-gray-500 mb-2">Interactive map view coming soon</p>
                      <p className="text-sm text-gray-400">Route visualization with stops and real-time tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stops' && (
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Stop Order & Timing</h3>
                
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
                        {detailedStops.map((stop) => (
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
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-900">Attached Schedules</h3>
                  <span className="text-sm text-gray-600">{schedules.length} active schedules</span>
                </div>
                
                <div className="grid gap-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <span className="text-base font-medium text-gray-900">
                              {schedule.departureTime} - {schedule.arrivalTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bus className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-600">{schedule.busNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-600">{schedule.driverName}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                            {schedule.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
                        <span>Frequency: {schedule.frequency}</span>
                        <span>Duration: {route.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {schedules.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-500 mb-2">No schedules attached to this route</p>
                    <p className="text-sm text-gray-400">Add schedules to start operations</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
