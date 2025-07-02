"use client";

import { ArrowLeft } from "lucide-react";
import { MOTLayout } from "@/components/mot/layout";
import { RouteInformationForm } from "@/components/mot/route-information-form";
import { JourneyDetailsForm } from "@/components/mot/journey-details-form";
import { TimeScheduleSection } from "@/components/mot/time-schedule-section";
import { ValidityPeriodForm } from "@/components/mot/validity-period-form";
import { DaysOfOperationSelector } from "@/components/mot/days-of-operation-selector";
import { ScheduleActionButtons } from "@/components/mot/schedule-action-buttons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get("scheduleId");
  const isEditMode = Boolean(scheduleId);

  const [routeId, setRouteId] = useState("");
  const [busNo, setBusNo] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ departure: "", arrival: "" }]);
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  // Load existing data if in edit mode
  useEffect(() => {
    if (isEditMode && scheduleId) {
      // Mock existing data based on scheduleId
      const mockData = {
        SCH001: {
          routeId: "RT001",
          busNo: "NB1234",
          startPoint: "Colombo Fort",
          endPoint: "Kandy Central",
          validFrom: "2024-01-01",
          validUntil: "2024-12-31",
          timeSlots: [{ departure: "06:30 AM", arrival: "10:15 AM" }],
          selectedDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: false,
          },
        },
        SCH002: {
          routeId: "RT002",
          busNo: "NB5678",
          startPoint: "Galle",
          endPoint: "Matara",
          validFrom: "2024-03-15",
          validUntil: "2024-12-31",
          timeSlots: [{ departure: "07:15 AM", arrival: "08:45 AM" }],
          selectedDays: {
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

      const existingData = mockData[scheduleId as keyof typeof mockData];
      if (existingData) {
        setRouteId(existingData.routeId);
        setBusNo(existingData.busNo);
        setStartPoint(existingData.startPoint);
        setEndPoint(existingData.endPoint);
        setValidFrom(existingData.validFrom);
        setValidUntil(existingData.validUntil);
        setTimeSlots(existingData.timeSlots);
        setSelectedDays(existingData.selectedDays);
      }
    }
  }, [isEditMode, scheduleId]);

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { departure: "", arrival: "" }]);
  };

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const updatedSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setTimeSlots(updatedSlots);
  };

  const handleDayChange = (day: string, checked: boolean) => {
    setSelectedDays((prev) => ({ ...prev, [day]: checked }));
  };

  const handleSave = () => {
    const action = isEditMode ? "updated" : "added";
    alert(`Schedule ${action} successfully!`);
    router.push("/mot/schedule-management");
  };

  const handleCancel = () => {
    router.push("/mot/schedule-management");
  };

  const pageTitle = isEditMode ? "Edit Schedule" : "Add New Schedule";
  const pageDescription = isEditMode
    ? "Modify existing bus schedule and timetable"
    : "Create a new bus schedule and timetable";
  const submitLabel = isEditMode ? "Update Schedule" : "Add Schedule";

  return (
    <MOTLayout
      activeItem="schedule"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => router.push("/mot/schedule-management")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Schedule Management
          </button>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{pageTitle}</h2>
            <p className="text-gray-600">{pageDescription}</p>
            {isEditMode && (
              <p className="text-sm text-blue-600 mt-1">
                Editing Schedule #{scheduleId}
              </p>
            )}
          </div>
        </div>

        <RouteInformationForm
          routeId={routeId}
          busNo={busNo}
          onRouteIdChange={setRouteId}
          onBusNoChange={setBusNo}
        />

        <JourneyDetailsForm
          startPoint={startPoint}
          endPoint={endPoint}
          onStartPointChange={setStartPoint}
          onEndPointChange={setEndPoint}
        />

        <TimeScheduleSection
          timeSlots={timeSlots}
          onAddTimeSlot={addTimeSlot}
          onUpdateTimeSlot={updateTimeSlot}
        />

        <ValidityPeriodForm
          validFrom={validFrom}
          validUntil={validUntil}
          onValidFromChange={setValidFrom}
          onValidUntilChange={setValidUntil}
        />

        <DaysOfOperationSelector
          selectedDays={selectedDays}
          onDayChange={handleDayChange}
        />

        <ScheduleActionButtons
          onCancel={handleCancel}
          onSubmit={handleSave}
          submitLabel={submitLabel}
        />
      </div>
    </MOTLayout>
  );
}
