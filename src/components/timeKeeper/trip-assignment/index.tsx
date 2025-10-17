'use client';

import { useState, useEffect } from 'react';
import { RoutesList } from './RoutesList';
import { TripsCalendar } from './TripsCalendar';
import { BusManagementPanel } from './BusManagementPanel';
import { RouteManagementService } from '@/lib/api-client/route-management/services/RouteManagementService';
import { PermitManagementService } from '@/lib/api-client/route-management/services/PermitManagementService';
import { TripManagementService } from '@/lib/api-client/route-management/services/TripManagementService';
import type { RouteGroupResponse } from '@/lib/api-client/route-management/models/RouteGroupResponse';
import type { PassengerServicePermitResponse } from '@/lib/api-client/route-management/models/PassengerServicePermitResponse';
import type { TripResponse } from '@/lib/api-client/route-management/models/TripResponse';

// Trip interface to match the expected structure
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
  operatorName?: string;
  permitNumber?: string;
}

export function TripAssignment() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [routeSearch, setRouteSearch] = useState('');
  const [busSearch, setBusSearch] = useState('');

  // API data state
  const [routeGroups, setRouteGroups] = useState<RouteGroupResponse[]>([]);
  const [availablePsps, setAvailablePsps] = useState<
    PassengerServicePermitResponse[]
  >([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  const [isLoadingPsps, setIsLoadingPsps] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [routesError, setRoutesError] = useState<string | null>(null);
  const [pspsError, setPspsError] = useState<string | null>(null);
  const [tripsError, setTripsError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (actionError) {
      const timer = setTimeout(() => setActionError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionError]);

  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => setActionSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionSuccess]);

  // Load initial data
  useEffect(() => {
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

    const loadTrips = async () => {
      try {
        setIsLoadingTrips(true);
        setTripsError(null);
        const response = await TripManagementService.getAllTrips(0, 100); // Get first 100 trips

        // Transform TripResponse to Trip interface with additional permit info
        const transformedTrips: Trip[] = await Promise.all(
          (response.content || []).map(async (tripResponse: TripResponse) => {
            let operatorName = '';
            let permitNumber = '';

            // If trip has a permit assigned, get permit details
            if (tripResponse.passengerServicePermitId) {
              try {
                const permit = await PermitManagementService.getPermitById(
                  tripResponse.passengerServicePermitId
                );
                operatorName = permit.operatorName || '';
                permitNumber = permit.permitNumber || '';
              } catch (error) {
                console.warn(
                  'Failed to load permit details for trip:',
                  tripResponse.id
                );
              }
            }

            return {
              id: tripResponse.id || '',
              routeId: tripResponse.routeId || '',
              tripDate: tripResponse.tripDate || '',
              departureTime: tripResponse.scheduledDepartureTime || '',
              arrivalTime: tripResponse.scheduledArrivalTime || '',
              busPlateNumber: tripResponse.busPlateNumber,
              status: tripResponse.status || 'Unknown',
              passengerServicePermitId: tripResponse.passengerServicePermitId,
              assigned: !!tripResponse.passengerServicePermitId,
              operatorName,
              permitNumber,
            };
          })
        );

        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips:', error);
        setTripsError('Failed to load trips. Please try again.');
      } finally {
        setIsLoadingTrips(false);
      }
    };

    loadRouteGroups();
    loadTrips();
  }, []);

  // Load trips by date range when date changes
  useEffect(() => {
    const loadTripsByDateRange = async () => {
      try {
        setIsLoadingTrips(true);
        setTripsError(null);

        const startDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - 7);
        const endDate = new Date(selectedDate);
        endDate.setDate(endDate.getDate() + 7);

        const response = await TripManagementService.getTripsByDateRange(
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        );

        // Transform with permit details
        const transformedTrips: Trip[] = await Promise.all(
          response.map(async (tripResponse: TripResponse) => {
            let operatorName = '';
            let permitNumber = '';

            if (tripResponse.passengerServicePermitId) {
              try {
                const permit = await PermitManagementService.getPermitById(
                  tripResponse.passengerServicePermitId
                );
                operatorName = permit.operatorName || '';
                permitNumber = permit.permitNumber || '';
              } catch (error) {
                console.warn(
                  'Failed to load permit details for trip:',
                  tripResponse.id
                );
              }
            }

            return {
              id: tripResponse.id || '',
              routeId: tripResponse.routeId || '',
              tripDate: tripResponse.tripDate || '',
              departureTime: tripResponse.scheduledDepartureTime || '',
              arrivalTime: tripResponse.scheduledArrivalTime || '',
              busPlateNumber: tripResponse.busPlateNumber,
              status: tripResponse.status || 'Unknown',
              passengerServicePermitId: tripResponse.passengerServicePermitId,
              assigned: !!tripResponse.passengerServicePermitId,
              operatorName,
              permitNumber,
            };
          })
        );

        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips by date range:', error);
        setTripsError(
          'Failed to load trips for selected date range. Please try again.'
        );
      } finally {
        setIsLoadingTrips(false);
      }
    };

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

        const response = await TripManagementService.getTripsByRoute(
          selectedRoute
        );

        // Transform with permit details
        const transformedTrips: Trip[] = await Promise.all(
          response.map(async (tripResponse: TripResponse) => {
            let operatorName = '';
            let permitNumber = '';

            if (tripResponse.passengerServicePermitId) {
              try {
                const permit = await PermitManagementService.getPermitById(
                  tripResponse.passengerServicePermitId
                );
                operatorName = permit.operatorName || '';
                permitNumber = permit.permitNumber || '';
              } catch (error) {
                console.warn(
                  'Failed to load permit details for trip:',
                  tripResponse.id
                );
              }
            }

            return {
              id: tripResponse.id || '',
              routeId: tripResponse.routeId || '',
              tripDate: tripResponse.tripDate || '',
              departureTime: tripResponse.scheduledDepartureTime || '',
              arrivalTime: tripResponse.scheduledArrivalTime || '',
              busPlateNumber: tripResponse.busPlateNumber,
              status: tripResponse.status || 'Unknown',
              passengerServicePermitId: tripResponse.passengerServicePermitId,
              assigned: !!tripResponse.passengerServicePermitId,
              operatorName,
              permitNumber,
            };
          })
        );

        setTrips(transformedTrips);
      } catch (error) {
        console.error('Error loading trips by route:', error);
        setTripsError(
          'Failed to load trips for selected route. Please try again.'
        );
      } finally {
        setIsLoadingTrips(false);
      }
    };

    if (selectedRoute && routeGroups.length > 0) {
      loadTripsByRoute();
    } else if (!selectedRoute) {
      setTrips([]);
    }
  }, [selectedRoute, routeGroups]);

  // Load available PSPs by route group when a specific route is selected
  useEffect(() => {
    const loadAvailablePspsByRouteGroup = async () => {
      if (!selectedRoute) return;

      try {
        setIsLoadingPsps(true);
        setPspsError(null);

        const routeGroup = routeGroups.find((group) =>
          group.routes?.some((route) => route.id === selectedRoute)
        );

        if (!routeGroup?.id) {
          setPspsError('Route group not found for selected route.');
          return;
        }

        const response = await PermitManagementService.getPermitsByRouteGroupId(
          routeGroup.id
        );
        // Filter to only show PSPs that are available (not at max capacity)
        const availablePsps = response.filter(
          (psp) => (psp.maximumBusAssigned || 0) > 0
        );
        setAvailablePsps(availablePsps);
      } catch (error) {
        console.error('Error loading available PSPs by route group:', error);
        setPspsError(
          'Failed to load available permits for selected route. Please try again.'
        );
      } finally {
        setIsLoadingPsps(false);
      }
    };

    if (selectedRoute && routeGroups.length > 0) {
      loadAvailablePspsByRouteGroup();
    } else if (!selectedRoute) {
      setAvailablePsps([]);
    }
  }, [selectedRoute, routeGroups]);

  // Handle trip selection
  const handleTripSelect = (tripId: string) => {
    setSelectedTrip(tripId === selectedTrip ? null : tripId);
  };

  // Handle route selection
  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    setSelectedTrip(null);
  };

  // Handle removing permit from trip (bus unavailable)
  const handleRemovePermit = async (tripId: string) => {
    try {
      setIsProcessingAction(true);
      setActionError(null);

      // Call API to remove PSP assignment from trip
      await TripManagementService.removePassengerServicePermitFromTrip(tripId);

      // Refresh trips data
      await refreshTripsData();

      setActionSuccess(
        'Permit removed successfully. Trip is now available for reassignment.'
      );
      setSelectedTrip(null);
    } catch (error) {
      console.error('Error removing permit from trip:', error);
      setActionError('Failed to remove permit from trip. Please try again.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Handle assigning new permit to trip
  const handleAssignPermit = async (tripId: string, pspId: string) => {
    try {
      setIsProcessingAction(true);
      setActionError(null);

      // Call API to assign PSP to trip
      await TripManagementService.assignPassengerServicePermitToTrip(
        tripId,
        pspId
      );

      // Refresh trips data
      await refreshTripsData();

      setActionSuccess('Bus assigned successfully to the trip.');
      setSelectedTrip(null);
    } catch (error) {
      console.error('Error assigning permit to trip:', error);
      setActionError('Failed to assign bus to trip. Please try again.');
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Helper function to refresh trips data
  const refreshTripsData = async () => {
    if (selectedRoute) {
      const response = await TripManagementService.getTripsByRoute(
        selectedRoute
      );

      const transformedTrips = await Promise.all(
        response.map(async (tripResponse: TripResponse) => {
          let operatorName = '';
          let permitNumber = '';

          if (tripResponse.passengerServicePermitId) {
            try {
              const permit = await PermitManagementService.getPermitById(
                tripResponse.passengerServicePermitId
              );
              operatorName = permit.operatorName || '';
              permitNumber = permit.permitNumber || '';
            } catch (error) {
              console.warn(
                'Failed to load permit details for trip:',
                tripResponse.id
              );
            }
          }

          return {
            id: tripResponse.id || '',
            routeId: tripResponse.routeId || '',
            tripDate: tripResponse.tripDate || '',
            departureTime: tripResponse.scheduledDepartureTime || '',
            arrivalTime: tripResponse.scheduledArrivalTime || '',
            busPlateNumber: tripResponse.busPlateNumber,
            status: tripResponse.status || 'Unknown',
            passengerServicePermitId: tripResponse.passengerServicePermitId,
            assigned: !!tripResponse.passengerServicePermitId,
            operatorName,
            permitNumber,
          };
        })
      );

      setTrips(transformedTrips);
    }
  };

  return (
    <div className="flex h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="flex w-full max-w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Success/Error Messages */}
        {(actionSuccess || actionError) && (
          <div className="absolute top-4 right-4 z-50 max-w-md">
            {actionSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-2">
                {actionSuccess}
              </div>
            )}
            {actionError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {actionError}
              </div>
            )}
          </div>
        )}

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

        <BusManagementPanel
          availablePsps={availablePsps}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          selectedRoute={selectedRoute}
          searchValue={busSearch}
          onSearchChange={setBusSearch}
          onRemovePermit={handleRemovePermit}
          onAssignPermit={handleAssignPermit}
          isLoading={isLoadingPsps}
          error={pspsError}
          isProcessing={isProcessingAction}
        />
      </div>
    </div>
  );
}
