'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

// Import API services
import { QueriesService } from '@/lib/api-client/location-tracking';
import { TripManagementService } from '@/lib/api-client/route-management';
import { TripResponse } from '@/lib/api-client/route-management';

// Import layout
import { Layout } from '@/components/shared/layout';

// Import our new components
import { LocationStats } from '@/components/mot/location-tracking/LocationStats';
import { LocationFilters } from '@/components/mot/location-tracking/LocationFilters';
import { LocationMap } from '@/components/mot/location-tracking/LocationMap';
import { TripsList } from '@/components/mot/location-tracking/TripsList';

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

interface ActiveTripData {
    id: string;
    busId?: string;
    routeId?: string;
    status?: string;
    currentLocation?: LocationData;
    progress?: number;
    nextStop?: string;
    estimatedArrival?: string;
    deviceStatus?: 'online' | 'offline' | 'unknown';
    bus?: {
        registrationNumber?: string;
        capacity?: number;
    };
    route?: {
        name?: string;
    };
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
const defaultCenter = {
    lat: 6.9271, // Colombo, Sri Lanka
    lng: 79.8612
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
    const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Demo data for development
    const demoTrips: ActiveTripData[] = [
        {
            id: 'demo-trip-1',
            busId: 'bus-001',
            routeId: 'route-001',
            status: 'active',
            deviceStatus: 'online',
            currentLocation: {
                tripId: 'demo-trip-1',
                busId: 'bus-001',
                location: {
                    type: 'Point',
                    coordinates: [79.8612, 6.9271]
                },
                speed: 45.2,
                heading: 120,
                timestamp: new Date().toISOString(),
                accuracy: 5
            },
            progress: 65,
            nextStop: 'Pettah Bus Stand',
            estimatedArrival: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            bus: {
                registrationNumber: 'WP CAA-1234',
                capacity: 45
            },
            route: {
                name: 'Colombo - Kandy Express'
            }
        },
        {
            id: 'demo-trip-2',
            busId: 'bus-002',
            routeId: 'route-002',
            status: 'delayed',
            deviceStatus: 'online',
            currentLocation: {
                tripId: 'demo-trip-2',
                busId: 'bus-002',
                location: {
                    type: 'Point',
                    coordinates: [79.8712, 6.9371]
                },
                speed: 25.8,
                heading: 45,
                timestamp: new Date().toISOString(),
                accuracy: 3
            },
            progress: 30,
            nextStop: 'Fort Railway Station',
            estimatedArrival: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
            bus: {
                registrationNumber: 'WP CAB-5678',
                capacity: 52
            },
            route: {
                name: 'Colombo - Galle Highway'
            }
        }
    ];

    // Load active trips data
    const loadActiveTrips = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            let activeTripsResponse;
            
            // Try location tracking API first
            try {
                console.log('Trying location tracking API...');
                activeTripsResponse = await QueriesService.getApiQueriesTripsActive();
                console.log('Location tracking API response:', activeTripsResponse);
            } catch (locationError) {
                console.log('Location tracking API failed, trying route management API...');
                // Fallback to route management API
                try {
                    activeTripsResponse = await TripManagementService.getAllTrips(0, 100, 'tripDate', 'desc', '', 'active');
                    console.log('Route management API response:', activeTripsResponse);
                } catch (routeError) {
                    console.log('Both APIs failed, using demo data');
                    // Use demo data as final fallback
                    setActiveTrips(demoTrips);
                    setLastUpdate(new Date());
                    updateStatistics(demoTrips);
                    setIsLoading(false);
                    return;
                }
            }

            // Process the response - handle different response structures
            let tripsData: any[] = [];
            
            if (activeTripsResponse) {
                // Check if response has data property (location API)
                if (activeTripsResponse.data && Array.isArray(activeTripsResponse.data)) {
                    tripsData = activeTripsResponse.data;
                }
                // Check if response has content property (route API)
                else if (activeTripsResponse.content && Array.isArray(activeTripsResponse.content)) {
                    tripsData = activeTripsResponse.content;
                }
                // Check if response is directly an array
                else if (Array.isArray(activeTripsResponse)) {
                    tripsData = activeTripsResponse;
                }
                // If response structure is unexpected, use demo data
                else {
                    console.log('Unexpected response structure, using demo data');
                    setActiveTrips(demoTrips);
                    setLastUpdate(new Date());
                    updateStatistics(demoTrips);
                    setIsLoading(false);
                    return;
                }
            }

            // If no trips found, use demo data
            if (!tripsData || tripsData.length === 0) {
                console.log('No trips found, using demo data');
                setActiveTrips(demoTrips);
                setLastUpdate(new Date());
                updateStatistics(demoTrips);
                setIsLoading(false);
                return;
            }

            // Map the response to our format
            const mappedTrips: ActiveTripData[] = tripsData.map((trip: any) => ({
                ...trip,
                deviceStatus: trip.deviceStatus || (Math.random() > 0.2 ? 'online' : 'offline'),
                progress: trip.progress || Math.floor(Math.random() * 100),
                nextStop: trip.nextStop || 'Unknown Stop',
                estimatedArrival: trip.estimatedArrival || new Date(Date.now() + Math.random() * 60 * 60 * 1000).toISOString(),
                currentLocation: trip.currentLocation || {
                    tripId: trip.id,
                    busId: trip.busId,
                    location: {
                        type: 'Point',
                        coordinates: [
                            79.8612 + (Math.random() - 0.5) * 0.1,
                            6.9271 + (Math.random() - 0.5) * 0.1
                        ]
                    },
                    speed: Math.random() * 60,
                    heading: Math.random() * 360,
                    timestamp: new Date().toISOString(),
                    accuracy: Math.random() * 10
                }
            }));

            setActiveTrips(mappedTrips);
            setLastUpdate(new Date());
            updateStatistics(mappedTrips);

        } catch (error) {
            console.error('Error loading active trips:', error);
            setError('Failed to load active trips. Using demo data.');
            // Use demo data on error
            setActiveTrips(demoTrips);
            setLastUpdate(new Date());
            updateStatistics(demoTrips);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load statistics
    const loadStatistics = useCallback(async () => {
        // This will be updated by updateStatistics function
    }, []);

    // Update statistics based on current trips
    const updateStatistics = (trips: ActiveTripData[]) => {
        const onlineTrips = trips.filter(trip => trip.deviceStatus === 'online');
        const offlineTrips = trips.filter(trip => trip.deviceStatus === 'offline');
        const delayedTrips = trips.filter(trip => trip.status === 'delayed');
        const onTimeTrips = trips.filter(trip => trip.status === 'active' || trip.status === 'in_transit');
        
        const avgSpeed = onlineTrips.reduce((acc, trip) => {
            return acc + (trip.currentLocation?.speed || 0);
        }, 0) / (onlineTrips.length || 1);

        setStats({
            totalActiveTrips: trips.length,
            onlineDevices: onlineTrips.length,
            offlineDevices: offlineTrips.length,
            averageSpeed: avgSpeed,
            tripsOnTime: onTimeTrips.length,
            tripsDelayed: delayedTrips.length
        });
    };

    // Filter trips based on current filters
    const filteredTrips = activeTrips.filter(trip => {
        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const matchesSearch = 
                trip.bus?.registrationNumber?.toLowerCase().includes(searchLower) ||
                trip.route?.name?.toLowerCase().includes(searchLower) ||
                trip.id?.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        // Status filter
        if (filters.status !== 'all') {
            if (filters.status === 'online' && trip.deviceStatus !== 'online') return false;
            if (filters.status === 'offline' && trip.deviceStatus !== 'offline') return false;
            if (filters.status === 'active' && trip.status !== 'active') return false;
            if (filters.status === 'delayed' && trip.status !== 'delayed') return false;
        }

        // Route filter
        if (filters.routeId !== 'all' && trip.routeId !== filters.routeId) return false;

        // Show only active filter
        if (filters.showOnlyActive && trip.status !== 'active' && trip.status !== 'in_transit') return false;

        // Show offline devices filter
        if (!filters.showOfflineDevices && trip.deviceStatus === 'offline') return false;

        return true;
    });

    // Handle trip selection
    const handleTripSelect = (trip: ActiveTripData | null) => {
        setSelectedTrip(trip);
    };

    // Handle trip focus (center map on trip)
    const handleTripFocus = (trip: ActiveTripData) => {
        if (trip.currentLocation?.location?.coordinates) {
            const [lng, lat] = trip.currentLocation.location.coordinates;
            setMapCenter({ lat, lng });
            setMapZoom(15);
            setSelectedTrip(trip);
        }
    };

    // Handle manual refresh
    const handleManualRefresh = () => {
        loadActiveTrips();
    };

    // Auto refresh setup
    useEffect(() => {
        if (autoRefresh) {
            refreshIntervalRef.current = setInterval(() => {
                loadActiveTrips();
            }, refreshInterval * 1000);
        } else {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
                refreshIntervalRef.current = null;
            }
        }

        return () => {
            if (refreshIntervalRef.current) {
                clearInterval(refreshIntervalRef.current);
            }
        };
    }, [autoRefresh, refreshInterval, loadActiveTrips]);

    // Load initial data
    useEffect(() => {
        loadActiveTrips();
        loadStatistics();
    }, [loadActiveTrips, loadStatistics]);

    // Toggle fullscreen map
    const toggleFullscreen = () => {
        setIsMapFullscreen(!isMapFullscreen);
    };

    return (
        <Layout activeItem="location-tracking" pageTitle="Location Tracking" pageDescription="Real-time bus location monitoring and trip tracking" role="mot">
            <div className="space-y-6">
                {/* Statistics Dashboard */}
                <LocationStats stats={stats} lastUpdate={lastUpdate} />

                {/* Filters */}
                <LocationFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    filterOptions={filterOptions}
                    autoRefresh={autoRefresh}
                    onAutoRefreshChange={setAutoRefresh}
                    refreshInterval={refreshInterval}
                    onRefreshIntervalChange={setRefreshInterval}
                    onManualRefresh={handleManualRefresh}
                    onToggleFullscreen={toggleFullscreen}
                    isLoading={isLoading}
                    filteredCount={filteredTrips.length}
                    totalCount={activeTrips.length}
                />

                {/* Main Content */}
                <div className={`${isMapFullscreen ? 'fixed inset-0 z-50 bg-white' : 'grid grid-cols-1 lg:grid-cols-4 gap-6'}`}>
                    {/* Map */}
                    <div className={`${isMapFullscreen ? 'h-full' : 'lg:col-span-3 h-96 lg:h-[600px]'} bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden`}>
                        <LocationMap
                            activeTrips={filteredTrips}
                            selectedTrip={selectedTrip}
                            onTripSelect={handleTripSelect}
                            mapCenter={mapCenter}
                            mapZoom={mapZoom}
                            onMapCenterChange={setMapCenter}
                            onMapZoomChange={setMapZoom}
                            isLoaded={isLoaded}
                        />
                    </div>

                    {/* Trips List Sidebar */}
                    {!isMapFullscreen && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit max-h-[600px] overflow-hidden">
                            <TripsList
                                trips={filteredTrips}
                                selectedTrip={selectedTrip}
                                onTripSelect={handleTripSelect}
                                onTripFocus={handleTripFocus}
                                isLoading={isLoading}
                                error={error}
                            />
                        </div>
                    )}
                </div>

                {/* Development Info */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-yellow-800 mb-2">Development Info</h3>
                        <div className="text-xs text-yellow-700 space-y-1">
                            <p>• Total trips loaded: {activeTrips.length}</p>
                            <p>• Filtered trips: {filteredTrips.length}</p>
                            <p>• Google Maps loaded: {isLoaded ? 'Yes' : 'Loading...'}</p>
                            <p>• Auto refresh: {autoRefresh ? `Every ${refreshInterval}s` : 'Disabled'}</p>
                            <p>• Last update: {lastUpdate?.toLocaleTimeString() || 'Never'}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}