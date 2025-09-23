'use client';

import React from 'react';
import { Route, Navigation, MapPin, Clock } from 'lucide-react';

interface RouteStatsCardsProps {
  stats: {
    total: { count: number; change?: string };
    outbound: { count: number; change?: string };
    inbound: { count: number; change?: string };
    avgDistance: { count: number; unit: string };
  };
}

export function RouteStatsCards({ stats }: RouteStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {stats.total.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Total Routes</p>
            {stats.total.change && (
              <p className="text-xs text-green-600 mt-1">{stats.total.change}</p>
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
                {stats.outbound.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Outbound Routes</p>
            {stats.outbound.change && (
              <p className="text-xs text-green-600 mt-1">{stats.outbound.change}</p>
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
                {stats.inbound.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Inbound Routes</p>
            {stats.inbound.change && (
              <p className="text-xs text-green-600 mt-1">{stats.inbound.change}</p>
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
                {stats.avgDistance.count.toFixed(1)}
              </p>
              <p className="ml-1 text-sm text-gray-500">
                {stats.avgDistance.unit}
              </p>
            </div>
            <p className="text-sm text-gray-500">Average Distance</p>
          </div>
        </div>
      </div>
    </div>
  );
}