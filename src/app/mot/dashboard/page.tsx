'use client';

import { MapPin, Route, Calendar, ClipboardList, Users, Bus, FileCheck, UserCheck } from 'lucide-react';
import {
  DashboardMetricsCards,
  DashboardMetric,
} from '@/components/mot/dashboard-metrics-cards';
import { RouteDistributionChart } from '@/components/mot/route-distribution-chart';
import { PermitCategoriesChart } from '@/components/mot/permit-categories-chart';
import { AssignmentTrendsChart } from '@/components/mot/assignment-trends-chart';
import { OperatorPerformanceChart } from '@/components/mot/operator-performance-chart';
import {
  BroadcastCenter,
  BroadcastMessage,
} from '@/components/mot/broadcast-center';
import {
  RoutePermitAlerts,
  RouteAlert,
} from '@/components/mot/route-permit-alerts';
import {
  MaintenanceBuses,
  MaintenanceBus,
} from '@/components/mot/maintenance-buses';
import { Layout } from '@/components/shared/layout';

export default function Dashboard() {
  const broadcastMessages: BroadcastMessage[] = [
    {
      title: 'Route Maintenance Alert',
      type: 'Priority',
      time: '2 hours ago',
      description: 'Scheduled Today 2:00 PM',
    },
    {
      title: 'SMS URGENT Notification',
      type: 'Alert',
      time: '3 hours ago',
      description: 'Go to All Messages',
    },
  ];

  const routeAlerts: RouteAlert[] = [
    {
      route: 'Route 45A',
      status: 'Expires in 3 days',
      type: 'warning',
    },
    {
      route: 'Route 126',
      status: 'Permit expired',
      type: 'danger',
    },
  ];

  const maintenanceBuses: MaintenanceBus[] = [
    {
      bus: 'Bus TN-09-1234',
      status: 'Engine Service due',
      type: 'warning',
    },
    {
      bus: 'Bus TN-09-5678',
      status: 'Routine checkup',
      type: 'info',
    },
  ];

  // MOT Admin Dashboard Data
  const totalRoutes = 247;
  const routeGroups = 12;
  const totalSchedules = 1850;
  const totalStops = 3420;
  const activePermits = 189;
  const permitRequests = 23;
  const totalOperators = 85;
  const totalBuses = 1247;
  const scheduleAssignments = 2156;

  const metrics: DashboardMetric[] = [
    {
      title: 'Total Routes',
      value: totalRoutes.toString(),
      subtitle: `${routeGroups} route groups`,
      icon: Route,
      color: 'text-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-800',
      trend: '+5%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Total Schedules',
      value: totalSchedules.toLocaleString(),
      subtitle: 'Active operational schedules',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-600',
      trend: '+12%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Total Stops',
      value: totalStops.toLocaleString(),
      subtitle: 'Registered bus stops',
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-l-purple-600',
      trend: '+8%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Active Permits',
      value: activePermits.toString(),
      subtitle: `${permitRequests} pending requests`,
      icon: FileCheck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-l-orange-600',
      trend: '+3%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Operators',
      value: totalOperators.toString(),
      subtitle: 'Registered operators',
      icon: UserCheck,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-l-cyan-600',
      trend: '+7%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Total Buses',
      value: totalBuses.toLocaleString(),
      subtitle: 'Fleet across all operators',
      icon: Bus,
      color: 'text-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-800',
      trend: '+15%',
      trendColor: 'text-green-600',
    },
    {
      title: 'Schedule Assignments',
      value: scheduleAssignments.toLocaleString(),
      subtitle: 'Active route assignments',
      icon: ClipboardList,
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      borderColor: 'border-l-slate-500',
      trend: '+10%',
      trendColor: 'text-green-600',
    },
  ];

  return (
    <Layout activeItem="dashboard" role="mot">
      <div className="space-y-6">
        {/* Metrics Cards - MOT Admin Dashboard */}
        <DashboardMetricsCards metrics={metrics} />

        {/* Charts Section - New MOT Admin Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RouteDistributionChart />
          <PermitCategoriesChart />
          <AssignmentTrendsChart />
        </div>

        {/* Additional Analytics Section */}
        <div className="grid grid-cols-1 gap-6">
          <OperatorPerformanceChart />
        </div>

        {/* Bottom Section - Alerts and Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BroadcastCenter messages={broadcastMessages} />
          <RoutePermitAlerts alerts={routeAlerts} />
          <MaintenanceBuses buses={maintenanceBuses} />
        </div>
      </div>
    </Layout>
  );
}
