"use client";

import { FileText, Clock, AlertTriangle, Edit, TrendingUp } from "lucide-react";

interface PolicyStatsCardsProps {
  stats?: {
    published: { count: number; change: string };
    underReview: { count: number; avgDays: number };
    draft: { count: number };
    updatedThisMonth: { count: number };
  };
}

export function PolicyStatsCards({ stats }: PolicyStatsCardsProps) {
  const defaultStats = {
    published: { count: 25, change: "+3 this month" },
    underReview: { count: 8, avgDays: 5 },
    draft: { count: 5 },
    updatedThisMonth: { count: 12 },
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-green-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.published.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Published Policies
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {currentStats.published.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.underReview.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  Avg review: {currentStats.underReview.avgDays} days
                </span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-yellow-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.draft.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Draft Policies
              </p>
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600">
                  Awaiting approval
                </span>
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-purple-500">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentStats.updatedThisMonth.count}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                Updated This Month
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">
                  Regular updates
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Edit className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
