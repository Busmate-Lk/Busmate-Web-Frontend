"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Calendar, Clock, Users } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { RouteSchedulesTable } from '@/components/mot/route-schedules-table';

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
    const mockRouteData: Record<string, RouteData> = {
      '1': {
        routeName: 'Colombo - Kandy',
        routeNumber: 'RT001',
        forward: {
          direction: 'Colombo Fort → Kandy Central',
          schedules: [
            {
              id: 'SCH001',
              busNo: 'NB-1234',
              departure: '06:30 AM',
              arrival: '10:15 AM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH011',
              busNo: 'NB-2345',
              departure: '08:00 AM',
              arrival: '11:45 AM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH021',
              busNo: 'NB-3456',
              departure: '10:30 AM',
              arrival: '02:15 PM',
              operator: 'Express Bus Lines',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH031',
              busNo: 'NB-4567',
              departure: '01:00 PM',
              arrival: '04:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH041',
              busNo: 'NB-5678',
              departure: '03:30 PM',
              arrival: '07:15 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH051',
              busNo: 'NB-6789',
              departure: '06:00 PM',
              arrival: '09:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH061',
              busNo: 'NB-7777',
              departure: '09:00 AM',
              arrival: '12:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
            {
              id: 'SCH071',
              busNo: 'NB-8888',
              departure: '02:00 PM',
              arrival: '05:45 PM',
              operator: 'Express Bus Lines',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
          ],
        },
        backward: {
          direction: 'Kandy Central → Colombo Fort',
          schedules: [
            {
              id: 'SCH101',
              busNo: 'NB-7890',
              departure: '06:00 AM',
              arrival: '09:45 AM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH111',
              busNo: 'NB-8901',
              departure: '08:30 AM',
              arrival: '12:15 PM',
              operator: 'Express Bus Lines',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH121',
              busNo: 'NB-9012',
              departure: '11:00 AM',
              arrival: '02:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            },
            {
              id: 'SCH131',
              busNo: 'NB-0123',
              departure: '01:30 PM',
              arrival: '05:15 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH141',
              busNo: 'NB-1234',
              departure: '04:00 PM',
              arrival: '07:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH151',
              busNo: 'NB-2345',
              departure: '06:30 PM',
              arrival: '10:15 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH161',
              busNo: 'NB-9999',
              departure: '10:00 AM',
              arrival: '01:45 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
            {
              id: 'SCH171',
              busNo: 'NB-0000',
              departure: '03:00 PM',
              arrival: '06:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
          ],
        },
      },
      '2': {
        routeName: 'Galle - Matara',
        routeNumber: 'RT002',
        forward: {
          direction: 'Galle → Matara',
          schedules: [
            {
              id: 'SCH002',
              busNo: 'NB-5678',
              departure: '07:15 AM',
              arrival: '08:45 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            },
            {
              id: 'SCH012',
              busNo: 'NB-6789',
              departure: '09:30 AM',
              arrival: '11:00 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH022',
              busNo: 'NB-7890',
              departure: '12:00 PM',
              arrival: '01:30 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            },
            {
              id: 'SCH032',
              busNo: 'NB-8901',
              departure: '03:00 PM',
              arrival: '04:30 PM',
              operator: 'SLTB',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
          ],
        },
        backward: {
          direction: 'Matara → Galle',
          schedules: [
            {
              id: 'SCH102',
              busNo: 'NB-9012',
              departure: '08:00 AM',
              arrival: '09:30 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH112',
              busNo: 'NB-0123',
              departure: '10:30 AM',
              arrival: '12:00 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
            {
              id: 'SCH122',
              busNo: 'NB-1234',
              departure: '02:00 PM',
              arrival: '03:30 PM',
              operator: 'SLTB',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
          ],
        },
      },
    };

    const data = mockRouteData[routeId];
    
    setTimeout(() => {
      setRouteData(data || null);
      setLoading(false);
    }, 500);
  }, [routeId]);

  const handleAddSchedule = () => {
    router.push(`/mot/schedule-form?routeId=${routeId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Layout activeItem="bus-routes" pageTitle="Route Schedules" pageDescription="Loading route schedules..." role="mot">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!routeData) {
    return (
      <Layout activeItem="bus-routes" pageTitle="Route Schedules" pageDescription="Route not found" role="mot">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Route Not Found</h2>
          <p className="text-gray-600 mb-4">The requested route could not be found.</p>
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

  const totalSchedules = routeData.forward.schedules.length + routeData.backward.schedules.length;
  const activeSchedules = [...routeData.forward.schedules, ...routeData.backward.schedules].filter(s => s.status === 'Active').length;

  return (
    <Layout activeItem="bus-routes" pageTitle="Route Schedules" pageDescription={`Manage schedules for ${routeData.routeName}`} role="mot">
      <div className="space-y-6">
        {/*Breadcrumb*/}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-routes")}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Schedules Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This route doesn't have any schedules planned yet. Start by adding a schedule for either direction.
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
          <RouteSchedulesTable
            routeData={routeData}
            currentScheduleId=""
          />
        )}
      </div>
    </Layout>
  );
}
