'use client';

import { Calendar, Bus, AlertTriangle, CheckCircle } from 'lucide-react';
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

interface WeeklyTripsViewProps {
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

export function WeeklyTripsView({
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
}: WeeklyTripsViewProps) {
  // Get the start of the week for the selected date (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Generate the 7 days of the week
  const generateWeekDays = () => {
    const weekStart = getWeekStart(selectedDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const weekDays = generateWeekDays();

  // Get route name for a given route ID
  const getRouteName = (routeId: string) => {
    for (const group of routeGroups) {
      const route = group.routes?.find((r) => r.id === routeId);
      if (route) return route.name;
    }
    return 'Unknown Route';
  };

  // Get trips for a specific date
  const getTripsForDate = (date: Date) => {
    return trips.filter((trip) => {
      const tripDate = new Date(trip.tripDate);
      const matchesDate = tripDate.toDateString() === date.toDateString();
      const matchesRoute = selectedRoute
        ? trip.routeId === selectedRoute
        : true;
      return matchesDate && matchesRoute;
    });
  };

  // Format week range
  const formatWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} - ${end.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`;
  };

  // Navigate weeks
  const goToPreviousWeek = () => {
    const prevWeek = new Date(selectedDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    onDateChange(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    onDateChange(nextWeek);
  };

  if (isLoadingTrips) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading weekly trips...</span>
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
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousWeek}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Previous Week
        </button>

        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {formatWeekRange()}
          </h3>
          <button
            onClick={handleDatePickerClick}
            className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
          >
            <Calendar className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={goToNextWeek}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Next Week
        </button>
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

      {/* Weekly Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayTrips = getTripsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = day.toDateString() === selectedDate.toDateString();
          const assignedTrips = dayTrips.filter((trip) => trip.assigned);
          const unassignedTrips = dayTrips.filter((trip) => !trip.assigned);

          return (
            <div
              key={index}
              onClick={() => onDateChange(day)}
              className={`min-h-32 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : isToday
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
              }`}
            >
              <div className="text-center mb-2">
                <div className="text-xs font-medium text-gray-500">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isSelected
                      ? 'text-green-700'
                      : isToday
                      ? 'text-blue-700'
                      : 'text-gray-900'
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>

              <div className="space-y-1">
                {dayTrips.length === 0 ? (
                  <div className="text-center py-2">
                    <div className="text-xs text-gray-400">No trips</div>
                  </div>
                ) : (
                  <>
                    {assignedTrips.length > 0 && (
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-green-700 font-medium">
                          {assignedTrips.length}
                        </span>
                      </div>
                    )}
                    {unassignedTrips.length > 0 && (
                      <div className="flex items-center justify-center space-x-1 text-xs">
                        <AlertTriangle className="h-3 w-3 text-orange-600" />
                        <span className="text-orange-700 font-medium">
                          {unassignedTrips.length}
                        </span>
                      </div>
                    )}

                    {/* Show a few trip times if available */}
                    <div className="space-y-1 mt-2">
                      {dayTrips.slice(0, 2).map((trip, tripIndex) => (
                        <div
                          key={tripIndex}
                          className={`text-xs px-1 py-0.5 rounded ${
                            trip.assigned
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                          title={`${getRouteName(trip.routeId)} - ${
                            trip.departureTime
                          }`}
                        >
                          {trip.departureTime}
                        </div>
                      ))}
                      {dayTrips.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayTrips.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary for selected day */}
      {selectedDate && (
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-900 mb-2">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}{' '}
            Summary
          </h4>

          {(() => {
            const selectedDayTrips = getTripsForDate(selectedDate);
            const assignedCount = selectedDayTrips.filter(
              (trip) => trip.assigned
            ).length;
            const unassignedCount = selectedDayTrips.filter(
              (trip) => !trip.assigned
            ).length;

            if (selectedDayTrips.length === 0) {
              return (
                <p className="text-gray-500 text-sm">
                  No trips scheduled for this day
                </p>
              );
            }

            return (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-medium">
                    {assignedCount} Assigned
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-700 font-medium">
                    {unassignedCount} Unassigned
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
