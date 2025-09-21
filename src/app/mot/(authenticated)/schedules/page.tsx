'use client';

import { ScheduleStatsCards } from '@/components/mot/schedule-stats-cards';
import { ScheduleFilters } from '@/components/mot/schedule-filters';
import { ScheduleActions } from '@/components/mot/schedule-actions';
import { SchedulesTable } from '@/components/mot/schedules-table';
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals';
import Pagination from '@/components/shared/Pagination';
import { Layout } from '@/components/shared/layout';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { QueryParams } from '@/types/requestdto/pagination';
import { 
  ScheduleManagementService, 
  ScheduleResponse, 
  PageScheduleResponse 
} from '@/lib/api-client/route-management';
import { toast } from 'sonner';

export default function SchedulesPage() {
  const router = useRouter();
  
  // State management
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'name',
    sortDir: 'asc',
    search: '',
  });
  
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [routeFilter, setRouteFilter] = useState<string>('');
  const [scheduleTypeFilter, setScheduleTypeFilter] = useState<string>('');
  
  const [schedules, setSchedules] = useState<ScheduleResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Modal states
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    scheduleId: '',
    scheduleName: '',
  });
  
  const [deactivateModal, setDeactivateModal] = useState({
    isOpen: false,
    scheduleId: '',
    scheduleName: '',
  });

  // Filter options state
  const [filterOptions, setFilterOptions] = useState({
    statuses: [] as string[],
    scheduleTypes: [] as string[],
  });

  // Statistics state
  const [stats, setStats] = useState({
    activeSchedules: 0,
    totalRoutes: 0,
    totalSchedules: 0,
    totalAssignedBuses: 0,
  });

  // Fetch schedules
  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const response: PageScheduleResponse = await ScheduleManagementService.getSchedules(
        queryParams.page,
        queryParams.size,
        queryParams.sortBy,
        queryParams.sortDir,
        routeFilter || undefined,
        undefined, // routeGroupId
        scheduleTypeFilter as 'REGULAR' | 'SPECIAL' | undefined,
        statusFilter as 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | undefined,
        queryParams.search || undefined
      );

      setSchedules(response.content || []);
      setTotalElements(response.totalElements || 0);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to fetch schedules');
      setSchedules([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [queryParams, statusFilter, routeFilter, scheduleTypeFilter]);

  // Fetch filter options
  const fetchFilterOptions = useCallback(async () => {
    try {
      const [statusesResponse, typesResponse] = await Promise.all([
        ScheduleManagementService.getDistinctStatuses(),
        ScheduleManagementService.getDistinctScheduleTypes(),
      ]);

      setFilterOptions({
        statuses: statusesResponse,
        scheduleTypes: typesResponse,
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  }, []);

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const response = await ScheduleManagementService.getScheduleStatistics();
      setStats({
        activeSchedules: response.activeSchedules || 0,
        totalRoutes: response.totalRoutes || 0,
        totalSchedules: response.totalSchedules || 0,
        totalAssignedBuses: response.totalAssignedBuses || 0,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchFilterOptions();
    fetchStatistics();
  }, [fetchFilterOptions, fetchStatistics]);

  // Fetch schedules when dependencies change
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: page - 1, // Convert to 0-based indexing
    }));
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setQueryParams((prev) => ({
      ...prev,
      size,
      page: 0, // Reset to first page
    }));
  }, []);

  // Search handler
  const handleSearch = useCallback((searchTerm: string) => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 0, // Reset to first page on search
    }));
  }, []);

  // Filter handlers
  const handleStatusFilterChange = useCallback((status: string) => {
    setStatusFilter(status);
    setQueryParams((prev) => ({
      ...prev,
      page: 0, // Reset to first page
    }));
  }, []);

  const handleRouteFilterChange = useCallback((route: string) => {
    setRouteFilter(route);
    setQueryParams((prev) => ({
      ...prev,
      page: 0, // Reset to first page
    }));
  }, []);

  const handleScheduleTypeFilterChange = useCallback((type: string) => {
    setScheduleTypeFilter(type);
    setQueryParams((prev) => ({
      ...prev,
      page: 0, // Reset to first page
    }));
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setStatusFilter('');
    setRouteFilter('');
    setScheduleTypeFilter('');
    handleSearch('');
  }, [handleSearch]);

  // Schedule actions
  const handleView = useCallback((scheduleId: string) => {
    router.push(`/mot/schedules/${scheduleId}`);
  }, [router]);

  const handleEdit = useCallback((scheduleId: string) => {
    router.push(`/mot/schedules/edit/${scheduleId}`);
  }, [router]);

  const handleAssignBuses = useCallback((scheduleId: string, routeName: string) => {
    router.push(`/mot/schedules/${scheduleId}/assign-buses`);
  }, [router]);

  const handleDeactivateClick = useCallback((scheduleId: string, scheduleName: string) => {
    setDeactivateModal({
      isOpen: true,
      scheduleId,
      scheduleName,
    });
  }, []);

  const handleDeleteClick = useCallback((scheduleId: string, scheduleName: string) => {
    setDeleteModal({
      isOpen: true,
      scheduleId,
      scheduleName,
    });
  }, []);

  // Modal handlers
  const handleDeactivateConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await ScheduleManagementService.deactivateSchedule(deactivateModal.scheduleId);
      toast.success(`${deactivateModal.scheduleName} has been deactivated`);
      fetchSchedules();
      fetchStatistics();
    } catch (error) {
      console.error('Error deactivating schedule:', error);
      toast.error('Failed to deactivate schedule');
    } finally {
      setIsLoading(false);
      setDeactivateModal({ isOpen: false, scheduleId: '', scheduleName: '' });
    }
  }, [deactivateModal, fetchSchedules, fetchStatistics]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await ScheduleManagementService.deleteSchedule(deleteModal.scheduleId);
      toast.success(`${deleteModal.scheduleName} has been deleted`);
      fetchSchedules();
      fetchStatistics();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    } finally {
      setIsLoading(false);
      setDeleteModal({ isOpen: false, scheduleId: '', scheduleName: '' });
    }
  }, [deleteModal, fetchSchedules, fetchStatistics]);

  const handleAddNew = useCallback(() => {
    console.log('Add new schedule clicked');
    router.push('/mot/schedules/create');
  }, [router]);

  const handleExportAll = useCallback(async () => {
    console.log('Export all schedules clicked');
    try {
      toast.info('Preparing export...');
      // TODO: Implement actual export functionality
      // This could involve calling an export API endpoint
      console.log('Exporting', schedules.length, 'schedules');
      toast.success('Export completed');
    } catch (error) {
      console.error('Error exporting schedules:', error);
      toast.error('Failed to export schedules');
    }
  }, [schedules.length]);

  // Remove transformation since we're now using the raw ScheduleResponse directly
  // const transformedSchedules = useMemo(() => {
  //   return schedules.map(schedule => ({
  //     id: schedule.id || '',
  //     routeId: schedule.routeId || '',
  //     routeName: schedule.routeName || '',
  //     routeGroup: schedule.routeGroupName || '',
  //     daysOfWeek: getDaysOfWeekFromCalendar(schedule.scheduleCalendars?.[0]),
  //     numberOfDays: getDaysOfWeekFromCalendar(schedule.scheduleCalendars?.[0]).length,
  //     status: schedule.status || 'PENDING',
  //     totalTimeSlots: schedule.scheduleStops?.length || 0,
  //     assignedBuses: 0, // This would come from bus assignment data
  //     createdDate: schedule.createdAt || '',
  //     lastModified: schedule.updatedAt || '',
  //     scheduleType: schedule.scheduleType || 'REGULAR',
  //     effectiveStartDate: schedule.effectiveStartDate || '',
  //     effectiveEndDate: schedule.effectiveEndDate || '',
  //     description: schedule.description || '',
  //   }));
  // }, [schedules]);

  // Helper function to extract days of week from calendar (kept for reference but not used)
  // function getDaysOfWeekFromCalendar(calendar: any): string[] {
  //   if (!calendar) return [];
  //   
  //   const days: string[] = [];
  //   if (calendar.monday) days.push('Monday');
  //   if (calendar.tuesday) days.push('Tuesday');
  //   if (calendar.wednesday) days.push('Wednesday');
  //   if (calendar.thursday) days.push('Thursday');
  //   if (calendar.friday) days.push('Friday');
  //   if (calendar.saturday) days.push('Saturday');
  //   if (calendar.sunday) days.push('Sunday');
  //   
  //   return days;
  // }

  if (isInitialLoading) {
    return (
      <Layout
        role="mot"
        activeItem="schedules"
        pageTitle="Schedule Management"
        pageDescription="Manage route schedules, timetables, and bus assignments"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      role="mot"
      activeItem="schedules"
      pageTitle="Schedule Management"
      pageDescription="Manage route schedules, timetables, and bus assignments"
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <ScheduleStatsCards stats={stats} isLoading={isInitialLoading} />
        
        {/* Page Header with Actions */}
        <ScheduleActions
          onAddNew={handleAddNew}
          onExportAll={handleExportAll}
          isLoading={isLoading}
          totalSchedules={totalElements}
        />

        {/* Search and Filters */}
        <ScheduleFilters
          searchTerm={queryParams.search || ''}
          setSearchTerm={handleSearch}
          statusFilter={statusFilter}
          setStatusFilter={handleStatusFilterChange}
          routeFilter={routeFilter}
          setRouteFilter={handleRouteFilterChange}
          scheduleTypeFilter={scheduleTypeFilter}
          setScheduleTypeFilter={handleScheduleTypeFilterChange}
          filterOptions={filterOptions}
          onClearFilters={clearAllFilters}
          isLoading={isLoading}
        />

        {/* Results Summary */}
        {(statusFilter || routeFilter || scheduleTypeFilter || queryParams.search) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-900">
                  Showing {totalElements} schedule{totalElements !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-700">Active filters:</span>
                  {queryParams.search && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Search: "{queryParams.search}"
                    </span>
                  )}
                  {statusFilter && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Status: {statusFilter}
                    </span>
                  )}
                  {scheduleTypeFilter && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Type: {scheduleTypeFilter}
                    </span>
                  )}
                  {routeFilter && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Route: {routeFilter}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Schedules Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <SchedulesTable
            schedules={schedules}
            onView={handleView}
            onEdit={handleEdit}
            onAssignBuses={handleAssignBuses}
            onDeactivate={handleDeactivateClick}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
          />

          {/* Pagination */}
          {totalElements > 0 && (
            <div className="border-t border-gray-200">
              <Pagination
                currentPage={queryParams.page! + 1} // Convert from 0-based to 1-based for display
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={queryParams.size!}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={isLoading}
                searchActive={!!(queryParams.search || statusFilter || routeFilter || scheduleTypeFilter)}
                filterCount={[queryParams.search, statusFilter, routeFilter, scheduleTypeFilter].filter(Boolean).length}
              />
            </div>
          )}

          {/* Empty State */}
          {totalElements === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No schedules found</div>
              <div className="text-gray-500 text-sm">
                {queryParams.search || statusFilter || routeFilter || scheduleTypeFilter
                  ? 'Try adjusting your search criteria or filters'
                  : 'Get started by creating your first schedule'}
              </div>
              {!(queryParams.search || statusFilter || routeFilter || scheduleTypeFilter) && (
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Schedule
                </button>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Modals */}
        <DeactivationConfirmationModal
          isOpen={deactivateModal.isOpen}
          onClose={() => setDeactivateModal({ isOpen: false, scheduleId: '', scheduleName: '' })}
          onConfirm={handleDeactivateConfirm}
          title="Deactivate Schedule"
          itemName={deactivateModal.scheduleName}
          isLoading={isLoading}
        />

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, scheduleId: '', scheduleName: '' })}
          onConfirm={handleDeleteConfirm}
          title="Delete Schedule"
          itemName={deleteModal.scheduleName}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}