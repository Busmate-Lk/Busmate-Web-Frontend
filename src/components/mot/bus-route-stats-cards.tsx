"use client";

import { TrendingUp, AlertTriangle, BarChart3, Route } from "lucide-react";

interface BusRouteStatsCardsProps {
  stats?: {
    total: { count: number; change: string };
    active: { count: number; change: string };
    inactive: { count: number };
    maintenance: { count: number };
  };
}

export function BusRouteStatsCards({ stats }: BusRouteStatsCardsProps) {
  const defaultStats = {
    total: { count: 15, change: "+2 this month" },
    active: { count: 12, change: "+1 this month" },
    inactive: { count: 2 },
    maintenance: { count: 1 },
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.total.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Total Routes
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  {currentStats.total.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.active.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Active Routes
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {currentStats.active.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-gray-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.inactive.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Inactive Routes
              </p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">
                  Not in service
                </span>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.maintenance.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Under Maintenance
              </p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600">
                  Temporary suspension
                </span>
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
