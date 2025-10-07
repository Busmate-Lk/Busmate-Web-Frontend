'use client';

import React from 'react';
import { MapPin, CheckCircle, XCircle, Building, Globe } from 'lucide-react';

interface BusStopStatsCardsProps {
  stats: {
    totalStops: { count: number; change?: string };
    accessibleStops: { count: number; change?: string };
    nonAccessibleStops: { count: number; change?: string };
    totalStates: { count: number; change?: string };
    totalCities: { count: number; change?: string };
  };
}

export function BusStopStatsCards({ stats }: BusStopStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {/* Total Bus Stops */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalStops.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Total Bus Stops</p>
            {stats.totalStops.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalStops.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Accessible Stops */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.accessibleStops.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Accessible</p>
            {stats.accessibleStops.change && (
              <p className="text-xs text-green-600 mt-1">{stats.accessibleStops.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Non-Accessible Stops */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.nonAccessibleStops.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Non-Accessible</p>
            {stats.nonAccessibleStops.change && (
              <p className="text-xs text-red-600 mt-1">{stats.nonAccessibleStops.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Total States */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalStates.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">States</p>
            {stats.totalStates.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalStates.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Total Cities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalCities.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Cities</p>
            {stats.totalCities.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalCities.change}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}