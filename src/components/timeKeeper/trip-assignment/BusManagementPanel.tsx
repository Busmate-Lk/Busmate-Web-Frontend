'use client';

import {
  Search,
  Bus,
  XCircle,
  Plus,
  AlertTriangle,
  CheckCircle,
  Users,
} from 'lucide-react';
import type { PassengerServicePermitResponse } from '@/lib/api-client/route-management/models/PassengerServicePermitResponse';
import type { RouteGroupResponse } from '@/lib/api-client/route-management/models/RouteGroupResponse';

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

interface BusManagementPanelProps {
  availablePsps: PassengerServicePermitResponse[];
  trips: Trip[];
  routeGroups: RouteGroupResponse[];
  selectedTrip: string | null;
  selectedRoute: string | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRemovePermit: (tripId: string) => void;
  onAssignPermit: (tripId: string, pspId: string) => void;
  isLoading?: boolean;
  error?: string | null;
  isProcessing?: boolean;
}

export function BusManagementPanel({
  availablePsps,
  trips,
  routeGroups,
  selectedTrip,
  selectedRoute,
  searchValue,
  onSearchChange,
  onRemovePermit,
  onAssignPermit,
  isLoading = false,
  error = null,
  isProcessing = false,
}: BusManagementPanelProps) {
  // Get the selected trip details
  const selectedTripData = selectedTrip
    ? trips.find((trip) => trip.id === selectedTrip)
    : null;

  // Filter PSPs based on search input
  const filteredPSPs = selectedRoute
    ? availablePsps.filter((psp) => {
        const matchesSearch =
          psp.permitNumber?.toLowerCase().includes(searchValue.toLowerCase()) ||
          psp.operatorName?.toLowerCase().includes(searchValue.toLowerCase());
        return matchesSearch;
      })
    : [];

  // Get route name for display
  const getRouteName = (routeId: string) => {
    for (const group of routeGroups) {
      const route = group.routes?.find((r) => r.id === routeId);
      if (route) return route.name;
    }
    return 'Unknown Route';
  };

  // Check if PSP is available for assignment
  const isPspAvailable = (psp: PassengerServicePermitResponse) => {
    return (psp.maximumBusAssigned || 0) > 0;
  };

  if (isLoading) {
    return (
      <div className="w-1/5 bg-white p-6 overflow-y-auto border-l border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bus Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage bus assignments for trips
          </p>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-1/5 bg-white p-6 overflow-y-auto border-l border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bus Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage bus assignments for trips
          </p>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">⚠️ Error</div>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/5 bg-white p-6 overflow-y-auto border-l border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bus Management
        </h2>
        <p className="text-sm text-gray-500">
          Handle bus unavailability and reassignments
        </p>
      </div>

      {/* Selected Trip Info */}
      {selectedTripData ? (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Bus className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Selected Trip</h3>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Route:</span>
              <div className="font-medium">
                {getRouteName(selectedTripData.routeId)}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Time:</span>
              <div className="font-medium">
                {selectedTripData.departureTime} -{' '}
                {selectedTripData.arrivalTime}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>
              <div className="font-medium">
                {new Date(selectedTripData.tripDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Current Assignment Status */}
          {selectedTripData.assigned ? (
            <div className="mt-4 pt-3 border-t border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Currently Assigned
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-600">Bus:</span>
                  <span className="ml-1 font-medium">
                    {selectedTripData.busPlateNumber || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Operator:</span>
                  <span className="ml-1 font-medium">
                    {selectedTripData.operatorName || 'N/A'}
                  </span>
                </div>
                {selectedTripData.permitNumber && (
                  <div>
                    <span className="text-gray-600">Permit:</span>
                    <span className="ml-1 font-medium">
                      {selectedTripData.permitNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* Remove Permit Button */}
              <button
                onClick={() => onRemovePermit(selectedTripData.id)}
                disabled={isProcessing}
                className="mt-3 w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="h-4 w-4" />
                <span>
                  {isProcessing ? 'Removing...' : 'Remove Bus (Unavailable)'}
                </span>
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  Unassigned
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Select an available bus below to assign to this trip.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <Bus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Select a trip to manage its bus assignment
          </p>
        </div>
      )}

      {/* Available Buses Section */}
      {selectedRoute && (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Available Buses
            </h3>
            <p className="text-sm text-gray-500">
              Route-permitted buses available for assignment
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by permit or operator..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Available PSPs List */}
          <div className="space-y-3">
            {filteredPSPs.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Bus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm">
                  {searchValue
                    ? 'No buses found matching your search'
                    : 'No available buses for this route'}
                </p>
              </div>
            ) : (
              filteredPSPs.map((psp) => (
                <div
                  key={psp.id}
                  className={`p-3 border-2 rounded-lg transition-all duration-200 ${
                    isPspAvailable(psp)
                      ? 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {psp.permitNumber}
                      </div>
                      <div className="text-xs text-gray-500">
                        {psp.operatorName}
                      </div>
                    </div>

                    {isPspAvailable(psp) && (
                      <div className="flex items-center space-x-1 text-xs">
                        <Users className="h-3 w-3 text-green-600" />
                        <span className="text-green-700 font-medium">
                          {psp.maximumBusAssigned} available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Valid: {psp.issueDate} - {psp.expiryDate}
                    </div>

                    {selectedTrip &&
                      !selectedTripData?.assigned &&
                      isPspAvailable(psp) && (
                        <button
                          onClick={() =>
                            psp.id && onAssignPermit(selectedTrip, psp.id)
                          }
                          disabled={isProcessing}
                          className="flex items-center space-x-1 px-2 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-3 w-3" />
                          <span>
                            {isProcessing ? 'Assigning...' : 'Assign'}
                          </span>
                        </button>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {!selectedRoute && (
        <div className="text-center py-8 text-gray-500">
          <Bus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm">Select a route to view available buses</p>
        </div>
      )}
    </div>
  );
}
