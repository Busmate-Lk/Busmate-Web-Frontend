'use client';

import { Layout } from '@/components/shared/layout';
// import { TimeKeeperLayout } from "@/components/timeKeeper/layout";
import { ScheduleStatsCards } from '@/components/timeKeeper/dashboard/schedule-stats-cards';
import { RealTimeClock } from '@/components/timeKeeper/dashboard/real-time-clock';
import { CalendarNavigator } from '@/components/timeKeeper/dashboard/calendar-navigator';

export default function TimeKeeperDashboard() {
  const stats = {
    activeSchedules: 156,
    onTimePerformance: 98.5,
    routesCovered: 42,
    busesAssigned: 89,
  };

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
        </div>
      </div>
    </Layout>
  );
}
