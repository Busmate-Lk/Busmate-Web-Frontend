'use client';

import React from 'react';
import { Building, CheckCircle, XCircle, Clock, MapPin, Users } from 'lucide-react';

interface OperatorStatsCardsProps {
  stats: {
    totalOperators: { count: number; change?: string };
    activeOperators: { count: number; change?: string };
    inactiveOperators: { count: number; change?: string };
    privateOperators: { count: number; change?: string };
    ctbOperators: { count: number; change?: string };
    totalRegions: { count: number; change?: string };
  };
}

export function OperatorStatsCards({ stats }: OperatorStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {/* Total Operators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalOperators.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Total Operators</p>
            {stats.totalOperators.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalOperators.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Active Operators */}
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
                {stats.activeOperators.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Active</p>
            {stats.activeOperators.change && (
              <p className="text-xs text-green-600 mt-1">{stats.activeOperators.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Inactive Operators */}
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
                {stats.inactiveOperators.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Inactive</p>
            {stats.inactiveOperators.change && (
              <p className="text-xs text-red-600 mt-1">{stats.inactiveOperators.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Private Operators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.privateOperators.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Private</p>
            {stats.privateOperators.change && (
              <p className="text-xs text-green-600 mt-1">{stats.privateOperators.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* CTB Operators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.ctbOperators.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">CTB</p>
            {stats.ctbOperators.change && (
              <p className="text-xs text-green-600 mt-1">{stats.ctbOperators.change}</p>
            )}
          </div>
        </div>
      </div>

      {/* Total Regions */}
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
                {stats.totalRegions.count.toLocaleString()}
              </p>
            </div>
            <p className="text-sm text-gray-500">Regions Covered</p>
            {stats.totalRegions.change && (
              <p className="text-xs text-green-600 mt-1">{stats.totalRegions.change}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}