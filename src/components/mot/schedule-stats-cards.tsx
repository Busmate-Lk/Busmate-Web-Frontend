"use client";

import { TrendingUp, Calendar, Clock, MapPin, Bus } from "lucide-react";

interface ScheduleStats {
  activeSchedules: number;
  onTimePerformance: number;
  routesCovered: number;
  scheduleSlots: number;
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
    scheduleSlots: 89,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.activeSchedules}</h3>
              <p className="text-sm font-medium text-gray-600">
                Active Schedules
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  +8% this month
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
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.onTimePerformance}%</h3>
              <p className="text-sm font-medium text-gray-600">
                On-Time Performance
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  +2% from last week
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.routesCovered}</h3>
              <p className="text-sm font-medium text-gray-600">
                Routes Covered
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">
                  +3 new routes
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{displayStats.scheduleSlots}</h3>
              <p className="text-sm font-medium text-gray-600">
                Schedule Slots
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-orange-600" />
                <span className="text-xs font-medium text-orange-600">
                  +5 this week
                </span>
              </div>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
