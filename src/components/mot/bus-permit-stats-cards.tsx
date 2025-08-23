"use client";

import {
  TrendingUp,
  AlertTriangle,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

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
    active: { count: 0, change: "No change this month" },
    pending: { count: 0 },
    expired: { count: 0 },
    total: { count: 0, change: "No change from last month" },
  };

  const currentStats = stats || defaultStats;

  const statsCards = [
    {
      title: "Active Permits",
      value: currentStats.active.count,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
      change: currentStats.active.change,
      subtitle: "Currently valid permits",
    },
    {
      title: "Pending Approval",
      value: currentStats.pending.count,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500",
      change: "Awaiting review",
      subtitle: "Pending applications",
    },
    {
      title: "Expired Permits",
      value: currentStats.expired.count,
      icon: XCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-red-500",
      change: "Need renewal",
      subtitle: "Require immediate attention",
    },
    {
      title: "Total Permits",
      value: currentStats.total.count,
      icon: BarChart3,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500",
      change: currentStats.total.change,
      subtitle: "All permits in system",
    },
  ];

  const getChangeIcon = (change: string) => {
    if (change.includes("+")) return <TrendingUp className="h-3 w-3" />;
    if (change.includes("-")) return (
      <TrendingUp className="h-3 w-3 rotate-180" />
    );
    return <AlertTriangle className="h-3 w-3" />;
  };

  const getChangeColor = (change: string) => {
    if (change.includes("+")) return "text-green-600";
    if (change.includes("-")) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className={`border-l-4 ${stat.borderColor} bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${stat.iconColor} mb-1`}>
                {stat.value.toLocaleString()}
              </p>
              <div
                className={`flex items-center gap-1 mb-1 ${getChangeColor(
                  stat.change
                )}`}
              >
                {getChangeIcon(stat.change)}
                <span className="text-xs font-medium">{stat.change}</span>
              </div>
              {stat.subtitle && (
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              )}
            </div>
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
