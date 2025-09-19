'use client';

import { Grid, List } from 'lucide-react';
import { useRef, useState } from 'react';
import { DailyTripsView } from './DailyTripsView';
import { WeeklyTripsView } from './WeeklyTripsView';

interface Trip {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  pspId: string | null;
  busNumber: string | null;
  assigned: boolean;
}

interface RouteGroup {
  id: string;
  name: string;
  routes: Array<{ id: string; name: string; direction: string }>;
}

interface TripsCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  trips: Trip[];
  routeGroups: RouteGroup[];
  selectedTrip: string | null;
  onTripSelect: (tripId: string) => void;
  selectedRoute: string | null;
}

export function TripsCalendar({
  selectedDate,
  onDateChange,
  trips,
  routeGroups,
  selectedTrip,
  onTripSelect,
  selectedRoute,
}: TripsCalendarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');

  // Handle date picker
  const handleDatePickerClick = () => {
    setShowDatePicker(true);
    setTimeout(() => {
      if (datePickerRef.current) {
        datePickerRef.current.showPicker();
      }
    }, 0);
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onDateChange(newDate);
    setShowDatePicker(false);
  };

  // Format date for input value (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-2/4 bg-white p-6 border-r border-gray-100 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trip Schedule</h2>
          <p className="text-sm text-gray-500 mt-1">
            {viewMode === 'weekly' ? 'Weekly trip assignments overview' : 'Manage daily trip assignments'}
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('daily')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'daily'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List className="h-4 w-4" />
            <span>Daily</span>
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              viewMode === 'weekly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Weekly</span>
          </button>
        </div>
      </div>

      {/* Render appropriate view based on mode */}
      {viewMode === 'daily' ? (
        <DailyTripsView
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          onTripSelect={onTripSelect}
          selectedRoute={selectedRoute}
          showDatePicker={showDatePicker}
          datePickerRef={datePickerRef}
          handleDatePickerClick={handleDatePickerClick}
          handleDatePickerChange={handleDatePickerChange}
          formatDateForInput={formatDateForInput}
        />
      ) : (
        <WeeklyTripsView
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          onTripSelect={onTripSelect}
          selectedRoute={selectedRoute}
          showDatePicker={showDatePicker}
          datePickerRef={datePickerRef}
          handleDatePickerClick={handleDatePickerClick}
          handleDatePickerChange={handleDatePickerChange}
          formatDateForInput={formatDateForInput}
        />
      )}
    </div>
  );
}