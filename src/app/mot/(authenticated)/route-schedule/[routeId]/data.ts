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

export const mockRouteData: Record<string, RouteData> = {
  RT001: {
    routeName: 'Colombo - Kandy',
    routeNumber: 'RT001',
    forward: {
      direction: 'Colombo → Kandy',
      schedules: [
        {
          id: 'SCH001',
          busNo: 'NB-1234',
          departure: '06:30 AM',
          arrival: '10:15 AM',
          operator: 'Lanka Transport Co.',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
        {
          id: 'SCH002',
          busNo: 'NB-5678',
          departure: '08:00 AM',
          arrival: '11:45 AM',
          operator: 'Central Bus Service',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        {
          id: 'SCH003',
          busNo: 'NB-9012',
          departure: '12:30 PM',
          arrival: '04:15 PM',
          operator: 'Lanka Transport Co.',
          status: 'Active',
          days: ['Daily'],
        },
      ],
    },
    backward: {
      direction: 'Kandy → Colombo',
      schedules: [
        {
          id: 'SCH004',
          busNo: 'NB-3456',
          departure: '05:00 PM',
          arrival: '08:45 PM',
          operator: 'Express Bus Lines',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
        {
          id: 'SCH005',
          busNo: 'NB-7890',
          departure: '07:30 PM',
          arrival: '11:15 PM',
          operator: 'Central Bus Service',
          status: 'Active',
          days: ['Daily'],
        },
      ],
    },
  },
  RT002: {
    routeName: 'Galle - Matara',
    routeNumber: 'RT002',
    forward: {
      direction: 'Galle → Matara',
      schedules: [
        {
          id: 'SCH006',
          busNo: 'NB-2468',
          departure: '07:15 AM',
          arrival: '08:45 AM',
          operator: 'Southern Express',
          status: 'Active',
          days: ['Daily'],
        },
        {
          id: 'SCH007',
          busNo: 'NB-1357',
          departure: '10:30 AM',
          arrival: '12:00 PM',
          operator: 'Coastal Transport',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
      ],
    },
    backward: {
      direction: 'Matara → Galle',
      schedules: [
        {
          id: 'SCH008',
          busNo: 'NB-8642',
          departure: '02:15 PM',
          arrival: '03:45 PM',
          operator: 'Southern Express',
          status: 'Active',
          days: ['Daily'],
        },
      ],
    },
  },
  RT003: {
    routeName: 'Colombo - Negombo',
    routeNumber: 'RT003',
    forward: {
      direction: 'Colombo → Negombo',
      schedules: [
        {
          id: 'SCH009',
          busNo: 'NB-1111',
          departure: '06:00 AM',
          arrival: '07:30 AM',
          operator: 'Western Province Transport',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
        {
          id: 'SCH010',
          busNo: 'NB-2222',
          departure: '08:30 AM',
          arrival: '10:00 AM',
          operator: 'Airport Express',
          status: 'Active',
          days: ['Daily'],
        },
      ],
    },
    backward: {
      direction: 'Negombo → Colombo',
      schedules: [
        {
          id: 'SCH011',
          busNo: 'NB-3333',
          departure: '04:00 PM',
          arrival: '05:30 PM',
          operator: 'Western Province Transport',
          status: 'Active',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
      ],
    },
  },
};
