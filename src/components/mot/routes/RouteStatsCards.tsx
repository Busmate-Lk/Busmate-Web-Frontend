'use client';

import React from 'react';
import { Route, Navigation, MapPin, Users, Clock, Zap } from 'lucide-react';

interface RouteStatsCardsProps {
  stats: {
    totalRoutes: { count: number; change?: string };
    outboundRoutes: { count: number; change?: string };
    inboundRoutes: { count: number; change?: string };
    averageDistance: { count: number; unit: string };
    totalRouteGroups: { count: number; change?: string };
    averageDuration: { count: number; unit: string };
  };
}

export function RouteStatsCards({ stats }: RouteStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {/* Total Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Route className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalRoutes.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Total Routes</p>
            {stats.totalRoutes.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalRoutes.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Outbound Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.outboundRoutes.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Outbound</p>
            {stats.outboundRoutes.change && (
              <p className="text-xs text-green-600 mt-1">{stats.outboundRoutes.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Inbound Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-purple-600 rotate-180" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.inboundRoutes.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Inbound</p>
            {stats.inboundRoutes.change && (
              <p className="text-xs text-green-600 mt-1">{stats.inboundRoutes.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Average Distance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.averageDistance.count.toFixed(1)}
              </p>
              <p className="ml-1 text-sm text-gray-500">
                {stats.averageDistance.unit}
              </p>
            </div>
            <p className="text-sm text-gray-500">Avg Distance</p>
          </div>
        </div>
      </div>

      {/* Route Groups */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalRouteGroups.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Route Groups</p>
            {stats.totalRouteGroups.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalRouteGroups.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Average Duration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.averageDuration.count.toFixed(0)}
              </p>
              <p className="ml-1 text-sm text-gray-500">
                {stats.averageDuration.unit}
              </p>
            </div>
            <p className="text-sm text-gray-500">Avg Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
}