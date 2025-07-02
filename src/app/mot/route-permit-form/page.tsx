"use client";

import { MOTLayout } from "@/components/mot/layout";
import { PermitOperatorInformation } from "@/components/mot/permit-operator-information";
import { PermitRouteDetails } from "@/components/mot/permit-route-details";
import {
  PermitStopSequence,
  Stop,
} from "@/components/mot/permit-stop-sequence";
import { PermitFormActions } from "@/components/mot/permit-form-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RoutePermitForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const permitId = searchParams.get("permitId");
  const isEdit = !!permitId;

  const [stops, setStops] = useState<Stop[]>([
    { id: 1, name: "", latitude: "", longitude: "", time: "" },
  ]);

  // Form data with initial values that support both add and edit modes
  const [formData, setFormData] = useState({
    operatorName: "",
    operatorType: "",
    contactNo: "",
    nic: "",
    email: "",
    routeName: "",
    upStartPoint: "",
    upEndPoint: "",
    upStartLat: "",
    upStartLng: "",
    upEndLat: "",
    upEndLng: "",
    downStartPoint: "",
    downEndPoint: "",
    downStartLat: "",
    downStartLng: "",
    downEndLat: "",
    downEndLng: "",
    totalDistance: "",
    totalDuration: "",
  });

  // Mock function to load existing permit data for edit mode
  useEffect(() => {
    if (isEdit && permitId) {
      // In a real app, this would be an API call
      const mockPermitData = {
        operatorName: "Ceylon Transport Board",
        operatorType: "government",
        contactNo: "+94 11 234 5678",
        nic: "123456789V",
        email: "ctb@transport.gov.lk",
        routeName: "Colombo - Kandy Express",
        upStartPoint: "Colombo Fort",
        upEndPoint: "Kandy Central",
        upStartLat: "6.9271",
        upStartLng: "79.8612",
        upEndLat: "7.2906",
        upEndLng: "80.6337",
        downStartPoint: "Kandy Central",
        downEndPoint: "Colombo Fort",
        downStartLat: "7.2906",
        downStartLng: "80.6337",
        downEndLat: "6.9271",
        downEndLng: "79.8612",
        totalDistance: "115.5",
        totalDuration: "03:30",
      };

      const mockStops: Stop[] = [
        {
          id: 1,
          name: "Colombo Fort",
          latitude: "6.9271",
          longitude: "79.8612",
          time: "06:00 AM",
        },
        {
          id: 2,
          name: "Kandy Central",
          latitude: "7.2906",
          longitude: "80.6337",
          time: "09:30 AM",
        },
      ];

      setFormData(mockPermitData);
      setStops(mockStops);
    }
  }, [isEdit, permitId]);

  const addStop = () => {
    const newStop: Stop = {
      id: stops.length + 1,
      name: "",
      latitude: "",
      longitude: "",
      time: "",
    };
    setStops([...stops, newStop]);
  };

  const removeStop = (id: number) => {
    if (stops.length > 1) {
      setStops(stops.filter((stop) => stop.id !== id));
    }
  };

  const updateStop = (id: number, field: string, value: string) => {
    setStops(
      stops.map((stop) => (stop.id === id ? { ...stop, [field]: value } : stop))
    );
  };

  const handleOperatorChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRouteChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => {
    router.push("/mot/bus-permits");
  };

  const handleNext = () => {
    const nextRoute = isEdit
      ? `/mot/route-permit-form-step2?permitId=${permitId}`
      : "/mot/route-permit-form-step2";
    router.push(nextRoute);
  };

  return (
    <MOTLayout
      activeItem="bus-permits"
      pageTitle={isEdit ? "Edit Route Permit" : "Add New Route Permit"}
      pageDescription={`Step 1 of 2 - ${
        isEdit ? "Update Route Information" : "Route Information"
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
          <span>Step 1</span>
        </div>

        {/* Operator Information */}
        <PermitOperatorInformation
          data={{
            operatorName: formData.operatorName,
            operatorType: formData.operatorType,
            contactNo: formData.contactNo,
            nic: formData.nic,
            email: formData.email,
          }}
          onChange={handleOperatorChange}
        />

        {/* Route Details */}
        <PermitRouteDetails
          data={{
            routeName: formData.routeName,
            upStartPoint: formData.upStartPoint,
            upEndPoint: formData.upEndPoint,
            upStartLat: formData.upStartLat,
            upStartLng: formData.upStartLng,
            upEndLat: formData.upEndLat,
            upEndLng: formData.upEndLng,
            downStartPoint: formData.downStartPoint,
            downEndPoint: formData.downEndPoint,
            downStartLat: formData.downStartLat,
            downStartLng: formData.downStartLng,
            downEndLat: formData.downEndLat,
            downEndLng: formData.downEndLng,
            totalDistance: formData.totalDistance,
            totalDuration: formData.totalDuration,
          }}
          onChange={handleRouteChange}
        />

        {/* Stop Sequence */}
        <PermitStopSequence
          stops={stops}
          onAddStop={addStop}
          onRemoveStop={removeStop}
          onUpdateStop={updateStop}
        />

        {/* Action Buttons */}
        <PermitFormActions
          isEdit={isEdit}
          permitId={permitId}
          onCancel={handleCancel}
          onNext={handleNext}
        />
      </div>
    </MOTLayout>
  );
}
