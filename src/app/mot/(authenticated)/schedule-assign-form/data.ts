// Type definitions for Bus (copied from page.tsx for type safety)
export interface Bus {
  id: string;
  registrationNumber: string;
  operator: string;
  type: 'SLTB' | 'Private';
  capacity: number;
  permitStatus: 'Active' | 'Expired';
  fuelType: string;
  model: string;
  isAssigned?: boolean;
}

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SAMPLE_TIME_SLOTS = [
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];

export const SAMPLE_BUSES: Bus[] = [
  {
    id: '1',
    registrationNumber: 'WP CAB 1234',
    operator: 'SLTB Western Province',
    type: 'SLTB',
    capacity: 45,
    permitStatus: 'Active',
    fuelType: 'Diesel',
    model: 'TATA LP 713',
  },
  {
    id: '2',
    registrationNumber: 'WP KB 5678',
    operator: 'Lanka Ashok Leyland',
    type: 'Private',
    capacity: 52,
    permitStatus: 'Active',
    fuelType: 'Diesel',
    model: 'Ashok Leyland Viking',
  },
  {
    id: '3',
    registrationNumber: 'WP CAD 9012',
    operator: 'SLTB Colombo',
    type: 'SLTB',
    capacity: 38,
    permitStatus: 'Active',
    fuelType: 'CNG',
    model: 'TATA Ultra',
  },
  {
    id: '4',
    registrationNumber: 'WP PQ 3456',
    operator: 'Blue Line Transport',
    type: 'Private',
    capacity: 48,
    permitStatus: 'Active',
    fuelType: 'Diesel',
    model: 'Eicher Skyline Pro',
  },
  {
    id: '5',
    registrationNumber: 'WP CAF 7890',
    operator: 'SLTB Central',
    type: 'SLTB',
    capacity: 42,
    permitStatus: 'Active',
    fuelType: 'Diesel',
    model: 'TATA LP 909',
  },
];

// Route definitions for selection
export interface Route {
  id: string;
  routeNumber: string;
  routeName: string;
  hasSchedules: boolean;
}

export const SAMPLE_ROUTES: Route[] = [
  {
    id: 'RT101',
    routeNumber: '001',
    routeName: 'Colombo - Kandy',
    hasSchedules: true,
  },
  {
    id: 'RT102',
    routeNumber: '002',
    routeName: 'Colombo - Galle',
    hasSchedules: true,
  },
  {
    id: 'RT103',
    routeNumber: '003',
    routeName: 'Kandy - Nuwara Eliya',
    hasSchedules: true,
  },
  {
    id: 'RT104',
    routeNumber: '004',
    routeName: 'Colombo - Negombo',
    hasSchedules: true,
  },
  {
    id: 'RT105',
    routeNumber: '005',
    routeName: 'Galle - Matara',
    hasSchedules: true,
  },
  {
    id: 'RT106',
    routeNumber: '006',
    routeName: 'Colombo - Kurunegala',
    hasSchedules: true,
  },
  {
    id: 'RT107',
    routeNumber: '007',
    routeName: 'Anuradhapura - Polonnaruwa',
    hasSchedules: true,
  },
];
