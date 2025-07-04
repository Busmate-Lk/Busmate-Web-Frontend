"use client";

import { TrendingUp, Calendar, Clock, MapPin, Bus } from "lucide-react";

interface ScheduleStats {
  activeSchedules: number;
  onTimePerformance: number;
  routesCovered: number;
  busesAssigned: number;
}

interface ScheduleStatsCardsProps {
  stats?: ScheduleStats;
}

export function ScheduleStatsCards({ stats }: ScheduleStatsCardsProps) {
  // Default values if no stats provided
  const defaultStats = {
    activeSchedules: 156,
    onTimePerformance: 98.5,
    routesCovered: 42,
    busesAssigned: 89,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-800">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.activeSchedules}</h3>
              <p className="text-sm font-medium text-gray-600">
                Active Schedules
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-800" />
                <span className="text-xs font-medium text-blue-800">
                  +8% this month
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-800" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-emerald-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.onTimePerformance}%</h3>
              <p className="text-sm font-medium text-gray-600">
                On-Time Performance
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-600">
                  +2.1% this week
                </span>
              </div>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-teal-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.routesCovered}</h3>
              <p className="text-sm font-medium text-gray-600">
                Routes Covered
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-teal-600" />
                <span className="text-xs font-medium text-teal-600">
                  +3 new routes
                </span>
              </div>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg">
              <MapPin className="h-5 w-5 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-cyan-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.busesAssigned}</h3>
              <p className="text-sm font-medium text-gray-600">
                Buses Assigned
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-cyan-600" />
                <span className="text-xs font-medium text-cyan-600">
                  +5 this month
                </span>
              </div>
            </div>
            <div className="p-2 bg-cyan-50 rounded-lg">
              <Bus className="h-5 w-5 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
