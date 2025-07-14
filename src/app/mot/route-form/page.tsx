"use client";

import { RouteBasicInformation } from "@/components/mot/route-basic-information";
import { RouteIntermediateStops, IntermediateStop } from "@/components/mot/route-intermediate-stops";
import { RoutePerformanceMetrics } from "@/components/mot/route-performance-metrics";
import { RouteScheduleManagement, Schedule } from "@/components/mot/route-schedule-management";
import { RouteFormActions } from "@/components/mot/route-form-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout } from "@/components/shared/layout";

export default function RouteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // URL Parameter Detection
  const routeId = searchParams?.get("routeId");
  const isEdit = !!routeId;

  const [intermediateStops, setIntermediateStops] = useState<IntermediateStop[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Form data with initial values that support both add and edit modes
  const [formData, setFormData] = useState({
    // Route Basic Information
    routeGroup: "",
    routeNo: "",
    routeName: "",
    startingPoint: "",
    endPoint: "",
    startLat: "",
    startLng: "",
    endLat: "",
    endLng: "",
    routeStatus: "active",
    // Route Performance Metrics
    totalDistance: "",
    estimatedTravelTime: "",
    averageSpeed: "",
    fuelConsumption: "",
  });

  // Mock function to load existing route data for edit mode
  useEffect(() => {
    if (isEdit && routeId) {
      // In a real app, this would be an API call
      const mockRouteData = {
        routeGroup: "intercity",
        routeNo: "R001",
        routeName: "Colombo - Kandy Main Route",
        startingPoint: "Colombo Central",
        endPoint: "Kandy Bus Station",
        startLat: "6.9271",
        startLng: "79.8612",
        endLat: "7.2906",
        endLng: "80.6337",
        routeStatus: "active",
        totalDistance: "115.5",
        estimatedTravelTime: "03:30",
        averageSpeed: "33.0",
        fuelConsumption: "8.5",
      };

      const mockStops: IntermediateStop[] = [
        {
          id: 1,
          name: "Kadawatha Junction",
          latitude: "7.0101",
          longitude: "79.9513",
          arrivalTime: "06:30",
          sequence: 1,
        },
        {
          id: 2,
          name: "Kegalle Town",
          latitude: "7.2513",
          longitude: "80.3464",
          arrivalTime: "07:45",
          sequence: 2,
        },
      ];

      const mockSchedules: Schedule[] = [
        {
          id: 1,
          departureTime: "06:00",
          arrivalTime: "09:30",
          busType: "luxury",
          frequency: "hourly",
          operatingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        },
        {
          id: 2,
          departureTime: "14:00",
          arrivalTime: "17:30",
          busType: "semi-luxury",
          frequency: "30min",
          operatingDays: ["saturday", "sunday"],
        },
      ];

      // Conditional Data Loading
      setFormData(mockRouteData);
      setIntermediateStops(mockStops);
      setSchedules(mockSchedules);
    }
  }, [isEdit, routeId]);

  // Intermediate Stops Management
  const addIntermediateStop = () => {
    const newStop: IntermediateStop = {
      id: intermediateStops.length + 1,
      name: "",
      latitude: "",
      longitude: "",
      arrivalTime: "",
      sequence: intermediateStops.length + 1,
    };
    setIntermediateStops([...intermediateStops, newStop]);
  };

  const removeIntermediateStop = (id: number) => {
    setIntermediateStops(intermediateStops.filter((stop) => stop.id !== id));
  };

  const updateIntermediateStop = (id: number, field: string, value: string) => {
    setIntermediateStops(
      intermediateStops.map((stop) => 
        stop.id === id ? { ...stop, [field]: value } : stop
      )
    );
  };

  // Schedule Management
  const addSchedule = () => {
    const newSchedule: Schedule = {
      id: schedules.length + 1,
      departureTime: "",
      arrivalTime: "",
      busType: "",
      frequency: "",
      operatingDays: [],
    };
    setSchedules([...schedules, newSchedule]);
  };

  const removeSchedule = (id: number) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const updateSchedule = (id: number, field: string, value: string | string[]) => {
    setSchedules(
      schedules.map((schedule) => 
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  // Form Data Management
  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handlePerformanceChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    router.push("/mot/bus-routes");
  };

  const handleSave = () => {
    // Mark all fields as touched
    const allFields = [
      'routeGroup', 'routeNo', 'routeName', 'startingPoint', 'endPoint',
      'startLat', 'startLng', 'endLat', 'endLng', 'routeStatus',
      'totalDistance', 'estimatedTravelTime'
    ];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (validateForm()) {
      // In a real app, this would be an API call
      console.log("Saving route:", {
        ...formData,
        intermediateStops,
        schedules,
      });
      
      // Show success message and redirect
      alert(isEdit ? "Route updated successfully!" : "Route created successfully!");
      router.push("/mot/bus-routes");
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSaveAndAddAnother = () => {
    if (validateForm()) {
      // In a real app, this would be an API call
      console.log("Saving route:", {
        ...formData,
        intermediateStops,
        schedules,
      });
      
      // Reset form for new route
      setFormData({
        routeGroup: "",
        routeNo: "",
        routeName: "",
        startingPoint: "",
        endPoint: "",
        startLat: "",
        startLng: "",
        endLat: "",
        endLng: "",
        routeStatus: "active",
        totalDistance: "",
        estimatedTravelTime: "",
        averageSpeed: "",
        fuelConsumption: "",
      });
      setIntermediateStops([]);
      setSchedules([]);
      setErrors({});
      setTouched({});
      
      alert("Route created successfully! Add another route.");
    }
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCoordinates = (lat: string, lng: string) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    return !isNaN(latitude) && !isNaN(longitude) && 
           latitude >= -90 && latitude <= 90 && 
           longitude >= -180 && longitude <= 180;
  };

  const validateTimeFormat = (time: string) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Basic Information Validation
    if (!formData.routeGroup.trim()) {
      newErrors.routeGroup = "Route group is required";
    }
    if (!formData.routeNo.trim()) {
      newErrors.routeNo = "Route number is required";
    }
    if (!formData.routeName.trim()) {
      newErrors.routeName = "Route name is required";
    }
    if (!formData.startingPoint.trim()) {
      newErrors.startingPoint = "Starting point is required";
    }
    if (!formData.endPoint.trim()) {
      newErrors.endPoint = "End point is required";
    }
    if (!formData.startLat.trim() || !formData.startLng.trim()) {
      newErrors.startCoords = "Starting point coordinates are required";
    } else if (!validateCoordinates(formData.startLat, formData.startLng)) {
      newErrors.startCoords = "Please enter valid starting point coordinates";
    }
    if (!formData.endLat.trim() || !formData.endLng.trim()) {
      newErrors.endCoords = "End point coordinates are required";
    } else if (!validateCoordinates(formData.endLat, formData.endLng)) {
      newErrors.endCoords = "Please enter valid end point coordinates";
    }
    if (!formData.routeStatus) {
      newErrors.routeStatus = "Route status is required";
    }

    // Performance Metrics Validation
    if (!formData.totalDistance.trim()) {
      newErrors.totalDistance = "Total distance is required";
    } else if (isNaN(parseFloat(formData.totalDistance)) || parseFloat(formData.totalDistance) <= 0) {
      newErrors.totalDistance = "Please enter a valid distance";
    }
    if (!formData.estimatedTravelTime.trim()) {
      newErrors.estimatedTravelTime = "Estimated travel time is required";
    }

    // Intermediate Stops Validation
    intermediateStops.forEach((stop, index) => {
      if (stop.name.trim()) {
        if (!stop.latitude.trim() || !stop.longitude.trim()) {
          newErrors[`stop_${stop.id}_coords`] = "Stop coordinates are required";
        } else if (!validateCoordinates(stop.latitude, stop.longitude)) {
          newErrors[`stop_${stop.id}_coords`] = "Please enter valid coordinates for this stop";
        }
        if (!stop.arrivalTime.trim()) {
          newErrors[`stop_${stop.id}_time`] = "Arrival time is required";
        }
      }
    });

    // Schedule Validation (Optional - only validate if schedules exist and have content)
    const validSchedules = schedules.filter(schedule => 
      schedule.departureTime || schedule.arrivalTime || schedule.busType || 
      schedule.frequency || (schedule.operatingDays && schedule.operatingDays.length > 0)
    );

    validSchedules.forEach((schedule) => {
      if (!schedule.departureTime) {
        newErrors[`schedule_${schedule.id}_departure`] = "Departure time is required";
      }
      if (!schedule.arrivalTime) {
        newErrors[`schedule_${schedule.id}_arrival`] = "Arrival time is required";
      }
      if (!schedule.busType) {
        newErrors[`schedule_${schedule.id}_busType`] = "Bus type is required";
      }
      if (!schedule.frequency) {
        newErrors[`schedule_${schedule.id}_frequency`] = "Frequency is required";
      }
      if (!schedule.operatingDays || schedule.operatingDays.length === 0) {
        newErrors[`schedule_${schedule.id}_days`] = "Operating days are required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    // Check if there are any schedules with partial data that need completion
    const hasPartialSchedules = schedules.some(schedule => 
      schedule.departureTime || schedule.arrivalTime || schedule.busType || 
      schedule.frequency || (schedule.operatingDays && schedule.operatingDays.length > 0)
    );

    // If there are partial schedules, they must be complete
    const scheduleValidation = !hasPartialSchedules || schedules.every(schedule => {
      // Skip validation for completely empty schedules
      const hasAnyData = schedule.departureTime || schedule.arrivalTime || schedule.busType || 
                        schedule.frequency || (schedule.operatingDays && schedule.operatingDays.length > 0);
      
      return !hasAnyData || (
        schedule.departureTime &&
        schedule.arrivalTime &&
        schedule.busType &&
        schedule.frequency &&
        schedule.operatingDays &&
        schedule.operatingDays.length > 0
      );
    });

    return !!(formData.routeGroup.trim() &&
           formData.routeNo.trim() &&
           formData.routeName.trim() &&
           formData.startingPoint.trim() &&
           formData.endPoint.trim() &&
           formData.startLat.trim() &&
           formData.startLng.trim() &&
           validateCoordinates(formData.startLat, formData.startLng) &&
           formData.endLat.trim() &&
           formData.endLng.trim() &&
           validateCoordinates(formData.endLat, formData.endLng) &&
           formData.routeStatus &&
           formData.totalDistance.trim() &&
           !isNaN(parseFloat(formData.totalDistance)) &&
           parseFloat(formData.totalDistance) > 0 &&
           formData.estimatedTravelTime.trim() &&
           scheduleValidation);
  };

  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <Layout
      role="mot"
      activeItem="bus-routes"
      // Dynamic Page Title
      pageTitle={isEdit ? "Edit Route" : "Add New Route"}
      pageDescription={`${isEdit ? "Update route information" : "Create a new bus route with stops and schedules"}`}
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push("/mot/bus-routes")}
          >
            Route Management
          </button>
          <span>/</span>
          <span>{isEdit ? `Edit Route #${routeId}` : "Add New Route"}</span>
        </div>

        {/* Route Basic Information */}
        <RouteBasicInformation
          data={{
            routeGroup: formData.routeGroup,
            routeNo: formData.routeNo,
            routeName: formData.routeName,
            startingPoint: formData.startingPoint,
            endPoint: formData.endPoint,
            startLat: formData.startLat,
            startLng: formData.startLng,
            endLat: formData.endLat,
            endLng: formData.endLng,
            routeStatus: formData.routeStatus,
          }}
          errors={errors}
          touched={touched}
          onChange={handleBasicInfoChange}
          onBlur={handleFieldBlur}
        />

        {/* Intermediate Stops */}
        <RouteIntermediateStops
          stops={intermediateStops}
          errors={errors}
          onAddStop={addIntermediateStop}
          onRemoveStop={removeIntermediateStop}
          onUpdateStop={updateIntermediateStop}
        />

        {/* Route Performance Metrics */}
        <RoutePerformanceMetrics
          data={{
            totalDistance: formData.totalDistance,
            estimatedTravelTime: formData.estimatedTravelTime,
            averageSpeed: formData.averageSpeed,
            fuelConsumption: formData.fuelConsumption,
          }}
          errors={errors}
          touched={touched}
          onChange={handlePerformanceChange}
          onBlur={handleFieldBlur}
        />

        {/* Schedule Management */}
        <RouteScheduleManagement
          schedules={schedules}
          errors={errors}
          onAddSchedule={addSchedule}
          onRemoveSchedule={removeSchedule}
          onUpdateSchedule={updateSchedule}
        />

        {/* Action Buttons */}
        <RouteFormActions
          isEdit={isEdit}
          routeId={routeId}
          isValid={isFormValid()}
          onCancel={handleCancel}
          onSave={handleSave}
          // Conditional Button Text
          onSaveAndAddAnother={!isEdit ? handleSaveAndAddAnother : undefined}
        />
      </div>
    </Layout>
  );
}