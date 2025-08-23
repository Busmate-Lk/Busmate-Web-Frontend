import { RouteAlert } from "@/components/mot/route-permit-alerts";
import { BroadcastMessage } from '@/components/mot/broadcast-center';
import { MaintenanceBus } from "@/components/mot/maintenance-buses";
import { DashboardMetric } from "@/components/mot/dashboard-metrics-cards";
import { Bus, Calendar, ClipboardList, FileCheck, MapPin, Route, UserCheck } from "lucide-react";


export const broadcastMessages: BroadcastMessage[] = [
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

 export const routeAlerts: RouteAlert[] = [
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

 export const maintenanceBuses: MaintenanceBus[] = [
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
 export const totalRoutes = 247;
 export const routeGroups = 12;
 export const totalSchedules = 1850;
 export const totalStops = 3420;
 export const activePermits = 189;
 export const permitRequests = 23;
 export const totalOperators = 85;
 export const totalBuses = 1247;
 export const scheduleAssignments = 2156;

 export const metrics: DashboardMetric[] = [
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