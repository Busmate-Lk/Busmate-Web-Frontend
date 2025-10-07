'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X, 
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';
import { SystemAlert } from '@/app/mot/(authenticated)/dashboard/data';

interface SystemAlertsProps {
  alerts: SystemAlert[];
  onResolveAlert?: (alertId: string) => void;
  loading?: boolean;
}

const alertIcons = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info
};

const alertColors = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    text: 'text-red-700'
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    text: 'text-amber-700'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    text: 'text-blue-700'
  }
};

export function SystemAlerts({ alerts, onResolveAlert, loading = false }: SystemAlertsProps) {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [showResolved, setShowResolved] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    }
    return `${minutes}m ago`;
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.type !== filter) return false;
    if (!showResolved && alert.resolved) return false;
    return true;
  });

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalCount = activeAlerts.filter(alert => alert.type === 'critical').length;
  const warningCount = activeAlerts.filter(alert => alert.type === 'warning').length;
  const infoCount = activeAlerts.filter(alert => alert.type === 'info').length;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-gray-200 rounded mr-3 mt-1"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
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
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          <p className="text-sm text-gray-600 mt-1">
            {activeAlerts.length} active alert{activeAlerts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResolved(!showResolved)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              showResolved 
                ? 'bg-gray-100 text-gray-900' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {showResolved ? 'Hide Resolved' : 'Show Resolved'}
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setFilter(filter === 'critical' ? 'all' : 'critical')}
          className={`p-3 rounded-lg border transition-colors ${
            filter === 'critical' 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Critical</span>
            </div>
            <span className="text-lg font-bold text-red-600">{criticalCount}</span>
          </div>
        </button>

        <button
          onClick={() => setFilter(filter === 'warning' ? 'all' : 'warning')}
          className={`p-3 rounded-lg border transition-colors ${
            filter === 'warning' 
              ? 'border-amber-300 bg-amber-50' 
              : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Warning</span>
            </div>
            <span className="text-lg font-bold text-amber-600">{warningCount}</span>
          </div>
        </button>

        <button
          onClick={() => setFilter(filter === 'info' ? 'all' : 'info')}
          className={`p-3 rounded-lg border transition-colors ${
            filter === 'info' 
              ? 'border-blue-300 bg-blue-50' 
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Info className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-900">Info</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{infoCount}</span>
          </div>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-500">
              {filter === 'all' ? 'No alerts to display' : `No ${filter} alerts`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const IconComponent = alertIcons[alert.type];
            const colors = alertColors[alert.type];

            return (
              <div
                key={alert.id}
                className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all duration-200 ${
                  alert.resolved ? 'opacity-70' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start">
                  <div className={`${colors.icon} mr-3 mt-1`}>
                    {alert.resolved ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`${colors.title} font-semibold text-sm ${
                          alert.resolved ? 'line-through' : ''
                        }`}>
                          {alert.title}
                        </h4>
                        <p className={`${colors.text} text-sm mt-1`}>
                          {alert.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimestamp(alert.timestamp)}
                          {alert.resolved && (
                            <span className="ml-2 text-green-600 font-medium">Resolved</span>
                          )}
                        </div>
                      </div>
                      {!alert.resolved && onResolveAlert && (
                        <button
                          onClick={() => onResolveAlert(alert.id)}
                          className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}