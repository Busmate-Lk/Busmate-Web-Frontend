"use client";

// import { MOTLayout } from "@/components/mot/layout";
import { ScheduleDetailsHeader } from "@/components/mot/schedule-details-header";
import { ScheduleBasicInfo } from "@/components/mot/schedule-basic-info";
import { RouteInformationCard } from "@/components/mot/route-information-card";
import { ScheduleInformationCard } from "@/components/mot/schedule-information-card";
import { OtherBusesTable } from "@/components/mot/other-buses-table";
import { DaysOfOperationCard } from "@/components/mot/days-of-operation-card";
import { IntermediateStopsCard } from "@/components/mot/intermediate-stops-card";
import { ScheduleDetailsActions } from "@/components/mot/schedule-details-actions";
import { useRouter, useParams } from "next/navigation";
import { Layout } from "@/components/shared/layout";

export default function ScheduleDetails() {
  const router = useRouter();
  const params = useParams();
  const scheduleId = params?.id || "SCH001";

  // Mock schedule data based on ID
  const getScheduleData = (id: string) => {
    const schedules = {
      SCH001: {
        id: "SCH001",
        routeId: "RT001",
        busNo: "NB-1234",
        startPoint: "Colombo Fort",
        endPoint: "Kandy Central",
        departure: "06:30 AM",
        arrival: "10:15 AM",
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        days: "Mon-Fri",
        status: "Active",
        permitNo: "PRM-2024-001",
        operatorName: "Lanka Transport Co.",
        conductor: "S.D. Silva",
        daysDetails: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
      },
      SCH002: {
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
        permitNo: "PRM-2024-002",
        operatorName: "Central Bus Service",
        conductor: "P. Fernando",
        daysDetails: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
      },
    };
    return schedules[id as keyof typeof schedules] || schedules.SCH001;
  };

  const schedule = getScheduleData(scheduleId as string);

  const otherBuses = [
    {
      busNo: "NB-5678",
      departure: "08:00 AM",
      arrival: "11:45 AM",
      operator: "Central Bus Service",
    },
    {
      busNo: "NB-9012",
      departure: "12:30 PM",
      arrival: "04:15 PM",
      operator: "Lanka Transport Co.",
    },
    {
      busNo: "NB-3456",
      departure: "05:00 PM",
      arrival: "08:45 PM",
      operator: "Express Bus Lines",
    },
  ];

  const intermediateStops = [
    { id: 1, name: "Colombo Fort", time: "06:30 AM" },
    { id: 2, name: "Kelaniya", time: "07:00 AM" },
    { id: 3, name: "Kadawatha", time: "07:30 AM" },
    { id: 4, name: "Kegalle", time: "08:45 AM" },
    { id: 5, name: "Kandy Central", time: "10:15 AM" },
  ];

  const handleArchive = () => {
    if (confirm("Are you sure you want to archive this schedule?")) {
      alert("Schedule archived successfully!");
      router.push("/mot/schedule-management");
    }
  };

  const handleDeactivate = () => {
    if (confirm("Are you sure you want to deactivate this schedule?")) {
      alert("Schedule deactivated");
    }
  };

  const handleEdit = () => {
    router.push(`/mot/schedule-form?scheduleId=${schedule.id}`);
  };

  const handleBack = () => {
    router.push("/mot/schedule-management");
  };

  return (
    <Layout
    role = "mot"
      activeItem="schedule"
      pageTitle="Schedule Details"
      pageDescription="View detailed information about the bus schedule"
    >
      <div className="space-y-6">
        <ScheduleDetailsHeader
          scheduleId={schedule.id}
          onBack={handleBack}
          onEdit={handleEdit}
          onArchive={handleArchive}
        />

        <ScheduleBasicInfo schedule={schedule} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RouteInformationCard
            startPoint={schedule.startPoint}
            endPoint={schedule.endPoint}
          />
          <ScheduleInformationCard schedule={schedule} />
        </div>

        <OtherBusesTable buses={otherBuses} />

        <DaysOfOperationCard daysDetails={schedule.daysDetails} />

        <IntermediateStopsCard stops={intermediateStops} />

        <ScheduleDetailsActions
          onDeactivate={handleDeactivate}
          onClose={handleBack}
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  );
}
