'use client';

import { Bus, CheckCircle, AlertTriangle, Users, Activity } from "lucide-react";
import type { BusResponse } from '@/lib/api-client/route-management';

interface BusStatsCardsProps {
  buses: BusResponse[];
}

export default function BusStatsCards({ buses = [] }: BusStatsCardsProps) {
  // Calculate statistics
  const totalBuses = buses.length;
  const activeBuses = buses.filter(bus => bus.status === 'active').length;
  const inactiveBuses = buses.filter(bus => bus.status === 'inactive').length;
  const pendingBuses = buses.filter(bus => bus.status === 'pending').length;
  const totalCapacity = buses.reduce((sum, bus) => sum + (bus.capacity || 0), 0);
  const avgCapacity = totalBuses > 0 ? Math.round(totalCapacity / totalBuses) : 0;

  // Calculate percentage changes (mock data for now)
  const getPercentageChange = (current: number, type: string) => {
    // Mock percentage changes - in real app, you'd compare with historical data
    const changes = {
      total: Math.floor(Math.random() * 20) - 10,
      active: Math.floor(Math.random() * 15) - 5,
      inactive: Math.floor(Math.random() * 10) - 5,
      capacity: Math.floor(Math.random() * 25) - 10,
    };
    return changes[type as keyof typeof changes] || 0;
  };

  const formatPercentageChange = (change: number) => {
    const isPositive = change >= 0;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const sign = isPositive ? '+' : '';
    return (
      <span className={`text-sm ${color}`}>
        {sign}{change}% from last month
      </span>
    );
  };

  const statsCards = [
    {
      title: 'Total Buses',
      value: totalBuses,
      icon: Bus,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      change: getPercentageChange(totalBuses, 'total'),
      // subtitle: `${buses.filter(b => b.operatorType === 'PRIVATE').length} Private, ${buses.filter(b => b.operatorType === 'CTB').length} CTB`,  // Later this will be implemented
    },
    {
      title: 'Active Buses',
      value: activeBuses,
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-500',
      change: getPercentageChange(activeBuses, 'active'),
      subtitle: `${totalBuses > 0 ? ((activeBuses / totalBuses) * 100).toFixed(1) : 0}% of fleet`,
    },
    {
      title: 'Inactive/Maintenance',
      value: inactiveBuses + pendingBuses,
      icon: AlertTriangle,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-500',
      change: getPercentageChange(inactiveBuses, 'inactive'),
      subtitle: `${inactiveBuses} inactive, ${pendingBuses} pending`,
    },
    {
      title: 'Total Capacity',
      value: totalCapacity,
      icon: Users,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-500',
      change: getPercentageChange(totalCapacity, 'capacity'),
      subtitle: `Avg: ${avgCapacity} seats per bus`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className={`border-l-4 ${stat.borderColor} bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.iconColor} mb-1`}>
                {stat.value.toLocaleString()}
              </p>
              {stat.change !== 0 && (
                <div className="mb-1">
                  {formatPercentageChange(stat.change)}
                </div>
              )}
              {stat.subtitle && (
                <p className="text-xs text-gray-500">
                  {stat.subtitle}
                </p>
              )}
            </div>
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}