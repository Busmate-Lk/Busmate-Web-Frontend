"use client";

import { MapPin, Bus } from "lucide-react";

interface RouteInformationCardProps {
  startPoint: string;
  endPoint: string;
}

export function RouteInformationCard({
  startPoint,
  endPoint,
}: RouteInformationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Route Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">{startPoint}</p>
              <p className="text-sm text-gray-600">Starting Point</p>
            </div>
          </div>
          <div className="text-center">
            <Bus className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Route</p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium text-gray-900 text-right">{endPoint}</p>
              <p className="text-sm text-gray-600">Destination</p>
            </div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
