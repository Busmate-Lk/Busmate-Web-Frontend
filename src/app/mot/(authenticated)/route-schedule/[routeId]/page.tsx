'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Calendar, Clock, Users } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { EnhancedRouteSchedulesTable } from '@/components/mot/enhanced-route-schedules-table';
import { mockRouteData } from './data';
import { getSchedulesByRouteId } from '@/lib/data/schedules-dummy';

interface Schedule {
  id: string;
  busNo: string;
  departure: string;
  arrival: string;
  operator: string;
  status: string;
  days?: string[];
}

interface DirectionData {
  direction: string;
  schedules: Schedule[];
}

interface RouteData {
  routeName: string;
  routeNumber: string;
  forward: DirectionData;
  backward: DirectionData;
}

export default function RouteSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const routeId = params?.routeId as string;
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API based on routeId

    const data = mockRouteData[routeId];

    setTimeout(() => {
      setRouteData(data || null);
      setLoading(false);
    }, 500);
  }, [routeId]);

  const handleAddSchedule = () => {
    router.push(`/mot/enhanced-schedule-form?routeId=${routeId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Layout
        activeItem="bus-routes"
        pageTitle="Route Schedules"
        pageDescription="Loading route schedules..."
        role="mot"
      >
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!routeData) {
    return (
      <Layout
        activeItem="bus-routes"
        pageTitle="Route Schedules"
        pageDescription="Route not found"
        role="mot"
      >
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Route Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested route could not be found.
          </p>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  const schedules = getSchedulesByRouteId(routeId);
  const totalSchedules = schedules.length;

  return (
    <Layout
      activeItem="bus-routes"
      pageTitle="Route Schedules"
      pageDescription={`Manage schedules for ${routeData.routeName}`}
      role="mot"
    >
      <div className="space-y-6">
        {/*Breadcrumb*/}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push('/mot/bus-routes')}
          >
            Routes Management
          </button>
          <span>/</span>
          <span>Route Schedules</span>
        </div>

        {/* No Schedules State */}
        {totalSchedules === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Schedules Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This route doesn't have any schedules planned yet. Start by adding
              a schedule for either direction.
            </p>
            <button
              onClick={handleAddSchedule}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add First Schedule
            </button>
          </div>
        ) : (
          /* Schedules Table */
          <EnhancedRouteSchedulesTable
            routeId={routeId}
            routeName={routeData.routeName}
          />
        )}
      </div>
    </Layout>
  );
}
