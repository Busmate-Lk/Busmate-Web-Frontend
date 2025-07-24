'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import { RouteScheduleDetailsForm } from '@/components/mot/route-schedule-details-form';
import { JourneyDetailsForm } from '@/components/mot/journey-details-form';
import { StopScheduleForm } from '@/components/mot/stop-schedule-form';
import { ValidityPeriodForm } from '@/components/mot/validity-period-form';
import { DaysOfOperationSelector } from '@/components/mot/days-of-operation-selector';
import { ScheduleActionButtons } from '@/components/mot/schedule-action-buttons';
import { dummySchedules } from '@/lib/data/schedules-dummy';

interface StopSchedule {
  stopId: string;
  stopName: string;
  stopOrder: number;
  arrivalTime: string;
  departureTime: string;
}

export default function EnhancedScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get('scheduleId');
  const routeId = searchParams?.get('routeId');
  const isEditMode = Boolean(scheduleId);

  // Enhanced form state
  const [routeNumber, setRouteNumber] = useState('');
  const [routeName, setRouteName] = useState('');
  const [routeCategory, setRouteCategory] = useState('');
  const [scheduleType, setScheduleType] = useState<'forward' | 'backward'>(
    'forward'
  );
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [stopSchedules, setStopSchedules] = useState<StopSchedule[]>([]);
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
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
      const existingSchedule = dummySchedules.find(
        (schedule) => schedule.id === scheduleId
      );

      if (existingSchedule) {
        setRouteName(String(existingSchedule.routeName));
        setRouteCategory(
          existingSchedule.routeGroupName.toLowerCase().includes('highway')
            ? 'expressway'
            : 'normal'
        );
        setScheduleType(
          String(existingSchedule.scheduleType) as 'forward' | 'backward'
        );

        // Extract start and end points from schedule stops
        if (existingSchedule.scheduleStops.length > 0) {
          const firstStop = existingSchedule.scheduleStops[0];
          const lastStop =
            existingSchedule.scheduleStops[
              existingSchedule.scheduleStops.length - 1
            ];
          setStartPoint(String(firstStop.stopName));
          setEndPoint(String(lastStop.stopName));
          setStartTime(String(firstStop.departureTime));
          setEndTime(String(lastStop.arrivalTime));
        }

        // Convert schedule stops to form format
        const formattedStops: StopSchedule[] =
          existingSchedule.scheduleStops.map((stop) => ({
            stopId: String(stop.stopId),
            stopName: String(stop.stopName),
            stopOrder: stop.stopOrder,
            arrivalTime: String(stop.arrivalTime),
            departureTime: String(stop.departureTime),
          }));
        setStopSchedules(formattedStops);

        setValidFrom(
          existingSchedule.effectiveStartDate.toISOString().split('T')[0]
        );
        setValidUntil(
          existingSchedule.effectiveEndDate.toISOString().split('T')[0]
        );

        // Set default days (this would come from actual data in a real app)
        setSelectedDays({
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        });
      }
    } else if (routeId) {
      // Pre-fill route ID if creating from route page
      setRouteNumber(routeId);
    }
  }, [isEditMode, scheduleId, routeId]);

  const handleDayChange = (day: string, checked: boolean) => {
    setSelectedDays((prev) => ({ ...prev, [day]: checked }));
  };

  const handleSave = () => {
    // Validate required fields
    if (
      !routeNumber ||
      !routeName ||
      !routeCategory ||
      !startPoint ||
      !endPoint ||
      !startTime ||
      !endTime ||
      !validFrom ||
      !validUntil
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate at least one day is selected
    const hasSelectedDays = Object.values(selectedDays).some((day) => day);
    if (!hasSelectedDays) {
      alert('Please select at least one day of operation.');
      return;
    }

    // Validate stop schedules
    if (stopSchedules.length === 0) {
      alert('Please add at least one stop to the schedule.');
      return;
    }

    const incompleteStops = stopSchedules.filter(
      (stop) => !stop.stopId || !stop.arrivalTime || !stop.departureTime
    );

    if (incompleteStops.length > 0) {
      alert(
        'Please complete all stop details (stop selection, arrival time, and departure time).'
      );
      return;
    }

    // Create schedule object
    const schedule = {
      id: isEditMode ? scheduleId : `SCH${String(Date.now()).slice(-3)}`,
      name: `${routeName} - ${
        scheduleType === 'forward'
          ? startPoint + ' to ' + endPoint
          : endPoint + ' to ' + startPoint
      }`,
      routeId: routeNumber,
      routeName,
      routeGroupId: 'RG001', // This would be selected or generated
      routeGroupName:
        routeCategory === 'expressway' ? 'Highway Routes' : 'Standard Routes',
      scheduleType,
      effectiveStartDate: new Date(validFrom),
      effectiveEndDate: new Date(validUntil),
      status: 'Active',
      scheduleStops: stopSchedules.map((stop) => ({
        stopId: stop.stopId,
        stopName: stop.stopName,
        location: {
          // This would be fetched from the bus stop data
          latitude: 0,
          longitude: 0,
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'Sri Lanka',
        },
        stopOrder: stop.stopOrder,
        arrivalTime: stop.arrivalTime,
        departureTime: stop.departureTime,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current_user',
      updatedBy: 'current_user',
    };

    console.log('Schedule data:', schedule);

    const action = isEditMode ? 'updated' : 'created';
    alert(
      `Schedule ${action} successfully!\n\nRoute: ${routeName}\nDirection: ${scheduleType}\nStops: ${stopSchedules.length}\nPeriod: ${validFrom} to ${validUntil}`
    );

    router.push('/mot/schedule-management');
  };

  const handleCancel = () => {
    router.back();
  };

  const pageTitle = isEditMode ? 'Edit Schedule' : 'Create New Schedule';
  const pageDescription = isEditMode
    ? 'Modify existing bus schedule details'
    : 'Create a new comprehensive bus schedule with stops and timing';
  const submitLabel = isEditMode ? 'Update Schedule' : 'Create Schedule';

  return (
    <Layout
      role="mot"
      activeItem="bus-routes"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
    >
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline p-0 h-auto"
            onClick={() => router.push('/mot/schedule-management')}
          >
            Schedule Management
          </button>
          <span>/</span>
          <span>{isEditMode ? 'Edit Schedule' : 'Create Schedule'}</span>
        </div>

        {/* Route & Schedule Details */}
        <RouteScheduleDetailsForm
          routeNumber={routeNumber}
          routeName={routeName}
          routeCategory={routeCategory}
          scheduleType={scheduleType}
          onRouteNumberChange={setRouteNumber}
          onRouteNameChange={setRouteName}
          onRouteCategoryChange={setRouteCategory}
          onScheduleTypeChange={setScheduleType}
        />

        {/* Journey Details */}
        <JourneyDetailsForm
          startPoint={startPoint}
          endPoint={endPoint}
          onStartPointChange={setStartPoint}
          onEndPointChange={setEndPoint}
        />

        {/* Stop Schedule & Timing */}
        <StopScheduleForm
          stopSchedules={stopSchedules}
          onStopSchedulesChange={setStopSchedules}
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />

        {/* Validity Period */}
        <ValidityPeriodForm
          validFrom={validFrom}
          validUntil={validUntil}
          onValidFromChange={setValidFrom}
          onValidUntilChange={setValidUntil}
        />

        {/* Days of Operation */}
        <DaysOfOperationSelector
          selectedDays={selectedDays}
          onDayChange={handleDayChange}
        />

        {/* Action Buttons */}
        <ScheduleActionButtons
          onCancel={handleCancel}
          onSubmit={handleSave}
          submitLabel={submitLabel}
        />
      </div>
    </Layout>
  );
}
