"use client";

import { ArrowLeft } from "lucide-react";
// import { MOTLayout } from "@/components/mot/layout";
import { RouteInformationForm } from "@/components/mot/route-information-form";
import { JourneyDetailsForm } from "@/components/mot/journey-details-form";
import { TimeScheduleSection } from "@/components/mot/time-schedule-section";
import { BidirectionalScheduleForm } from "@/components/mot/bidirectional-schedule-form";
import { OperatingHoursForm } from "@/components/mot/operating-hours-form";
import { ValidityPeriodForm } from "@/components/mot/validity-period-form";
import { DaysOfOperationSelector } from "@/components/mot/days-of-operation-selector";
import { ScheduleActionButtons } from "@/components/mot/schedule-action-buttons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout } from "@/components/shared/layout";

export default function ScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get("scheduleId");
  const isEditMode = Boolean(scheduleId);

  const [routeId, setRouteId] = useState("");
  const [routeGroup, setRouteGroup] = useState("");
  const [frequency, setFrequency] = useState("");
  const [isBidirectional, setIsBidirectional] = useState(false);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ departure: "", arrival: "" }]);
  const [firstBusTime, setFirstBusTime] = useState("");
  const [lastBusTime, setLastBusTime] = useState("");
  const [bidirectionalData, setBidirectionalData] = useState({
    forwardTimeSlots: [{ departure: "", arrival: "" }],
    returnTimeSlots: [{ departure: "", arrival: "" }],
    forwardFrequency: "",
    returnFrequency: "",
    forwardFirstBus: "",
    forwardLastBus: "",
    returnFirstBus: "",
    returnLastBus: "",
  });
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
          routeGroup: "Group A",
          frequency: "Every 30 minutes",
          isBidirectional: false,
          startPoint: "Colombo Fort",
          endPoint: "Kandy Central",
          validFrom: "2024-01-01",
          validUntil: "2024-12-31",
          timeSlots: [{ departure: "06:30 AM", arrival: "10:15 AM" }],
          firstBusTime: "06:00 AM",
          lastBusTime: "10:00 PM",
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
          routeGroup: "Group B",
          frequency: "Every 20 minutes",
          isBidirectional: true,
          startPoint: "Galle",
          endPoint: "Matara",
          validFrom: "2024-03-15",
          validUntil: "2024-12-31",
          timeSlots: [{ departure: "07:15 AM", arrival: "08:45 AM" }],
          firstBusTime: "05:30 AM",
          lastBusTime: "11:30 PM",
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
        setRouteGroup(existingData.routeGroup);
        setFrequency(existingData.frequency);
        setIsBidirectional(existingData.isBidirectional);
        setStartPoint(existingData.startPoint);
        setEndPoint(existingData.endPoint);
        setValidFrom(existingData.validFrom);
        setValidUntil(existingData.validUntil);
        setTimeSlots(existingData.timeSlots);
        setFirstBusTime(existingData.firstBusTime || "");
        setLastBusTime(existingData.lastBusTime || "");
        setSelectedDays(existingData.selectedDays);

        // Initialize bidirectional data if it's a bidirectional schedule
        if (existingData.isBidirectional) {
          setBidirectionalData({
            forwardTimeSlots: existingData.timeSlots,
            returnTimeSlots: [{ departure: "", arrival: "" }],
            forwardFrequency: existingData.frequency,
            returnFrequency: existingData.frequency,
            forwardFirstBus: existingData.firstBusTime || "",
            forwardLastBus: existingData.lastBusTime || "",
            returnFirstBus: "",
            returnLastBus: "",
          });
        }
      }
    }
  }, [isEditMode, scheduleId]);

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { departure: "", arrival: "" }]);
  };

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      const updatedSlots = timeSlots.filter((_, i) => i !== index);
      setTimeSlots(updatedSlots);
    }
  };

  const updateTimeSlot = (index: number, field: string, value: string) => {
    const updatedSlots = timeSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setTimeSlots(updatedSlots);
  };

  const handleBidirectionalChange = (value: boolean) => {
    setIsBidirectional(value);
    if (value) {
      // Reset frequency when switching to bidirectional
      setFrequency("");
      // Initialize bidirectional data if needed
      if (!bidirectionalData.forwardFrequency && !bidirectionalData.returnFrequency) {
        setBidirectionalData({
          ...bidirectionalData,
          forwardFrequency: frequency || "",
          returnFrequency: frequency || "",
        });
      }
    }
  };

  const handleDayChange = (day: string, checked: boolean) => {
    setSelectedDays((prev) => ({ ...prev, [day]: checked }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!routeId || !routeGroup || !startPoint || !endPoint || !validFrom || !validUntil) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate at least one day is selected
    const hasSelectedDays = Object.values(selectedDays).some(day => day);
    if (!hasSelectedDays) {
      alert("Please select at least one day of operation.");
      return;
    }

    const action = isEditMode ? "updated" : "added";
    
    if (isBidirectional && !isEditMode) {
      // Validate bidirectional data
      if (!bidirectionalData.forwardFrequency || !bidirectionalData.returnFrequency) {
        alert("Please select frequencies for both directions.");
        return;
      }

      // Validate time slots for manual entry
      if (bidirectionalData.forwardFrequency === "Manual Time Entry") {
        const hasValidForwardSlots = bidirectionalData.forwardTimeSlots.some(slot => slot.departure && slot.arrival);
        if (!hasValidForwardSlots) {
          alert("Please add at least one time slot for the forward direction.");
          return;
        }
      } else if (bidirectionalData.forwardFrequency) {
        // Validate operating hours for frequency-based schedules
        if (!bidirectionalData.forwardFirstBus || !bidirectionalData.forwardLastBus) {
          alert("Please specify first and last bus times for the forward direction.");
          return;
        }
      }

      if (bidirectionalData.returnFrequency === "Manual Time Entry") {
        const hasValidReturnSlots = bidirectionalData.returnTimeSlots.some(slot => slot.departure && slot.arrival);
        if (!hasValidReturnSlots) {
          alert("Please add at least one time slot for the return direction.");
          return;
        }
      } else if (bidirectionalData.returnFrequency) {
        // Validate operating hours for frequency-based schedules
        if (!bidirectionalData.returnFirstBus || !bidirectionalData.returnLastBus) {
          alert("Please specify first and last bus times for the return direction.");
          return;
        }
      }

      // Create both forward and return schedules with independent settings
      const forwardSchedule = {
        routeId,
        routeGroup,
        frequency: bidirectionalData.forwardFrequency,
        startPoint,
        endPoint,
        validFrom,
        validUntil,
        timeSlots: bidirectionalData.forwardTimeSlots,
        firstBusTime: bidirectionalData.forwardFirstBus,
        lastBusTime: bidirectionalData.forwardLastBus,
        selectedDays,
        direction: "forward"
      };

      const returnSchedule = {
        routeId,
        routeGroup,
        frequency: bidirectionalData.returnFrequency,
        startPoint: endPoint,
        endPoint: startPoint,
        validFrom,
        validUntil,
        timeSlots: bidirectionalData.returnTimeSlots,
        firstBusTime: bidirectionalData.returnFirstBus,
        lastBusTime: bidirectionalData.returnLastBus,
        selectedDays,
        direction: "return"
      };

      console.log("Creating forward schedule:", forwardSchedule);
      console.log("Creating return schedule:", returnSchedule);
      
      alert(`Bidirectional schedules ${action} successfully!\n\nForward: ${startPoint} → ${endPoint} (${bidirectionalData.forwardFrequency})\nReturn: ${endPoint} → ${startPoint} (${bidirectionalData.returnFrequency})`);
    } else {
      // Create single direction schedule
      if (!frequency) {
        alert("Please select a frequency.");
        return;
      }

      // Validate time slots for manual entry
      if (frequency === "Manual Time Entry") {
        const hasValidTimeSlots = timeSlots.some(slot => slot.departure && slot.arrival);
        if (!hasValidTimeSlots) {
          alert("Please add at least one time slot for manual time entry.");
          return;
        }
      } else {
        // Validate operating hours for frequency-based schedules
        if (!firstBusTime || !lastBusTime) {
          alert("Please specify first and last bus times.");
          return;
        }
      }

      const schedule = {
        routeId,
        routeGroup,
        frequency,
        startPoint,
        endPoint,
        validFrom,
        validUntil,
        timeSlots,
        firstBusTime,
        lastBusTime,
        selectedDays
      };

      console.log("Creating schedule:", schedule);
      alert(`Schedule ${action} successfully!`);
    }

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
    <Layout
    role = "mot"
      activeItem="bus-routes"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <div className="space-y-6">
        {/*Bread Crumb*/}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-routes")}
          >
            Routes Management
          </button>
          <span>/</span>
          <span>Shedule Form</span>
        </div>
        
        <RouteInformationForm
          routeId={routeId}
          routeGroup={routeGroup}
          frequency={frequency}
          isBidirectional={isBidirectional}
          onRouteIdChange={setRouteId}
          onRouteGroupChange={setRouteGroup}
          onFrequencyChange={setFrequency}
          onBidirectionalChange={handleBidirectionalChange}
        />

        <JourneyDetailsForm
          startPoint={startPoint}
          endPoint={endPoint}
          onStartPointChange={setStartPoint}
          onEndPointChange={setEndPoint}
        />

        {isBidirectional ? (
          <BidirectionalScheduleForm
            startPoint={startPoint}
            endPoint={endPoint}
            frequency={frequency}
            scheduleData={bidirectionalData}
            onUpdateScheduleData={setBidirectionalData}
          />
        ) : (
          <>
            {frequency === "Manual Time Entry" ? (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-yellow-600">⚠️</div>
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                        Manual Time Entry Selected
                      </h4>
                      <p className="text-sm text-yellow-800">
                        Please add specific departure and arrival times for your schedule. 
                        You can add multiple time slots throughout the day.
                      </p>
                    </div>
                  </div>
                </div>
                <TimeScheduleSection
                  timeSlots={timeSlots}
                  onAddTimeSlot={addTimeSlot}
                  onUpdateTimeSlot={updateTimeSlot}
                  onRemoveTimeSlot={removeTimeSlot}
                />
              </>
            ) : frequency && (
              <OperatingHoursForm
                firstBusTime={firstBusTime}
                lastBusTime={lastBusTime}
                frequency={frequency}
                onFirstBusTimeChange={setFirstBusTime}
                onLastBusTimeChange={setLastBusTime}
              />
            )}
          </>
        )}

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
    </Layout>
  );
}
