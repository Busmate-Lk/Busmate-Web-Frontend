"use client";

import { TrendingUp, Calendar, Clock, MapPin, Bus } from "lucide-react";

interface ScheduleStats {
  activeTimeTables?: number;
  totalRoutes?: number;
  totalTimeTables?: number;
  totalAssignedBuses?: number;
  // Legacy support for old structure
  activeSchedules?: number;
  onTimePerformance?: number;
  routesCovered?: number;
  scheduleSlots?: number;
}

interface ScheduleStatsCardsProps {
  stats?: ScheduleStats;
}

export function ScheduleStatsCards({ stats }: ScheduleStatsCardsProps) {
  // Default values if no stats provided
  const defaultStats = {
    activeTimeTables: 8,
    totalRoutes: 12,
    totalTimeTables: 12,
    totalAssignedBuses: 56,
  };

  const displayStats = stats || defaultStats;

  // Support both new and old data structures
  const activeCount = displayStats.activeTimeTables ?? (displayStats as any).activeSchedules ?? defaultStats.activeTimeTables;
  const routesCount = displayStats.totalRoutes ?? (displayStats as any).routesCovered ?? defaultStats.totalRoutes;
  const timeTables = displayStats.totalTimeTables ?? (displayStats as any).scheduleSlots ?? defaultStats.totalTimeTables;
  const assignedBuses = displayStats.totalAssignedBuses ?? defaultStats.totalAssignedBuses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{activeCount}</h3>
              <p className="text-sm font-medium text-gray-600">
                Active Timetables
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  +3 this month
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{routesCount}</h3>
              <p className="text-sm font-medium text-gray-600">
                Total Routes
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  +2 new routes
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{timeTables}</h3>
              <p className="text-sm font-medium text-gray-600">
                Total Timetables
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">
                  +4 this week
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{assignedBuses}</h3>
              <p className="text-sm font-medium text-gray-600">
                Assigned Buses
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-orange-600" />
                <span className="text-xs font-medium text-orange-600">
                  +8 assignments
                </span>
              </div>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Bus className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
