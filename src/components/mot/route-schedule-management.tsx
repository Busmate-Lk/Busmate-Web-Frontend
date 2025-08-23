"use client";

export interface Schedule {
  id: number;
  departureTime: string;
  arrivalTime: string;
  busType: string;
  frequency: string;
  operatingDays: string[];
}

interface RouteScheduleManagementProps {
  schedules: Schedule[];
  errors?: Record<string, string>;
  onAddSchedule: () => void;
  onRemoveSchedule: (id: number) => void;
  onUpdateSchedule: (id: number, field: string, value: string | string[]) => void;
}

export function RouteScheduleManagement({
  schedules,
  errors = {},
  onAddSchedule,
  onRemoveSchedule,
  onUpdateSchedule,
}: RouteScheduleManagementProps) {
  const busTypes = [
    { value: "luxury", label: "Luxury" },
    { value: "semi-luxury", label: "Semi-Luxury" },
    { value: "normal", label: "Normal" },
    { value: "express", label: "Express" },
  ];

  const frequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "hourly", label: "Hourly" },
    { value: "30min", label: "Every 30 minutes" },
    { value: "15min", label: "Every 15 minutes" },
    { value: "custom", label: "Custom" },
  ];

  const daysOfWeek = [
    { value: "monday", label: "Mon" },
    { value: "tuesday", label: "Tue" },
    { value: "wednesday", label: "Wed" },
    { value: "thursday", label: "Thu" },
    { value: "friday", label: "Fri" },
    { value: "saturday", label: "Sat" },
    { value: "sunday", label: "Sun" },
  ];

  const handleDayToggle = (scheduleId: number, day: string) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (!schedule) return;

    const currentDays = schedule.operatingDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    onUpdateSchedule(scheduleId, "operatingDays", newDays);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule Management
          </h3>
          <button
            type="button"
            onClick={onAddSchedule}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Schedule
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Configure bus schedules and operating times for this route (Optional)
        </p>
      </div>
      <div className="p-6 space-y-4">
        {schedules.map((schedule, index) => (
          <div
            key={schedule.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Schedule {index + 1}
              </h4>
              {schedules.length > 0 && (
                <button
                  type="button"
                  onClick={() => onRemoveSchedule(schedule.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove schedule"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Departure Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Departure Time *
                </label>
                <input
                  type="time"
                  value={schedule.departureTime}
                  onChange={(e) => onUpdateSchedule(schedule.id, "departureTime", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                    errors[`schedule_${schedule.id}_departure`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[`schedule_${schedule.id}_departure`] && (
                  <p className="text-sm text-red-600">{errors[`schedule_${schedule.id}_departure`]}</p>
                )}
              </div>

              {/* Arrival Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Arrival Time *
                </label>
                <input
                  type="time"
                  value={schedule.arrivalTime}
                  onChange={(e) => onUpdateSchedule(schedule.id, "arrivalTime", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                    errors[`schedule_${schedule.id}_arrival`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[`schedule_${schedule.id}_arrival`] && (
                  <p className="text-sm text-red-600">{errors[`schedule_${schedule.id}_arrival`]}</p>
                )}
              </div>

              {/* Bus Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Bus Type *
                </label>
                <select
                  value={schedule.busType}
                  onChange={(e) => onUpdateSchedule(schedule.id, "busType", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                    errors[`schedule_${schedule.id}_busType`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select bus type</option>
                  {busTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors[`schedule_${schedule.id}_busType`] && (
                  <p className="text-sm text-red-600">{errors[`schedule_${schedule.id}_busType`]}</p>
                )}
              </div>

              {/* Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Frequency *
                </label>
                <select
                  value={schedule.frequency}
                  onChange={(e) => onUpdateSchedule(schedule.id, "frequency", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                    errors[`schedule_${schedule.id}_frequency`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select frequency</option>
                  {frequencyOptions.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
                {errors[`schedule_${schedule.id}_frequency`] && (
                  <p className="text-sm text-red-600">{errors[`schedule_${schedule.id}_frequency`]}</p>
                )}
              </div>
            </div>

            {/* Operating Days */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Operating Days *
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleDayToggle(schedule.id, day.value)}
                    className={`px-3 py-1 text-sm font-medium rounded-md border transition-colors ${
                      (schedule.operatingDays || []).includes(day.value)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              {errors[`schedule_${schedule.id}_days`] && (
                <p className="text-sm text-red-600">{errors[`schedule_${schedule.id}_days`]}</p>
              )}
            </div>
          </div>
        ))}

        {schedules.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No schedules added yet. Click "Add Schedule" to get started.
          </div>
        )}

        {errors.schedules && (
          <p className="text-sm text-red-600">{errors.schedules}</p>
        )}
      </div>
    </div>
  );
}
