'use client';

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bus,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
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

interface DailyTripsViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  trips: Trip[];
  routeGroups: RouteGroupResponse[];
  selectedTrip: string | null;
  onTripSelect: (tripId: string) => void;
  selectedRoute: string | null;
  showDatePicker: boolean;
  datePickerRef: React.RefObject<HTMLInputElement | null>;
  handleDatePickerClick: () => void;
  handleDatePickerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatDateForInput: (date: Date) => string;
  isLoadingTrips?: boolean;
  tripsError?: string | null;
}

export function DailyTripsView({
  selectedDate,
  onDateChange,
  trips,
  routeGroups,
  selectedTrip,
  onTripSelect,
  selectedRoute,
  showDatePicker,
  datePickerRef,
  handleDatePickerClick,
  handleDatePickerChange,
  formatDateForInput,
  isLoadingTrips,
  tripsError,
}: DailyTripsViewProps) {
  const dateScrollRef = useRef<HTMLDivElement>(null);

  // Generate dates for the horizontal bar (7 days before and after selected date)
  const generateDates = () => {
    const dates = [];
    const baseDate = new Date(selectedDate);

    for (let i = -6; i <= 6; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  // Auto-scroll to selected date when it changes
  useEffect(() => {
    if (dateScrollRef.current) {
      const selectedIndex = dates.findIndex(
        (date) => date.toDateString() === selectedDate.toDateString()
      );

      if (selectedIndex !== -1) {
        const dateElement = dateScrollRef.current.children[
          selectedIndex
        ] as HTMLElement;
        if (dateElement) {
          dateElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }
    }
  }, [selectedDate, dates]);

  // Format date for display
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Handle date navigation
  const goToPreviousDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate);
  };

  // Filter trips for selected date and route
  const filteredTrips = trips.filter((trip) => {
    const tripDate = new Date(trip.tripDate);
    const matchesDate = tripDate.toDateString() === selectedDate.toDateString();
    const matchesRoute = selectedRoute ? trip.routeId === selectedRoute : true;
    return matchesDate && matchesRoute;
  });

  // Get route name for a given route ID
  const getRouteName = (routeId: string) => {
    for (const group of routeGroups) {
      const route = group.routes?.find((r) => r.id === routeId);
      if (route) return route.name;
    }
    return 'Unknown Route';
  };

  // Status badge component for trips
  const getStatusBadge = (trip: Trip) => {
    if (trip.assigned) {
      return (
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">Assigned</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <span className="text-xs font-medium text-orange-700">
            Unassigned
          </span>
        </div>
      );
    }
  };

  if (isLoadingTrips) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading trips...</span>
        </div>
      </div>
    );
  }

  if (tripsError) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-2">⚠️ Error</div>
          <p className="text-sm text-gray-600">{tripsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {formattedDate}
          </h3>
          <button
            onClick={handleDatePickerClick}
            className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
          >
            <Calendar className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={goToNextDay}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Horizontal Date Selector */}
      <div
        ref={dateScrollRef}
        className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {dates.map((date, index) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              className={`flex-shrink-0 text-center p-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                  : isToday
                  ? 'border-blue-200 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-xs font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold">{date.getDate()}</div>
              <div className="text-xs">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Hidden date picker input */}
      {showDatePicker && (
        <input
          ref={datePickerRef}
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={handleDatePickerChange}
          className="absolute -left-96 opacity-0 pointer-events-none"
        />
      )}

      {/* Trips List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-semibold text-gray-900">
            Scheduled Trips{' '}
            {selectedRoute && `for ${getRouteName(selectedRoute)}`}
          </h4>
          <div className="text-sm text-gray-500">
            {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Bus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              {selectedRoute
                ? 'No trips scheduled for this route on the selected date'
                : 'No trips scheduled for the selected date'}
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => onTripSelect(trip.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedTrip === trip.id
                    ? 'border-green-500 bg-green-50 shadow-md transform scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm hover:bg-green-25'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Bus
                      className={`h-5 w-5 ${
                        selectedTrip === trip.id
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {getRouteName(trip.routeId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Trip ID: {trip.id}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(trip)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Departure:</span>
                    <div className="font-medium">{trip.departureTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Arrival:</span>
                    <div className="font-medium">{trip.arrivalTime}</div>
                  </div>
                </div>

                {trip.assigned && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Bus:</span>
                        <span className="ml-1 font-medium">
                          {trip.busPlateNumber || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Operator:</span>
                        <span className="ml-1 font-medium">
                          {trip.operatorName || 'N/A'}
                        </span>
                      </div>
                    </div>
                    {trip.permitNumber && (
                      <div className="text-xs text-gray-500 mt-1">
                        Permit: {trip.permitNumber}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
