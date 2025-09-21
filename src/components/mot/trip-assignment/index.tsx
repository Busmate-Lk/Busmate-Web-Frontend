'use client';

import { useState, useEffect } from 'react';
import { RoutesList } from './RoutesList';
import { TripsCalendar } from './TripsCalendar';
import { PSPList } from './PSPList';
import { RouteManagementService } from '@/lib/api-client/route-management/services/RouteManagementService';
import { PermitManagementService } from '@/lib/api-client/route-management/services/PermitManagementService';
import { TripManagementService } from '@/lib/api-client/route-management/services/TripManagementService';
import type { RouteGroupResponse } from '@/lib/api-client/route-management/models/RouteGroupResponse';
import type { PassengerServicePermitResponse } from '@/lib/api-client/route-management/models/PassengerServicePermitResponse';
import type { TripResponse } from '@/lib/api-client/route-management/models/TripResponse';

// Update Trip interface to match TripResponse structure
interface Trip {
  id: string;
  routeId: string;
  tripDate: string;
  departureTime: string;
  arrivalTime: string;
  busPlateNumber?: string;
  status: string;
  passengerServicePermitId?: string;
  assigned: boolean;
}

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
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  const [isLoadingPsps, setIsLoadingPsps] = useState(true);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [routesError, setRoutesError] = useState<string | null>(null);
  const [pspsError, setPspsError] = useState<string | null>(null);
  const [tripsError, setTripsError] = useState<string | null>(null);
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

    // Load trips
    const loadTrips = async () => {
      try {
        setIsLoadingTrips(true);
        setTripsError(null);
        const response = await TripManagementService.getAllTrips();
        
        // Transform TripResponse to Trip interface
        const transformedTrips: Trip[] = response.map((tripResponse: TripResponse) => ({
          id: tripResponse.id || '',
          routeId: tripResponse.routeId || '',
          tripDate: tripResponse.tripDate || '',
          departureTime: tripResponse.scheduledDepartureTime || '',
          arrivalTime: tripResponse.scheduledArrivalTime || '',
          busPlateNumber: tripResponse.busPlateNumber,
          status: tripResponse.status || 'Unknown',
          passengerServicePermitId: tripResponse.passengerServicePermitId,
          assigned: !!tripResponse.passengerServicePermitId
        }));
        
        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips:', error);
        setTripsError('Failed to load trips. Please try again.');
      } finally {
        setIsLoadingTrips(false);
      }
    };

    loadRouteGroups();
    loadPsps();
    loadTrips();
  }, []);

  // Load trips by date range for better performance (reload when date changes)
  useEffect(() => {
    const loadTripsByDateRange = async () => {
      try {
        setIsLoadingTrips(true);
        setTripsError(null);
        
        // Calculate date range based on selected date (±7 days for daily view context)
        const startDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - 7);
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 7);
        
        const response = await TripManagementService.getTripsByDateRange(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        );
        
        // Transform TripResponse to Trip interface
        const transformedTrips: Trip[] = response.map((tripResponse: TripResponse) => ({
          id: tripResponse.id || '',
          routeId: tripResponse.routeId || '',
          tripDate: tripResponse.tripDate || '',
          departureTime: tripResponse.scheduledDepartureTime || '',
          arrivalTime: tripResponse.scheduledArrivalTime || '',
          busPlateNumber: tripResponse.busPlateNumber,
          status: tripResponse.status || 'Unknown',
          passengerServicePermitId: tripResponse.passengerServicePermitId,
          assigned: !!tripResponse.passengerServicePermitId
        }));
        
        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips by date range:', error);
        setTripsError('Failed to load trips for selected date range. Please try again.');
      } finally {
        setIsLoadingTrips(false);
      }
    };

    // Only load trips by date range after initial load, when date changes, and when no specific route is selected
    if (routeGroups.length > 0 && !selectedRoute) {
      loadTripsByDateRange();
    }
  }, [selectedDate, routeGroups, selectedRoute]);

  // Load trips by route when a specific route is selected
  useEffect(() => {
    const loadTripsByRoute = async () => {
      if (!selectedRoute) return;
      
      try {
        setIsLoadingTrips(true);
        setTripsError(null);
        
        const response = await TripManagementService.getTripsByRoute(selectedRoute);
        
        // Transform TripResponse to Trip interface
        const transformedTrips: Trip[] = response.map((tripResponse: TripResponse) => ({
          id: tripResponse.id || '',
          routeId: tripResponse.routeId || '',
          tripDate: tripResponse.tripDate || '',
          departureTime: tripResponse.scheduledDepartureTime || '',
          arrivalTime: tripResponse.scheduledArrivalTime || '',
          busPlateNumber: tripResponse.busPlateNumber,
          status: tripResponse.status || 'Unknown',
          passengerServicePermitId: tripResponse.passengerServicePermitId,
          assigned: !!tripResponse.passengerServicePermitId
        }));
        
        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips by route:', error);
        setTripsError('Failed to load trips for selected route. Please try again.');
      } finally {
        setIsLoadingTrips(false);
      }
    };

    // Load trips by route when a specific route is selected
    if (selectedRoute && routeGroups.length > 0) {
      loadTripsByRoute();
    } else if (!selectedRoute) {
      // Clear trips when no route is selected
      setTrips([]);
    }
  }, [selectedRoute, routeGroups]);

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
          isLoadingTrips={isLoadingTrips}
          tripsError={tripsError}
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
