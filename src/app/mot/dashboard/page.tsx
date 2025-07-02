"use client";

import { MOTLayout } from "@/components/mot/layout";
import { Bus, Users, DollarSign, Route } from "lucide-react";
import {
  DashboardMetricsCards,
  DashboardMetric,
} from "@/components/mot/dashboard-metrics-cards";
import { RidershipChart } from "@/components/mot/ridership-chart";
import { BusTypesChart } from "@/components/mot/bus-types-chart";
import { TopRoutesRevenue } from "@/components/mot/top-routes-revenue";
import {
  BroadcastCenter,
  BroadcastMessage,
} from "@/components/mot/broadcast-center";
import {
  RoutePermitAlerts,
  RouteAlert,
} from "@/components/mot/route-permit-alerts";
import {
  MaintenanceBuses,
  MaintenanceBus,
} from "@/components/mot/maintenance-buses";

export default function Dashboard() {
  const broadcastMessages: BroadcastMessage[] = [
    {
      title: "Route Maintenance Alert",
      type: "Priority",
      time: "2 hours ago",
      description: "Scheduled Today 2:00 PM",
    },
    {
      title: "SMS URGENT Notification",
      type: "Alert",
      time: "3 hours ago",
      description: "Go to All Messages",
    },
  ];

  const routeAlerts: RouteAlert[] = [
    {
      route: "Route 45A",
      status: "Expires in 3 days",
      type: "warning",
    },
    {
      route: "Route 126",
      status: "Permit expired",
      type: "danger",
    },
  ];

  const maintenanceBuses: MaintenanceBus[] = [
    {
      bus: "Bus TN-09-1234",
      status: "Engine Service due",
      type: "warning",
    },
    {
      bus: "Bus TN-09-5678",
      status: "Routine checkup",
      type: "info",
    },
  ];

  const chartData = [
    { day: "Mon", value: 85000, height: "h-16" },
    { day: "Tue", value: 92000, height: "h-20" },
    { day: "Wed", value: 78000, height: "h-14" },
    { day: "Thu", value: 88000, height: "h-18" },
    { day: "Fri", value: 95000, height: "h-22" },
    { day: "Sat", value: 89000, height: "h-19" },
    { day: "Sun", value: 89432, height: "h-24", isToday: true },
  ];

  const busTypesData = {
    total: 1247,
    regular: 520,
    express: 280,
  };

  // Calculate metrics based on actual data
  const totalBuses = busTypesData.total;
  const activeBuses = totalBuses - maintenanceBuses.length; // Subtract buses in maintenance
  const totalRoutes = routeAlerts.length + 3; // Current route alerts + additional approved routes
  const todaysRidership = chartData.find(day => day.isToday)?.value || 89432;
  const estimatedFarePerRider = 35; // Average fare in Rs.
  const totalFareCollected = (todaysRidership * estimatedFarePerRider).toLocaleString();

  const metrics: DashboardMetric[] = [
    {
      title: "Total Active Buses",
      value: activeBuses.toString(),
      subtitle: `${totalBuses} total, ${maintenanceBuses.length} in maintenance`,
      icon: Bus,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-800",
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "Approved Routes",
      value: totalRoutes.toString(),
      subtitle: `${routeAlerts.length} need attention`,
      icon: Route,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-600",
      trend: "+5%",
      trendColor: "text-green-600",
    },
    {
      title: "Today's Ridership",
      value: todaysRidership.toLocaleString(),
      subtitle: "+8% from yesterday",
      icon: Users,
      color: "text-slate-700",
      bgColor: "bg-slate-50",
      borderColor: "border-l-slate-500",
      trend: "+8%",
      trendColor: "text-green-600",
    },
    {
      title: "Total Fare Collected",
      value: `Rs.${totalFareCollected}`,
      subtitle: "Today's collection",
      icon: DollarSign,
      color: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-800",
      trend: "+15%",
      trendColor: "text-green-600",
    },
  ];

  return (
    <MOTLayout activeItem="dashboard">
      <div className="space-y-6">
        {/* Metrics Cards */}
        <DashboardMetricsCards metrics={metrics} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RidershipChart chartData={chartData} />
          <BusTypesChart data={busTypesData} />
        </div>

        {/* Top Routes Section */}
        <TopRoutesRevenue />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BroadcastCenter messages={broadcastMessages} />
          <RoutePermitAlerts alerts={routeAlerts} />
          <MaintenanceBuses buses={maintenanceBuses} />
        </div>
      </div>
    </MOTLayout>
  );
}
