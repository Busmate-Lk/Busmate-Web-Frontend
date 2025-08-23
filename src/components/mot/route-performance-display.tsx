"use client";

import { Navigation, Timer, Gauge, Fuel } from 'lucide-react';

interface RoutePerformanceDisplayProps {
  route: {
    totalDistance: string;
    estimatedTravelTime: string;
    averageSpeed: string;
    fuelConsumption: string;
    intermediateStops: any[];
  };
  calculateTotalTravelTime: () => number;
}

export function RoutePerformanceDisplay({ route, calculateTotalTravelTime }: RoutePerformanceDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-medium text-gray-900 mb-6">Route Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Navigation className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900">{route.totalDistance} km</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Timer className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Estimated Travel Time</p>
              <p className="text-2xl font-bold text-gray-900">{route.estimatedTravelTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Average Speed</p>
              <p className="text-2xl font-bold text-gray-900">{route.averageSpeed} km/h</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Fuel className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Fuel Consumption</p>
              <p className="text-2xl font-bold text-gray-900">{route.fuelConsumption} L/100km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Analysis</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Intermediate Stops Travel Time</span>
            <span className="text-sm text-gray-600">{calculateTotalTravelTime()} minutes</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Distance per Stop (Average)</span>
            <span className="text-sm text-gray-600">
              {route.intermediateStops.length > 0 
                ? (parseFloat(route.totalDistance) / (route.intermediateStops.length + 1)).toFixed(1) 
                : parseFloat(route.totalDistance).toFixed(1)} km
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">Time per Stop (Average)</span>
            <span className="text-sm text-gray-600">
              {route.intermediateStops.length > 0 
                ? (calculateTotalTravelTime() / route.intermediateStops.length).toFixed(1) 
                : 0} minutes
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-700">Estimated Fuel Cost per Trip</span>
            <span className="text-sm text-gray-600">
              {((parseFloat(route.fuelConsumption) / 100) * parseFloat(route.totalDistance) * 150).toFixed(0)} LKR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
