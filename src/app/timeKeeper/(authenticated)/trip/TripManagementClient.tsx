'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TripManagementService,
  TripResponse,
  PageTripResponse,
  TripStatisticsResponse,
  TripFilterOptionsResponse,
} from '@/lib/api-client/route-management';

// Import components from MOT (reuse the same UI components)
import { TripStatsCards } from '@/components/mot/trips/TripStatsCards';
import TripAdvancedFilters from '@/components/mot/trips/TripAdvancedFilters';
import { TimeKeeperTripsTable } from '@/components/timeKeeper/trips/TimeKeeperTripsTable';

// Import shared UI components
import Pagination from '@/components/shared/Pagination';
import { useAuth } from '@/context/AuthContext';

interface QueryParams {
  page: number;
  size: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  search: string;
  status?:
    | 'pending'
    | 'active'
    | 'completed'
    | 'cancelled'
    | 'delayed'
    | 'in_transit'
    | 'boarding'
    | 'departed';
  routeId?: string;
  operatorId?: string;
  scheduleId?: string;
  busId?: string;
  passengerServicePermitId?: string;
  fromDate?: string;
  toDate?: string;
  hasPsp?: boolean;
  hasBus?: boolean;
  hasDriver?: boolean;
  hasConductor?: boolean;
}

interface FilterOptions {
  statuses: Array<
    | 'pending'
    | 'active'
    | 'completed'
    | 'cancelled'
    | 'delayed'
    | 'in_transit'
    | 'boarding'
    | 'departed'
  >;
  routes: Array<{ id: string; name: string; routeGroup?: string }>;
  operators: Array<{ id: string; name: string }>;
  schedules: Array<{ id: string; name: string }>;
  buses: Array<{ id: string; registrationNumber: string }>;
  passengerServicePermits: Array<{ id: string; permitNumber: string }>;
}

export default function TripManagementClient() {
  const router = useRouter();
  const { user } = useAuth();
  const [trips, setTrips] = useState<TripResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with actual assigned bus stop from user profile
  // For now, we'll filter by routes that serve Matara (or timekeeper's assigned station)
  const assignedBusStop = 'Matara Bus Station'; // This should come from user.assignedBusStop

  // Helper function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');
  const [operatorFilter, setOperatorFilter] = useState('all');
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const [busFilter, setBusFilter] = useState('all');
  const [pspFilter, setPspFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [hasPsp, setHasPsp] = useState(false);
  const [hasBus, setHasBus] = useState(false);
  const [hasDriver, setHasDriver] = useState(false);
  const [hasConductor, setHasConductor] = useState(false);

  // Filter options from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    statuses: [],
    routes: [],
    operators: [],
    schedules: [],
    buses: [],
    passengerServicePermits: [],
  });
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'tripDate',
    sortDir: 'desc',
    search: '',
  });

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  // Statistics state
  const [stats, setStats] = useState({
    totalTrips: { count: 0 },
    activeTrips: { count: 0 },
    completedTrips: { count: 0 },
    pendingTrips: { count: 0 },
    cancelledTrips: { count: 0 },
    tripsWithPsp: { count: 0 },
    tripsWithBus: { count: 0 },
    inTransitTrips: { count: 0 },
  });

  // State for notes modal (TimeKeepers can add notes)
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [tripForNotes, setTripForNotes] = useState<TripResponse | null>(null);
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Load filter options - filtered by routes serving the assigned bus stop
  const loadFilterOptions = useCallback(async () => {
    try {
      const response: TripFilterOptionsResponse =
        await TripManagementService.getTripFilterOptions();

      // TODO: Filter routes to only include those that serve the assigned bus stop
      // For now, we'll filter by route name containing "Matara" as a temporary solution
      const filteredRoutes =
        response.routes?.filter(
          (route) =>
            route.name?.toLowerCase().includes('matara') ||
            route.routeGroupName?.toLowerCase().includes('matara')
        ) || [];

      setFilterOptions({
        statuses: (response.statuses as any) || [],
        routes: filteredRoutes.map((route) => ({
          id: route.id || '',
          name: route.name || '',
          routeGroup: route.routeGroupName,
        })),
        operators:
          response.operators?.map((op) => ({
            id: op.id || '',
            name: op.name || '',
          })) || [],
        schedules:
          response.schedules?.map((schedule) => ({
            id: schedule.id || '',
            name: schedule.name || '',
          })) || [],
        buses:
          response.buses?.map((bus) => ({
            id: bus.id || '',
            registrationNumber: bus.plateNumber || '',
          })) || [],
        passengerServicePermits:
          response.passengerServicePermits?.map((psp) => ({
            id: psp.id || '',
            permitNumber: psp.permitNumber || '',
          })) || [],
      });
    } catch (err) {
      console.error('Failed to load filter options:', err);
    } finally {
      setFilterOptionsLoading(false);
    }
  }, []);

  // Load statistics - filtered by assigned bus stop
  const loadStatistics = useCallback(async () => {
    try {
      const response: TripStatisticsResponse =
        await TripManagementService.getTripStatistics();

      // TODO: These stats should be filtered by bus stop in the backend
      // For now, we'll use the overall stats
      setStats({
        totalTrips: { count: response.totalTrips || 0 },
        activeTrips: { count: response.activeTrips || 0 },
        completedTrips: { count: response.completedTrips || 0 },
        pendingTrips: { count: response.pendingTrips || 0 },
        cancelledTrips: { count: response.cancelledTrips || 0 },
        tripsWithPsp: { count: response.tripsWithAssignedPsp || 0 },
        tripsWithBus: { count: response.tripsWithAssignedBus || 0 },
        inTransitTrips: { count: response.inTransitTrips || 0 },
      });
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  }, []);

  // Load trips from API - filtered by routes serving assigned bus stop
  const loadTrips = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response: PageTripResponse =
        await TripManagementService.getAllTrips(
          queryParams.page,
          queryParams.size,
          queryParams.sortBy,
          queryParams.sortDir,
          queryParams.search || undefined,
          queryParams.status,
          queryParams.routeId,
          queryParams.operatorId,
          queryParams.scheduleId,
          queryParams.passengerServicePermitId,
          queryParams.busId,
          queryParams.fromDate,
          queryParams.toDate,
          queryParams.hasPsp,
          queryParams.hasBus,
          queryParams.hasDriver,
          queryParams.hasConductor
        );

      // TODO: Add additional client-side filtering if backend doesn't support bus stop filtering
      // For now, filter by routes containing "Matara"
      const filteredTrips =
        response.content?.filter((trip) =>
          trip.routeName?.toLowerCase().includes('matara')
        ) || [];

      setTrips(filteredTrips);
      setPagination({
        currentPage: response.pageable?.pageNumber || 0,
        totalPages: response.totalPages || 0,
        totalElements: filteredTrips.length,
        pageSize: response.pageable?.pageSize || 10,
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to load trips');
      console.error('Failed to load trips:', err);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    loadFilterOptions();
    loadStatistics();
  }, [loadFilterOptions, loadStatistics]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  // Update query params with filters
  const updateQueryParams = useCallback(
    (updates: Partial<QueryParams>) => {
      setQueryParams((prev) => {
        const newParams = { ...prev, ...updates };

        // Apply filter states to query params
        if (statusFilter !== 'all') {
          newParams.status = statusFilter as any;
        } else {
          delete newParams.status;
        }

        if (routeFilter !== 'all') {
          newParams.routeId = routeFilter;
        } else {
          delete newParams.routeId;
        }

        if (operatorFilter !== 'all') {
          newParams.operatorId = operatorFilter;
        } else {
          delete newParams.operatorId;
        }

        if (scheduleFilter !== 'all') {
          newParams.scheduleId = scheduleFilter;
        } else {
          delete newParams.scheduleId;
        }

        if (busFilter !== 'all') {
          newParams.busId = busFilter;
        } else {
          delete newParams.busId;
        }

        if (pspFilter !== 'all') {
          newParams.passengerServicePermitId = pspFilter;
        } else {
          delete newParams.passengerServicePermitId;
        }

        if (fromDate) {
          newParams.fromDate = fromDate;
        } else {
          delete newParams.fromDate;
        }

        if (toDate) {
          newParams.toDate = toDate;
        } else {
          delete newParams.toDate;
        }

        if (hasPsp) {
          newParams.hasPsp = true;
        } else {
          delete newParams.hasPsp;
        }

        if (hasBus) {
          newParams.hasBus = true;
        } else {
          delete newParams.hasBus;
        }

        if (hasDriver) {
          newParams.hasDriver = true;
        } else {
          delete newParams.hasDriver;
        }

        if (hasConductor) {
          newParams.hasConductor = true;
        } else {
          delete newParams.hasConductor;
        }

        return newParams;
      });
    },
    [
      statusFilter,
      routeFilter,
      operatorFilter,
      scheduleFilter,
      busFilter,
      pspFilter,
      fromDate,
      toDate,
      hasPsp,
      hasBus,
      hasDriver,
      hasConductor,
    ]
  );

  // Apply filters when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      updateQueryParams({ page: 0 });
    }, 300);

    return () => clearTimeout(timer);
  }, [
    statusFilter,
    routeFilter,
    operatorFilter,
    scheduleFilter,
    busFilter,
    pspFilter,
    fromDate,
    toDate,
    hasPsp,
    hasBus,
    hasDriver,
    hasConductor,
    updateQueryParams,
  ]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    updateQueryParams({ search: searchTerm, page: 0 });
  };

  const handleSort = (sortBy: string, sortDir: 'asc' | 'desc') => {
    updateQueryParams({ sortBy, sortDir, page: 0 });
  };

  const handlePageChange = (page: number) => {
    updateQueryParams({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateQueryParams({ size, page: 0 });
  };

  const handleClearAllFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setRouteFilter('all');
    setOperatorFilter('all');
    setScheduleFilter('all');
    setBusFilter('all');
    setPspFilter('all');
    setFromDate('');
    setToDate('');
    setHasPsp(false);
    setHasBus(false);
    setHasDriver(false);
    setHasConductor(false);

    setQueryParams({
      page: 0,
      size: queryParams.size,
      sortBy: 'tripDate',
      sortDir: 'desc',
      search: '',
    });
  }, [queryParams.size]);

  // TimeKeeper actions - limited compared to MOT
  const handleView = (tripId: string) => {
    router.push(`/timeKeeper/trip/${tripId}`);
  };

  const handleAddNotes = (tripId: string) => {
    const trip = trips.find((t) => t.id === tripId);
    if (trip) {
      setTripForNotes(trip);
      setNotes(trip.notes || '');
      setShowNotesModal(true);
    }
  };

  const handleSaveNotes = async () => {
    if (!tripForNotes) return;

    try {
      setIsSavingNotes(true);
      // TODO: Implement API call to update trip notes
      // await TripManagementService.updateTrip(tripForNotes.id!, { notes });
      console.log('Saving notes for trip:', tripForNotes.id, notes);

      // Update local state
      setTrips((prev) =>
        prev.map((t) => (t.id === tripForNotes.id ? { ...t, notes } : t))
      );

      setShowNotesModal(false);
      setTripForNotes(null);
      setNotes('');
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleCancelNotes = () => {
    setShowNotesModal(false);
    setTripForNotes(null);
    setNotes('');
  };

  // Disabled actions for TimeKeeper (read-only access)
  const handleEdit = () => {
    console.log('TimeKeepers cannot edit trips');
  };

  const handleDelete = () => {
    console.log('TimeKeepers cannot delete trips');
  };

  const handleStart = () => {
    console.log('TimeKeepers cannot start trips');
  };

  const handleComplete = () => {
    console.log('TimeKeepers cannot complete trips');
  };

  const handleCancel = () => {
    console.log('TimeKeepers cannot cancel trips');
  };

  const handleAssignPsp = () => {
    console.log('TimeKeepers cannot assign PSP');
  };

  if (isLoading && trips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Loading trips for {assignedBusStop}...
          </p>
        </div>
      </div>
    );
  }

  if (error && trips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to Load Trips
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => loadTrips()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner - Shows assigned bus stop */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-blue-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Assigned Station:</span>{' '}
            {assignedBusStop}
            <span className="ml-4 text-blue-600">
              Showing trips passing through this station
            </span>
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <TripStatsCards stats={stats} />

      {/* Filters */}
      <TripAdvancedFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        routeFilter={routeFilter}
        setRouteFilter={setRouteFilter}
        operatorFilter={operatorFilter}
        setOperatorFilter={setOperatorFilter}
        scheduleFilter={scheduleFilter}
        setScheduleFilter={setScheduleFilter}
        busFilter={busFilter}
        setBusFilter={setBusFilter}
        pspFilter={pspFilter}
        setPspFilter={setPspFilter}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        hasPsp={hasPsp}
        setHasPsp={setHasPsp}
        hasBus={hasBus}
        setHasBus={setHasBus}
        hasDriver={hasDriver}
        setHasDriver={setHasDriver}
        hasConductor={hasConductor}
        setHasConductor={setHasConductor}
        filterOptions={filterOptions}
        loading={filterOptionsLoading}
        totalCount={pagination.totalElements}
        filteredCount={pagination.totalElements}
        onClearAll={handleClearAllFilters}
        onSearch={handleSearch}
      />

      <div className="bg-white shadow-sm">
        {/* Trips Table - TimeKeeper view (limited actions) */}
        <TimeKeeperTripsTable
          trips={trips}
          onView={handleView}
          onAddNotes={handleAddNotes}
          onSort={handleSort}
          activeFilters={{}}
          loading={isLoading}
          currentSort={{
            field: queryParams.sortBy,
            direction: queryParams.sortDir,
          }}
        />
        {/* Pagination */}
        {pagination.totalElements > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalElements={pagination.totalElements}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>

      {/* Notes Modal */}
      {showNotesModal && tripForNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add/Edit Notes
            </h3>
            <p className="text-gray-600 mb-4">
              Trip: {tripForNotes.routeName} -{' '}
              {formatDate(tripForNotes.tripDate)}
            </p>
            <div className="mb-4">
              <label
                htmlFor="trip-notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Notes
              </label>
              <textarea
                id="trip-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any notes or observations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelNotes}
                disabled={isSavingNotes}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isSavingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
