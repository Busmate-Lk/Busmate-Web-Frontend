"use client";

import { TrendingUp, AlertTriangle, BarChart3, FileText } from "lucide-react";

interface BusPermitStatsCardsProps {
  stats?: {
    active: { count: number; change: string };
    pending: { count: number };
    expired: { count: number };
    total: { count: number; change: string };
  };
}

export function BusPermitStatsCards({ stats }: BusPermitStatsCardsProps) {
  const defaultStats = {
    active: { count: 156, change: "+12 this month" },
    pending: { count: 23 },
    expired: { count: 7 },
    total: { count: 186, change: "+15% from last month" },
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.active.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Active Permits
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {currentStats.active.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.pending.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Pending Approval
              </p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600">
                  Awaiting review
                </span>
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-red-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.expired.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Expired Permits
              </p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-red-600" />
                <span className="text-xs font-medium text-red-600">
                  Need renewal
                </span>
              </div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.total.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">Total Permits</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  {currentStats.total.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
