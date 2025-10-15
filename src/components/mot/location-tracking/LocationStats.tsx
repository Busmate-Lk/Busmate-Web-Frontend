'use client';

import React from 'react';
import { 
  MapPin, 
  Activity, 
  Clock, 
  Zap, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

interface LocationStatsProps {
  stats: {
    totalActiveTrips: number;
    onlineDevices: number;
    offlineDevices: number;
    averageSpeed: number;
    tripsOnTime: number;
    tripsDelayed: number;
  };
  lastUpdate: Date | null;
}

export function LocationStats({ stats, lastUpdate }: LocationStatsProps) {
  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  };

  const getOnlinePercentage = () => {
    const total = stats.onlineDevices + stats.offlineDevices;
    if (total === 0) return 0;
    return Math.round((stats.onlineDevices / total) * 100);
  };

  const getOnTimePercentage = () => {
    const total = stats.tripsOnTime + stats.tripsDelayed;
    if (total === 0) return 0;
    return Math.round((stats.tripsOnTime / total) * 100);
  };

  const statsCards = [
    {
      title: "Active Trips",
      value: stats.totalActiveTrips,
      icon: MapPin,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500",
      subtitle: "Currently tracking",
    },
    {
      title: "Online Devices",
      value: stats.onlineDevices,
      icon: Activity,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
      subtitle: `${stats.offlineDevices} offline (${getOnlinePercentage()}%)`,
    },
    {
      title: "Avg Speed",
      value: `${stats.averageSpeed.toFixed(1)} km/h`,
      icon: Zap,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500",
      subtitle: "Fleet average",
    },
    {
      title: "On Time",
      value: stats.tripsOnTime,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
      subtitle: `${stats.tripsDelayed} delayed (${getOnTimePercentage()}%)`,
    },
    {
      title: "Delayed",
      value: stats.tripsDelayed,
      icon: AlertTriangle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "border-orange-500",
      subtitle: "Needs attention",
    },
    {
      title: "Last Update",
      value: formatTime(lastUpdate),
      icon: Clock,
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
      borderColor: "border-gray-500",
      subtitle: lastUpdate ? 'Auto refresh' : 'Manual refresh',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-lg shadow-sm border-l-4 ${stat.borderColor} p-6 hover:shadow-md transition-shadow duration-200`}
        >
          <div className="flex items-center">
            <div className={`flex-shrink-0 p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}