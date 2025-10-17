'use client';

import { Layout } from '@/components/shared/layout';
// import { TimeKeeperLayout } from "@/components/timeKeeper/layout";
import { ScheduleStatsCards } from '@/components/timeKeeper/schedule/schedule-stats-cards';
import { RealTimeClock } from '@/components/timeKeeper/dashboard/real-time-clock';
import { CalendarNavigator } from '@/components/timeKeeper/dashboard/calendar-navigator';
import { LateBusAlerts } from '@/components/timeKeeper/dashboard/late-bus-alerts';
import { Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export default function TimeKeeperDashboard() {
  const stats = {
    activeSchedules: 156,
    onTimePerformance: 98.5,
    routesCovered: 42,
    busesAssigned: 89,
  };

  const upcomingSchedules = [
    {
      id: 'SCH001',
      busNo: 'NB-1234',
      route: 'Colombo - Kandy',
      departure: '06:30 AM',
      status: 'On Time',
    },
    {
      id: 'SCH002',
      busNo: 'NB-5678',
      route: 'Galle - Matara',
      departure: '07:15 AM',
      status: 'Delayed',
    },
    {
      id: 'SCH003',
      busNo: 'NB-9012',
      route: 'Jaffna - Vavuniya',
      departure: '08:00 AM',
      status: 'On Time',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Schedule SCH001 updated',
      time: '2 minutes ago',
      type: 'update',
    },
    {
      id: 2,
      action: 'New schedule SCH015 created',
      time: '15 minutes ago',
      type: 'create',
    },
    {
      id: 3,
      action: 'Schedule SCH008 archived',
      time: '1 hour ago',
      type: 'archive',
    },
    {
      id: 4,
      action: 'Route RT-005 schedule modified',
      time: '2 hours ago',
      type: 'update',
    },
  ];

  return (
    <Layout
      activeItem="dashboard"
      pageTitle="Dashboard"
      pageDescription="Overview of schedule management activities"
      role="timeKeeper"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <ScheduleStatsCards stats={stats} />

        {/* Time and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real-time Clock */}
          <RealTimeClock />

          {/* Calendar Navigator */}
          <div className="lg:col-span-2">
            <CalendarNavigator />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Schedules */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-800" />
                Upcoming Schedules
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.busNo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {schedule.route}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {schedule.departure}
                      </div>
                      <div
                        className={`text-sm ${
                          schedule.status === 'On Time'
                            ? 'text-emerald-600'
                            : 'text-red-600'
                        }`}
                      >
                        {schedule.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-800" />
                Recent Activities
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {' '}
                    <div
                      className={`p-1 rounded-full ${
                        activity.type === 'create'
                          ? 'bg-emerald-100 text-emerald-600'
                          : activity.type === 'update'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {activity.type === 'create' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : activity.type === 'update' ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Late Bus Alerts - Priority Section */}
        <LateBusAlerts />

        {/* Quick Actions
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 p-4 text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Add New Schedule</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                <Clock className="h-5 w-5" />
                <span className="font-medium">View Time Tracking</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Generate Reports</span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
}
