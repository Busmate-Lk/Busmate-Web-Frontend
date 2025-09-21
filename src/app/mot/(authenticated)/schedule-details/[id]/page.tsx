'use client';

import { ScheduleDetailsHeader } from '@/components/mot/schedule-details-header';
import { ScheduleBasicInfo } from '@/components/mot/schedule-basic-info';
import { RouteInformationCard } from '@/components/mot/route-information-card';
import { DaysOfOperationCard } from '@/components/mot/days-of-operation-card';
import { IntermediateStopsCard } from '@/components/mot/intermediate-stops-card';
import { ScheduleDetailsActions } from '@/components/mot/schedule-details-actions';
import { RouteSchedulesTable } from '@/components/mot/route-schedules-table';
import { useRouter, useParams } from 'next/navigation';
import { dummySchedules } from '@/lib/data/schedules-dummy';
import { Layout } from '@/components/shared/layout';
import { useState } from 'react';

export default function ScheduleDetails() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params?.id || 'SCH001';
  const [activeTab, setActiveTab] = useState('route-schedules');

  // Mock schedule data based on ID with bidirectional schedules
  const getScheduleData = (id: string) => {
    // Use the new dummy data
    const schedule = dummySchedules.find((s) => String(s.id) === id);
    if (schedule) {
      return {
        id: String(schedule.id),
        routeId: String(schedule.routeId),
        routeName: String(schedule.routeName),
        busNo: 'NB-' + Math.floor(Math.random() * 9999), // Mock bus number
        startPoint: String(schedule.scheduleStops[0]?.stopName || ''),
        endPoint: String(
          schedule.scheduleStops[schedule.scheduleStops.length - 1]?.stopName ||
            ''
        ),
        departure: String(schedule.scheduleStops[0]?.departureTime || ''),
        arrival: String(
          schedule.scheduleStops[schedule.scheduleStops.length - 1]
            ?.arrivalTime || ''
        ),
        validFrom: schedule.effectiveStartDate.toISOString().split('T')[0],
        validUntil: schedule.effectiveEndDate.toISOString().split('T')[0],
        days: 'Mon-Fri', // Mock days
        status: String(schedule.status),
        permitNo: 'PRM-2024-001', // Mock permit
        operatorName: 'Lanka Transport Co.', // Mock operator
        conductor: 'S.D. Silva', // Mock conductor
        daysDetails: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
      };
    }

    // Fallback to original mock data
    const schedules = {
      SCH001: {
        id: 'SCH001',
        routeId: 'RT001',
        routeName: 'Colombo - Kandy',
        busNo: 'NB-1234',
        startPoint: 'Colombo Fort',
        endPoint: 'Kandy Central',
        departure: '06:30 AM',
        arrival: '10:15 AM',
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        days: 'Mon-Fri',
        status: 'Active',
        permitNo: 'PRM-2024-001',
        operatorName: 'Lanka Transport Co.',
        conductor: 'S.D. Silva',
        daysDetails: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
      },
      SCH002: {
        id: 'SCH002',
        routeId: 'RT002',
        routeName: 'Galle - Matara',
        busNo: 'NB-5678',
        startPoint: 'Galle',
        endPoint: 'Matara',
        departure: '07:15 AM',
        arrival: '08:45 AM',
        validFrom: '2024-03-15',
        validUntil: '2024-12-31',
        days: 'Daily',
        status: 'Active',
        permitNo: 'PRM-2024-002',
        operatorName: 'Central Bus Service',
        conductor: 'P. Fernando',
        daysDetails: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      },
    };
    return schedules[id as keyof typeof schedules] || schedules.SCH001;
  };

  // Get all schedules for the same route (bidirectional)
  const getRouteSchedules = (routeId: string) => {
    const allSchedules = {
      RT001: {
        routeName: 'Colombo - Kandy',
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
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH021',
              busNo: 'NB-3456',
              departure: '10:30 AM',
              arrival: '02:15 PM',
              operator: 'Express Bus Lines',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
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
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
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
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH121',
              busNo: 'NB-9012',
              departure: '11:00 AM',
              arrival: '02:45 PM',
              operator: 'Lanka Transport Co.',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
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
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
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
      RT002: {
        routeName: 'Galle - Matara',
        forward: {
          direction: 'Galle → Matara',
          schedules: [
            {
              id: 'SCH002',
              busNo: 'NB-5678',
              departure: '06:00 AM',
              arrival: '07:30 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
            },
            {
              id: 'SCH012',
              busNo: 'NB-6789',
              departure: '06:20 AM',
              arrival: '07:50 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH022',
              busNo: 'NB-7890',
              departure: '06:40 AM',
              arrival: '08:10 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH032',
              busNo: 'NB-8901',
              departure: '07:00 AM',
              arrival: '08:30 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH042',
              busNo: 'NB-9012',
              departure: '07:20 AM',
              arrival: '08:50 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH052',
              busNo: 'NB-0123',
              departure: '07:40 AM',
              arrival: '09:10 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH062',
              busNo: 'NB-1234',
              departure: '08:00 AM',
              arrival: '09:30 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
            },
            {
              id: 'SCH072',
              busNo: 'NB-2345',
              departure: '08:20 AM',
              arrival: '09:50 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH082',
              busNo: 'NB-3456',
              departure: '08:40 AM',
              arrival: '10:10 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH092',
              busNo: 'NB-4567',
              departure: '09:00 AM',
              arrival: '10:30 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH213',
              busNo: 'NB-1111',
              departure: '10:00 AM',
              arrival: '11:30 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
            {
              id: 'SCH223',
              busNo: 'NB-2222',
              departure: '02:00 PM',
              arrival: '03:30 PM',
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
              busNo: 'NB-5678',
              departure: '08:00 AM',
              arrival: '09:30 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
            },
            {
              id: 'SCH112',
              busNo: 'NB-6789',
              departure: '08:20 AM',
              arrival: '09:50 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH122',
              busNo: 'NB-7890',
              departure: '08:40 AM',
              arrival: '10:10 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH132',
              busNo: 'NB-8901',
              departure: '09:00 AM',
              arrival: '10:30 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH142',
              busNo: 'NB-9012',
              departure: '09:20 AM',
              arrival: '10:50 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH152',
              busNo: 'NB-0123',
              departure: '09:40 AM',
              arrival: '11:10 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH162',
              busNo: 'NB-1234',
              departure: '10:00 AM',
              arrival: '11:30 AM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ],
            },
            {
              id: 'SCH172',
              busNo: 'NB-2345',
              departure: '10:20 AM',
              arrival: '11:50 AM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH182',
              busNo: 'NB-3456',
              departure: '10:40 AM',
              arrival: '12:10 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ],
            },
            {
              id: 'SCH192',
              busNo: 'NB-4567',
              departure: '11:00 AM',
              arrival: '12:30 PM',
              operator: 'SLTB',
              status: 'Active',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            },
            {
              id: 'SCH313',
              busNo: 'NB-3333',
              departure: '11:00 AM',
              arrival: '12:30 PM',
              operator: 'Central Bus Service',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
            {
              id: 'SCH323',
              busNo: 'NB-4444',
              departure: '03:00 PM',
              arrival: '04:30 PM',
              operator: 'SLTB',
              status: 'Active',
              days: ['saturday', 'sunday'],
            },
          ],
        },
      },
    };
    return allSchedules[routeId as keyof typeof allSchedules];
  };

  const schedule = getScheduleData(scheduleId as string);
  const routeSchedules = getRouteSchedules(schedule.routeId);

  // const otherBuses = [
  //   {
  //     busNo: 'NB-5678',
  //     departure: '08:00 AM',
  //     arrival: '11:45 AM',
  //     operator: 'Central Bus Service',
  //   },
  //   {
  //     busNo: 'NB-9012',
  //     departure: '12:30 PM',
  //     arrival: '04:15 PM',
  //     operator: 'Lanka Transport Co.',
  //   },
  //   {
  //     busNo: 'NB-3456',
  //     departure: '05:00 PM',
  //     arrival: '08:45 PM',
  //     operator: 'Express Bus Lines',
  //   },
  // ];

  // Get intermediate stops from the schedule data
  const getIntermediateStops = () => {
    const scheduleData = dummySchedules.find(
      (s) => String(s.id) === scheduleId
    );
    if (scheduleData && scheduleData.scheduleStops) {
      return scheduleData.scheduleStops.map((stop, index) => ({
        id: index + 1,
        name: String(stop.stopName),
        time: String(stop.departureTime),
      }));
    }

    // Fallback to original mock data
    return [
      { id: 1, name: 'Colombo Fort', time: '06:30 AM' },
      { id: 2, name: 'Kelaniya', time: '07:00 AM' },
      { id: 3, name: 'Kadawatha', time: '07:30 AM' },
      { id: 4, name: 'Kegalle', time: '08:45 AM' },
      { id: 5, name: 'Kandy Central', time: '10:15 AM' },
    ];
  };

  const intermediateStops = getIntermediateStops();

  // Attached permits data
  const attachedPermits = [
    {
      id: 'PRM-2024-001',
      permitNo: 'PRM-2024-001',
      routeNo: 'RT001',
      routeName: 'Colombo - Kandy',
      operator: 'Lanka Transport Co.',
      issueDate: '2024-01-01',
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      status: 'Active',
      document: 'permit-001.pdf',
    },
    {
      id: 'PRM-2024-015',
      permitNo: 'PRM-2024-015',
      routeNo: 'RT001',
      routeName: 'Colombo - Kandy',
      operator: 'Lanka Transport Co.',
      issueDate: '2024-06-01',
      validFrom: '2024-06-01',
      validUntil: '2024-12-31',
      status: 'Active',
      document: 'permit-015.pdf',
    },
  ];

  const handleArchive = () => {
    if (confirm('Are you sure you want to archive this schedule?')) {
      alert('Schedule archived successfully!');
      router.push('/mot/schedules');
    }
  };

  const handleDeactivate = () => {
    if (confirm('Are you sure you want to deactivate this schedule?')) {
      alert('Schedule deactivated');
    }
  };

  const handleEdit = () => {
    router.push(`/mot/schedule-form?scheduleId=${schedule.id}`);
  };

  const handleBack = () => {
    router.push('/mot/schedules');
  };

  return (
    <Layout
      role="mot"
      activeItem="schedule"
      pageTitle="Schedule Details"
      pageDescription="View detailed information about the bus schedule"
    >
      <div className="space-y-6">
        <ScheduleDetailsHeader
          scheduleId={schedule.id}
          onBack={handleBack}
          onEdit={handleEdit}
          onArchive={handleArchive}
        />

        <ScheduleBasicInfo schedule={schedule} />

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {/* <button
              onClick={() => setActiveTab('schedule')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schedule Details
            </button> */}
            <button
              onClick={() => setActiveTab('route-schedules')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'route-schedules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Weekly Schedules
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'route'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Route Details
            </button>
            <button
              onClick={() => setActiveTab('permits')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permits'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attached Permits
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {/* {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RouteInformationCard
                startPoint={schedule.startPoint}
                endPoint={schedule.endPoint}
              />
              <ScheduleInformationCard schedule={schedule} />
            </div>

            <OtherBusesTable buses={otherBuses} />

            <DaysOfOperationCard daysDetails={schedule.daysDetails} />
          </div>
        )} */}

        {activeTab === 'route-schedules' && routeSchedules && (
          <div className="space-y-6">
            <RouteSchedulesTable
              routeData={routeSchedules}
              currentScheduleId={schedule.id}
            />
            <DaysOfOperationCard daysDetails={schedule.daysDetails} />
          </div>
        )}

        {activeTab === 'route' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RouteInformationCard
                startPoint={schedule.startPoint}
                endPoint={schedule.endPoint}
              />
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Route Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route ID:</span>
                    <span className="font-medium">{schedule.routeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">115 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">3.5 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route Type:</span>
                    <span className="font-medium">Inter-Provincial</span>
                  </div>
                </div>
              </div>
            </div>

            <IntermediateStopsCard stops={intermediateStops} />
          </div>
        )}

        {activeTab === 'permits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Attached Permits
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Route permits associated with this schedule
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permit No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Operator
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valid Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attachedPermits.map((permit) => (
                      <tr key={permit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {permit.permitNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {permit.routeName}
                            </div>
                            <div className="text-sm text-gray-500">
                              Route No: {permit.routeNo}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {permit.operator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {permit.validFrom} - {permit.validUntil}
                          </div>
                          <div className="text-sm text-gray-500">
                            Issued: {permit.issueDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              permit.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : permit.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {permit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 text-sm">
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900 text-sm">
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <ScheduleDetailsActions
          onDeactivate={handleDeactivate}
          onClose={handleBack}
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  );
}
