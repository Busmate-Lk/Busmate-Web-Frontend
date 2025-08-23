"use client";

import { TrendingUp, LucideIcon } from "lucide-react";

export interface DashboardMetric {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  trend: string;
  trendColor: string;
}

interface DashboardMetricsCardsProps {
  metrics: DashboardMetric[];
}

export function DashboardMetricsCards({ metrics }: DashboardMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`relative overflow-hidden border-l-4 ${metric.borderColor} rounded-lg  bg-white shadow-sm`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <button className="p-0 h-auto hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">...</span>
                    </div>
                  </button>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </h3>
                  <p className="text-sm font-medium text-black">
                    {metric.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span
                      className={`text-xs font-medium ${metric.trendColor}`}
                    >
                      {metric.trend}{" "}
                      {metric.subtitle.split(" ").slice(-3).join(" ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
