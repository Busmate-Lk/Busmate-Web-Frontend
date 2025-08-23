"use client";

import { TrendingUp, Bus, Users, AlertTriangle, MapPin } from "lucide-react";

interface TrackingStatsCardsProps {
  stats?: {
    activeBuses: { count: number; operational: string };
    passengers: { count: number; change: string };
    delayedBuses: { count: number; avgDelay: string };
    routesCovered: { count: number };
  };
}

export function TrackingStatsCards({ stats }: TrackingStatsCardsProps) {
  // Fallback stats for when no data is available
  const defaultStats = {
    activeBuses: { count: 0, operational: "No data" },
    passengers: { count: 0, change: "No data" },
    delayedBuses: { count: 0, avgDelay: "No delays" },
    routesCovered: { count: 0 },
  };

  const currentStats = stats || defaultStats;

  // Helper function to get trend color
  const getTrendColor = (value: string) => {
    if (value.includes('+')) return 'text-green-600';
    if (value.includes('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (value: string) => {
    if (value.includes('+')) return <TrendingUp className="h-3 w-3 text-green-600" />;
    if (value.includes('-')) return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
    return <TrendingUp className="h-3 w-3 text-gray-600" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="border-l-4 border-l-green-500 bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.activeBuses.count.toLocaleString()}
              </h3>
              <p className="text-sm font-medium text-gray-600">Active Buses</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {currentStats.activeBuses.operational}
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Bus className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-l-blue-500 bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.passengers.count.toLocaleString()}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Passengers Onboard
              </p>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(currentStats.passengers.change)}
                <span className={`text-xs font-medium ${getTrendColor(currentStats.passengers.change)}`}>
                  {currentStats.passengers.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className={`border-l-4 ${currentStats.delayedBuses.count > 0 ? 'border-l-red-500' : 'border-l-green-500'} bg-white rounded-lg shadow border border-gray-200`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.delayedBuses.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">Delayed Buses</p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className={`h-3 w-3 ${currentStats.delayedBuses.count > 0 ? 'text-red-600' : 'text-green-600'}`} />
                <span className={`text-xs font-medium ${currentStats.delayedBuses.count > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {currentStats.delayedBuses.avgDelay}
                </span>
              </div>
            </div>
            <div className={`p-2 ${currentStats.delayedBuses.count > 0 ? 'bg-red-50' : 'bg-green-50'} rounded-lg`}>
              <AlertTriangle className={`h-5 w-5 ${currentStats.delayedBuses.count > 0 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-4 border-l-purple-500 bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.routesCovered.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Routes Covered
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">
                  Island-wide
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
