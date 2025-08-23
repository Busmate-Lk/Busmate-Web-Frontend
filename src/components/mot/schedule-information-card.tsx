"use client";

import { Clock } from "lucide-react";

interface ScheduleInformationCardProps {
  schedule: {
    departure: string;
    arrival: string;
    validFrom: string;
    validUntil: string;
    permitNo: string;
    operatorName: string;
    conductor: string;
    days: string;
  };
}

export function ScheduleInformationCard({
  schedule,
}: ScheduleInformationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Schedule Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Departure Time:</p>
            <p className="font-medium text-lg text-green-600">
              {schedule.departure}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Arrival Time:</p>
            <p className="font-medium text-lg text-red-600">
              {schedule.arrival}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Valid From:</p>
            <p className="font-medium">{schedule.validFrom}</p>
          </div>
          <div>
            <p className="text-gray-600">Valid Until:</p>
            <p className="font-medium">{schedule.validUntil}</p>
          </div>
          <div>
            <p className="text-gray-600">Permit No.:</p>
            <p className="font-medium">{schedule.permitNo}</p>
          </div>
          <div>
            <p className="text-gray-600">Operator:</p>
            <p className="font-medium">{schedule.operatorName}</p>
          </div>
          <div>
            <p className="text-gray-600">Conductor:</p>
            <p className="font-medium">{schedule.conductor}</p>
          </div>
          <div>
            <p className="text-gray-600">Operating Days:</p>
            <p className="font-medium">{schedule.days}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
