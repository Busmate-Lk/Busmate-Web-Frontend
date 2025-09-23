'use client';

import React from 'react';
import { Calendar, CheckCircle, Clock, XCircle, Users, Zap } from 'lucide-react';

interface ScheduleStatsCardsProps {
  stats: {
    totalSchedules: { count: number; change?: string };
    activeSchedules: { count: number; change?: string };
    inactiveSchedules: { count: number; change?: string };
    regularSchedules: { count: number; change?: string };
    specialSchedules: { count: number; change?: string };
    totalRoutes: { count: number; change?: string };
  };
}

export function ScheduleStatsCards({ stats }: ScheduleStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {/* Total Schedules */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalSchedules.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Total Schedules</p>
            {stats.totalSchedules.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalSchedules.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Active Schedules */}
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
                {stats.activeSchedules.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Active</p>
            {stats.activeSchedules.change && (
              <p className="text-xs text-green-600 mt-1">{stats.activeSchedules.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Inactive Schedules */}
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
                {stats.inactiveSchedules.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Inactive</p>
            {stats.inactiveSchedules.change && (
              <p className="text-xs text-red-600 mt-1">{stats.inactiveSchedules.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Regular Schedules */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.regularSchedules.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Regular</p>
            {stats.regularSchedules.change && (
              <p className="text-xs text-green-600 mt-1">{stats.regularSchedules.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Special Schedules */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.specialSchedules.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Special</p>
            {stats.specialSchedules.change && (
              <p className="text-xs text-green-600 mt-1">{stats.specialSchedules.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Total Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalRoutes.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Routes Covered</p>
            {stats.totalRoutes.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalRoutes.change}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}