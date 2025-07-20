"use client";

// import { TimeKeeperLayout } from "@/components/timeKeeper/layout";
import { ScheduleStatsCards } from "@/components/timeKeeper/schedule-stats-cards";
import { ScheduleSearchFilters } from "@/components/timeKeeper/schedule-search-filters";
import { ScheduleTable } from "@/components/timeKeeper/schedule-table";
import { usePagination } from "@/components/mot/pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/components/shared/layout";

export default function ScheduleManagement() {
 
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    scheduleId: "",
    scheduleName: "",
  });

  // Sample schedule data
  const schedules = [
    {
      id: 'SCH001',
      routeId: 'RT001',
      busNo: 'NB-1234',
      route: 'Colombo - Kandy',
      operator: 'SLTB',
      departure: '06:30 AM',
      arrival: '10:15 AM',
      days: 'Mon-Fri',
      status: 'Active',
    },
    {
      id: 'SCH002',
      routeId: 'RT002',
      busNo: 'NB-5678',
      route: 'Galle - Matara',
      operator: 'SLTB',
      departure: '07:15 AM',
      arrival: '08:45 AM',
      days: 'Daily',
      status: 'Active',
    },
    {
      id: 'SCH003',
      routeId: 'RT003',
      busNo: 'NB-9012',
      route: 'Colombo - Kataragama',
      operator: 'Private',
      departure: '12:30 PM',
      arrival: '04:15 PM',
      days: 'Mon-Sat',
      status: 'Pending',
    },
    {
      id: 'SCH004',
      routeId: 'RT004',
      busNo: 'NB-3456',
      route: 'Jaffna - Vavuniya',
      operator: 'SLTB',
      departure: '08:00 AM',
      arrival: '11:30 AM',
      days: 'Daily',
      status: 'Active',
    },
    {
      id: 'SCH005',
      routeId: 'RT005',
      busNo: 'NB-7890',
      route: 'Batticaloa - Polonnaruwa',
      operator: 'Private',
      departure: '09:45 AM',
      arrival: '12:00 PM',
      days: 'Mon-Fri',
      status: 'Inactive',
    },
  ];

  // Filter schedules based on search and filters
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = !searchTerm || 
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || schedule.status === statusFilter;
    const matchesOperator = !operatorFilter || schedule.operator === operatorFilter;
    const matchesRoute = !routeFilter || schedule.routeId.includes(routeFilter);
    
    return matchesSearch && matchesStatus && matchesOperator && matchesRoute;
  });

  // Calculate statistics from actual schedule data
  const calculateScheduleStats = () => {
    const activeSchedules = schedules.filter(schedule => schedule.status === 'Active').length;
    const uniqueRoutes = new Set(schedules.map(schedule => schedule.routeId)).size;
    const uniqueBuses = new Set(schedules.map(schedule => schedule.busNo)).size;
    const totalSchedules = schedules.length;
    
    // Calculate on-time performance (simulated based on active schedules)
    const onTimePerformance = totalSchedules > 0 ? 
      Math.round((activeSchedules / totalSchedules) * 100 * 0.985) : 0; // 98.5% base rate
    
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
    router.push("/timeKeeper/schedule-form");
  };

  const handleView = (id: string) => {
    router.push(`/timeKeeper/schedule-details/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/timeKeeper/schedule-form?scheduleId=${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      scheduleId: id,
      scheduleName: name,
    });
  };

  const confirmDelete = () => {
    // Handle delete logic here
    alert(`Schedule ${deleteModal.scheduleId} deleted successfully!`);
    setDeleteModal({ isOpen: false, scheduleId: "", scheduleName: "" });
  };

  const handleExportAll = () => {
    alert("Exporting all schedules...");
  };

  return (
    <Layout
      activeItem="schedule"
      pageTitle="Schedule Management"
      pageDescription="Manage and monitor bus schedules and timetables"
      role="timeKeeper"

    >
      <div className="space-y-6">
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
        />

        {/* Schedule Table */}
        <ScheduleTable
          schedules={paginatedSchedules}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete schedule "{deleteModal.scheduleName}"? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, scheduleId: "", scheduleName: "" })}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
