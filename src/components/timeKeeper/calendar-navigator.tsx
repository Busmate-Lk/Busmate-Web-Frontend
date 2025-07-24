'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CalendarNavigatorProps {
  onDateSelect?: (date: string) => void;
}

export function CalendarNavigator({ onDateSelect }: CalendarNavigatorProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateToSchedule = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    router.push(`/timeKeeper/schedule?date=${dateString}`);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date.toISOString().split('T')[0]);
    } else {
      navigateToSchedule(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const hasSchedules = (date: Date) => {
    // Mock logic to show which dates have schedules
    return date.getDay() !== 0; // No schedules on Sundays
  };

  const hasDelays = (date: Date) => {
    // Mock logic to show which dates have reported delays
    const today = new Date();
    return (
      date <= today &&
      date >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-800" />
          Schedule Calendar
        </h3>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h4 className="text-lg font-medium text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Days of Week Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="aspect-square">
            {date && (
              <button
                onClick={() => handleDateClick(date)}
                className={`w-full h-full flex flex-col items-center justify-center text-sm rounded-lg transition-colors relative ${
                  isToday(date)
                    ? 'bg-blue-800 text-white font-semibold'
                    : isSelected(date)
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="mb-1">{date.getDate()}</span>

                {/* Schedule indicators */}
                <div className="flex gap-1">
                  {hasSchedules(date) && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isToday(date) ? 'bg-white' : 'bg-green-500'
                      }`}
                      title="Has schedules"
                    />
                  )}
                  {hasDelays(date) && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isToday(date) ? 'bg-yellow-200' : 'bg-red-500'
                      }`}
                      title="Has delays reported"
                    />
                  )}
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="text-xs text-gray-500 text-center">
          Click on any date to view schedule details
        </div>
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Schedules</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Delays</span>
          </div>
        </div>
      </div>
    </div>
  );
}
