"use client";

import { MOTLayout } from "@/components/mot/layout";
import { ScheduleStatsCards } from "@/components/mot/schedule-stats-cards";
import { ScheduleSearchFilters } from "@/components/mot/schedule-search-filters";
import { SchedulesTable } from "@/components/mot/schedules-table";
import { IntermediateStopsModal } from "@/components/mot/intermediate-stops-modal";
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from "@/components/mot/confirmation-modals";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ScheduleManagement() {
  const router = useRouter();
  const [selectedStops, setSelectedStops] = useState<any[]>([]);
  const [isStopsModalOpen, setIsStopsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('');
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

  // Route permits data (matching the permit table)
  const routePermits = [
    {
      id: '001',
      routeNo: '001',
      routeName: 'Colombo - Kandy',
      operator: 'SLTB',
      validFrom: 'Jan 1, 2024',
      validUntil: 'Dec 31, 2024',
      status: 'Active',
    },
    {
      id: '002',
      routeNo: '002',
      routeName: 'Galle - Matara',
      operator: 'SLTB',
      validFrom: 'Mar 15, 2024',
      validUntil: 'Mar 14, 2025',
      status: 'Active',
    },
    {
      id: '003',
      routeNo: '003',
      routeName: 'Colombo-Kataragama',
      operator: 'Private',
      validFrom: 'Feb 1, 2024',
      validUntil: 'Jan 31, 2025',
      status: 'Pending',
    },
    {
      id: '004',
      routeNo: '004',
      routeName: 'Colombo-Mannar',
      operator: 'SLTB',
      validFrom: 'Jun 1, 2024',
      validUntil: 'May 31, 2025',
      status: 'Active',
    },
    {
      id: '005',
      routeNo: '005',
      routeName: 'Colombo-Kurunegala',
      operator: 'Private',
      validFrom: 'Apr 10, 2024',
      validUntil: 'Apr 9, 2025',
      status: 'Expired',
    },
  ];

  const schedules = [
    {
      id: "SCH001",
      routeId: "001",
      routeName: "Colombo - Kandy",
      operator: "SLTB",
      busNo: "NB-1234",
      startPoint: "Colombo Fort",
      endPoint: "Kandy",
      departure: "06:00 AM",
      arrival: "09:30 AM",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      days: "Mon-Fri",
      status: "Active",
    },
    {
      id: "SCH002",
      routeId: "002",
      routeName: "Galle - Matara",
      operator: "SLTB",
      busNo: "NB-5678",
      startPoint: "Galle",
      endPoint: "Matara",
      departure: "07:15 AM",
      arrival: "08:45 AM",
      validFrom: "2024-03-15",
      validUntil: "2024-12-31",
      days: "Daily",
      status: "Active",
    },
    {
      id: "SCH003",
      routeId: "003",
      routeName: "Colombo-Kataragama",
      operator: "Private",
      busNo: "NB-9012",
      startPoint: "Colombo",
      endPoint: "Kataragama",
      departure: "08:30 AM",
      arrival: "06:00 PM",
      validFrom: "2024-02-01",
      validUntil: "2024-11-30",
      days: "Daily",
      status: "Pending",
    },
    {
      id: "SCH004",
      routeId: "004",
      routeName: "Colombo-Mannar",
      operator: "SLTB",
      busNo: "NB-9019",
      startPoint: "Colombo",
      endPoint: "Mannar",
      departure: "07:00 AM",
      arrival: "02:30 PM",
      validFrom: "2024-06-01",
      validUntil: "2025-05-31",
      days: "Mon-Fri",
      status: "Active",
    },
    {
      id: "SCH005",
      routeId: "005",
      routeName: "Colombo-Kurunegala",
      operator: "Private",
      busNo: "NB-2345",
      startPoint: "Colombo",
      endPoint: "Kurunegala",
      departure: "09:00 AM",
      arrival: "11:30 AM",
      validFrom: "2024-04-10",
      validUntil: "2025-04-09",
      days: "Daily",
      status: "Inactive",
    },
  ];

  // Filter schedules based on search term, status, operator, and route
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = searchTerm === '' || 
      schedule.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.endPoint.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || schedule.status === statusFilter;
    const matchesOperator = operatorFilter === '' || schedule.operator === operatorFilter;
    const matchesRoute = routeFilter === '' || schedule.routeId === routeFilter;
    
    return matchesSearch && matchesStatus && matchesOperator && matchesRoute;
  });

  // Calculate statistics from filtered schedule data
  const calculateScheduleStats = () => {
    const activeSchedules = filteredSchedules.filter(schedule => schedule.status === 'Active').length;
    const uniqueRoutes = new Set(filteredSchedules.map(schedule => schedule.routeId)).size;
    const uniqueBuses = new Set(filteredSchedules.map(schedule => schedule.busNo)).size;
    const totalSchedules = filteredSchedules.length;
    
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
    <MOTLayout
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
          operatorFilter={operatorFilter}
          setOperatorFilter={setOperatorFilter}
          routeFilter={routeFilter}
          setRouteFilter={setRouteFilter}
          onAddNew={() => router.push("/mot/schedule-form")}
          onExportAll={handleExportAll}
        />

        <SchedulesTable
          schedules={filteredSchedules}
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
    </MOTLayout>
  );
}
