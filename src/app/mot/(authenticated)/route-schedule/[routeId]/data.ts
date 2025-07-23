// Type definitions for route schedule mock data
export type Schedule = {
  id: string;
  busNo: string;
  departure: string;
  arrival: string;
  operator: string;
  status: string;
  days: string[];
};

export type RouteDirection = {
  direction: string;
  schedules: Schedule[];
};

export type RouteData = {
  routeName: string;
  routeNumber: string;
  forward: RouteDirection;
  backward: RouteDirection;
};

export const mockRouteData: Record<string, RouteData> = {
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
