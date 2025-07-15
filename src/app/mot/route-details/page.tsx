'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Layout } from "@/components/shared/layout";
import { RouteDetailsHeader } from "@/components/mot/route-details-header";
import { RouteTabNavigation } from "@/components/mot/route-tab-navigation";
import { RouteBasicInfo } from "@/components/mot/route-basic-info";
import { RoutePathVisualization } from "@/components/mot/route-path-visualization";
import { RouteStopsTable } from "@/components/mot/route-stops-table";
import { RoutePerformanceDisplay } from "@/components/mot/route-performance-display";
import { RouteSchedulesDisplay } from "@/components/mot/route-schedules-display";

interface IntermediateStop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  travelTimeFromPrevious: string; // Time taken to travel from previous stop (in minutes)
  sequence: number;
}

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

interface Route {
  id: string;
  // Basic Information
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
  // Performance Metrics
  totalDistance: string;
  estimatedTravelTime: string;
  averageSpeed: string;
  fuelConsumption: string;
  // Additional fields
  operator: string;
  scheduleCount: number;
  lastUpdated: string;
  // Intermediate stops
  intermediateStops: IntermediateStop[];
  // Schedules
  schedules: Schedule[];
}

export default function RouteDetailsPage() {
  const [activeTab, setActiveTab] = useState<'details' | 'stops' | 'schedules' | 'performance'>('details');
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const routeId = searchParams?.get('id');

  // Static route data (copied from bus-routes/page.tsx)
  const routes: Route[] = [
    {
      id: '1',
      routeName: 'Colombo - Galle Express',
      routeNumber: '001A',
      routeGroup: 'Express Routes',
      startingPoint: 'Colombo Fort',
      endPoint: 'Galle',
      startLat: '6.9271',
      startLng: '79.8612',
      endLat: '7.2906',
      endLng: '80.6337',
      status: 'Active',
      totalDistance: '119',
      estimatedTravelTime: '2h 30m',
      averageSpeed: '33.0',
      fuelConsumption: '8.5',
      operator: 'Lanka Bus Services',
      scheduleCount: 8,
      lastUpdated: '2024-01-15',
      intermediateStops: [
        { id: 1, name: 'Mount Lavinia', latitude: '', longitude: '', travelTimeFromPrevious: '20', sequence: 1 },
        { id: 2, name: 'Kalutara', latitude: '', longitude: '', travelTimeFromPrevious: '25', sequence: 2 },
        { id: 3, name: 'Bentota', latitude: '', longitude: '', travelTimeFromPrevious: '20', sequence: 3 },
        { id: 4, name: 'Hikkaduwa', latitude: '', longitude: '', travelTimeFromPrevious: '15', sequence: 4 },
      ],
      schedules: [
        {
          id: '1',
          departureTime: '06:00',
          arrivalTime: '09:30',
          busType: 'luxury',
          frequency: 'hourly',
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          busNumber: 'BUS-001',
          driverName: 'John Silva',
          status: 'Active',
        },
        {
          id: '2',
          departureTime: '14:00',
          arrivalTime: '17:30',
          busType: 'semi-luxury',
          frequency: '30min',
          operatingDays: ['saturday', 'sunday'],
          busNumber: 'BUS-002',
          driverName: 'Mary Fernando',
          status: 'Active',
        },
        {
          id: '3',
          departureTime: '10:00',
          arrivalTime: '13:30',
          busType: 'standard',
          frequency: 'hourly',
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          busNumber: 'BUS-003',
          driverName: 'David Perera',
          status: 'Delayed',
        },
      ],
    },
    {
      id: '2',
      routeName: 'Colombo - Kandy',
      routeNumber: '003',
      routeGroup: 'Long Distance Highway',
      startingPoint: 'Colombo Fort',
      endPoint: 'Kandy Central Bus Stand',
      startLat: '',
      startLng: '',
      endLat: '',
      endLng: '',
      status: 'Active',
      totalDistance: '115',
      estimatedTravelTime: '3h 15m',
      averageSpeed: '',
      fuelConsumption: '',
      operator: '',
      scheduleCount: 12,
      lastUpdated: '2024-01-14',
      intermediateStops: [
        { id: 1, name: 'Kadawatha', latitude: '', longitude: '', travelTimeFromPrevious: '30', sequence: 1 },
        { id: 2, name: 'Ambepussa', latitude: '', longitude: '', travelTimeFromPrevious: '40', sequence: 2 },
        { id: 3, name: 'Peradeniya', latitude: '', longitude: '', travelTimeFromPrevious: '25', sequence: 3 },
      ],
      schedules: [],
    },
    // ...add other routes as needed...
  ];

  useEffect(() => {
    setLoading(true);
    const fetchRouteData = async () => {
      // Simulate API call
      const foundRoute = routes.find(r => r.id === routeId);
      setTimeout(() => {
        setRoute(foundRoute || null);
        setLoading(false);
      }, 500);
    };
    if (routeId) {
      fetchRouteData();
    } else {
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

  const handleBack = () => {
    router.back();
  };

  const handleEditRoute = () => {
    // Navigate to edit route page with routeId parameter
    router.push(`/mot/route-form?routeId=${routeId}`);
  };

  const calculateTotalTravelTime = () => {
    if (!route) return 0;
    return route.intermediateStops.reduce((total, stop) => 
      total + (parseFloat(stop.travelTimeFromPrevious) || 0), 0
    );
  };

  const formatOperatingDays = (days: string[]) => {
    const dayNames = {
      monday: 'Mon',
      tuesday: 'Tue', 
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    };
    
    return days.map(day => dayNames[day as keyof typeof dayNames] || day).join(', ');
  };

  if (loading) {
    return (
      <Layout 
        activeItem="bus-routes" 
        pageTitle="Route Details" 
        pageDescription="Loading route information..."
        role="mot"
      >
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading route details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!route) {
    return (
      <Layout 
        activeItem="bus-routes" 
        pageTitle="Route Not Found" 
        pageDescription="The requested route could not be found"
        role="mot"
      >
        <div className="flex items-center justify-center min-h-96">
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
      </Layout>
    );
  }

  return (
    <Layout 
      activeItem="bus-routes" 
      pageTitle="Route Details" 
      pageDescription="View and manage route information"
      role="mot"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-routes")}
          >
            Routes Management
          </button>
          <span>/</span>
          <span>Route Details</span>
        </div>

        {/* Header */}
        <RouteDetailsHeader
          routeName={route.routeName}
          routeNumber={route.routeNumber}
          routeGroup={route.routeGroup}
          onBack={handleBack}
          onEdit={handleEditRoute}
        />

        {/* Header with Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <RouteTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <RouteBasicInfo route={route} />
              <RoutePathVisualization
                startingPoint={route.startingPoint}
                endPoint={route.endPoint}
                intermediateStops={route.intermediateStops}
              />
            </div>
          )}

          {activeTab === 'stops' && (
            <RouteStopsTable
              route={route}
              calculateTotalTravelTime={calculateTotalTravelTime}
            />
          )}

          {activeTab === 'performance' && (
            <RoutePerformanceDisplay
              route={route}
              calculateTotalTravelTime={calculateTotalTravelTime}
            />
          )}

          {activeTab === 'schedules' && (
            <RouteSchedulesDisplay
              route={route}
              formatOperatingDays={formatOperatingDays}
              getStatusColor={getStatusColor}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
