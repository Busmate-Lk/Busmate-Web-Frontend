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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
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
    // Clear error if days are selected
    if (errors.selectedDays) {
      const newErrors = { ...errors };
      delete newErrors.selectedDays;
      setErrors(newErrors);
    }
  };

  const handleBusDetailsChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleScheduleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handlePermitDetailsChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
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
    // Mark all fields as touched
    const allFields = [
      'busId', 'busNumber', 'seats', 'validFrom', 'validUntil',
      'departureTime', 'arrivalTime', 'permitExpiry', 'permitFee',
      'insurancePolicy', 'specialConditions'
    ];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    // Also mark route type, permit type, and selected days as touched
    newTouched.routeType = true;
    newTouched.permitType = true;
    newTouched.selectedDays = true;
    setTouched(newTouched);

    if (validateStep2()) {
      // Here you would typically submit the form data
      const message = isEdit
        ? `Route permit #${permitId} updated successfully!`
        : "Route permit application submitted successfully!";
      alert(message);
      router.push("/mot/bus-permits");
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Validation functions for Step 2
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTime = (time: string) => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( (AM|PM))?$/i;
    return timeRegex.test(time);
  };

  const validateDate = (date: string) => {
    if (!date) return false;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    // Bus Details Validation
    if (!formData.busId.trim()) {
      newErrors.busId = "Bus ID is required";
    }
    if (!formData.busNumber.trim()) {
      newErrors.busNumber = "Bus number is required";
    }
    if (!formData.seats.trim()) {
      newErrors.seats = "Number of seats is required";
    } else if (isNaN(parseInt(formData.seats)) || parseInt(formData.seats) <= 0) {
      newErrors.seats = "Please enter a valid number of seats";
    }
    if (!routeType) {
      newErrors.routeType = "Route type is required";
    }

    // Schedule Validation
    if (!formData.validFrom.trim()) {
      newErrors.validFrom = "Valid from date is required";
    } else if (!validateDate(formData.validFrom)) {
      newErrors.validFrom = "Please enter a valid date (MM/DD/YYYY)";
    }
    if (!formData.validUntil.trim()) {
      newErrors.validUntil = "Valid until date is required";
    } else if (!validateDate(formData.validUntil)) {
      newErrors.validUntil = "Please enter a valid date (MM/DD/YYYY)";
    }
    if (!formData.departureTime.trim()) {
      newErrors.departureTime = "Departure time is required";
    } else if (!validateTime(formData.departureTime)) {
      newErrors.departureTime = "Please enter a valid time (HH:MM AM/PM)";
    }
    if (!formData.arrivalTime.trim()) {
      newErrors.arrivalTime = "Arrival time is required";
    } else if (!validateTime(formData.arrivalTime)) {
      newErrors.arrivalTime = "Please enter a valid time (HH:MM AM/PM)";
    }
    if (selectedDays.length === 0) {
      newErrors.selectedDays = "Please select at least one day of operation";
    }

    // Permit Details Validation
    if (!formData.permitExpiry.trim()) {
      newErrors.permitExpiry = "Permit expiry date is required";
    } else if (!validateDate(formData.permitExpiry)) {
      newErrors.permitExpiry = "Please enter a valid date (MM/DD/YYYY)";
    }
    if (!formData.permitFee.trim()) {
      newErrors.permitFee = "Permit fee is required";
    } else if (isNaN(parseFloat(formData.permitFee)) || parseFloat(formData.permitFee) <= 0) {
      newErrors.permitFee = "Please enter a valid permit fee";
    }
    if (!formData.insurancePolicy.trim()) {
      newErrors.insurancePolicy = "Insurance policy number is required";
    }
    if (!permitType) {
      newErrors.permitType = "Permit type is required";
    }
    if (!formData.specialConditions.trim()) {
      newErrors.specialConditions = "Special conditions are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStep2Valid = () => {
    return !!(formData.busId.trim() &&
           formData.busNumber.trim() &&
           formData.seats.trim() &&
           !isNaN(parseInt(formData.seats)) &&
           parseInt(formData.seats) > 0 &&
           routeType &&
           formData.validFrom.trim() &&
           validateDate(formData.validFrom) &&
           formData.validUntil.trim() &&
           validateDate(formData.validUntil) &&
           formData.departureTime.trim() &&
           validateTime(formData.departureTime) &&
           formData.arrivalTime.trim() &&
           validateTime(formData.arrivalTime) &&
           selectedDays.length > 0 &&
           formData.permitExpiry.trim() &&
           validateDate(formData.permitExpiry) &&
           formData.permitFee.trim() &&
           !isNaN(parseFloat(formData.permitFee)) &&
           parseFloat(formData.permitFee) > 0 &&
           formData.insurancePolicy.trim() &&
           permitType &&
           formData.specialConditions.trim());
  };

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
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
            errors={errors}
            touched={touched}
            onChange={handleBusDetailsChange}
            onRouteTypeChange={(value) => {
              setRouteType(value);
              if (errors.routeType) {
                const newErrors = { ...errors };
                delete newErrors.routeType;
                setErrors(newErrors);
              }
            }}
            onBlur={handleFieldBlur}
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
            errors={errors}
            touched={touched}
            onChange={handleScheduleChange}
            onDayChange={handleDayChange}
            onBlur={handleFieldBlur}
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
            errors={errors}
            touched={touched}
            onChange={handlePermitDetailsChange}
            onPermitTypeChange={(value) => {
              setPermitType(value);
              if (errors.permitType) {
                const newErrors = { ...errors };
                delete newErrors.permitType;
                setErrors(newErrors);
              }
            }}
            onBlur={handleFieldBlur}
          />

          {/* Document Upload */}
          <PermitDocumentUpload />

          {/* Summary */}
          <PermitApplicationSummary />

          {/* Action Buttons */}
          <PermitFormStep2Actions
            isEdit={isEdit}
            permitId={permitId}
            isValid={isStep2Valid()}
            onPrevious={handlePrevious}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MOTLayout>
  );
}
