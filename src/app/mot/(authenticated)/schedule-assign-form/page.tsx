"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Bus, Calendar, Clock, Users, AlertCircle, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { BusQueueManager } from "@/components/mot/bus-queue-manager";
import { Layout } from "@/components/shared/layout";
import { DAYS_OF_WEEK, SAMPLE_TIME_SLOTS, SAMPLE_BUSES } from './data';

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

export default function ScheduleAssignFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [assignmentData, setAssignmentData] = useState<AssignmentData>({
    scheduleId: searchParams?.get('scheduleId') || 'SCH001',
    routeId: searchParams?.get('routeId') || 'RT101',
    routeName: searchParams?.get('routeName') || 'Colombo - Kandy',
    weeklySchedule: [],
    reverseWeeklySchedule: [],
    queuedBuses: [],
    reverseQueuedBuses: [],
  });

  const [availableBuses, setAvailableBuses] = useState<Bus[]>(SAMPLE_BUSES);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [rotationEnabled, setRotationEnabled] = useState<boolean>(true);
  const [selectedDirection, setSelectedDirection] = useState<'forward' | 'reverse'>('forward');

  // Initialize weekly schedule
  useEffect(() => {
    const createSchedule = (): DaySchedule[] => DAYS_OF_WEEK.map(day => ({
      day,
      timeSlots: SAMPLE_TIME_SLOTS.map(time => ({
        time,
        assignedBus: null,
      })),
    }));

    setAssignmentData(prev => ({
      ...prev,
      weeklySchedule: createSchedule(),
      reverseWeeklySchedule: createSchedule(),
    }));
  }, []);

  const handleAssignBus = (busId: string, day: string, timeSlot: string, direction: 'forward' | 'reverse' = selectedDirection) => {
    const bus = availableBuses.find(b => b.id === busId);
    if (!bus) return;

    setAssignmentData(prev => {
      const scheduleKey = direction === 'forward' ? 'weeklySchedule' : 'reverseWeeklySchedule';
      const currentSchedule = prev[scheduleKey];
      
      const newSchedule = currentSchedule.map(daySchedule => {
        if (daySchedule.day === day) {
          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map(slot => {
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
    setAvailableBuses(prev => prev.filter(b => b.id !== busId));
  };

  const handleAddToQueue = (busId: string, direction: 'forward' | 'reverse' = selectedDirection) => {
    const bus = availableBuses.find(b => b.id === busId);
    if (!bus) return;

    const queueKey = direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';
    const currentQueue = assignmentData[queueKey];

    const queuedBus: QueuedBus = {
      ...bus,
      queuePosition: currentQueue.length + 1,
      estimatedAssignmentTime: getEstimatedAssignmentTime(currentQueue.length),
    };

    setAssignmentData(prev => ({
      ...prev,
      [queueKey]: [...prev[queueKey], queuedBus],
    }));

    setAvailableBuses(prev => prev.filter(b => b.id !== busId));
  };

  const handlePromoteBus = (busId: string, direction: 'forward' | 'reverse' = selectedDirection) => {
    const queueKey = direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';
    
    setAssignmentData(prev => {
      const currentQueue = prev[queueKey];
      const busIndex = currentQueue.findIndex(b => b.id === busId);
      if (busIndex <= 0) return prev;

      const newQueue = [...currentQueue];
      [newQueue[busIndex], newQueue[busIndex - 1]] = [newQueue[busIndex - 1], newQueue[busIndex]];
      
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

  const handleRemoveFromQueue = (busId: string, direction: 'forward' | 'reverse' = selectedDirection) => {
    const queueKey = direction === 'forward' ? 'queuedBuses' : 'reverseQueuedBuses';
    
    setAssignmentData(prev => {
      const currentQueue = prev[queueKey];
      const removedBus = currentQueue.find(b => b.id === busId);
      if (!removedBus) return prev;

      const newQueue = currentQueue
        .filter(b => b.id !== busId)
        .map((bus, index) => ({
          ...bus,
          queuePosition: index + 1,
          estimatedAssignmentTime: getEstimatedAssignmentTime(index),
        }));

      // Add back to available buses
      setAvailableBuses(prevAvailable => [...prevAvailable, {
        id: removedBus.id,
        registrationNumber: removedBus.registrationNumber,
        operator: removedBus.operator,
        type: removedBus.type,
        capacity: removedBus.capacity,
        permitStatus: removedBus.permitStatus,
        fuelType: removedBus.fuelType,
        model: removedBus.model,
      }]);

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

  const handleUnassignBus = (busId: string, day: string, timeSlot: string, direction: 'forward' | 'reverse' = selectedDirection) => {
    let unassignedBus: Bus | null = null;

    setAssignmentData(prev => {
      const scheduleKey = direction === 'forward' ? 'weeklySchedule' : 'reverseWeeklySchedule';
      const currentSchedule = prev[scheduleKey];
      
      const newSchedule = currentSchedule.map(daySchedule => {
        if (daySchedule.day === day) {
          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map(slot => {
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
      setAvailableBuses(prev => [...prev, unassignedBus!]);
    }
  };

  const handleRotateSchedule = () => {
    if (!rotationEnabled) return;

    setAssignmentData(prev => {
      const rotateSchedule = (schedule: DaySchedule[]) => {
        return schedule.map((daySchedule, dayIndex) => {
          const nextDayIndex = (dayIndex + 1) % DAYS_OF_WEEK.length;
          const nextDaySchedule = schedule[nextDayIndex];

          return {
            ...daySchedule,
            timeSlots: daySchedule.timeSlots.map((slot, slotIndex) => ({
              ...slot,
              assignedBus: nextDaySchedule.timeSlots[slotIndex]?.assignedBus || null,
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
    const schedule = selectedDirection === 'forward' ? assignmentData.weeklySchedule : assignmentData.reverseWeeklySchedule;
    return schedule.find(schedule => schedule.day === selectedDay);
  };

  const getTotalAssignedBuses = () => {
    const forwardTotal = assignmentData.weeklySchedule.reduce((total, day) => {
      return total + day.timeSlots.reduce((dayTotal, slot) => {
        return dayTotal + (slot.assignedBus ? 1 : 0);
      }, 0);
    }, 0);
    
    const reverseTotal = assignmentData.reverseWeeklySchedule.reduce((total, day) => {
      return total + day.timeSlots.reduce((dayTotal, slot) => {
        return dayTotal + (slot.assignedBus ? 1 : 0);
      }, 0);
    }, 0);
    
    return { forward: forwardTotal, reverse: reverseTotal, total: forwardTotal + reverseTotal };
  };

  const getCurrentQueuedBuses = () => {
    return selectedDirection === 'forward' ? assignmentData.queuedBuses : assignmentData.reverseQueuedBuses;
  };

  return (
    <Layout 
      activeItem="schedule" 
      role="mot"
      pageTitle="Assign Buses to Schedule"
      pageDescription={`Schedule ID: ${assignmentData.scheduleId} | Route: ${assignmentData.routeId} - ${assignmentData.routeName}`}
    >
      <div className="space-y-6">
        {/* Action Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Bus Assignment Controls</h2>
                <p className="text-sm text-gray-600">
                  Manage bus assignments for both route directions
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRotateSchedule}
                disabled={!rotationEnabled}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  rotationEnabled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Rotate Schedule
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                Save Assignment
              </button>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
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
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        bus.type === 'SLTB' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
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
                            const availableSlot = currentDay.timeSlots.find(slot => 
                              slot.assignedBus === null
                            );
                            if (availableSlot) {
                              handleAssignBus(bus.id, selectedDay, availableSlot.time, selectedDirection);
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
                        onClick={() => handleAddToQueue(bus.id, selectedDirection)}
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
              <h3 className="text-md font-semibold text-gray-900 mb-4">Assignment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Buses Assigned:</span>
                  <span className="font-medium text-gray-900">{getTotalAssignedBuses().total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Forward Direction:</span>
                  <span className="font-medium text-gray-900">{getTotalAssignedBuses().forward}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reverse Direction:</span>
                  <span className="font-medium text-gray-900">{getTotalAssignedBuses().reverse}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Available Buses:</span>
                  <span className="font-medium text-gray-900">{availableBuses.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Queued Buses:</span>
                  <span className="font-medium text-gray-900">{assignmentData.queuedBuses.length + assignmentData.reverseQueuedBuses.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Calendar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Direction Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Direction</h3>
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
                      {assignmentData.routeName.split(' - ')[0]} → {assignmentData.routeName.split(' - ')[1]}
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
                      {assignmentData.routeName.split(' - ')[1]} → {assignmentData.routeName.split(' - ')[0]}
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
              onPromoteBus={(busId) => handlePromoteBus(busId, selectedDirection)}
              onRemoveFromQueue={(busId) => handleRemoveFromQueue(busId, selectedDirection)}
              rotationEnabled={rotationEnabled}
            />
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Weekly Schedule Assignment - {selectedDirection === 'forward' ? 'Forward' : 'Reverse'} Direction
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedDirection === 'forward' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedDirection === 'forward' 
                        ? `${assignmentData.routeName.split(' - ')[0]} → ${assignmentData.routeName.split(' - ')[1]}`
                        : `${assignmentData.routeName.split(' - ')[1]} → ${assignmentData.routeName.split(' - ')[0]}`
                      }
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rotationEnabled}
                        onChange={(e) => setRotationEnabled(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Enable Daily Rotation</span>
                    </label>
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
                            handleAssignBus(busId, selectedDay, slot.time, selectedDirection);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium text-gray-900">{slot.time}</span>
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
                                  onClick={() => handleUnassignBus(slot.assignedBus!.id, selectedDay, slot.time, selectedDirection)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Remove bus"
                                >
                                  ×
                                </button>
                              </div>
                              <div className="text-blue-700 truncate">{slot.assignedBus.operator}</div>
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
      </div>
    </Layout>
  );
}
