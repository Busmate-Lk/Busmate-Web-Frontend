"use client";

import { MOTLayout } from "@/components/mot/layout";
import { PermitBusDetails } from "@/components/mot/permit-bus-details";
import { PermitBusSchedule } from "@/components/mot/permit-bus-schedule";
import { PermitDetailsForm } from "@/components/mot/permit-details-form";
import { PermitDocumentUpload } from "@/components/mot/permit-document-upload";
import { PermitApplicationSummary } from "@/components/mot/permit-application-summary";
import { PermitFormStep2Actions } from "@/components/mot/permit-form-step2-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RoutePermitFormStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const permitId = searchParams.get("permitId");
  const isEdit = !!permitId;

  const [routeType, setRouteType] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [permitType, setPermitType] = useState("");
  const [formData, setFormData] = useState({
    busId: "",
    busNumber: "",
    seats: "",
    validFrom: "",
    validUntil: "",
    departureTime: "",
    arrivalTime: "",
    permitExpiry: "",
    permitFee: "",
    insurancePolicy: "",
    specialConditions: "",
  });

  // Mock function to load existing permit data for edit mode
  useEffect(() => {
    if (isEdit && permitId) {
      // In a real app, this would be an API call
      const mockStep2Data = {
        busId: "BUS001",
        busNumber: "NC-1234",
        seats: "45",
        validFrom: "01/15/2024",
        validUntil: "01/15/2025",
        departureTime: "06:00 AM",
        arrivalTime: "09:30 AM",
        permitExpiry: "12/31/2024",
        permitFee: "25000.00",
        insurancePolicy: "INS123456789",
        specialConditions:
          "Valid only for intercity routes. Driver must have minimum 5 years experience.",
      };

      setFormData(mockStep2Data);
      setRouteType("intercity");
      setPermitType("regular");
      setSelectedDays(["mon", "tue", "wed", "thu", "fri"]);
    }
  }, [isEdit, permitId]);

  const handleDayChange = (dayId: string, checked: boolean) => {
    if (checked) {
      setSelectedDays([...selectedDays, dayId]);
    } else {
      setSelectedDays(selectedDays.filter((day) => day !== dayId));
    }
  };

  const handleBusDetailsChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleScheduleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePermitDetailsChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePrevious = () => {
    const prevRoute = isEdit
      ? `/mot/route-permit-form?permitId=${permitId}`
      : "/mot/route-permit-form";
    router.push(prevRoute);
  };

  const handleCancel = () => {
    router.push("/mot/bus-permits");
  };

  const handleSubmit = () => {
    // Here you would typically submit the form data
    const message = isEdit
      ? `Route permit #${permitId} updated successfully!`
      : "Route permit application submitted successfully!";
    alert(message);
    router.push("/mot/bus-permits");
  };

  return (
    <MOTLayout
      activeItem="bus-permits"
      pageTitle={isEdit ? "Edit Route Permit" : "Add New Route Permit"}
      pageDescription={`Step 2 of 2 - ${
        isEdit ? "Update Bus Details & Schedule" : "Bus Details & Schedule"
      }`}
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-permits")}
          >
            Route Permit Management
          </button>
          <span>/</span>
          <span>{isEdit ? `Edit Permit #${permitId}` : "Add New Permit"}</span>
          <span>/</span>
          <span>Step 2</span>
        </div>

        <div className="space-y-6">
          {/* Bus Details */}
          <PermitBusDetails
            data={{
              busId: formData.busId,
              busNumber: formData.busNumber,
              seats: formData.seats,
            }}
            routeType={routeType}
            onChange={handleBusDetailsChange}
            onRouteTypeChange={setRouteType}
          />

          {/* Bus Schedule */}
          <PermitBusSchedule
            data={{
              validFrom: formData.validFrom,
              validUntil: formData.validUntil,
              departureTime: formData.departureTime,
              arrivalTime: formData.arrivalTime,
            }}
            selectedDays={selectedDays}
            onChange={handleScheduleChange}
            onDayChange={handleDayChange}
          />

          {/* Permit Details */}
          <PermitDetailsForm
            data={{
              permitExpiry: formData.permitExpiry,
              permitFee: formData.permitFee,
              insurancePolicy: formData.insurancePolicy,
              specialConditions: formData.specialConditions,
            }}
            permitType={permitType}
            onChange={handlePermitDetailsChange}
            onPermitTypeChange={setPermitType}
          />

          {/* Document Upload */}
          <PermitDocumentUpload />

          {/* Summary */}
          <PermitApplicationSummary />

          {/* Action Buttons */}
          <PermitFormStep2Actions
            isEdit={isEdit}
            permitId={permitId}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MOTLayout>
  );
}
