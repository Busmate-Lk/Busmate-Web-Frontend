'use client';

// import { TimeKeeperLayout } from "@/components/timeKeeper/layout";
import { ScheduleStatsCards } from '@/components/timeKeeper/schedule-stats-cards';
import { ScheduleSearchFilters } from '@/components/timeKeeper/schedule-search-filters';
import { ScheduleTable } from '@/components/timeKeeper/schedule-table';
import { usePagination } from '@/components/mot/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ScheduleManagementClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Handle date parameter from URL (when navigating from calendar)
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);
  const [assignBusModal, setAssignBusModal] = useState({
    isOpen: false,
    scheduleId: '',
    routeName: '',
  });
  const [notesModal, setNotesModal] = useState({
    isOpen: false,
    scheduleId: '',
    routeName: '',
    currentNotes: '',
  });

  // Comprehensive 7-day dataset for Matara Bus Station
  const getMataraSchedules = (date: string) => {
    const dayOfWeek = new Date(date).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDay = dayNames[dayOfWeek];

    // Complete 7-day schedule dataset for Matara Bus Station
    const allSchedules = [
      // MONDAY SCHEDULES
      {
        id: 'MAT001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '05:30 AM',
        arrival: '09:15 AM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Express service via highway',
        platform: 'A1',
      },
      {
        id: 'MAT002',
        routeId: 'RT002',
        busNo: 'NB-5678',
        route: 'Matara - Kandy',
        operator: 'Private',
        departure: '06:15 AM',
        arrival: '11:45 AM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-5678',
        notes: 'Via Ratnapura',
        platform: 'B2',
      },
      {
        id: 'MAT003',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '07:00 AM',
        arrival: '08:30 AM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Frequent service every 30 minutes',
        platform: 'A3',
      },
      {
        id: 'MAT004',
        routeId: 'RT004',
        busNo: 'NB-3456',
        route: 'Matara - Hambantota',
        operator: 'SLTB',
        departure: '09:30 AM',
        arrival: '11:00 AM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-7890',
        notes: 'Limited stops service',
        platform: 'B1',
      },
      {
        id: 'MAT005',
        routeId: 'RT005',
        busNo: 'NB-1357',
        route: 'Matara - Ratnapura',
        operator: 'SLTB',
        departure: '11:00 AM',
        arrival: '02:30 PM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-1357',
        notes: 'Via Deniyaya route',
        platform: 'A2',
      },
      {
        id: 'MAT006',
        routeId: 'RT006',
        busNo: 'NB-9753',
        route: 'Matara - Akuressa',
        operator: 'Private',
        departure: '12:30 PM',
        arrival: '01:45 PM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-9753',
        notes: 'Local service',
        platform: 'B3',
      },
      {
        id: 'MAT007',
        routeId: 'RT007',
        busNo: 'NB-8642',
        route: 'Matara - Weligama',
        operator: 'SLTB',
        departure: '02:00 PM',
        arrival: '03:15 PM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: '',
        notes: '',
        platform: 'A4',
      },
      {
        id: 'MAT008',
        routeId: 'RT008',
        busNo: 'NB-4567',
        route: 'Matara - Colombo',
        operator: 'Private',
        departure: '04:30 PM',
        arrival: '08:15 PM',
        days: ['Monday'],
        status: 'Active',
        assignedBus: 'NB-4567',
        notes: 'Evening express',
        platform: 'A1',
      },

      // TUESDAY SCHEDULES
      {
        id: 'TUE001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '05:30 AM',
        arrival: '09:15 AM',
        days: ['Tuesday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Express service via highway',
        platform: 'A1',
      },
      {
        id: 'TUE002',
        routeId: 'RT002',
        busNo: 'NB-5678',
        route: 'Matara - Kandy',
        operator: 'Private',
        departure: '06:15 AM',
        arrival: '11:45 AM',
        days: ['Tuesday'],
        status: 'Active',
        assignedBus: 'NB-5678',
        notes: 'Via Ratnapura',
        platform: 'B2',
      },
      {
        id: 'TUE003',
        routeId: 'RT009',
        busNo: 'NB-2345',
        route: 'Matara - Tangalle',
        operator: 'Private',
        departure: '08:00 AM',
        arrival: '09:30 AM',
        days: ['Tuesday'],
        status: 'Pending',
        assignedBus: '',
        notes: '',
        platform: 'C1',
      },
      {
        id: 'TUE004',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '10:00 AM',
        arrival: '11:30 AM',
        days: ['Tuesday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Mid-morning service',
        platform: 'A3',
      },
      {
        id: 'TUE005',
        routeId: 'RT010',
        busNo: 'NB-6789',
        route: 'Matara - Badulla',
        operator: 'SLTB',
        departure: '01:00 PM',
        arrival: '06:30 PM',
        days: ['Tuesday'],
        status: 'Active',
        assignedBus: 'NB-6789',
        notes: 'Long distance service',
        platform: 'C4',
      },
      {
        id: 'TUE006',
        routeId: 'RT007',
        busNo: 'NB-8642',
        route: 'Matara - Weligama',
        operator: 'SLTB',
        departure: '03:30 PM',
        arrival: '04:45 PM',
        days: ['Tuesday'],
        status: 'Active',
        assignedBus: 'NB-8642',
        notes: 'Afternoon service',
        platform: 'A4',
      },

      // WEDNESDAY SCHEDULES
      {
        id: 'WED001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '05:30 AM',
        arrival: '09:15 AM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Express service via highway',
        platform: 'A1',
      },
      {
        id: 'WED002',
        routeId: 'RT011',
        busNo: 'NB-3567',
        route: 'Matara - Anuradhapura',
        operator: 'SLTB',
        departure: '07:00 AM',
        arrival: '01:30 PM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: 'NB-3567',
        notes: 'Ancient city route',
        platform: 'C5',
      },
      {
        id: 'WED003',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '08:30 AM',
        arrival: '10:00 AM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Morning express',
        platform: 'A3',
      },
      {
        id: 'WED004',
        routeId: 'RT012',
        busNo: 'NB-4678',
        route: 'Matara - Nuwara Eliya',
        operator: 'Private',
        departure: '10:15 AM',
        arrival: '03:45 PM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: '',
        notes: 'Hill country service',
        platform: 'B4',
      },
      {
        id: 'WED005',
        routeId: 'RT004',
        busNo: 'NB-7890',
        route: 'Matara - Hambantota',
        operator: 'SLTB',
        departure: '12:00 PM',
        arrival: '01:30 PM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: 'NB-7890',
        notes: 'Midday service',
        platform: 'B1',
      },
      {
        id: 'WED006',
        routeId: 'RT006',
        busNo: 'NB-9753',
        route: 'Matara - Akuressa',
        operator: 'Private',
        departure: '04:00 PM',
        arrival: '05:15 PM',
        days: ['Wednesday'],
        status: 'Active',
        assignedBus: 'NB-9753',
        notes: 'Evening local service',
        platform: 'B3',
      },

      // THURSDAY SCHEDULES
      {
        id: 'THU001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '05:30 AM',
        arrival: '09:15 AM',
        days: ['Thursday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Express service via highway',
        platform: 'A1',
      },
      {
        id: 'THU002',
        routeId: 'RT002',
        busNo: 'NB-5678',
        route: 'Matara - Kandy',
        operator: 'Private',
        departure: '06:15 AM',
        arrival: '11:45 AM',
        days: ['Thursday'],
        status: 'Active',
        assignedBus: 'NB-5678',
        notes: 'Via Ratnapura',
        platform: 'B2',
      },
      {
        id: 'THU003',
        routeId: 'RT013',
        busNo: 'NB-5789',
        route: 'Matara - Jaffna',
        operator: 'SLTB',
        departure: '08:00 AM',
        arrival: '07:30 PM',
        days: ['Thursday'],
        status: 'Active',
        assignedBus: 'NB-5789',
        notes: 'Long distance northern route',
        platform: 'C6',
      },
      {
        id: 'THU004',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '11:00 AM',
        arrival: '12:30 PM',
        days: ['Thursday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Late morning service',
        platform: 'A3',
      },
      {
        id: 'THU005',
        routeId: 'RT005',
        busNo: 'NB-1357',
        route: 'Matara - Ratnapura',
        operator: 'SLTB',
        departure: '01:30 PM',
        arrival: '05:00 PM',
        days: ['Thursday'],
        status: 'Active',
        assignedBus: 'NB-1357',
        notes: 'Afternoon mountain route',
        platform: 'A2',
      },
      {
        id: 'THU006',
        routeId: 'RT014',
        busNo: 'NB-6890',
        route: 'Matara - Trincomalee',
        operator: 'Private',
        departure: '03:00 PM',
        arrival: '10:30 PM',
        days: ['Thursday'],
        status: 'Pending',
        assignedBus: '',
        notes: 'Eastern coast route',
        platform: 'C7',
      },

      // FRIDAY SCHEDULES
      {
        id: 'FRI001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '05:30 AM',
        arrival: '09:15 AM',
        days: ['Friday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Express service via highway',
        platform: 'A1',
      },
      {
        id: 'FRI002',
        routeId: 'RT015',
        busNo: 'NB-2468',
        route: 'Matara - Kataragama',
        operator: 'Private',
        departure: '10:15 AM',
        arrival: '02:45 PM',
        days: ['Friday'],
        status: 'Active',
        assignedBus: 'NB-2468',
        notes: 'Pilgrimage service starts Friday',
        platform: 'C2',
      },
      {
        id: 'FRI003',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '12:00 PM',
        arrival: '01:30 PM',
        days: ['Friday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Weekend preparation service',
        platform: 'A3',
      },
      {
        id: 'FRI004',
        routeId: 'RT016',
        busNo: 'NB-7901',
        route: 'Matara - Monaragala',
        operator: 'SLTB',
        departure: '02:00 PM',
        arrival: '07:30 PM',
        days: ['Friday'],
        status: 'Active',
        assignedBus: 'NB-7901',
        notes: 'Friday evening service',
        platform: 'C8',
      },
      {
        id: 'FRI005',
        routeId: 'RT007',
        busNo: 'NB-8642',
        route: 'Matara - Weligama',
        operator: 'SLTB',
        departure: '04:30 PM',
        arrival: '05:45 PM',
        days: ['Friday'],
        status: 'Active',
        assignedBus: 'NB-8642',
        notes: 'Weekend commuter service',
        platform: 'A4',
      },
      {
        id: 'FRI006',
        routeId: 'RT017',
        busNo: 'NB-8012',
        route: 'Matara - Polonnaruwa',
        operator: 'Private',
        departure: '06:00 PM',
        arrival: '11:30 PM',
        days: ['Friday'],
        status: 'Inactive',
        assignedBus: '',
        notes: 'Under maintenance',
        platform: 'C9',
      },

      // SATURDAY SCHEDULES
      {
        id: 'SAT001',
        routeId: 'RT001',
        busNo: 'NB-1234',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '06:00 AM',
        arrival: '09:45 AM',
        days: ['Saturday'],
        status: 'Active',
        assignedBus: 'NB-1234',
        notes: 'Weekend express service',
        platform: 'A1',
      },
      {
        id: 'SAT002',
        routeId: 'RT015',
        busNo: 'NB-2468',
        route: 'Matara - Kataragama',
        operator: 'Private',
        departure: '08:00 AM',
        arrival: '12:30 PM',
        days: ['Saturday'],
        status: 'Active',
        assignedBus: 'NB-2468',
        notes: 'Weekend pilgrimage service',
        platform: 'C2',
      },
      {
        id: 'SAT003',
        routeId: 'RT018',
        busNo: 'NB-9123',
        route: 'Matara - Ella',
        operator: 'Private',
        departure: '09:30 AM',
        arrival: '02:00 PM',
        days: ['Saturday'],
        status: 'Active',
        assignedBus: '',
        notes: 'Tourist route to hill country',
        platform: 'B5',
      },
      {
        id: 'SAT004',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '11:00 AM',
        arrival: '12:30 PM',
        days: ['Saturday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Weekend shopping service',
        platform: 'A3',
      },
      {
        id: 'SAT005',
        routeId: 'RT019',
        busNo: 'NB-0234',
        route: 'Matara - Sigiriya',
        operator: 'SLTB',
        departure: '01:00 PM',
        arrival: '06:30 PM',
        days: ['Saturday'],
        status: 'Active',
        assignedBus: 'NB-0234',
        notes: 'Weekend heritage site tour',
        platform: 'C10',
      },
      {
        id: 'SAT006',
        routeId: 'RT020',
        busNo: 'NB-1345',
        route: 'Matara - Batticaloa',
        operator: 'Private',
        departure: '03:30 PM',
        arrival: '09:00 PM',
        days: ['Saturday'],
        status: 'Pending',
        assignedBus: '',
        notes: 'Weekend eastern province service',
        platform: 'C11',
      },

      // SUNDAY SCHEDULES
      {
        id: 'SUN001',
        routeId: 'RT021',
        busNo: 'NB-1456',
        route: 'Matara - Colombo',
        operator: 'SLTB',
        departure: '07:00 AM',
        arrival: '10:45 AM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: 'NB-1456',
        notes: 'Sunday morning service',
        platform: 'A1',
      },
      {
        id: 'SUN002',
        routeId: 'RT015',
        busNo: 'NB-2468',
        route: 'Matara - Kataragama',
        operator: 'Private',
        departure: '09:00 AM',
        arrival: '01:30 PM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: 'NB-2468',
        notes: 'Sunday pilgrimage service',
        platform: 'C2',
      },
      {
        id: 'SUN003',
        routeId: 'RT022',
        busNo: 'NB-2567',
        route: 'Matara - Mirissa',
        operator: 'Private',
        departure: '10:30 AM',
        arrival: '11:15 AM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: 'NB-2567',
        notes: 'Beach route for tourists',
        platform: 'B6',
      },
      {
        id: 'SUN004',
        routeId: 'RT003',
        busNo: 'NB-9012',
        route: 'Matara - Galle',
        operator: 'SLTB',
        departure: '12:30 PM',
        arrival: '02:00 PM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: 'NB-9012',
        notes: 'Sunday afternoon service',
        platform: 'A3',
      },
      {
        id: 'SUN005',
        routeId: 'RT023',
        busNo: 'NB-3678',
        route: 'Matara - Yala',
        operator: 'Private',
        departure: '02:00 PM',
        arrival: '05:30 PM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: '',
        notes: 'Wildlife park shuttle',
        platform: 'C12',
      },
      {
        id: 'SUN006',
        routeId: 'RT007',
        busNo: 'NB-8642',
        route: 'Matara - Weligama',
        operator: 'SLTB',
        departure: '04:00 PM',
        arrival: '05:15 PM',
        days: ['Sunday'],
        status: 'Active',
        assignedBus: 'NB-8642',
        notes: 'Sunday evening return service',
        platform: 'A4',
      },
      {
        id: 'SUN007',
        routeId: 'RT024',
        busNo: 'NB-4789',
        route: 'Matara - Dambulla',
        operator: 'SLTB',
        departure: '05:30 PM',
        arrival: '10:00 PM',
        days: ['Sunday'],
        status: 'Inactive',
        assignedBus: '',
        notes: 'Sunday evening service - temporarily suspended',
        platform: 'C13',
      },
    ];

    // Filter schedules based on selected day
    return allSchedules.filter((schedule) =>
      schedule.days.includes(currentDay)
    );
  };

  const schedules = getMataraSchedules(selectedDate);

  // Filter schedules based on search and filters
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      !searchTerm ||
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.platform.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || schedule.status === statusFilter;
    const matchesOperator =
      !operatorFilter || schedule.operator === operatorFilter;
    const matchesRoute = !routeFilter || schedule.routeId.includes(routeFilter);

    return matchesSearch && matchesStatus && matchesOperator && matchesRoute;
  });

  // Calculate statistics from actual schedule data
  const calculateScheduleStats = () => {
    const activeSchedules = schedules.filter(
      (schedule) => schedule.status === 'Active'
    ).length;
    const uniqueRoutes = new Set(schedules.map((schedule) => schedule.routeId))
      .size;
    const uniqueBuses = new Set(schedules.map((schedule) => schedule.busNo))
      .size;
    const totalSchedules = schedules.length;

    // Calculate on-time performance (simulated based on active schedules)
    const onTimePerformance =
      totalSchedules > 0
        ? Math.round((activeSchedules / totalSchedules) * 100 * 0.985)
        : 0; // 98.5% base rate

    return {
      activeSchedules,
      onTimePerformance,
      routesCovered: uniqueRoutes,
      busesAssigned: uniqueBuses,
    };
  };

  const scheduleStats = calculateScheduleStats();

  // Use pagination hook with initial page size of 5
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedSchedules,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredSchedules, 5); // Show 5 items per page initially

  const handleAddNew = () => {
    router.push('/timeKeeper/schedule-form');
  };

  const handleView = (id: string) => {
    router.push(`/timeKeeper/schedule-details/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/timeKeeper/schedule-form?scheduleId=${id}`);
  };

  const handleAssignBus = (id: string, routeName: string) => {
    setAssignBusModal({
      isOpen: true,
      scheduleId: id,
      routeName: routeName,
    });
  };

  const handleAddNotes = (id: string, routeName: string) => {
    const schedule = schedules.find((s) => s.id === id);
    setNotesModal({
      isOpen: true,
      scheduleId: id,
      routeName: routeName,
      currentNotes: schedule?.notes || '',
    });
  };

  const confirmAssignBus = (busNumber: string) => {
    // Handle bus assignment logic here
    alert(
      `Bus ${busNumber} assigned to schedule ${assignBusModal.scheduleId} successfully!`
    );
    setAssignBusModal({ isOpen: false, scheduleId: '', routeName: '' });
  };

  const confirmSaveNotes = (notes: string) => {
    // Handle notes saving logic here
    alert(`Notes saved for schedule ${notesModal.scheduleId}!`);
    setNotesModal({
      isOpen: false,
      scheduleId: '',
      routeName: '',
      currentNotes: '',
    });
  };

  const handleExportAll = () => {
    alert('Exporting all schedules...');
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
      <div className="space-y-6">
        {/* Date Selector */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Select Date
              </h3>
              <p className="text-sm text-gray-600">
                View bus schedules for a specific day
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="schedule-date"
                className="text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                type="date"
                id="schedule-date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">
                (
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                })}
                )
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <ScheduleStatsCards stats={scheduleStats} />

        {/* Search and Filters */}
        <ScheduleSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          operatorFilter={operatorFilter}
          setOperatorFilter={setOperatorFilter}
          routeFilter={routeFilter}
          setRouteFilter={setRouteFilter}
          onAddNew={handleAddNew}
          onExportAll={handleExportAll}
          isTimeKeeper={true}
        />

        {/* Schedule Table */}
        <ScheduleTable
          schedules={paginatedSchedules.map((schedule) => ({
            ...schedule,
            days: schedule.days.join(', '),
          }))}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(id: string, name: string) => handleAssignBus(id, name)}
          onAssignBus={handleAssignBus}
          onAddNotes={handleAddNotes}
          isTimeKeeper={true}
        />

        {/* Assign Bus Modal */}
        {assignBusModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assign Bus
              </h3>
              <p className="text-gray-600 mb-4">
                Assign a bus to route: "{assignBusModal.routeName}"
              </p>
              <div className="mb-4">
                <label
                  htmlFor="bus-number"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bus Number
                </label>
                <input
                  type="text"
                  id="bus-number"
                  placeholder="Enter bus number (e.g., NB-1234)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setAssignBusModal({
                      isOpen: false,
                      scheduleId: '',
                      routeName: '',
                    })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const busNumber = (
                      document.getElementById('bus-number') as HTMLInputElement
                    )?.value;
                    if (busNumber.trim()) {
                      confirmAssignBus(busNumber);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Assign Bus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Notes Modal */}
        {notesModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add/Edit Notes
              </h3>
              <p className="text-gray-600 mb-4">
                Add notes for route: "{notesModal.routeName}"
              </p>
              <div className="mb-4">
                <label
                  htmlFor="schedule-notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes
                </label>
                <textarea
                  id="schedule-notes"
                  rows={4}
                  defaultValue={notesModal.currentNotes}
                  placeholder="Enter any notes or special instructions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setNotesModal({
                      isOpen: false,
                      scheduleId: '',
                      routeName: '',
                      currentNotes: '',
                    })
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const notes = (
                      document.getElementById(
                        'schedule-notes'
                      ) as HTMLTextAreaElement
                    )?.value;
                    confirmSaveNotes(notes);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
