"use client";

import { MOTLayout } from "@/components/mot/layout";
import { RouteInformationForm } from "@/components/mot/route-information-form";
import { JourneyDetailsForm } from "@/components/mot/journey-details-form";
import { TimeScheduleSection } from "@/components/mot/time-schedule-section";
import { ValidityPeriodForm } from "@/components/mot/validity-period-form";
import { DaysOfOperationSelector } from "@/components/mot/days-of-operation-selector";
import { ScheduleActionButtons } from "@/components/mot/schedule-action-buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddNewSchedule() {
  const router = useRouter();
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
  const [routeId, setRouteId] = useState("");
  const [busNo, setBusNo] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");

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

  const handleSubmit = () => {
    alert("Schedule added successfully!");
    router.push("/mot/schedule-management");
  };

  const handleCancel = () => {
    router.push("/mot/schedule-management");
  };

  return (
    <MOTLayout
      activeItem="schedule"
      pageTitle="Add New Schedule"
      pageDescription="Create a new bus schedule and timetable"
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-700 hover:underline"
            onClick={() => router.push("/mot/schedule-management")}
          >
            Schedule Management
          </button>
          <span>/</span>
          <span>Add Schedule</span>
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
          onSubmit={handleSubmit}
        />
      </div>
    </MOTLayout>
  );
}
