"use client";

import { Clock } from "lucide-react";

interface OperatingHoursFormProps {
  firstBusTime: string;
  lastBusTime: string;
  frequency: string;
  onFirstBusTimeChange: (time: string) => void;
  onLastBusTimeChange: (time: string) => void;
}

export function OperatingHoursForm({
  firstBusTime,
  lastBusTime,
  frequency,
  onFirstBusTimeChange,
  onLastBusTimeChange,
}: OperatingHoursFormProps) {
  const calculateTotalServices = () => {
    if (!firstBusTime || !lastBusTime || !frequency || frequency === "Manual Time Entry") {
      return null;
    }

    try {
      const firstTime = new Date(`2024-01-01 ${firstBusTime}`);
      const lastTime = new Date(`2024-01-01 ${lastBusTime}`);
      
      if (isNaN(firstTime.getTime()) || isNaN(lastTime.getTime())) {
        return null;
      }

      let diffMinutes = (lastTime.getTime() - firstTime.getTime()) / (1000 * 60);
      if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle overnight

      // Extract frequency interval
      const frequencyMatch = frequency.match(/(\d+\.?\d*)/);
      if (!frequencyMatch) return null;

      const intervalValue = parseFloat(frequencyMatch[1]);
      let intervalMinutes = intervalValue;

      if (frequency.includes("hour")) {
        intervalMinutes = intervalValue * 60;
      }

      const totalServices = Math.floor(diffMinutes / intervalMinutes) + 1;
      return totalServices;
    } catch {
      return null;
    }
  };

  const totalServices = calculateTotalServices();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🕐 Operating Hours
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Define the first and last bus times for the frequency-based schedule
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstBusTime"
              className="block text-sm font-medium text-gray-700"
            >
              First Bus Departure *
            </label>
            <div className="relative">
              <input
                id="firstBusTime"
                type="text"
                placeholder="06:00 AM"
                value={firstBusTime}
                onChange={(e) => onFirstBusTimeChange(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <p className="text-xs text-gray-500">
              Time when the first bus departs from the starting point
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastBusTime"
              className="block text-sm font-medium text-gray-700"
            >
              Last Bus Departure *
            </label>
            <div className="relative">
              <input
                id="lastBusTime"
                type="text"
                placeholder="10:00 PM"
                value={lastBusTime}
                onChange={(e) => onLastBusTimeChange(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <p className="text-xs text-gray-500">
              Time when the last bus departs from the starting point
            </p>
          </div>
        </div>

        {/* Service Summary */}
        {totalServices && firstBusTime && lastBusTime && frequency && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Service Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Frequency:</span>
                <div className="text-blue-800">{frequency}</div>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Operating Hours:</span>
                <div className="text-blue-800">{firstBusTime} - {lastBusTime}</div>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Total Services:</span>
                <div className="text-blue-800 font-semibold">{totalServices} buses per day</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="text-gray-600">💡</div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Operating Hours Tips
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• First bus time determines when service starts each day</li>
                <li>• Last bus time is when the final departure occurs</li>
                <li>• Buses will run at the specified frequency between these times</li>
                <li>• Use 12-hour format (e.g., 6:00 AM, 10:30 PM)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
