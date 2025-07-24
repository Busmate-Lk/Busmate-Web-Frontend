'use client';

import { useState } from 'react';
import { StaffStats } from '@/components/shared/StaffStats';
import {
  Plus,
  Users,
  Clock,
  Wrench,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { dummyTimeKeepers, dummyOperators } from '@/lib/data/staffData';
import { TimeKeeper, Operator } from '@/types/models/staff';
import Link from 'next/link';

export default function StaffDashboardPage() {
  const [timeKeepers] = useState<TimeKeeper[]>(dummyTimeKeepers);
  const [operators] = useState<Operator[]>(dummyOperators);

  const totalStaff = timeKeepers.length + operators.length;
  const activeStaff =
    timeKeepers.filter((tk) => tk.status === 'active').length +
    operators.filter((op) => op.status === 'active').length;
  const inactiveStaff =
    timeKeepers.filter((tk) => tk.status === 'inactive').length +
    operators.filter((op) => op.status === 'inactive').length;
  const suspendedStaff =
    timeKeepers.filter((tk) => tk.status === 'suspended').length +
    operators.filter((op) => op.status === 'suspended').length;

  const avgOperatorExperience =
    operators.reduce((sum, op) => sum + (op.experienceYears || 0), 0) /
    operators.length;

  // Recent additions (last 7 days simulation)
  const recentTimeKeepers = timeKeepers.filter((tk) => {
    const createdDate = new Date(tk.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate > weekAgo;
  }).length;

  const recentOperators = operators.filter((op) => {
    const createdDate = new Date(op.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate > weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Staff Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage time keepers and bus operators
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/mot/staff-form?type=timekeeper"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Time Keeper
            </Link>
            <Link
              href="/mot/staff-form?type=operator"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Operator
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-gray-900">{totalStaff}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {recentTimeKeepers + recentOperators} added this week
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Staff
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {activeStaff}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {((activeStaff / totalStaff) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Experience
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {avgOperatorExperience.toFixed(1)}y
                </p>
                <p className="text-sm text-gray-500 mt-1">Operator average</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Issues</p>
                <p className="text-3xl font-bold text-red-600">
                  {suspendedStaff}
                </p>
                <p className="text-sm text-red-600 mt-1 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Suspended staff
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/mot/staff-management" className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <Clock className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Time Keepers
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Manage time keeper staff and their assigned bus stations
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">
                        {timeKeepers.length}
                      </p>
                      <p className="text-gray-500">Total</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-600">
                        {
                          timeKeepers.filter((tk) => tk.status === 'active')
                            .length
                        }
                      </p>
                      <p className="text-gray-500">Active</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">
                        {
                          [
                            ...new Set(
                              timeKeepers.map((tk) => tk.workingBusStation)
                            ),
                          ].length
                        }
                      </p>
                      <p className="text-gray-500">Stations</p>
                    </div>
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/mot/operator-management" className="group">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-3">
                    <Wrench className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Bus Operators
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Manage bus operators and their professional information
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-900">
                        {operators.length}
                      </p>
                      <p className="text-gray-500">Total</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-600">
                        {
                          operators.filter((op) => op.status === 'active')
                            .length
                        }
                      </p>
                      <p className="text-gray-500">Active</p>
                    </div>
                    <div>
                      <p className="font-medium text-purple-600">
                        {avgOperatorExperience.toFixed(1)}y
                      </p>
                      <p className="text-gray-500">Avg Exp.</p>
                    </div>
                  </div>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/mot/staff-form?type=timekeeper"
              className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-3 text-blue-600" />
              Add Time Keeper
            </Link>
            <Link
              href="/mot/staff-form?type=operator"
              className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-3 text-green-600" />
              Add Operator
            </Link>
            <Link
              href="/mot/staff-management"
              className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 mr-3 text-gray-600" />
              View All Time Keepers
            </Link>
            <Link
              href="/mot/operator-management"
              className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 mr-3 text-gray-600" />
              View All Operators
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {[
              {
                type: 'timekeeper',
                action: 'added',
                name: timeKeepers[0]?.name || 'Staff Member',
                time: '2 hours ago',
                icon: <Plus className="w-4 h-4 text-blue-600" />,
              },
              {
                type: 'operator',
                action: 'updated',
                name: operators[0]?.name || 'Operator',
                time: '4 hours ago',
                icon: (
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
              },
              {
                type: 'timekeeper',
                action: 'status changed',
                name: timeKeepers[1]?.name || 'Staff Member',
                time: '1 day ago',
                icon: (
                  <svg
                    className="w-4 h-4 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.name}</span> was{' '}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      activity.type === 'timekeeper'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {activity.type === 'timekeeper'
                      ? 'Time Keeper'
                      : 'Operator'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
