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
  const dateScrollRef = useRef<HTMLDivElement>(null);

  // Generate dates for the horizontal bar (7 days before and after selected date)
  const generateDates = () => {
    const dates = [];
    const baseDate = new Date(selectedDate);
    
    for (let i = -7; i <= 7; i++) {
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
        date => date.toDateString() === selectedDate.toDateString()
      );
      
      if (selectedIndex !== -1) {
        const dateElement = dateScrollRef.current.children[selectedIndex] as HTMLElement;
        if (dateElement) {
          dateElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'center' 
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
    day: 'numeric'
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

  // Filter trips based on selected route
  const filteredTrips = trips.filter(trip => 
    !selectedRoute || trip.routeId === selectedRoute
  );

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="w-2/4 bg-white p-6 border-r border-gray-100 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trip Schedule</h2>
          <p className="text-sm text-gray-500 mt-1">Manage daily trip assignments</p>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-2">
          <button
            onClick={goToPreviousDay}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2 px-3 py-1">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-800 min-w-[200px] text-center">{formattedDate}</span>
          </div>
          <button
            onClick={goToNextDay}
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-600 hover:text-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Date Navigation Bar */}
      <div className="mb-8">
        <div 
          ref={dateScrollRef}
          className="flex space-x-3 overflow-x-auto scrollbar-hide pb-3"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 min-w-[90px] p-4 rounded-xl cursor-pointer text-center transition-all duration-300 shadow-sm hover:shadow-md
                ${isSelected(date) 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                  : isToday(date)
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700'
                }
              `}
              onClick={() => onDateChange(date)}
            >
              <div className={`text-xs font-semibold ${isSelected(date) ? 'text-blue-100' : 'text-gray-500'}`}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-xl font-bold mt-1">
                {date.getDate()}
              </div>
              <div className={`text-xs mt-1 ${isSelected(date) ? 'text-blue-100' : 'text-gray-500'}`}>
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className={`
                border rounded-xl p-5 cursor-pointer transition-all duration-300 
                ${selectedTrip === trip.id ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg transform scale-[1.02]' : 'border-gray-200 hover:border-gray-300'} 
                ${trip.assigned ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-white hover:bg-gray-50'}
                shadow-sm hover:shadow-md
              `}
              onClick={() => onTripSelect(trip.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="font-bold text-xl text-gray-800">
                      {trip.departureTime}
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="font-bold text-xl text-gray-800">
                      {trip.arrivalTime}
                    </div>
                  </div>
                  
                  {trip.assigned ? (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Bus className="h-4 w-4" />
                        <span>{trip.busNumber}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">PSP:</span> {trip.pspId}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        Unassigned
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Route:</span> {routeGroups.find(g => g.routes.some(r => r.id === trip.routeId))?.routes.find(r => r.id === trip.routeId)?.name}
                  </div>
                </div>
                
                {selectedTrip === trip.id && (
                  <div className="ml-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedRoute ? "No trips available" : "Select a route"}
            </h3>
            <p className="text-gray-500">
              {selectedRoute 
                ? "No trips are scheduled for the selected route on this date"
                : "Choose a route from the left panel to view available trips"}
            </p>
          </div>
        )}
      </div>

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
    </div>
  );
}