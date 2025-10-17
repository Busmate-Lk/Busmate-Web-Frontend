'use client';

import { Layout } from '@/components/shared/layout';
// import { TimeKeeperLayout } from "@/components/timeKeeper/layout";
import { ScheduleStatsCards } from '@/components/timeKeeper/dashboard/schedule-stats-cards';
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
          {/* Clock and Calendar Stack */}
          <div className="space-y-6">
            {/* Real-time Clock */}
            <RealTimeClock />

            {/* Calendar Navigator */}
            <CalendarNavigator />
          </div>

          {/* Late Bus Alerts */}
          <div className="lg:col-span-2">
            <LateBusAlerts />
          </div>
        </div>
      </div>
    </Layout>
  );
}
