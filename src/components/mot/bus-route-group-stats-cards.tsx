'use client';

import { TrendingUp, AlertTriangle, BarChart3, Route } from 'lucide-react';

interface BusRouteGroupStatsCardsProps {
  stats?: {
    total: { count: number; change: string };
    active: { count: number; change: string };
    routes: { count: number };
    groups: { count: number };
  };
}

export function BusRouteGroupStatsCards({
  stats,
}: BusRouteGroupStatsCardsProps) {
  const defaultStats = {
    total: { count: 15, change: '+2 this month' },
    active: { count: 12, change: '+1 this month' },
    routes: { count: 45 },
    groups: { count: 8 },
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
                Total Route Groups
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
              <p className="text-sm font-medium text-gray-600">Active Routes</p>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.routes.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Routes</p>
              <div className="flex items-center gap-1 mt-1">
                <Route className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">
                  All routes
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Route className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-indigo-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.groups.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">Route Groups</p>
              <div className="flex items-center gap-1 mt-1">
                <BarChart3 className="h-3 w-3 text-indigo-600" />
                <span className="text-xs font-medium text-indigo-600">
                  Group categories
                </span>
              </div>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
