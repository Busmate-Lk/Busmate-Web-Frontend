'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bus,
  Calendar,
  Clock,
  Users,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BusQueueManager } from '@/components/mot/bus-queue-manager';
import { Layout } from '@/components/shared/layout';
import {
  DAYS_OF_WEEK,
  SAMPLE_TIME_SLOTS,
  SAMPLE_BUSES,
  SAMPLE_ROUTES,
  Route,
} from './data';

// Type definitions
interface Bus {
  id: string;
  registrationNumber: string;
  operator: string;
  type: 'SLTB' | 'Private';
  capacity: number;
  permitStatus: 'Active' | 'Expired';
  fuelType: string;
  model: string;
  isAssigned?: boolean;
}

interface QueuedBus extends Bus {
  queuePosition: number;
  estimatedAssignmentTime: string;
}

interface TimeSlot {
  time: string;
  assignedBus: Bus | null;
}

interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

interface AssignmentData {
  scheduleId: string;
  routeId: string;
  routeName: string;
  weeklySchedule: DaySchedule[];
  reverseWeeklySchedule: DaySchedule[];
  queuedBuses: QueuedBus[];
  reverseQueuedBuses: QueuedBus[];
}

export default function ScheduleAssignFormClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [assignmentData, setAssignmentData] = useState<AssignmentData>({
    scheduleId: searchParams?.get('scheduleId') || '',
    routeId: searchParams?.get('routeId') || '',
    routeName: searchParams?.get('routeName') || '',
    weeklySchedule: [],
    reverseWeeklySchedule: [],
    queuedBuses: [],
    reverseQueuedBuses: [],
  });

  const [availableBuses, setAvailableBuses] = useState<Bus[]>(SAMPLE_BUSES);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [rotationEnabled, setRotationEnabled] = useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = useState<
    'forward' | 'reverse'
  >('forward');
  const [availableRoutes, setAvailableRoutes] =
    useState<Route[]>(SAMPLE_ROUTES);
  const [selectedRouteNumber, setSelectedRouteNumber] = useState<string>('');
  const [selectedRouteName, setSelectedRouteName] = useState<string>('');

  // Initialize weekly schedule
  useEffect(() => {
    const createSchedule = (): DaySchedule[] =>
      DAYS_OF_WEEK.map((day) => ({
        day,
        timeSlots: SAMPLE_TIME_SLOTS.map((time) => ({
          time,
          assignedBus: null,
        })),
      }));

    setAssignmentData((prev) => ({
      ...prev,
      weeklySchedule: createSchedule(),
      reverseWeeklySchedule: createSchedule(),
    }));

    // Initialize from URL params if available
    const routeIdFromParams = searchParams?.get('routeId');
    const routeNameFromParams = searchParams?.get('routeName');
    if (routeIdFromParams && routeNameFromParams) {
      const route = availableRoutes.find((r) => r.id === routeIdFromParams);
      if (route) {
        setSelectedRouteNumber(route.routeNumber);
        setSelectedRouteName(route.routeName);
        setAssignmentData((prev) => ({
          ...prev,
          routeId: route.id,
          routeName: route.routeName,
          scheduleId: `SCH${route.routeNumber.padStart(3, '0')}`,
        }));
      }
    }
  }, [searchParams, availableRoutes]);

  const handleRouteNumberChange = (routeNumber: string) => {
    setSelectedRouteNumber(routeNumber);
    const route = availableRoutes.find((r) => r.routeNumber === routeNumber);
    if (route) {
      setSelectedRouteName(route.routeName);
      setAssignmentData((prev) => ({
        ...prev,
        routeId: route.id,
        routeName: route.routeName,
        scheduleId: `SCH${route.routeNumber.padStart(3, '0')}`,
      }));
    }
  };

  const handleRouteNameChange = (routeName: string) => {
    setSelectedRouteName(routeName);
    const route = availableRoutes.find((r) => r.routeName === routeName);
    if (route) {
      setSelectedRouteNumber(route.routeNumber);
      setAssignmentData((prev) => ({
        ...prev,
        routeId: route.id,
        routeName: route.routeName,
        scheduleId: `SCH${route.routeNumber.padStart(3, '0')}`,
      }));
    }
  };

  const handleAssignBus = (
    busId: string,
    day: string,
    timeSlot: string,
    direction: 'forward' | 'reverse' = selectedDirection
  ) => {
    const bus = availableBuses.find((b) => b.id === busId);
    if (!bus) return;

    setAssignmentData((prev) => {
      const scheduleKey =
        direction === 'forward' ? 'weeklySchedule' : 'reverseWeeklySchedule';
      const currentSchedule = prev[scheduleKey];

      const newSchedule = currentSchedule.map((daySchedule) => {
        if (daySchedule.day === day) {
          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map((slot) => {
              if (slot.time === timeSlot && slot.assignedBus === null) {
                return {
                  ...slot,
                  assignedBus: { ...bus, isAssigned: true },
                };
              }
              return slot;
            }),
          };
        }
        return daySchedule;
      });

      return {
        ...prev,
        [scheduleKey]: newSchedule,
      };
    });

    // Remove from available buses
    setAvailableBuses((prev) => prev.filter((b) => b.id !== busId));
  };

  const handleAddToQueue = (
    busId: string,
    direction: 'forward' | 'reverse' = selectedDirection
  ) => {
    const bus = availableBuses.find((b) => b.id === busId);
    if (!bus) return;

    const queueKey =
      direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';
    const currentQueue = assignmentData[queueKey];

    const queuedBus: QueuedBus = {
      ...bus,
      queuePosition: currentQueue.length + 1,
      estimatedAssignmentTime: getEstimatedAssignmentTime(currentQueue.length),
    };

    setAssignmentData((prev) => ({
      ...prev,
      [queueKey]: [...prev[queueKey], queuedBus],
    }));

    setAvailableBuses((prev) => prev.filter((b) => b.id !== busId));
  };

  const handlePromoteBus = (
    busId: string,
    direction: 'forward' | 'reverse' = selectedDirection
  ) => {
    const queueKey =
      direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';

    setAssignmentData((prev) => {
      const currentQueue = prev[queueKey];
      const busIndex = currentQueue.findIndex((b) => b.id === busId);
      if (busIndex <= 0) return prev;

      const newQueue = [...currentQueue];
      [newQueue[busIndex], newQueue[busIndex - 1]] = [
        newQueue[busIndex - 1],
        newQueue[busIndex],
      ];

      // Update queue positions
      newQueue.forEach((bus, index) => {
        bus.queuePosition = index + 1;
        bus.estimatedAssignmentTime = getEstimatedAssignmentTime(index);
      });

      return {
        ...prev,
        [queueKey]: newQueue,
      };
    });
  };

  const handleRemoveFromQueue = (
    busId: string,
    direction: 'forward' | 'reverse' = selectedDirection
  ) => {
    const queueKey =
      direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';

    setAssignmentData((prev) => {
      const currentQueue = prev[queueKey];
      const removedBus = currentQueue.find((b) => b.id === busId);
      if (!removedBus) return prev;

      const newQueue = currentQueue
        .filter((b) => b.id !== busId)
        .map((bus, index) => ({
          ...bus,
          queuePosition: index + 1,
          estimatedAssignmentTime: getEstimatedAssignmentTime(index),
        }));

      // Add back to available buses
      setAvailableBuses((prevAvailable) => [
        ...prevAvailable,
        {
          id: removedBus.id,
          registrationNumber: removedBus.registrationNumber,
          operator: removedBus.operator,
          type: removedBus.type,
          capacity: removedBus.capacity,
          permitStatus: removedBus.permitStatus,
          fuelType: removedBus.fuelType,
          model: removedBus.model,
        },
      ]);

      return {
        ...prev,
        [queueKey]: newQueue,
      };
    });
  };

  const getEstimatedAssignmentTime = (queuePosition: number): string => {
    const baseHours = 2;
    const additionalHours = queuePosition * 1.5;
    const totalHours = baseHours + additionalHours;
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const handleUnassignBus = (
    busId: string,
    day: string,
    timeSlot: string,
    direction: 'forward' | 'reverse' = selectedDirection
  ) => {
    let unassignedBus: Bus | null = null;

    setAssignmentData((prev) => {
      const scheduleKey =
        direction === 'forward' ? 'weeklySchedule' : 'reverseWeeklySchedule';
      const currentSchedule = prev[scheduleKey];

      const newSchedule = currentSchedule.map((daySchedule) => {
        if (daySchedule.day === day) {
          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map((slot) => {
              if (slot.time === timeSlot && slot.assignedBus?.id === busId) {
                unassignedBus = { ...slot.assignedBus, isAssigned: false };
                return {
                  ...slot,
                  assignedBus: null,
                };
              }
              return slot;
            }),
          };
        }
        return daySchedule;
      });

      return {
        ...prev,
        [scheduleKey]: newSchedule,
      };
    });

    // Add back to available buses
    if (unassignedBus) {
      setAvailableBuses((prev) => [...prev, unassignedBus!]);
    }
  };

  const handleRotateSchedule = () => {
    if (!rotationEnabled) return;

    setAssignmentData((prev) => {
      const rotateSchedule = (schedule: DaySchedule[]) => {
        return schedule.map((daySchedule, dayIndex) => {
          const nextDayIndex = (dayIndex + 1) % DAYS_OF_WEEK.length;
          const nextDaySchedule = schedule[nextDayIndex];

          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map((slot, slotIndex) => ({
              ...slot,
              assignedBus:
                nextDaySchedule.timeSlots[slotIndex]?.assignedBus || null,
            })),
          };
        });
      };

      return {
        ...prev,
        weeklySchedule: rotateSchedule(prev.weeklySchedule),
        reverseWeeklySchedule: rotateSchedule(prev.reverseWeeklySchedule),
      };
    });
  };

  const getCurrentDaySchedule = () => {
    const schedule =
      selectedDirection === 'forward'
        ? assignmentData.weeklySchedule
        : assignmentData.reverseWeeklySchedule;
    return schedule.find((schedule) => schedule.day === selectedDay);
  };

  const getTotalAssignedBuses = () => {
    const forwardTotal = assignmentData.weeklySchedule.reduce((total, day) => {
      return (
        total +
        day.timeSlots.reduce((dayTotal, slot) => {
          return dayTotal + (slot.assignedBus ? 1 : 0);
        }, 0)
      );
    }, 0);

    const reverseTotal = assignmentData.reverseWeeklySchedule.reduce(
      (total, day) => {
        return (
          total +
          day.timeSlots.reduce((dayTotal, slot) => {
            return dayTotal + (slot.assignedBus ? 1 : 0);
          }, 0)
        );
      },
      0
    );

    return {
      forward: forwardTotal,
      reverse: reverseTotal,
      total: forwardTotal + reverseTotal,
    };
  };

  const getCurrentQueuedBuses = () => {
    return selectedDirection === 'forward'
      ? assignmentData.queuedBuses
      : assignmentData.reverseQueuedBuses;
  };

  return (
    <Layout
      activeItem="schedule-assignment"
      role="mot"
      pageTitle="Assign Buses to Schedule"
      pageDescription={
        assignmentData.routeName
          ? `Schedule ID: ${assignmentData.scheduleId} | Route: ${assignmentData.routeId} - ${assignmentData.routeName}`
          : 'Select a route to start assigning buses'
      }
    >
      <div className="space-y-6">
        {/* Route Selection Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Route Selection
            </h2>
            <p className="text-sm text-gray-600">
              Select the route for bus assignment. Choose either route number or
              route name.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="routeNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Route Number
              </label>
              <select
                id="routeNumber"
                value={selectedRouteNumber}
                onChange={(e) => handleRouteNumberChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Route Number</option>
                {availableRoutes.map((route) => (
                  <option key={route.id} value={route.routeNumber}>
                    {route.routeNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="routeName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Route Name
              </label>
              <select
                id="routeName"
                value={selectedRouteName}
                onChange={(e) => handleRouteNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Route Name</option>
                {availableRoutes.map((route) => (
                  <option key={route.id} value={route.routeName}>
                    {route.routeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {assignmentData.routeName && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    Selected Route:{' '}
                    <span className="font-medium">
                      {assignmentData.routeName}
                    </span>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Schedule ID: {assignmentData.scheduleId} | Route ID:{' '}
                    {assignmentData.routeId}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Main Content Grid - Only show when route is selected */}
        {assignmentData.routeName && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Available Buses Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bus className="h-5 w-5 mr-2 text-blue-600" />
                    Available Buses
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {availableBuses.length} buses with route permits
                  </p>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {availableBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">
                          {bus.registrationNumber}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            bus.type === 'SLTB'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {bus.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 mb-3">
                        <div>{bus.operator}</div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {bus.capacity}
                          </span>
                          <span>{bus.model}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            // Auto-assign to next available slot
                            const currentDay = getCurrentDaySchedule();
                            if (currentDay) {
                              const availableSlot = currentDay.timeSlots.find(
                                (slot) => slot.assignedBus === null
                              );
                              if (availableSlot) {
                                handleAssignBus(
                                  bus.id,
                                  selectedDay,
                                  availableSlot.time,
                                  selectedDirection
                                );
                              }
                            }
                          }}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', bus.id);
                          }}
                        >
                          Assign
                        </button>
                        <button
                          className="flex-1 px-2 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors flex items-center justify-center"
                          onClick={() =>
                            handleAddToQueue(bus.id, selectedDirection)
                          }
                          title="Add to queue"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Queue
                        </button>
                      </div>
                    </div>
                  ))}
                  {availableBuses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">All buses assigned or queued</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment Statistics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Assignment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Buses Assigned:</span>
                    <span className="font-medium text-gray-900">
                      {getTotalAssignedBuses().total}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Forward Direction:</span>
                    <span className="font-medium text-gray-900">
                      {getTotalAssignedBuses().forward}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reverse Direction:</span>
                    <span className="font-medium text-gray-900">
                      {getTotalAssignedBuses().reverse}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available Buses:</span>
                    <span className="font-medium text-gray-900">
                      {availableBuses.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Queued Buses:</span>
                    <span className="font-medium text-gray-900">
                      {assignmentData.queuedBuses.length +
                        assignmentData.reverseQueuedBuses.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Calendar */}
            <div className="lg:col-span-3 space-y-6">
              {/* Direction Selector */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Route Direction
                </h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedDirection('forward')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      selectedDirection === 'forward'
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">Forward Direction</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {assignmentData.routeName.split(' - ')[0]} →{' '}
                        {assignmentData.routeName.split(' - ')[1]}
                      </div>
                      <div className="text-xs mt-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {getTotalAssignedBuses().forward} buses assigned
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedDirection('reverse')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                      selectedDirection === 'reverse'
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">Reverse Direction</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {assignmentData.routeName.split(' - ')[1]} →{' '}
                        {assignmentData.routeName.split(' - ')[0]}
                      </div>
                      <div className="text-xs mt-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {getTotalAssignedBuses().reverse} buses assigned
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bus Queue Manager */}
              <BusQueueManager
                queuedBuses={getCurrentQueuedBuses()}
                onPromoteBus={(busId) =>
                  handlePromoteBus(busId, selectedDirection)
                }
                onRemoveFromQueue={(busId) =>
                  handleRemoveFromQueue(busId, selectedDirection)
                }
                rotationEnabled={rotationEnabled}
              />
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                      Weekly Schedule Assignment -{' '}
                      {selectedDirection === 'forward'
                        ? 'Forward'
                        : 'Reverse'}{' '}
                      Direction
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedDirection === 'forward'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {selectedDirection === 'forward'
                          ? `${assignmentData.routeName.split(' - ')[0]} → ${
                              assignmentData.routeName.split(' - ')[1]
                            }`
                          : `${assignmentData.routeName.split(' - ')[1]} → ${
                              assignmentData.routeName.split(' - ')[0]
                            }`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day Selector */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedDay === day
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="p-6">
                  {getCurrentDaySchedule() && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {getCurrentDaySchedule()!.timeSlots.map((slot) => (
                        <div
                          key={slot.time}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                          onDrop={(e) => {
                            e.preventDefault();
                            const busId = e.dataTransfer.getData('text/plain');
                            if (busId && slot.assignedBus === null) {
                              handleAssignBus(
                                busId,
                                selectedDay,
                                slot.time,
                                selectedDirection
                              );
                            }
                          }}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="font-medium text-gray-900">
                                {slot.time}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {slot.assignedBus ? '1/1' : '0/1'}
                            </span>
                          </div>

                          <div className="space-y-2 min-h-[80px]">
                            {slot.assignedBus ? (
                              <div
                                key={slot.assignedBus.id}
                                className="p-2 bg-blue-50 border border-blue-200 rounded text-xs"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-blue-900">
                                    {slot.assignedBus.registrationNumber}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleUnassignBus(
                                        slot.assignedBus!.id,
                                        selectedDay,
                                        slot.time,
                                        selectedDirection
                                      )
                                    }
                                    className="text-red-500 hover:text-red-700"
                                    title="Remove bus"
                                  >
                                    ×
                                  </button>
                                </div>
                                <div className="text-blue-700 truncate">
                                  {slot.assignedBus.operator}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4 text-gray-400 border-2 border-dashed border-gray-200 rounded">
                                Drop bus here
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - Bottom of Page */}
        {assignmentData.routeName && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rotationEnabled}
                    onChange={(e) => setRotationEnabled(e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Enable Daily Rotation
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRotateSchedule}
                  disabled={!rotationEnabled || !assignmentData.routeName}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    rotationEnabled && assignmentData.routeName
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Rotate Schedule
                </button>
                <button
                  disabled={!assignmentData.routeName}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    assignmentData.routeName
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Save Assignment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
