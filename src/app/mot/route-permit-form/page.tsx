"use client";

import { PermitOperatorInformation } from "@/components/mot/permit-operator-information";
import { PermitRouteDetails } from "@/components/mot/permit-route-details";
import {
  PermitStopSequence,
  Stop,
} from "@/components/mot/permit-stop-sequence";
import { PermitFormActions } from "@/components/mot/permit-form-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout } from "@/components/shared/layout";

export default function RoutePermitForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const permitId = searchParams?.get("permitId");
  const isEdit = !!permitId;

  const [stops, setStops] = useState<Stop[]>([
    { id: 1, name: "", latitude: "", longitude: "", time: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleRouteChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    router.push("/mot/bus-permits");
  };

  const handleNext = () => {
    // Mark all fields as touched
    const allFields = [
      'operatorName', 'operatorType', 'contactNo', 'nic', 'email',
      'routeName', 'upStartPoint', 'upEndPoint', 'upStartLat', 'upStartLng',
      'upEndLat', 'upEndLng', 'downStartPoint', 'downEndPoint', 'downStartLat',
      'downStartLng', 'downEndLat', 'downEndLng', 'totalDistance', 'totalDuration'
    ];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (validateStep1()) {
      const nextRoute = isEdit
        ? `/mot/route-permit-form-step2?permitId=${permitId}`
        : "/mot/route-permit-form-step2";
      router.push(nextRoute);
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNo = (contactNo: string) => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneRegex.test(contactNo) && contactNo.replace(/\D/g, '').length >= 10;
  };

  const validateNIC = (nic: string) => {
    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    return nicRegex.test(nic);
  };

  const validateCoordinates = (lat: string, lng: string) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    return !isNaN(latitude) && !isNaN(longitude) && 
           latitude >= -90 && latitude <= 90 && 
           longitude >= -180 && longitude <= 180;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    // Operator Information Validation
    if (!formData.operatorName.trim()) {
      newErrors.operatorName = "Operator name is required";
    }
    if (!formData.operatorType) {
      newErrors.operatorType = "Operator type is required";
    }
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
    } else if (!validateContactNo(formData.contactNo)) {
      newErrors.contactNo = "Please enter a valid contact number";
    }
    if (!formData.nic.trim()) {
      newErrors.nic = "NIC is required";
    } else if (!validateNIC(formData.nic)) {
      newErrors.nic = "Please enter a valid NIC number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Route Details Validation
    if (!formData.routeName.trim()) {
      newErrors.routeName = "Route name is required";
    }
    if (!formData.upStartPoint.trim()) {
      newErrors.upStartPoint = "Start point is required";
    }
    if (!formData.upEndPoint.trim()) {
      newErrors.upEndPoint = "End point is required";
    }
    if (!formData.upStartLat.trim() || !formData.upStartLng.trim()) {
      newErrors.upStartCoords = "Start point coordinates are required";
    } else if (!validateCoordinates(formData.upStartLat, formData.upStartLng)) {
      newErrors.upStartCoords = "Please enter valid coordinates";
    }
    if (!formData.upEndLat.trim() || !formData.upEndLng.trim()) {
      newErrors.upEndCoords = "End point coordinates are required";
    } else if (!validateCoordinates(formData.upEndLat, formData.upEndLng)) {
      newErrors.upEndCoords = "Please enter valid coordinates";
    }
    if (!formData.downStartPoint.trim()) {
      newErrors.downStartPoint = "Return start point is required";
    }
    if (!formData.downEndPoint.trim()) {
      newErrors.downEndPoint = "Return end point is required";
    }
    if (!formData.downStartLat.trim() || !formData.downStartLng.trim()) {
      newErrors.downStartCoords = "Return start point coordinates are required";
    } else if (!validateCoordinates(formData.downStartLat, formData.downStartLng)) {
      newErrors.downStartCoords = "Please enter valid coordinates";
    }
    if (!formData.downEndLat.trim() || !formData.downEndLng.trim()) {
      newErrors.downEndCoords = "Return end point coordinates are required";
    } else if (!validateCoordinates(formData.downEndLat, formData.downEndLng)) {
      newErrors.downEndCoords = "Please enter valid coordinates";
    }
    if (!formData.totalDistance.trim()) {
      newErrors.totalDistance = "Total distance is required";
    } else if (isNaN(parseFloat(formData.totalDistance)) || parseFloat(formData.totalDistance) <= 0) {
      newErrors.totalDistance = "Please enter a valid distance";
    }
    if (!formData.totalDuration.trim()) {
      newErrors.totalDuration = "Total duration is required";
    }

    // Stop Sequence Validation
    const validStops = stops.filter(stop => stop.name.trim());
    if (validStops.length < 2) {
      newErrors.stops = "At least 2 stops are required";
    } else {
      stops.forEach((stop, index) => {
        if (stop.name.trim()) {
          if (!stop.latitude.trim() || !stop.longitude.trim()) {
            newErrors[`stop_${stop.id}_coords`] = "Stop coordinates are required";
          } else if (!validateCoordinates(stop.latitude, stop.longitude)) {
            newErrors[`stop_${stop.id}_coords`] = "Please enter valid coordinates for this stop";
          }
          if (!stop.time.trim()) {
            newErrors[`stop_${stop.id}_time`] = "Stop time is required";
          }
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStep1Valid = () => {
    return !!(formData.operatorName.trim() &&
           formData.operatorType &&
           formData.contactNo.trim() &&
           validateContactNo(formData.contactNo) &&
           formData.nic.trim() &&
           validateNIC(formData.nic) &&
           formData.email.trim() &&
           validateEmail(formData.email) &&
           formData.routeName.trim() &&
           formData.upStartPoint.trim() &&
           formData.upEndPoint.trim() &&
           formData.upStartLat.trim() &&
           formData.upStartLng.trim() &&
           validateCoordinates(formData.upStartLat, formData.upStartLng) &&
           formData.upEndLat.trim() &&
           formData.upEndLng.trim() &&
           validateCoordinates(formData.upEndLat, formData.upEndLng) &&
           formData.downStartPoint.trim() &&
           formData.downEndPoint.trim() &&
           formData.downStartLat.trim() &&
           formData.downStartLng.trim() &&
           validateCoordinates(formData.downStartLat, formData.downStartLng) &&
           formData.downEndLat.trim() &&
           formData.downEndLng.trim() &&
           validateCoordinates(formData.downEndLat, formData.downEndLng) &&
           formData.totalDistance.trim() &&
           !isNaN(parseFloat(formData.totalDistance)) &&
           parseFloat(formData.totalDistance) > 0 &&
           formData.totalDuration.trim() &&
           stops.filter(stop => stop.name.trim()).length >= 2 &&
           stops.every(stop => !stop.name.trim() || (
             stop.latitude.trim() && 
             stop.longitude.trim() && 
             validateCoordinates(stop.latitude, stop.longitude) &&
             stop.time.trim()
           )));
  };

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <Layout
    role = "mot"
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
          errors={errors}
          touched={touched}
          onChange={handleOperatorChange}
          onBlur={handleFieldBlur}
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
          errors={errors}
          touched={touched}
          onChange={handleRouteChange}
          onBlur={handleFieldBlur}
        />

        {/* Stop Sequence */}
        <PermitStopSequence
          stops={stops}
          errors={errors}
          onAddStop={addStop}
          onRemoveStop={removeStop}
          onUpdateStop={updateStop}
        />

        {/* Action Buttons */}
        <PermitFormActions
          isEdit={isEdit}
          permitId={permitId}
          isValid={isStep1Valid()}
          onCancel={handleCancel}
          onNext={handleNext}
        />
      </div>
    </Layout>
  );
}
