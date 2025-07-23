"use client";

import { ScheduleStatsCards } from "@/components/mot/schedule-stats-cards";
import { ScheduleSearchFilters } from "@/components/mot/schedule-search-filters";
import { TimetablesTable } from "@/components/mot/timetables-table";
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from "@/components/mot/confirmation-modals";
import { usePagination } from "@/components/mot/pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/components/shared/layout";

export default function ScheduleAssignment() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    scheduleId: "",
    scheduleName: "",
  });
  const [deactivateModal, setDeactivateModal] = useState({
    isOpen: false,
    scheduleId: "",
    scheduleName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const routeSchedules = [
    {
      id: "TT001",
      routeId: "001",
      routeName: "Colombo - Kandy",
      routeGroup: "Group A",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      numberOfDays: 6,
      status: "Active",
      totalTimeSlots: 12,
      assignedBuses: 8,
      createdDate: "2024-01-15",
      lastModified: "2024-06-20",
    },
    {
      id: "TT002",
      routeId: "002",
      routeName: "Galle - Matara",
      routeGroup: "Group B",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Active",
      totalTimeSlots: 18,
      assignedBuses: 12,
      createdDate: "2024-02-10",
      lastModified: "2024-07-05",
    },
    {
      id: "TT003",
      routeId: "003",
      routeName: "Colombo - Kataragama",
      routeGroup: "Group C",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Pending",
      totalTimeSlots: 8,
      assignedBuses: 0,
      createdDate: "2024-03-05",
      lastModified: "2024-07-10",
    },
    {
      id: "TT004",
      routeId: "004",
      routeName: "Colombo - Mannar",
      routeGroup: "Group D",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      numberOfDays: 5,
      status: "Active",
      totalTimeSlots: 10,
      assignedBuses: 6,
      createdDate: "2024-01-20",
      lastModified: "2024-06-15",
    },
    {
      id: "TT005",
      routeId: "005",
      routeName: "Colombo - Kurunegala",
      routeGroup: "Group A",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Inactive",
      totalTimeSlots: 14,
      assignedBuses: 0,
      createdDate: "2024-04-12",
      lastModified: "2024-07-01",
    },
    {
      id: "TT006",
      routeId: "006",
      routeName: "Jaffna - Vavuniya",
      routeGroup: "Group E",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Active",
      totalTimeSlots: 16,
      assignedBuses: 10,
      createdDate: "2024-02-28",
      lastModified: "2024-06-30",
    },
    {
      id: "TT007",
      routeId: "007",
      routeName: "Negombo - Anuradhapura",
      routeGroup: "Group F",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      numberOfDays: 6,
      status: "Pending",
      totalTimeSlots: 6,
      assignedBuses: 0,
      createdDate: "2024-05-18",
      lastModified: "2024-07-12",
    },
    {
      id: "TT008",
      routeId: "008",
      routeName: "Colombo - Trincomalee",
      routeGroup: "Group G",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Active",
      totalTimeSlots: 9,
      assignedBuses: 7,
      createdDate: "2024-03-22",
      lastModified: "2024-07-08",
    },
    {
      id: "TT009",
      routeId: "009",
      routeName: "Matara - Nuwara Eliya",
      routeGroup: "Group H",
      daysOfWeek: ["Friday", "Saturday", "Sunday"],
      numberOfDays: 3,
      status: "Inactive",
      totalTimeSlots: 6,
      assignedBuses: 0,
      createdDate: "2024-04-05",
      lastModified: "2024-06-25",
    },
    {
      id: "TT010",
      routeId: "010",
      routeName: "Batticaloa - Polonnaruwa",
      routeGroup: "Group I",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      numberOfDays: 5,
      status: "Active",
      totalTimeSlots: 8,
      assignedBuses: 5,
      createdDate: "2024-01-30",
      lastModified: "2024-07-02",
    },
    {
      id: "TT011",
      routeId: "011",
      routeName: "Kandy - Nuwara Eliya",
      routeGroup: "Group A",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      numberOfDays: 7,
      status: "Active",
      totalTimeSlots: 12,
      assignedBuses: 9,
      createdDate: "2024-02-14",
      lastModified: "2024-07-11",
    },
    {
      id: "TT012",
      routeId: "012",
      routeName: "Gampaha - Negombo",
      routeGroup: "Group B",
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      numberOfDays: 6,
      status: "Active",
      totalTimeSlots: 20,
      assignedBuses: 15,
      createdDate: "2024-03-10",
      lastModified: "2024-07-06",
    },
  ];

  // Filter route schedules based on search term, status, and route
  const filteredSchedules = routeSchedules.filter(schedule => {
    const matchesSearch = searchTerm === '' || 
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.routeGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.daysOfWeek.some(day => day.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === '' || schedule.status === statusFilter;
    const matchesRoute = routeFilter === '' || schedule.routeId === routeFilter;
    
    return matchesSearch && matchesStatus && matchesRoute;
  });

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

  // Calculate statistics from filtered schedule data
  const calculateScheduleStats = () => {
    const activeTimeTables = filteredSchedules.filter(schedule => schedule.status === 'Active').length;
    const totalRoutes = new Set(filteredSchedules.map(schedule => schedule.routeId)).size;
    const totalTimeTables = filteredSchedules.length;
    const totalAssignedBuses = filteredSchedules.reduce((sum, schedule) => sum + schedule.assignedBuses, 0);
    
    return {
      activeTimeTables,
      totalRoutes,
      totalTimeTables,
      totalAssignedBuses,
    };
  };

  const scheduleStats = calculateScheduleStats();

  const handleAssignBuses = (scheduleId: string, routeName: string) => {
    // Find the schedule to get route ID
    const schedule = routeSchedules.find(s => s.id === scheduleId);
    const routeId = schedule?.routeId || '';
    
    // Navigate to bus assignment page with schedule and route information
    router.push(`/mot/schedule-assign-form?scheduleId=${scheduleId}&routeId=${routeId}&routeName=${encodeURIComponent(routeName)}`);
  };

  const handleDeleteClick = (scheduleId: string, routeName: string) => {
    setDeleteModal({
      isOpen: true,
      scheduleId,
      scheduleName: `${routeName} Timetable`,
    });
  };

  const handleDeactivateClick = (scheduleId: string, routeName: string) => {
    setDeactivateModal({
      isOpen: true,
      scheduleId,
      scheduleName: `${routeName} Timetable`,
    });
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDeleteModal({ isOpen: false, scheduleId: "", scheduleName: "" });
    alert(`${deleteModal.scheduleName} has been permanently deleted.`);
  };

  const handleDeactivateConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDeactivateModal({ isOpen: false, scheduleId: "", scheduleName: "" });
    alert(`${deactivateModal.scheduleName} has been deactivated.`);
  };

  const handleExportAll = () => {
    // Handle export functionality
    console.log('Exporting all timetables...');
  };

  return (
    <Layout
      role="mot"
      activeItem="schedule"
      pageTitle="Schedule Assignment"
      pageDescription="Manage route timetables and bus assignments for all bus routes"
    >
      <div className="space-y-6">
        <ScheduleStatsCards stats={scheduleStats} />

        <ScheduleSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          routeFilter={routeFilter}
          setRouteFilter={setRouteFilter}
          onAddNew={() => router.push("/mot/schedule-form")}
          onExportAll={handleExportAll}
        />

        <TimetablesTable
          schedules={paginatedSchedules}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={(scheduleId: string) =>
            router.push(`/mot/schedule-details/${scheduleId}`)
          }
          onEdit={(scheduleId: string) =>
            router.push(`/mot/schedule-form?scheduleId=${scheduleId}`)
          }
          onAssignBuses={handleAssignBuses}
          onDeactivate={handleDeactivateClick}
          onDelete={handleDeleteClick}
        />

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() =>
            setDeleteModal({ isOpen: false, scheduleId: "", scheduleName: "" })
          }
          onConfirm={handleDeleteConfirm}
          title="Delete Timetable"
          itemName={deleteModal.scheduleName}
          isLoading={isLoading}
        />

        <DeactivationConfirmationModal
          isOpen={deactivateModal.isOpen}
          onClose={() =>
            setDeactivateModal({
              isOpen: false,
              scheduleId: "",
              scheduleName: "",
            })
          }
          onConfirm={handleDeactivateConfirm}
          title="Deactivate Timetable"
          itemName={deactivateModal.scheduleName}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}
