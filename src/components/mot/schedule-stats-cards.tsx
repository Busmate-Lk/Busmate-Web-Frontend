"use client";

import { TrendingUp, Calendar, Clock, MapPin, Bus, Activity } from "lucide-react";

interface ScheduleStats {
  activeSchedules?: number;
  totalRoutes?: number;
  totalSchedules?: number;
  totalAssignedBuses?: number;
  // Additional optional stats
  pendingSchedules?: number;
  inactiveSchedules?: number;
  onTimePerformance?: number;
}

interface ScheduleStatsCardsProps {
  stats?: ScheduleStats;
  isLoading?: boolean;
}

export function ScheduleStatsCards({ stats, isLoading = false }: ScheduleStatsCardsProps) {
  // Dummy data for demonstration - replace with real API data later
  const dummyStats = {
    activeSchedules: 45,
    totalRoutes: 28,
    totalSchedules: 52,
    totalAssignedBuses: 156,
    pendingSchedules: 7,
    inactiveSchedules: 5,
    onTimePerformance: 92,
  };

  // Use dummy data instead of real stats for now
  const displayStats = dummyStats;

  // Calculate derived statistics
  const inactiveSchedules = displayStats.inactiveSchedules || 0;
  const utilizationRate = displayStats.totalSchedules 
    ? Math.round((displayStats.activeSchedules! / displayStats.totalSchedules) * 100)
    : 87; // Dummy utilization rate

  const cards = [
    {
      title: "Active Schedules",
      value: displayStats.activeSchedules || 0,
      icon: Activity,
      color: "blue",
      trend: "+3 this week",
      trendDirection: "up" as const,
      description: "Currently operational",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-l-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Total Routes",
      value: displayStats.totalRoutes || 0,
      icon: MapPin,
      color: "green",
      trend: "+2 new routes",
      trendDirection: "up" as const,
      description: "Routes with schedules",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-l-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Total Schedules",
      value: displayStats.totalSchedules || 0,
      icon: Calendar,
      color: "purple",
      trend: "+5 this month",
      trendDirection: "up" as const,
      description: "All schedule configurations",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-l-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Bus Assignments",
      value: displayStats.totalAssignedBuses || 0,
      icon: Bus,
      color: "orange",
      trend: `${utilizationRate}% utilization`,
      trendDirection: "up" as const,
      description: "Buses assigned to schedules",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-l-orange-500",
      textColor: "text-orange-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div
            key={index}
            className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 ${card.borderColor}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {card.value.toLocaleString()}
                    </h3>
                    <div className={`p-2 ${card.bgColor} rounded-lg`}>
                      <Icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    
                    <p className="text-xs text-gray-500">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className={`h-3 w-3 ${card.textColor}`} />
                      <span className={`text-xs font-medium ${card.textColor}`}>
                        {card.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress indicator for utilization */}
            {card.title === "Active Schedules" && displayStats.totalSchedules && (
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Utilization</span>
                  <span>{utilizationRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
