"use client";

import { Calendar } from "lucide-react";

interface DaysOfOperationCardProps {
  daysDetails: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}

export function DaysOfOperationCard({ daysDetails }: DaysOfOperationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Days of Operation
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-7 gap-3">
          {Object.entries(daysDetails).map(([day, isActive]) => (
            <div
              key={day}
              className={`text-center p-3 rounded-lg border ${
                isActive
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : "bg-gray-50 border-gray-200 text-gray-500"
              }`}
            >
              <p className="text-xs font-medium uppercase">{day.slice(0, 3)}</p>
              <p className="text-sm font-semibold capitalize">{day}</p>
              <div
                className={`w-2 h-2 rounded-full mx-auto mt-2 ${
                  isActive ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
