'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/shared/layout';
import { 
  MapPin, 
  Bus, 
  Route, 
  Clock, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Pause,
  Play,
  RotateCcw,
  Search,
  Filter,
  Settings,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Navigation
} from 'lucide-react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { QueriesService, TripTrackingService, LocationService } from '@/lib/api-client/location-tracking';
import { TripManagementService, RouteManagementService } from '@/lib/api-client/route-management';
import type { TripResponse, RouteResponse } from '@/lib/api-client/route-management';

// Types for location tracking
interface LocationData {
  tripId: string;
  busId: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  speed?: number;
  heading?: number;
  timestamp: string;
  accuracy?: number;
}

interface ActiveTripData extends TripResponse {
  currentLocation?: LocationData;
  progress?: number;
  nextStop?: string;
  estimatedArrival?: string;
  deviceStatus?: 'online' | 'offline' | 'unknown';
}

interface FilterState {
  search: string;
  status: string;
  routeId: string;
  operatorId: string;
  showOnlyActive: boolean;
  showOfflineDevices: boolean;
}

// Google Maps configuration
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px'
};

const defaultCenter = {
  lat: 6.9271, // Colombo, Sri Lanka
  lng: 79.8612
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

export default function LocationTrackingPage() {
  // Google Maps API loader
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geometry', 'places']
  });

  // State management
  const [activeTrips, setActiveTrips] = useState<ActiveTripData[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<ActiveTripData | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    routeId: 'all',
    operatorId: 'all',
    showOnlyActive: true,
    showOfflineDevices: false
  });

  // Statistics
  const [stats, setStats] = useState({
    totalActiveTrips: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    averageSpeed: 0,
    tripsOnTime: 0,
    tripsDelayed: 0
  });

  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    routes: [] as Array<{ id: string; name: string }>
  });

  // Refs
  const mapRef = useRef<google.maps.Map | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load initial data and set up auto-refresh
  useEffect(() => {
    loadInitialData();
    loadFilterOptions();
    
    if (autoRefresh) {
      startAutoRefresh();
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval]);

  // Load initial data
  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await Promise.all([
        loadActiveTrips(),
        loadStatistics()
      ]);
      
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load location tracking data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load active trips with locations
  const loadActiveTrips = async () => {
    try {
      // Get active trips from location tracking service
      const activeTripsResponse = await QueriesService.getApiQueriesTripsActive();
      
      if (activeTripsResponse?.data) {
        const tripsWithLocation: ActiveTripData[] = await Promise.all(
          activeTripsResponse.data.map(async (trip: any) => {
            try {
              // Get current location for each trip
              const locationResponse = await QueriesService.getApiQueriesTripsCurrentLocation(trip.tripId);
              
              // Get trip progress
              const progressResponse = await QueriesService.getApiQueriesTripsProgress(trip.tripId);
              
              return {
                ...trip,
                currentLocation: locationResponse?.data?.location,
                progress: progressResponse?.data?.progress || 0,
                nextStop: progressResponse?.data?.nextStop,
                estimatedArrival: progressResponse?.data?.estimatedArrival,
                deviceStatus: locationResponse?.data?.deviceStatus || 'unknown'
              };
            } catch (err) {
              console.warn(`Failed to load location for trip ${trip.tripId}:`, err);
              return trip;
            }
          })
        );
        
        setActiveTrips(tripsWithLocation);
        
        // Auto-center map to show all trips
        if (tripsWithLocation.length > 0) {
          centerMapToTrips(tripsWithLocation);
        }
      }
    } catch (err) {
      console.error('Error loading active trips:', err);
      throw err;
    }
  };

  // Load filter options
  const loadFilterOptions = async () => {
    try {
      const routesResponse = await RouteManagementService.getAllRoutes(0, 100);

      setFilterOptions({
        routes: routesResponse?.content?.map(route => ({
          id: route.id!,
          name: `${route.name} (${route.routeGroupId || 'No Group'})`
        })) || []
      });
    } catch (err) {
      console.error('Error loading filter options:', err);
    }
  };

  // Load statistics
  const loadStatistics = async () => {
    try {
      const activeTrips = await QueriesService.getApiQueriesTripsActive();
      
      if (activeTrips?.data) {
        const onlineCount = activeTrips.data.filter((trip: any) => 
          trip.deviceStatus === 'online'
        ).length;
        
        const offlineCount = activeTrips.data.length - onlineCount;
        
        setStats({
          totalActiveTrips: activeTrips.data.length,
          onlineDevices: onlineCount,
          offlineDevices: offlineCount,
          averageSpeed: 0, // Calculate from location data
          tripsOnTime: 0, // Calculate based on schedule
          tripsDelayed: 0 // Calculate based on schedule
        });
      }
    } catch (err) {
      console.error('Error loading statistics:', err);
    }
  };

  // Auto-refresh functionality
  const startAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    
    refreshIntervalRef.current = setInterval(() => {
      loadActiveTrips();
      loadStatistics();
      setLastUpdate(new Date());
    }, refreshInterval * 1000);
  };

  // Center map to show all active trips
  const centerMapToTrips = (trips: ActiveTripData[]) => {
    if (!trips.length || !mapRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    
    trips.forEach(trip => {
      if (trip.currentLocation?.location?.coordinates) {
        const [lng, lat] = trip.currentLocation.location.coordinates;
        bounds.extend(new google.maps.LatLng(lat, lng));
      }
    });

    mapRef.current.fitBounds(bounds);
  };

  // Filter trips based on current filters
  const filteredTrips = activeTrips.filter(trip => {
    if (filters.search && !trip.id?.toLowerCase().includes(filters.search.toLowerCase()) &&
        !trip.busId?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    if (filters.status !== 'all' && trip.status !== filters.status) {
      return false;
    }
    
    if (filters.routeId !== 'all' && trip.routeId !== filters.routeId) {
      return false;
    }
    
    if (filters.showOnlyActive && trip.status !== 'active' && trip.status !== 'in_transit') {
      return false;
    }
    
    if (!filters.showOfflineDevices && trip.deviceStatus === 'offline') {
      return false;
    }
    
    return true;
  });

  // Get marker color based on trip status
  const getMarkerColor = (trip: ActiveTripData) => {
    if (trip.deviceStatus === 'offline') return '#9CA3AF'; // Gray
    
    switch (trip.status) {
      case 'active':
      case 'in_transit':
        return '#10B981'; // Green
      case 'delayed':
        return '#F59E0B'; // Amber
      case 'boarding':
        return '#3B82F6'; // Blue
      case 'departed':
        return '#8B5CF6'; // Purple
      default:
        return '#6B7280'; // Gray
    }
  };

  // Format time for display
  const formatTime = (date: Date | string | null) => {
    if (!date) return '--:--';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Handle trip selection
  const handleTripSelect = async (trip: ActiveTripData) => {
    setSelectedTrip(trip);
    
    // Center map on selected trip
    if (trip.currentLocation?.location?.coordinates) {
      const [lng, lat] = trip.currentLocation.location.coordinates;
      setMapCenter({ lat, lng });
      setMapZoom(15);
    }
  };

  if (!isLoaded) {
    return (
      <Layout activeItem="location-tracking" pageTitle="Location Tracking" role="mot">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeItem="location-tracking" pageTitle="Location Tracking" role="mot">
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Bus className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Active Trips</p>
                <p className="text-lg font-semibold">{stats.totalActiveTrips}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">Online Devices</p>
                <p className="text-lg font-semibold text-green-600">{stats.onlineDevices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-xs text-gray-600">Offline Devices</p>
                <p className="text-lg font-semibold text-red-600">{stats.offlineDevices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-600">On Time</p>
                <p className="text-lg font-semibold">{stats.tripsOnTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <div>
                <p className="text-xs text-gray-600">Delayed</p>
                <p className="text-lg font-semibold text-amber-600">{stats.tripsDelayed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Last Update</p>
                <p className="text-sm font-medium">{formatTime(lastUpdate)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
          {/* Sidebar - Trip List and Controls */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium">Controls</h3>
              </div>
              <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search trips or buses..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="in_transit">In Transit</option>
                    <option value="boarding">Boarding</option>
                    <option value="departed">Departed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>

                {/* Route Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <select
                    value={filters.routeId}
                    onChange={(e) => setFilters(prev => ({ ...prev, routeId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Routes</option>
                    {filterOptions.routes.map(route => (
                      <option key={route.id} value={route.id}>
                        {route.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="show-active" className="text-sm font-medium text-gray-700">Active Only</label>
                    <input
                      type="checkbox"
                      id="show-active"
                      checked={filters.showOnlyActive}
                      onChange={(e) => setFilters(prev => ({ ...prev, showOnlyActive: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="show-offline" className="text-sm font-medium text-gray-700">Show Offline</label>
                    <input
                      type="checkbox"
                      id="show-offline"
                      checked={filters.showOfflineDevices}
                      onChange={(e) => setFilters(prev => ({ ...prev, showOfflineDevices: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="auto-refresh" className="text-sm font-medium text-gray-700">Auto Refresh</label>
                    <input
                      type="checkbox"
                      id="auto-refresh"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={loadInitialData}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <RotateCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Active Trips List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium">
                  Active Trips ({filteredTrips.length})
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredTrips.map((trip) => (
                    <div
                      key={trip.id}
                      onClick={() => handleTripSelect(trip)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedTrip?.id === trip.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Bus className="h-4 w-4 text-gray-600" />
                          <span className="font-medium text-sm">{trip.busId || 'No Bus'}</span>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            trip.deviceStatus === 'online' ? 'bg-green-100 text-green-800' :
                            trip.deviceStatus === 'offline' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {trip.deviceStatus || 'Unknown'}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>Route:</span>
                          <span className="font-medium">{trip.routeId || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Status:</span>
                          <span className="px-2 py-0.5 text-xs rounded border border-gray-300">
                            {trip.status}
                          </span>
                        </div>
                        {trip.progress !== undefined && (
                          <div className="flex items-center justify-between">
                            <span>Progress:</span>
                            <span className="font-medium">{Math.round(trip.progress)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredTrips.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bus className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No active trips found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={`${isMapFullscreen ? 'fixed inset-0 z-50 bg-white' : 'lg:col-span-3'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Live Location Map</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => centerMapToTrips(filteredTrips)}
                      disabled={filteredTrips.length === 0}
                      className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Navigation className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                      className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                    >
                      {isMapFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%-4rem)] p-4">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={mapZoom}
                  options={mapOptions}
                  onLoad={(map) => {
                    mapRef.current = map;
                    centerMapToTrips(filteredTrips);
                  }}
                >
                  {/* Bus markers */}
                  {filteredTrips.map((trip) => {
                    if (!trip.currentLocation?.location?.coordinates) return null;

                    const [lng, lat] = trip.currentLocation.location.coordinates;
                    
                    return (
                      <Marker
                        key={trip.id}
                        position={{ lat, lng }}
                        onClick={() => handleTripSelect(trip)}
                        icon={{
                          path: google.maps.SymbolPath.CIRCLE,
                          scale: 8,
                          fillColor: getMarkerColor(trip),
                          fillOpacity: 0.8,
                          strokeColor: '#FFFFFF',
                          strokeWeight: 2,
                        }}
                      />
                    );
                  })}

                  {/* Info window for selected trip */}
                  {selectedTrip && selectedTrip.currentLocation?.location?.coordinates && (
                    <InfoWindow
                      position={{
                        lat: selectedTrip.currentLocation.location.coordinates[1],
                        lng: selectedTrip.currentLocation.location.coordinates[0]
                      }}
                      onCloseClick={() => setSelectedTrip(null)}
                    >
                      <div className="p-2 min-w-48">
                        <h3 className="font-semibold text-sm mb-2">
                          Bus {selectedTrip.busId || 'Unknown'}
                        </h3>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Trip ID:</span>
                            <span className="font-medium">{selectedTrip.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="px-2 py-0.5 text-xs rounded border border-gray-300">
                              {selectedTrip.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span className="font-medium">
                              {selectedTrip.currentLocation.speed?.toFixed(1) || '0'} km/h
                            </span>
                          </div>
                          {selectedTrip.progress !== undefined && (
                            <div className="flex justify-between">
                              <span>Progress:</span>
                              <span className="font-medium">{Math.round(selectedTrip.progress)}%</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Last Update:</span>
                            <span className="font-medium">
                              {formatTime(selectedTrip.currentLocation.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
              <button
                onClick={() => {
                  setError(null);
                  loadInitialData();
                }}
                className="ml-auto px-3 py-1 border border-red-300 rounded text-sm hover:bg-red-100"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}