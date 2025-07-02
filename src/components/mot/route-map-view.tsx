"use client";

import { MapPin } from "lucide-react";

interface RouteMapViewProps {
  routeName: string;
}

export function RouteMapView({ routeName }: RouteMapViewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Route Map
        </h3>
      </div>
      <div className="p-6">
        <div className="h-64 bg-yellow-50 rounded-lg flex items-center justify-center border-2 border-dashed border-yellow-200">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Route Map Visualization</p>
            <p className="text-sm text-gray-500">{routeName}</p>
            <p className="text-xs text-gray-400 mt-1">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
