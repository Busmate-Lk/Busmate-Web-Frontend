'use client';

import { Calendar, ChevronLeft, ChevronRight, Bus } from 'lucide-react';
import { useRef, useEffect } from 'react';

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

interface WeeklyTripsViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  trips: Trip[];
  routeGroups: RouteGroup[];
  selectedTrip: string | null;
  onTripSelect: (tripId: string) => void;
  selectedRoute: string | null;
  showDatePicker: boolean;
  datePickerRef: React.RefObject<HTMLInputElement | null>;
  handleDatePickerClick: () => void;
  handleDatePickerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatDateForInput: (date: Date) => string;
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
}: WeeklyTripsViewProps) {
  const weekScrollRef = useRef<HTMLDivElement>(null);

  // Generate week dates for weekly view
  const generateWeekDates = () => {
    const weekDates = [];
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = startOfWeek.getDate() - day; // Calculate the difference to get to Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  const weekDates = generateWeekDates();

  // Generate weeks for navigation (3 weeks before and after current week)
  const generateWeeksForNavigation = () => {
    const weeks = [];
    const currentWeekStart = new Date(weekDates[0]); // Start of current week
    
    for (let i = -5; i <= 5; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(currentWeekStart.getDate() + (i * 7));
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      weeks.push({
        weekStart,
        weekEnd,
        weekNumber: getWeekNumber(weekStart),
        year: weekStart.getFullYear()
      });
    }
    
    return weeks;
  };

  // Calculate week number from date
  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const navigationWeeks = generateWeeksForNavigation();
  const currentWeekNumber = getWeekNumber(selectedDate);
  const currentYear = selectedDate.getFullYear();

  // Auto-scroll to selected week when it changes
  useEffect(() => {
    if (weekScrollRef.current) {
      const selectedIndex = navigationWeeks.findIndex(week =>
        isCurrentWeek(week.weekStart)
      );
      
      if (selectedIndex !== -1) {
        const weekElement = weekScrollRef.current.children[selectedIndex] as HTMLElement;
        if (weekElement) {
          weekElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'center' 
          });
        }
      }
    }
  }, [selectedDate, navigationWeeks]);

  // Format date for display
const formattedDate = `Week ${currentWeekNumber}, ${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${currentYear}`;

  // Handle date navigation
  const goToPreviousWeek = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 7); // Go back a week
    onDateChange(prevDate);
  };

  const goToNextWeek = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 7); // Go forward a week
    onDateChange(nextDate);
  };

  // Filter trips based on selected route
  const filteredTrips = selectedRoute 
    ? trips.filter(trip => trip.routeId === selectedRoute)
    : [];

  // Group trips by date for weekly view
  const getTripsForDate = (date: Date) => {
    // Only show trips if a route is selected
    if (!selectedRoute) return [];
    
    // For demo purposes, we'll show the same trips for all dates
    // In a real app, you would filter by actual trip dates
    return filteredTrips;
  };

  // Create unique trip identifier for weekly view (combines date and trip ID)
  const createWeeklyTripId = (date: Date, tripId: string) => {
    return `${date.toDateString()}-${tripId}`;
  };

  // Check if a specific day's trip is selected
  const isWeeklyTripSelected = (date: Date, tripId: string) => {
    const weeklyTripId = createWeeklyTripId(date, tripId);
    return selectedTrip === weeklyTripId;
  };

  // Handle trip selection for weekly view
  const handleWeeklyTripSelect = (date: Date, tripId: string) => {
    const weeklyTripId = createWeeklyTripId(date, tripId);
    onTripSelect(weeklyTripId);
  };

  const isCurrentWeek = (weekStart: Date) => {
    return weekStart.toDateString() === weekDates[0].toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <>
      {/* Date Navigation Header */}
      <div className="flex items-center justify-between space-x-3 bg-gray-50 rounded-xl p-2 mb-6">
        <button
          onClick={goToPreviousWeek}
          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-600 hover:text-gray-800"
          title="Previous week"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-2 px-3 py-1 relative">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span 
            className="font-semibold text-gray-800 min-w-[200px] text-center cursor-pointer hover:text-blue-600 transition-colors duration-200"
            onClick={handleDatePickerClick}
            title="Click to open date picker"
          >
            {formattedDate}
          </span>
          <input
            ref={datePickerRef}
            type="date"
            value={formatDateForInput(selectedDate)}
            onChange={handleDatePickerChange}
            className="absolute opacity-0 pointer-events-none"
            style={{ visibility: showDatePicker ? 'visible' : 'hidden' }}
          />
        </div>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-600 hover:text-gray-800"
          title="Next week"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Week Number Navigation Bar */}
      <div className="mb-8">
        <div 
          ref={weekScrollRef}
          className="flex justify-between overflow-x-auto scrollbar-hide pb-3"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {navigationWeeks.map((week, index) => (
            <div key={index} className="flex flex-col items-center mx-1"   >
                <div className={`${isCurrentWeek(week.weekStart) ? 'text-blue-600' : 'text-gray-500'}`}>
                    week
                </div>
                <div
                  key={index}
                  className={`
                    flex-shrink-0 w-12 h-12 p-2 rounded-full cursor-pointer flex flex-col items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md
                    ${isCurrentWeek(week.weekStart)
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transform scale-110'
                      : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-300'
                    }
                  `}
                  onClick={() => onDateChange(week.weekStart)}
                >
                  <div className="text-md font-bold">
                    {week.weekNumber}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trips Grid */}
      {selectedRoute ? (
        <div className="grid grid-cols-7 h-[calc(100vh-350px)]">
          {weekDates.map((date, dayIndex) => (
            <div key={dayIndex} className={`flex flex-col px-2 ${dayIndex === 6 ? '' : 'border-r border-gray-200'}`}>
              <div className="text-center mb-4 sticky top-0 bg-white z-10 pb-2">
                <div className="text-xs text-gray-500 font-medium">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto">
                {getTripsForDate(date).length > 0 ? (
                  getTripsForDate(date).map((trip) => (
                    <div
                      key={`${dayIndex}-${trip.id}`}
                      className={`
                        border rounded-lg p-3 cursor-pointer transition-all duration-300 text-sm
                        ${isWeeklyTripSelected(date, trip.id) ? 'border-blue-500 ring-2 ring-blue-100 shadow-md' : 'border-gray-200 hover:border-gray-300'} 
                        ${trip.assigned ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-white hover:bg-gray-50'}
                        shadow-sm hover:shadow-md
                      `}
                      onClick={() => handleWeeklyTripSelect(date, trip.id)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-800">
                            {trip.departureTime}
                          </div>
                          <div className="text-xs text-gray-500">
                            {trip.arrivalTime}
                          </div>
                        </div>
                        
                        {trip.assigned ? (
                          <div className="flex items-center space-x-1">
                            <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center space-x-1">
                              <Bus className="h-3 w-3" />
                              <span>{trip.busNumber}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium inline-block">
                            Unassigned
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Calendar className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-xs">No trips</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a route</h3>
          <p className="text-gray-500">
            Choose a route from the left panel to view weekly trip assignments
          </p>
        </div>
      )}

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}