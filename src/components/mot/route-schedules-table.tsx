'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Mock stop data for demonstration
interface Stop {
  name: string;
  time: string; // e.g., "10 min", "20 min"
}

interface Schedule {
  id: string;
  busNo: string;
  departure: string;
  arrival: string;
  operator: string;
  status: string;
  days?: string[];
  stops?: Stop[]; // Add stops to schedule
}

interface DirectionData {
  direction: string;
  schedules: Schedule[];
}

interface RouteData {
  routeName: string;
  forward: DirectionData;
  backward: DirectionData;
}

interface RouteSchedulesTableProps {
  routeData: RouteData;
  currentScheduleId: string;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
];

export function RouteSchedulesTable({
  routeData,
  currentScheduleId,
}: RouteSchedulesTableProps) {
  const router = useRouter();
  const params = useParams();
  const routeId = params?.routeId as string;
  const [selectedDay, setSelectedDay] = useState('monday');
  const [viewMode, setViewMode] = useState<'daily' | 'all'>('daily');
  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const handleAddSchedule = () => {
    router.push(`/mot/schedule-form?routeId=${routeId}`);
  };

  // Function to get schedules for a specific day
  const getSchedulesForDay = (schedules: Schedule[], day: string) => {
    return schedules.filter(
      (schedule) => schedule.days && schedule.days.includes(day)
    );
  };

  // Modal for stop list
  const renderStopListModal = () => {
    if (!showModal || !selectedSchedule) return null;
    const stops = selectedSchedule.stops || [
      { name: 'Stop 1', time: '10 min' },
      { name: 'Stop 2', time: '20 min' },
      { name: 'Stop 3', time: '35 min' },
    ]; // fallback mock stops

    // Helper to parse time string like "6:30" to minutes
    const parseTime = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };
    // Helper to format minutes to "HH:mm"
    const formatTime = (minutes: number) => {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      return `${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}`;
    };

    // Calculate total journey time (if time is in 'min')
    const totalTime = stops.reduce((acc, stop) => {
      const match = stop.time.match(/(\d+)/);
      return acc + (match ? parseInt(match[1], 10) : 0);
    }, 0);

    // Parse schedule departure and arrival times
    let startMinutes = 0;
    let endMinutes = 0;
    if (
      selectedSchedule.departure &&
      /^\d{1,2}:\d{2}$/.test(selectedSchedule.departure)
    ) {
      startMinutes = parseTime(selectedSchedule.departure);
    }
    if (
      selectedSchedule.arrival &&
      /^\d{1,2}:\d{2}$/.test(selectedSchedule.arrival)
    ) {
      endMinutes = parseTime(selectedSchedule.arrival);
    }

    // Calculate cumulative time for each stop
    let cumulativeTime = 0;
    const cumulativeTimes = stops.map((stop) => {
      const match = stop.time.match(/(\d+)/);
      cumulativeTime += match ? parseInt(match[1], 10) : 0;
      return cumulativeTime;
    });

    // Calculate proportional arrival times
    const stopsWithArrival = stops.map((stop, idx) => {
      let arrival;
      if (idx === 0) {
        arrival = startMinutes;
      } else if (idx === stops.length - 1) {
        arrival = endMinutes;
      } else if (totalTime > 0 && endMinutes > startMinutes) {
        // Proportional time between start and end
        const proportion = cumulativeTimes[idx] / totalTime;
        arrival = Math.round(
          startMinutes + proportion * (endMinutes - startMinutes)
        );
      } else {
        arrival = startMinutes + cumulativeTimes[idx];
      }
      return {
        ...stop,
        arrival: formatTime(arrival),
      };
    });

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            ×
          </button>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>Stop Sequence & Timeline</span>
            <span className="ml-auto text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
              Total: {totalTime} min
            </span>
          </h3>
          <div className="flex flex-col gap-0.5">
            {stopsWithArrival.map((stop, idx) => (
              <div key={idx} className="flex items-center gap-3 relative">
                {/* Timeline/stepper */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 font-bold text-xs ${
                      idx === 0
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : idx === stopsWithArrival.length - 1
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700'
                    }`}
                  >
                    {idx === 0 ? (
                      <span title="Start">▶</span>
                    ) : idx === stopsWithArrival.length - 1 ? (
                      <span title="End">★</span>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < stopsWithArrival.length - 1 && (
                    <div className="w-0.5 h-6 bg-gray-300 mx-auto"></div>
                  )}
                </div>
                {/* Stop details */}
                <div className="flex-1 flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 shadow-sm">
                  <div>
                    <span className="font-medium text-gray-800">
                      {stop.name}
                    </span>
                    <span className="block text-xs text-gray-400">
                      Arrival: {stop.arrival}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{stop.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDailyView = () => {
    const forwardSchedules = getSchedulesForDay(
      routeData.forward.schedules,
      selectedDay
    );
    const backwardSchedules = getSchedulesForDay(
      routeData.backward.schedules,
      selectedDay
    );

    return (
      <div className="space-y-8">
        {/* Day Selector */}
        <div className="flex flex-wrap gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const dayForwardCount = getSchedulesForDay(
              routeData.forward.schedules,
              day.key
            ).length;
            const dayBackwardCount = getSchedulesForDay(
              routeData.backward.schedules,
              day.key
            ).length;
            const totalCount = dayForwardCount + dayBackwardCount;

            return (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === day.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>{day.label}</div>
                <div className="text-xs opacity-75">{totalCount} services</div>
              </button>
            );
          })}
        </div>

        {/* Summary for selected day */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label} Schedule
            Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {forwardSchedules.length}
              </div>
              <div className="text-sm text-gray-600">Forward Services</div>
              <div className="text-xs text-gray-500">
                {routeData.forward.direction}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {backwardSchedules.length}
              </div>
              <div className="text-sm text-gray-600">Return Services</div>
              <div className="text-xs text-gray-500">
                {routeData.backward.direction}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {forwardSchedules.length + backwardSchedules.length}
              </div>
              <div className="text-sm text-gray-600">Total Services</div>
              <div className="text-xs text-gray-500">Both Directions</div>
            </div>
          </div>
        </div>

        {/* Forward Direction */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {routeData.forward.direction}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label} Schedules
              - {forwardSchedules.length} services
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forwardSchedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-gray-50 ${
                      schedule.id === currentScheduleId
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.departure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          schedule.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : schedule.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Backward Direction */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {routeData.backward.direction}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label} Schedules
              - {backwardSchedules.length} services
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backwardSchedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-gray-50 ${
                      schedule.id === currentScheduleId
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.departure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          schedule.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : schedule.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAllSchedulesView = () => {
    return (
      <div className="space-y-8">
        {/* Forward Direction - All Schedules */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {routeData.forward.direction}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              All scheduled services - {routeData.forward.schedules.length}{' '}
              total services
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routeData.forward.schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-gray-50 ${
                      schedule.id === currentScheduleId
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.departure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          schedule.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : schedule.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Backward Direction - All Schedules */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {routeData.backward.direction}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              All scheduled services - {routeData.backward.schedules.length}{' '}
              total services
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routeData.backward.schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className={`hover:bg-gray-50 ${
                      schedule.id === currentScheduleId
                        ? 'bg-blue-50 border-l-4 border-blue-500'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.departure}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.arrival}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          schedule.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : schedule.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowModal(true);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {routeData.routeName} - All Schedules
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            View schedules by day or see all schedules for this route
          </p>
        </div>
        <div className='flex gap-2'>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-4 py-2 text-sm font-medium border-l border-gray-200 ${
                viewMode === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Schedules
            </button>
          </div>
          <button
            onClick={handleAddSchedule}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Schedule
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? renderDailyView() : renderAllSchedulesView()}

      {renderStopListModal()}
    </div>
  );
}
