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
      routeId: "RT001",
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
      routeId: "RT002",
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
      routeId: "RT003",
      busNo: "NB-9012",
      startPoint: "Negombo",
      endPoint: "Chilaw",
      departure: "08:30 AM",
      arrival: "10:00 AM",
      validFrom: "2024-02-01",
      validUntil: "2024-11-30",
      days: "Weekends",
      status: "Pending",
    },
  ];

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

  return (
    <MOTLayout
      activeItem="schedule"
      pageTitle="Schedule Management"
      pageDescription="Create and manage bus schedules and timetables"
    >
      <div className="space-y-6">
        <ScheduleStatsCards />

        <ScheduleSearchFilters
          onAddNew={() => router.push("/mot/schedule-form")}
        />

        <SchedulesTable
          schedules={schedules}
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
