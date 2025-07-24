'use client';

import { MapPin, Route, Calendar, ClipboardList, Users, Bus, FileCheck, UserCheck } from 'lucide-react';
import {
  DashboardMetricsCards,
  DashboardMetric,
} from '@/components/mot/dashboard-metrics-cards';
import { RouteDistributionChart } from '@/components/mot/route-distribution-chart';
import { PermitCategoriesChart } from '@/components/mot/permit-categories-chart';
import { AssignmentTrendsChart } from '@/components/mot/assignment-trends-chart';
// import { OperatorPerformanceChart } from '@/components/mot/operator-performance-chart';
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
import { broadcastMessages, maintenanceBuses, metrics, routeAlerts } from './data';

export default function Dashboard() {
 
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

        {/* Additional Analytics Section
        <div className="grid grid-cols-1 gap-6">
          <OperatorPerformanceChart />
        </div> */}

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
