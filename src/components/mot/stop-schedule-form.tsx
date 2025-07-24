import { useState } from 'react';
import { Plus, X, Clock, MapPin, ChevronDown } from 'lucide-react';
import { dummyBusStops } from '@/lib/data/route-groups-dummy';
import { additionalBusStops } from '@/lib/data/schedules-dummy';

interface StopSchedule {
  stopId: string;
  stopName: string;
  stopOrder: number;
  arrivalTime: string;
  departureTime: string;
}

interface StopScheduleFormProps {
  stopSchedules: StopSchedule[];
  onStopSchedulesChange: (schedules: StopSchedule[]) => void;
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export function StopScheduleForm({
  stopSchedules,
  onStopSchedulesChange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: StopScheduleFormProps) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  // Combine all available bus stops
  const allBusStops = [...dummyBusStops, ...additionalBusStops];

  const addStopSchedule = () => {
    const newSchedule: StopSchedule = {
      stopId: '',
      stopName: '',
      stopOrder: stopSchedules.length + 1,
      arrivalTime: '',
      departureTime: '',
    };
    onStopSchedulesChange([...stopSchedules, newSchedule]);
  };

  const removeStopSchedule = (index: number) => {
    const updatedSchedules = stopSchedules.filter((_, i) => i !== index);
    // Reorder the remaining schedules
    const reorderedSchedules = updatedSchedules.map((schedule, i) => ({
      ...schedule,
      stopOrder: i + 1,
    }));
    onStopSchedulesChange(reorderedSchedules);
  };

  const updateStopSchedule = (
    index: number,
    field: keyof StopSchedule,
    value: string | number
  ) => {
    const updatedSchedules = stopSchedules.map((schedule, i) => {
      if (i === index) {
        if (field === 'stopId') {
          const selectedStop = allBusStops.find((stop) => stop.id === value);
          return {
            ...schedule,
            stopId: value as string,
            stopName: selectedStop?.name || '',
          };
        }
        return { ...schedule, [field]: value };
      }
      return schedule;
    });
    onStopSchedulesChange(updatedSchedules);
  };

  const selectStop = (index: number, stopId: string) => {
    updateStopSchedule(index, 'stopId', stopId);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🕒 Schedule Timing & Stops
        </h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Overall Journey Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Clock className="h-4 w-4" />
              Journey Start Time *
            </label>
            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Clock className="h-4 w-4" />
              Journey End Time *
            </label>
            <input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Stop Schedules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Stop Schedule Details
            </h4>
            <button
              type="button"
              onClick={addStopSchedule}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Stop
            </button>
          </div>

          {stopSchedules.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                No stops added yet. Click "Add Stop" to start building your
                route.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {stopSchedules.map((schedule, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Stop {schedule.stopOrder}
                    </span>
                    {stopSchedules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStopSchedule(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Stop Selection */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Bus Stop *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownIndex(
                              openDropdownIndex === index ? null : index
                            )
                          }
                          className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white flex items-center justify-between text-sm"
                        >
                          <span
                            className={
                              schedule.stopName
                                ? 'text-gray-900'
                                : 'text-gray-500'
                            }
                          >
                            {schedule.stopName || 'Select bus stop'}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform ${
                              openDropdownIndex === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {openDropdownIndex === index && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                            {allBusStops.map((stop) => (
                              <button
                                key={stop.id}
                                type="button"
                                onClick={() => selectStop(index, stop.id)}
                                className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
                              >
                                <div>
                                  <div className="font-medium">{stop.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {stop.location.city}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Arrival Time */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Arrival Time *
                      </label>
                      <input
                        type="time"
                        value={schedule.arrivalTime}
                        onChange={(e) =>
                          updateStopSchedule(
                            index,
                            'arrivalTime',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                      />
                    </div>

                    {/* Departure Time */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-600">
                        Departure Time *
                      </label>
                      <input
                        type="time"
                        value={schedule.departureTime}
                        onChange={(e) =>
                          updateStopSchedule(
                            index,
                            'departureTime',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {stopSchedules.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Make sure the times are in chronological
              order. The first stop should have the earliest time, and the last
              stop should have the latest time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
