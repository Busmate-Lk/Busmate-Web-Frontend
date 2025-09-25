'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  Users, 
  Zap, 
  AlertTriangle,
  Database,
  RefreshCw,
  CheckCircle
} from 'lucide-react';
import { LiveStat } from '@/app/mot/(authenticated)/dashboard/data';

interface LiveStatsProps {
  stats: LiveStat[];
  loading?: boolean;
  onRefresh?: () => void;
}

const iconMap = {
  'Active Trips': Activity,
  'System Uptime': CheckCircle,
  'Fleet Utilization': Users,
  'Avg Response Time': Clock,
  'Pending Applications': AlertTriangle,
  'Data Sync Status': Database,
};

const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
  switch (status) {
    case 'healthy':
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        dot: 'bg-green-400',
        text: 'text-green-900',
        value: 'text-green-600'
      };
    case 'warning':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        dot: 'bg-amber-400',
        text: 'text-amber-900',
        value: 'text-amber-600'
      };
    case 'critical':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        dot: 'bg-red-400',
        text: 'text-red-900',
        value: 'text-red-600'
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        text: 'text-gray-900',
        value: 'text-gray-600'
      };
  }
};

export function LiveStats({ stats, loading = false, onRefresh }: LiveStatsProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setLastUpdated(new Date());
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatStatValue = (value: number, unit: string) => {
    if (unit === '%') {
      return `${value}%`;
    } else if (unit === 'ms') {
      return `${value}ms`;
    } else {
      return value.toLocaleString();
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live System Status</h3>
          <p className="text-sm text-gray-600 mt-1">
            Last updated: {formatLastUpdated(lastUpdated)}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:animate-spin"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const colors = getStatusColor(stat.status);
          const IconComponent = iconMap[stat.title as keyof typeof iconMap] || Activity;

          return (
            <div
              key={index}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IconComponent className={`w-5 h-5 ${colors.value} mr-3`} />
                  <div>
                    <p className={`text-sm font-medium ${colors.text}`}>
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold ${colors.value} mt-1`}>
                      {formatStatValue(stat.value, stat.unit)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`w-3 h-3 ${colors.dot} rounded-full mb-1`}
                    title={`Status: ${stat.status}`}
                  />
                  <span className="text-xs text-gray-500">
                    {stat.unit}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated: {new Date(stat.lastUpdated).toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Health Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-900">
              System Status: Operational
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
              <span>Healthy: {stats.filter(s => s.status === 'healthy').length}</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-1"></div>
              <span>Warning: {stats.filter(s => s.status === 'warning').length}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
              <span>Critical: {stats.filter(s => s.status === 'critical').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}