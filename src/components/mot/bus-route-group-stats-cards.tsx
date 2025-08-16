'use client';

import { TrendingUp, Route, BarChart3, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  change?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'indigo' | 'orange';
  subtitle?: string;
}

interface BusRouteGroupStatsCardsProps {
  stats?: {
    total: { count: number; change: string };
    active: { count: number; change: string };
    routes: { count: number };
    groups: { count: number };
  };
  isLoading?: boolean;
}

function StatsCard({ title, value, change, icon, color, subtitle }: StatsCardProps) {
  const colorClasses = {
    blue: {
      border: 'border-l-blue-500',
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      trend: 'text-blue-600',
    },
    green: {
      border: 'border-l-green-500',
      bg: 'bg-green-50',
      icon: 'text-green-600',
      trend: 'text-green-600',
    },
    purple: {
      border: 'border-l-purple-500',
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      trend: 'text-purple-600',
    },
    indigo: {
      border: 'border-l-indigo-500',
      bg: 'bg-indigo-50',
      icon: 'text-indigo-600',
      trend: 'text-indigo-600',
    },
    orange: {
      border: 'border-l-orange-500',
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      trend: 'text-orange-600',
    },
  };

  const classes = colorClasses[color];
  const isPositiveChange = change?.includes('+');
  const isNegativeChange = change?.includes('-');

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${classes.border} hover:shadow-md transition-shadow duration-200`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {value.toLocaleString()}
              </h3>
              {change && (
                <div className={`flex items-center gap-1 ${classes.trend}`}>
                  {isPositiveChange && <ArrowUpRight className="h-3 w-3" />}
                  {isNegativeChange && <ArrowDownRight className="h-3 w-3" />}
                  <span className="text-xs font-medium">{change}</span>
                </div>
              )}
            </div>
            
            <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>
            
            {subtitle && (
              <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
            )}
          </div>
          
          <div className={`p-3 ${classes.bg} rounded-lg flex-shrink-0`}>
            <div className={classes.icon}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCardSkeleton({ color }: { color: StatsCardProps['color'] }) {
  const colorClasses = {
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    purple: 'border-l-purple-500',
    indigo: 'border-l-indigo-500',
    orange: 'border-l-orange-500',
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${colorClasses[color]} animate-pulse`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function BusRouteGroupStatsCards({
  stats,
  isLoading = false,
}: BusRouteGroupStatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCardSkeleton color="blue" />
        <StatsCardSkeleton color="green" />
        <StatsCardSkeleton color="purple" />
        <StatsCardSkeleton color="indigo" />
      </div>
    );
  }

  const defaultStats = {
    total: { count: 0, change: 'No data' },
    active: { count: 0, change: 'No data' },
    routes: { count: 0 },
    groups: { count: 0 },
  };

  const currentStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Route Groups"
        value={currentStats.total.count}
        change={currentStats.total.change}
        icon={<Route className="h-6 w-6" />}
        color="blue"
        subtitle="All registered route groups"
      />

      <StatsCard
        title="Active Groups"
        value={currentStats.active.count}
        change={currentStats.active.change}
        icon={<Activity className="h-6 w-6" />}
        color="green"
        subtitle="Groups with active routes"
      />

      <StatsCard
        title="Total Routes"
        value={currentStats.routes.count}
        icon={<BarChart3 className="h-6 w-6" />}
        color="purple"
        subtitle="Routes across all groups"
      />

      <StatsCard
        title="Route Categories"
        value={currentStats.groups.count}
        icon={<Route className="h-6 w-6" />}
        color="indigo"
        subtitle="Distinct route categories"
      />
    </div>
  );
}
