"use client";

import { ScheduleStatsCards } from "@/components/mot/schedule-stats-cards";
import { ScheduleSearchFilters } from "@/components/mot/schedule-search-filters";
import { SchedulesTable } from "@/components/mot/schedules-table";
import { IntermediateStopsModal } from "@/components/mot/intermediate-stops-modal";
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from "@/components/mot/confirmation-modals";
import { usePagination } from "@/components/mot/pagination";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/components/shared/layout";

export default function ScheduleManagement() {
  const router = useRouter();
  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const [isStopsModalOpen, setIsStopsModalOpen] = useState(false);
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

  const schedules = [
    {
      id: "SCH001",
      routeId: "001",
      routeName: "Colombo - Kandy",
      routeGroup: "Group A",
      startPoint: "Colombo Fort",
      endPoint: "Kandy",
      departure: "06:00 AM",
      arrival: "09:30 AM",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      days: "Mon-Fri",
      frequency: "Every 30 minutes",
      status: "Active",
    },
    {
      id: "SCH002",
      routeId: "002",
      routeName: "Galle - Matara",
      routeGroup: "Group B",
      startPoint: "Galle",
      endPoint: "Matara",
      departure: "07:15 AM",
      arrival: "08:45 AM",
      validFrom: "2024-03-15",
      validUntil: "2024-12-31",
      days: "Daily",
      frequency: "Every 20 minutes",
      status: "Active",
    },
    {
      id: "SCH003",
      routeId: "003",
      routeName: "Colombo-Kataragama",
      routeGroup: "Group C",
      startPoint: "Colombo",
      endPoint: "Kataragama",
      departure: "08:30 AM",
      arrival: "06:00 PM",
      validFrom: "2024-02-01",
      validUntil: "2024-11-30",
      days: "Daily",
      frequency: "Every 2 hours",
      status: "Pending",
    },
    {
      id: "SCH004",
      routeId: "004",
      routeName: "Colombo-Mannar",
      routeGroup: "Group D",
      startPoint: "Colombo",
      endPoint: "Mannar",
      departure: "07:00 AM",
      arrival: "02:30 PM",
      validFrom: "2024-06-01",
      validUntil: "2025-05-31",
      days: "Mon-Fri",
      frequency: "Every 1 hour",
      status: "Active",
    },
    {
      id: "SCH005",
      routeId: "005",
      routeName: "Colombo-Kurunegala",
      routeGroup: "Group A",
      startPoint: "Colombo",
      endPoint: "Kurunegala",
      departure: "09:00 AM",
      arrival: "11:30 AM",
      validFrom: "2024-04-10",
      validUntil: "2025-04-09",
      days: "Daily",
      frequency: "Every 45 minutes",
      status: "Inactive",
    },
    {
      id: "SCH006",
      routeId: "006",
      routeName: "Jaffna - Vavuniya",
      routeGroup: "Group E",
      startPoint: "Jaffna",
      endPoint: "Vavuniya",
      departure: "05:30 AM",
      arrival: "08:00 AM",
      validFrom: "2024-07-01",
      validUntil: "2025-06-30",
      days: "Daily",
      frequency: "Every 40 minutes",
      status: "Active",
    },
    {
      id: "SCH007",
      routeId: "007",
      routeName: "Negombo - Anuradhapura",
      routeGroup: "Group F",
      startPoint: "Negombo",
      endPoint: "Anuradhapura",
      departure: "06:30 AM",
      arrival: "10:15 AM",
      validFrom: "2024-05-20",
      validUntil: "2025-05-19",
      days: "Mon-Sat",
      frequency: "Every 1.5 hours",
      status: "Pending",
    },
    {
      id: "SCH008",
      routeId: "008",
      routeName: "Colombo - Trincomalee",
      routeGroup: "Group G",
      startPoint: "Colombo",
      endPoint: "Trincomalee",
      departure: "08:00 AM",
      arrival: "01:30 PM",
      validFrom: "2024-08-01",
      validUntil: "2025-07-31",
      days: "Daily",
      frequency: "Every 2 hours",
      status: "Active",
    },
    {
      id: "SCH009",
      routeId: "009",
      routeName: "Matara - Nuwara Eliya",
      routeGroup: "Group H",
      startPoint: "Matara",
      endPoint: "Nuwara Eliya",
      departure: "07:30 AM",
      arrival: "12:00 PM",
      validFrom: "2024-02-15",
      validUntil: "2024-12-31",
      days: "Daily",
      frequency: "Every 3 hours",
      status: "Inactive",
    },
    {
      id: "SCH010",
      routeId: "010",
      routeName: "Batticaloa - Polonnaruwa",
      routeGroup: "Group I",
      startPoint: "Batticaloa",
      endPoint: "Polonnaruwa",
      departure: "09:15 AM",
      arrival: "11:45 AM",
      validFrom: "2024-09-01",
      validUntil: "2025-08-31",
      days: "Mon-Fri",
      frequency: "Every 1 hour",
      status: "Active",
    },
    {
      id: "SCH011",
      routeId: "001",
      routeName: "Kandy - Colombo",
      routeGroup: "Group A",
      startPoint: "Kandy",
      endPoint: "Colombo Fort",
      departure: "10:00 AM",
      arrival: "01:30 PM",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      days: "Daily",
      frequency: "Every 30 minutes",
      status: "Active",
    },
    {
      id: "SCH012",
      routeId: "002",
      routeName: "Matara - Galle",
      routeGroup: "Group B",
      startPoint: "Matara",
      endPoint: "Galle",
      departure: "12:15 PM",
      arrival: "01:45 PM",
      validFrom: "2024-03-15",
      validUntil: "2024-12-31",
      days: "Daily",
      frequency: "Every 20 minutes",
      status: "Active",
    },
    {
      id: "SCH013",
      routeId: "001",
      routeName: "Colombo - Kandy",
      routeGroup: "Group A",
      startPoint: "Colombo Fort",
      endPoint: "Kandy",
      departure: "02:00 PM",
      arrival: "05:30 PM",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      days: "Mon-Fri",
      frequency: "Every 30 minutes",
      status: "Pending",
    },
    {
      id: "SCH014",
      routeId: "003",
      routeName: "Kataragama - Colombo",
      routeGroup: "Group C",
      startPoint: "Kataragama",
      endPoint: "Colombo",
      departure: "10:30 AM",
      arrival: "08:00 PM",
      validFrom: "2024-02-01",
      validUntil: "2024-11-30",
      days: "Daily",
      frequency: "Every 2 hours",
      status: "Active",
    },
    {
      id: "SCH015",
      routeId: "004",
      routeName: "Mannar - Colombo",
      routeGroup: "Group D",
      startPoint: "Mannar",
      endPoint: "Colombo",
      departure: "11:00 AM",
      arrival: "06:30 PM",
      validFrom: "2024-06-01",
      validUntil: "2025-05-31",
      days: "Daily",
      frequency: "Manual Time Entry",
      status: "Active",
    },
  ];

  // Filter schedules based on search term, status, and route
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = searchTerm === '' || 
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.endPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.frequency.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  // Calculate statistics from filtered schedule data (use filteredSchedules for accurate stats)
  const calculateScheduleStats = () => {
    const activeSchedules = filteredSchedules.filter(schedule => schedule.status === 'Active').length;
    const uniqueRoutes = new Set(filteredSchedules.map(schedule => schedule.routeId)).size;
    const totalScheduleSlots = filteredSchedules.length;
    const totalSchedules = filteredSchedules.length;
    
    // Calculate on-time performance (simulated based on active schedules)
    const onTimePerformance = totalSchedules > 0 ? 
      Math.round((activeSchedules / totalSchedules) * 100 * 0.985) : 0; // 98.5% base rate
    
    return {
      activeSchedules,
      onTimePerformance,
      routesCovered: uniqueRoutes,
      scheduleSlots: totalScheduleSlots,
    };
  };

  const scheduleStats = calculateScheduleStats();

  const intermediateStops = [
    { id: 1, name: "Colombo Fort", time: "06:30 AM" },
    { id: 2, name: "Kelaniya", time: "07:00 AM" },
    { id: 3, name: "Kadawatha", time: "07:30 AM" },
    { id: 4, name: "Kagalle", time: "08:45 AM" },
    { id: 5, name: "Kandy Central", time: "10:15 AM" },
  ];

  const handleIntermediateStops = (scheduleId: string) => {
    setSelectedStops(intermediateStops);
    setIsStopsModalOpen(true);
  };

  const handleDeleteClick = (scheduleId: string, routeName: string) => {
    setDeleteModal({
      isOpen: true,
      scheduleId,
      scheduleName: `${routeName} Schedule`,
    });
  };

  const handleDeactivateClick = (scheduleId: string, routeName: string) => {
    setDeactivateModal({
      isOpen: true,
      scheduleId,
      scheduleName: `${routeName} Schedule`,
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
    console.log('Exporting all schedules...');
  };

  return (
    <Layout
    role = "mot"
      activeItem="schedule"
      pageTitle="Schedule Management"
      pageDescription="Create and manage bus schedules and timetables"
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

        <SchedulesTable
          schedules={paginatedSchedules}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={(scheduleId) =>
            router.push(`/mot/schedule-details/${scheduleId}`)
          }
          onEdit={(scheduleId) =>
            router.push(`/mot/schedule-form?scheduleId=${scheduleId}`)
          }
          onIntermediateStops={handleIntermediateStops}
          onDeactivate={handleDeactivateClick}
          onDelete={handleDeleteClick}
        />

        <IntermediateStopsModal
          isOpen={isStopsModalOpen}
          onClose={() => setIsStopsModalOpen(false)}
          stops={selectedStops}
        />

        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() =>
            setDeleteModal({ isOpen: false, scheduleId: "", scheduleName: "" })
          }
          onConfirm={handleDeleteConfirm}
          title="Delete Schedule"
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
          title="Deactivate Schedule"
          itemName={deactivateModal.scheduleName}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}
