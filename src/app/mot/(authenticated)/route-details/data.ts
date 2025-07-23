// Define the detailed route interface for route details page
interface IntermediateStop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  travelTimeFromPrevious: string;
  sequence: number;
}

interface Schedule {
  id: string;
  departureTime: string;
  arrivalTime: string;
  busType: string;
  frequency: string;
  operatingDays: string[];
  busNumber?: string;
  driverName?: string;
  status?: 'Active' | 'Delayed' | 'Cancelled';
}

interface DetailedBusRoute {
  id: string;
  routeName: string;
  routeNumber: string;
  routeCategory: string;
  startingPoint: string;
  endPoint: string;
  startLat: string;
  startLng: string;
  endLat: string;
  endLng: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  totalDistance: string;
  estimatedTravelTime: string;
  averageSpeed: string;
  fuelConsumption: string;
  operator: string;
  scheduleCount: number;
  lastUpdated: string;
  intermediateStops: IntermediateStop[];
  schedules: Schedule[];
}

 // Static route data (copied from bus-routes/page.tsx)
  export const routes: DetailedBusRoute[] = [
    {
      id: '1',
      routeName: 'Colombo - Galle Express',
      routeNumber: '001A',
      routeCategory: 'Express Routes',
      startingPoint: 'Colombo Fort',
      endPoint: 'Galle',
      startLat: '6.9271',
      startLng: '79.8612',
      endLat: '7.2906',
      endLng: '80.6337',
      status: 'Active',
      totalDistance: '119',
      estimatedTravelTime: '2h 30m',
      averageSpeed: '33.0',
      fuelConsumption: '8.5',
      operator: 'Lanka Bus Services',
      scheduleCount: 8,
      lastUpdated: '2024-01-15',
      intermediateStops: [
        { id: 1, name: 'Mount Lavinia', latitude: '', longitude: '', travelTimeFromPrevious: '20', sequence: 1 },
        { id: 2, name: 'Kalutara', latitude: '', longitude: '', travelTimeFromPrevious: '25', sequence: 2 },
        { id: 3, name: 'Bentota', latitude: '', longitude: '', travelTimeFromPrevious: '20', sequence: 3 },
        { id: 4, name: 'Hikkaduwa', latitude: '', longitude: '', travelTimeFromPrevious: '15', sequence: 4 },
      ],
      schedules: [
        {
          id: '1',
          departureTime: '06:00',
          arrivalTime: '09:30',
          busType: 'luxury',
          frequency: 'hourly',
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          busNumber: 'BUS-001',
          driverName: 'John Silva',
          status: 'Active',
        },
        {
          id: '2',
          departureTime: '14:00',
          arrivalTime: '17:30',
          busType: 'semi-luxury',
          frequency: '30min',
          operatingDays: ['saturday', 'sunday'],
          busNumber: 'BUS-002',
          driverName: 'Mary Fernando',
          status: 'Active',
        },
        {
          id: '3',
          departureTime: '10:00',
          arrivalTime: '13:30',
          busType: 'standard',
          frequency: 'hourly',
          operatingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          busNumber: 'BUS-003',
          driverName: 'David Perera',
          status: 'Delayed',
        },
      ],
    },
    {
      id: '2',
      routeName: 'Colombo - Kandy',
      routeNumber: '003',
      routeCategory: 'Long Distance Highway',
      startingPoint: 'Colombo Fort',
      endPoint: 'Kandy Central Bus Stand',
      startLat: '',
      startLng: '',
      endLat: '',
      endLng: '',
      status: 'Active',
      totalDistance: '115',
      estimatedTravelTime: '3h 15m',
      averageSpeed: '',
      fuelConsumption: '',
      operator: '',
      scheduleCount: 12,
      lastUpdated: '2024-01-14',
      intermediateStops: [
        { id: 1, name: 'Kadawatha', latitude: '', longitude: '', travelTimeFromPrevious: '30', sequence: 1 },
        { id: 2, name: 'Ambepussa', latitude: '', longitude: '', travelTimeFromPrevious: '40', sequence: 2 },
        { id: 3, name: 'Peradeniya', latitude: '', longitude: '', travelTimeFromPrevious: '25', sequence: 3 },
      ],
      schedules: [],
    },
    // ...add other routes as needed...
  ];