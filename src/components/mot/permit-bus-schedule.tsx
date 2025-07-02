"use client";

import { Calendar, Clock } from "lucide-react";

interface ScheduleData {
  validFrom: string;
  validUntil: string;
  departureTime: string;
  arrivalTime: string;
}

interface PermitBusScheduleProps {
  data: ScheduleData;
  selectedDays: string[];
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof ScheduleData, value: string) => void;
  onDayChange: (dayId: string, checked: boolean) => void;
  onBlur?: (field: string) => void;
}

const daysOfWeek = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

export function PermitBusSchedule({
  data,
  selectedDays,
  errors = {},
  touched = {},
  onChange,
  onDayChange,
  onBlur,
}: PermitBusScheduleProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Bus Schedule</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="fixSchedule"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="fixSchedule"
            className="text-sm font-medium text-gray-700"
          >
            Fix the Schedule
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="validFrom"
              className="text-sm font-medium text-gray-700"
            >
              Valid From *
            </label>
            <div className="relative">
              <input
                id="validFrom"
                placeholder="mm/dd/yyyy"
                value={data.validFrom}
                onChange={(e) => onChange("validFrom", e.target.value)}
                onBlur={() => onBlur?.("validFrom")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.validFrom && errors.validFrom ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.validFrom && errors.validFrom && (
              <p className="text-sm text-red-600">{errors.validFrom}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="validUntil"
              className="text-sm font-medium text-gray-700"
            >
              Valid Until *
            </label>
            <div className="relative">
              <input
                id="validUntil"
                placeholder="mm/dd/yyyy"
                value={data.validUntil}
                onChange={(e) => onChange("validUntil", e.target.value)}
                onBlur={() => onBlur?.("validUntil")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.validUntil && errors.validUntil ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.validUntil && errors.validUntil && (
              <p className="text-sm text-red-600">{errors.validUntil}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Days of Operation *
          </label>
          <div className="flex flex-wrap gap-4">
            {daysOfWeek.map((day) => (
              <div key={day.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={day.id}
                  checked={selectedDays.includes(day.id)}
                  onChange={(e) => onDayChange(day.id, e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={day.id}
                  className="text-sm font-medium text-gray-700"
                >
                  {day.label}
                </label>
              </div>
            ))}
          </div>
          {touched.selectedDays && errors.selectedDays && (
            <p className="text-sm text-red-600">{errors.selectedDays}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="departureTime"
              className="text-sm font-medium text-gray-700"
            >
              Departure Time *
            </label>
            <div className="relative">
              <input
                id="departureTime"
                placeholder="--:-- --"
                value={data.departureTime}
                onChange={(e) => onChange("departureTime", e.target.value)}
                onBlur={() => onBlur?.("departureTime")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.departureTime && errors.departureTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.departureTime && errors.departureTime && (
              <p className="text-sm text-red-600">{errors.departureTime}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="arrivalTime"
              className="text-sm font-medium text-gray-700"
            >
              Arrival Time *
            </label>
            <div className="relative">
              <input
                id="arrivalTime"
                placeholder="--:-- --"
                value={data.arrivalTime}
                onChange={(e) => onChange("arrivalTime", e.target.value)}
                onBlur={() => onBlur?.("arrivalTime")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.arrivalTime && errors.arrivalTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.arrivalTime && errors.arrivalTime && (
              <p className="text-sm text-red-600">{errors.arrivalTime}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
