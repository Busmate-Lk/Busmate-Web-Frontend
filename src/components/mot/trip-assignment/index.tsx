'use client';

import { useState, useEffect } from 'react';
import { RoutesList } from './RoutesList';
import { TripsCalendar } from './TripsCalendar';
import { PSPList } from './PSPList';
import { RouteManagementService } from '@/lib/api-client/route-management/services/RouteManagementService';
import { PermitManagementService } from '@/lib/api-client/route-management/services/PermitManagementService';
import type { RouteGroupResponse } from '@/lib/api-client/route-management/models/RouteGroupResponse';
import type { PassengerServicePermitResponse } from '@/lib/api-client/route-management/models/PassengerServicePermitResponse';

export function TripAssignment() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [routeSearch, setRouteSearch] = useState('');
  const [pspSearch, setPspSearch] = useState('');
  
  // API data state
  const [routeGroups, setRouteGroups] = useState<RouteGroupResponse[]>([]);
  const [psps, setPsps] = useState<PassengerServicePermitResponse[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  const [isLoadingPsps, setIsLoadingPsps] = useState(true);
  const [routesError, setRoutesError] = useState<string | null>(null);
  const [pspsError, setPspsError] = useState<string | null>(null);
  // Load data from APIs
  useEffect(() => {
    // Load route groups
    const loadRouteGroups = async () => {
      try {
        setIsLoadingRoutes(true);
        setRoutesError(null);
        const response = await RouteManagementService.getAllRouteGroupsAsList();
        setRouteGroups(response);
      } catch (error) {
        console.error('Error loading route groups:', error);
        setRoutesError('Failed to load routes. Please try again.');
      } finally {
        setIsLoadingRoutes(false);
      }
    };

    // Load PSPs
    const loadPsps = async () => {
      try {
        setIsLoadingPsps(true);
        setPspsError(null);
        const response = await PermitManagementService.getAllPermits();
        setPsps(response);
      } catch (error) {
        console.error('Error loading PSPs:', error);
        setPspsError('Failed to load permits. Please try again.');
      } finally {
        setIsLoadingPsps(false);
      }
    };

    loadRouteGroups();
    loadPsps();
  }, []);

  // Dummy data for UI development (keeping trips for now as requested)
  const trips = [
    { 
      id: 't1', 
      routeId: 'r1', 
      departureTime: '08:30', 
      arrivalTime: '12:00', 
      pspId: 'PSP001', 
      busNumber: 'BUS-123',
      assigned: true
    },
    { 
      id: 't2', 
      routeId: 'r1', 
      departureTime: '10:30', 
      arrivalTime: '14:00', 
      pspId: null, 
      busNumber: null,
      assigned: false
    },
    { 
      id: 't3', 
      routeId: 'r2', 
      departureTime: '09:00', 
      arrivalTime: '12:30', 
      pspId: 'PSP002', 
      busNumber: 'BUS-456',
      assigned: true
    }
  ];

  // Handle trip selection
  const handleTripSelect = (tripId: string) => {
    setSelectedTrip(tripId === selectedTrip ? null : tripId);
  };

  // Handle route selection - clear selected trip when route changes
  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    setSelectedTrip(null); // Clear selected trip when route changes
  };

  // Handle PSP assignment
  const handleAssignPsp = (pspId: string) => {
    if (!selectedTrip) return;
    
    // In a real app, this would make an API call to update the trip
    console.log(`Assigning PSP ${pspId} to Trip ${selectedTrip}`);
    
    // For demo purposes, we'll update our local state
    // In a real app, this would be handled by refreshing from the API
    setSelectedTrip(null);
  };

  return (
    <div className="flex h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="flex w-full max-w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <RoutesList 
          routeGroups={routeGroups}
          selectedRoute={selectedRoute}
          onRouteSelect={handleRouteSelect}
          searchValue={routeSearch}
          onSearchChange={setRouteSearch}
          isLoading={isLoadingRoutes}
          error={routesError}
        />
        
        <TripsCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          onTripSelect={handleTripSelect}
          selectedRoute={selectedRoute}
        />
        
        <PSPList
          psps={psps}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          selectedRoute={selectedRoute}
          searchValue={pspSearch}
          onSearchChange={setPspSearch}
          onAssignPsp={handleAssignPsp}
          isLoading={isLoadingPsps}
          error={pspsError}
        />
      </div>
    </div>
  );
}
