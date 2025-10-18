'use client';

import React from 'react';
import { Building, CheckCircle, XCircle, MapPin } from 'lucide-react';

interface TimekeeperStatsCardsProps {
    stats: {
        totalTimekeepers: { count: number; change?: string };
        activeTimekeepers: { count: number; change?: string };
        inactiveTimekeepers: { count: number; change?: string };
        provincesCount: { count: number; change?: string };
    };
}

export function TimekeeperStatsCards({ stats }: TimekeeperStatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Timekeepers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-2xl font-semibold text-gray-900">
                            {stats.totalTimekeepers.count.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Total Timekeepers</p>
                        {stats.totalTimekeepers.change && (
                            <p className="text-xs text-green-600 mt-1">{stats.totalTimekeepers.change}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Active Timekeepers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-2xl font-semibold text-gray-900">
                            {stats.activeTimekeepers.count.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Active</p>
                        {stats.activeTimekeepers.change && (
                            <p className="text-xs text-green-600 mt-1">{stats.activeTimekeepers.change}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Inactive Timekeepers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-2xl font-semibold text-gray-900">
                            {stats.inactiveTimekeepers.count.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Inactive</p>
                        {stats.inactiveTimekeepers.change && (
                            <p className="text-xs text-red-600 mt-1">{stats.inactiveTimekeepers.change}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Regions Covered */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-2xl font-semibold text-gray-900">
                            {stats.provincesCount.count.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">Provinces Covered</p>
                        {stats.provincesCount.change && (
                            <p className="text-xs text-green-600 mt-1">{stats.provincesCount.change}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}