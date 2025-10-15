export interface OperatorKPI {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'orange';
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface BusStatus {
  id: string;
  registrationNumber: string;
  route: string;
  status: 'active' | 'maintenance' | 'offline' | 'idle';
  location: string;
  fuelLevel: number;
  driver: string;
  conductor: string;
  lastUpdate: string;
}

export interface TripSummary {
  totalTrips: number;
  completedTrips: number;
  activeTrips: number;
  cancelledTrips: number;
  onTimePerformance: number;
  averageDelay: number;
}

export interface MaintenanceAlert {
  id: string;
  busId: string;
  type: 'urgent' | 'scheduled' | 'overdue';
  message: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface RevenueMetrics {
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  lastMonth: number;
  averagePerTrip: number;
  ticketsSold: number;
}

export interface StaffStatus {
  totalDrivers: number;
  activeDrivers: number;
  totalConductors: number;
  activeConductors: number;
  onLeave: number;
  overtime: number;
}

export interface RoutePerformance {
  routeId: string;
  routeName: string;
  totalTrips: number;
  revenue: number;
  passengerCount: number;
  onTimePerformance: number;
  averageFuelConsumption: number;
}

export interface LiveAlert {
  id: string;
  type: 'emergency' | 'maintenance' | 'traffic' | 'fuel' | 'schedule';
  title: string;
  message: string;
  busId?: string;
  priority: 'critical' | 'warning' | 'info';
  timestamp: string;
  resolved: boolean;
}

// Dummy Data
export const operatorKPIs: OperatorKPI[] = [
  {
    title: 'Active Buses',
    value: 24,
    change: '+2 from yesterday',
    trend: 'up',
    icon: 'bus',
    color: 'blue'
  },
  {
    title: 'Daily Revenue',
    value: 'Rs 245,320',
    change: '+12.3%',
    trend: 'up',
    icon: 'dollar-sign',
    color: 'green'
  },
  {
    title: 'Active Trips',
    value: 67,
    change: '+5 ongoing',
    trend: 'up',
    icon: 'route',
    color: 'purple'
  },
  {
    title: 'On-Time Performance',
    value: '87%',
    change: '+3.2%',
    trend: 'up',
    icon: 'clock',
    color: 'indigo'
  },
  {
    title: 'Fuel Efficiency',
    value: '12.5 km/L',
    change: '+0.8 km/L',
    trend: 'up',
    icon: 'fuel',
    color: 'orange'
  },
  {
    title: 'Maintenance Due',
    value: 5,
    change: '2 urgent',
    trend: 'down',
    icon: 'wrench',
    color: 'red'
  }
];

export const busStatuses: BusStatus[] = [
  {
    id: '1',
    registrationNumber: 'LA-1234',
    route: 'Colombo - Kandy',
    status: 'active',
    location: 'Kegalle (72% complete)',
    fuelLevel: 75,
    driver: 'Kamal Silva',
    conductor: 'Nimal Perera',
    lastUpdate: '2 mins ago'
  },
  {
    id: '2',
    registrationNumber: 'LA-5678',
    route: 'Colombo - Galle',
    status: 'active',
    location: 'Kalutara (45% complete)',
    fuelLevel: 60,
    driver: 'Sunil Fernando',
    conductor: 'Ranjan Kumar',
    lastUpdate: '1 min ago'
  },
  {
    id: '3',
    registrationNumber: 'LA-9012',
    route: 'Kandy - Matale',
    status: 'maintenance',
    location: 'Main Depot',
    fuelLevel: 20,
    driver: '-',
    conductor: '-',
    lastUpdate: '1 hour ago'
  },
  {
    id: '4',
    registrationNumber: 'LA-3456',
    route: 'Colombo - Negombo',
    status: 'idle',
    location: 'Negombo Terminal',
    fuelLevel: 90,
    driver: 'Priya Jayasinghe',
    conductor: 'Saman Rathnayake',
    lastUpdate: '5 mins ago'
  },
  {
    id: '5',
    registrationNumber: 'LA-7890',
    route: 'Galle - Matara',
    status: 'offline',
    location: 'Unknown',
    fuelLevel: 0,
    driver: 'Asanka Mendis',
    conductor: 'Tharaka Wijesinghe',
    lastUpdate: '45 mins ago'
  }
];

export const tripSummary: TripSummary = {
  totalTrips: 234,
  completedTrips: 187,
  activeTrips: 35,
  cancelledTrips: 12,
  onTimePerformance: 87.3,
  averageDelay: 8.5
};

export const maintenanceAlerts: MaintenanceAlert[] = [
  {
    id: '1',
    busId: 'LA-9012',
    type: 'urgent',
    message: 'Engine oil change overdue by 500km',
    dueDate: '2025-10-10',
    priority: 'high'
  },
  {
    id: '2',
    busId: 'LA-3456',
    type: 'scheduled',
    message: 'Annual fitness test due',
    dueDate: '2025-10-15',
    priority: 'medium'
  },
  {
    id: '3',
    busId: 'LA-7890',
    type: 'overdue',
    message: 'Brake system inspection overdue',
    dueDate: '2025-10-08',
    priority: 'high'
  },
  {
    id: '4',
    busId: 'LA-1234',
    type: 'scheduled',
    message: 'Tire rotation scheduled',
    dueDate: '2025-10-20',
    priority: 'low'
  }
];

export const revenueMetrics: RevenueMetrics = {
  today: 245320,
  yesterday: 218450,
  thisWeek: 1456780,
  lastWeek: 1298560,
  thisMonth: 5789230,
  lastMonth: 5234170,
  averagePerTrip: 1304,
  ticketsSold: 1876
};

export const staffStatus: StaffStatus = {
  totalDrivers: 28,
  activeDrivers: 24,
  totalConductors: 30,
  activeConductors: 26,
  onLeave: 6,
  overtime: 8
};

export const routePerformances: RoutePerformance[] = [
  {
    routeId: 'R001',
    routeName: 'Colombo - Kandy',
    totalTrips: 45,
    revenue: 89670,
    passengerCount: 1234,
    onTimePerformance: 89.2,
    averageFuelConsumption: 11.8
  },
  {
    routeId: 'R002',
    routeName: 'Colombo - Galle',
    totalTrips: 38,
    revenue: 67890,
    passengerCount: 987,
    onTimePerformance: 92.1,
    averageFuelConsumption: 12.3
  },
  {
    routeId: 'R003',
    routeName: 'Kandy - Matale',
    totalTrips: 28,
    revenue: 34560,
    passengerCount: 456,
    onTimePerformance: 84.7,
    averageFuelConsumption: 13.1
  },
  {
    routeId: 'R004',
    routeName: 'Colombo - Negombo',
    totalTrips: 32,
    revenue: 42340,
    passengerCount: 678,
    onTimePerformance: 88.5,
    averageFuelConsumption: 12.9
  }
];

export const liveAlerts: LiveAlert[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Bus Breakdown',
    message: 'Bus LA-7890 reported mechanical issue near Galle',
    busId: 'LA-7890',
    priority: 'critical',
    timestamp: '2025-10-12T14:30:00Z',
    resolved: false
  },
  {
    id: '2',
    type: 'fuel',
    title: 'Low Fuel Warning',
    message: 'Bus LA-3456 fuel level below 20%',
    busId: 'LA-3456',
    priority: 'warning',
    timestamp: '2025-10-12T14:15:00Z',
    resolved: false
  },
  {
    id: '3',
    type: 'traffic',
    title: 'Traffic Delay',
    message: 'Heavy traffic on Colombo-Kandy route causing 15min delays',
    priority: 'info',
    timestamp: '2025-10-12T13:45:00Z',
    resolved: false
  },
  {
    id: '4',
    type: 'schedule',
    title: 'Schedule Updated',
    message: 'Additional trip added for Colombo-Galle route due to high demand',
    priority: 'info',
    timestamp: '2025-10-12T12:30:00Z',
    resolved: true
  }
];

// Chart Data
export const revenueChartData: ChartData = {
  labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
  datasets: [{
    label: 'Revenue (Rs)',
    data: [25000, 42000, 68000, 52000, 73000, 48000],
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#22C55E',
    borderWidth: 3,
    tension: 0.4,
    fill: true
  }]
};

export const tripAnalyticsData: ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Completed Trips',
      data: [32, 28, 35, 31, 29, 38, 25],
      backgroundColor: '#3B82F6',
      borderColor: '#3B82F6',
      borderWidth: 1
    },
    {
      label: 'Cancelled Trips',
      data: [2, 1, 3, 2, 1, 2, 1],
      backgroundColor: '#EF4444',
      borderColor: '#EF4444',
      borderWidth: 1
    }
  ]
};

export const fleetUtilizationData: ChartData = {
  labels: ['Active', 'Maintenance', 'Idle', 'Offline'],
  datasets: [{
    label: 'Fleet Status',
    data: [24, 3, 2, 1],
    backgroundColor: ['#22C55E', '#F59E0B', '#6B7280', '#EF4444'],
    borderColor: ['#16A34A', '#D97706', '#4B5563', '#DC2626'],
    borderWidth: 2
  }]
};

export const fuelConsumptionData: ChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [{
    label: 'Average Fuel Consumption (L/100km)',
    data: [8.2, 7.9, 8.5, 8.1],
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: '#F97316',
    borderWidth: 3,
    tension: 0.4,
    fill: true
  }]
};

export const onTimePerformanceData: ChartData = {
  labels: ['Colombo-Kandy', 'Colombo-Galle', 'Kandy-Matale', 'Colombo-Negombo', 'Galle-Matara'],
  datasets: [{
    label: 'On-Time Performance (%)',
    data: [89.2, 92.1, 84.7, 88.5, 90.3],
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    borderColor: '#8B5CF6',
    borderWidth: 1
  }]
};