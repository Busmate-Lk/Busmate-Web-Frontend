"use client";

import { Clock, Plus, X } from "lucide-react";

interface TimeSlot {
  departure: string;
  arrival: string;
}

interface BidirectionalScheduleData {
  forwardTimeSlots: TimeSlot[];
  returnTimeSlots: TimeSlot[];
  forwardFrequency: string;
  returnFrequency: string;
  forwardFirstBus: string;
  forwardLastBus: string;
  returnFirstBus: string;
  returnLastBus: string;
}

interface BidirectionalScheduleFormProps {
  startPoint: string;
  endPoint: string;
  frequency: string;
  scheduleData: BidirectionalScheduleData;
  onUpdateScheduleData: (data: BidirectionalScheduleData) => void;
}

export function BidirectionalScheduleForm({
  startPoint,
  endPoint,
  frequency,
  scheduleData,
  onUpdateScheduleData,
}: BidirectionalScheduleFormProps) {
  const isManualTimeEntry = frequency === "Manual Time Entry";

  const addTimeSlot = (direction: 'forward' | 'return') => {
    const newSlot = { departure: "", arrival: "" };
    if (direction === 'forward') {
      onUpdateScheduleData({
        ...scheduleData,
        forwardTimeSlots: [...scheduleData.forwardTimeSlots, newSlot]
      });
    } else {
      onUpdateScheduleData({
        ...scheduleData,
        returnTimeSlots: [...scheduleData.returnTimeSlots, newSlot]
      });
    }
  };

  const removeTimeSlot = (direction: 'forward' | 'return', index: number) => {
    if (direction === 'forward' && scheduleData.forwardTimeSlots.length > 1) {
      onUpdateScheduleData({
        ...scheduleData,
        forwardTimeSlots: scheduleData.forwardTimeSlots.filter((_, i) => i !== index)
      });
    } else if (direction === 'return' && scheduleData.returnTimeSlots.length > 1) {
      onUpdateScheduleData({
        ...scheduleData,
        returnTimeSlots: scheduleData.returnTimeSlots.filter((_, i) => i !== index)
      });
    }
  };

  const updateTimeSlot = (direction: 'forward' | 'return', index: number, field: string, value: string) => {
    if (direction === 'forward') {
      const updatedSlots = scheduleData.forwardTimeSlots.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );
      onUpdateScheduleData({
        ...scheduleData,
        forwardTimeSlots: updatedSlots
      });
    } else {
      const updatedSlots = scheduleData.returnTimeSlots.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      );
      onUpdateScheduleData({
        ...scheduleData,
        returnTimeSlots: updatedSlots
      });
    }
  };

  const updateFrequency = (direction: 'forward' | 'return', value: string) => {
    if (direction === 'forward') {
      onUpdateScheduleData({
        ...scheduleData,
        forwardFrequency: value
      });
    } else {
      onUpdateScheduleData({
        ...scheduleData,
        returnFrequency: value
      });
    }
  };

  const updateOperatingHours = (direction: 'forward' | 'return', field: 'firstBus' | 'lastBus', value: string) => {
    if (direction === 'forward') {
      onUpdateScheduleData({
        ...scheduleData,
        [field === 'firstBus' ? 'forwardFirstBus' : 'forwardLastBus']: value
      });
    } else {
      onUpdateScheduleData({
        ...scheduleData,
        [field === 'firstBus' ? 'returnFirstBus' : 'returnLastBus']: value
      });
    }
  };

  const frequencyOptions = [
    "Every 15 minutes",
    "Every 20 minutes", 
    "Every 30 minutes",
    "Every 45 minutes",
    "Every 1 hour",
    "Every 1.5 hours",
    "Every 2 hours",
    "Every 3 hours",
    "Manual Time Entry"
  ];

  const renderTimeSlots = (direction: 'forward' | 'return', timeSlots: TimeSlot[], directionLabel: string) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-md font-semibold text-gray-800">{directionLabel}</h4>
        {(direction === 'forward' ? scheduleData.forwardFrequency : scheduleData.returnFrequency) === "Manual Time Entry" && (
          <button
            type="button"
            onClick={() => addTimeSlot(direction)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
          >
            <Plus className="h-3 w-3" />
            Add Time
          </button>
        )}
      </div>

      {/* Frequency Selection for each direction */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Frequency for {directionLabel}
        </label>
        <select
          value={direction === 'forward' ? scheduleData.forwardFrequency : scheduleData.returnFrequency}
          onChange={(e) => updateFrequency(direction, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
        >
          <option value="">Select Frequency</option>
          {frequencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Operating Hours (only if not Manual Time Entry) */}
      {(direction === 'forward' ? scheduleData.forwardFrequency : scheduleData.returnFrequency) !== "Manual Time Entry" && 
       (direction === 'forward' ? scheduleData.forwardFrequency : scheduleData.returnFrequency) !== "" && (
        <div className="space-y-4">
          <h5 className="text-sm font-semibold text-gray-700">Operating Hours</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                First Bus
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="06:00 AM"
                  value={direction === 'forward' ? scheduleData.forwardFirstBus : scheduleData.returnFirstBus}
                  onChange={(e) => updateOperatingHours(direction, 'firstBus', e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 text-sm"
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Last Bus
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="10:00 PM"
                  value={direction === 'forward' ? scheduleData.forwardLastBus : scheduleData.returnLastBus}
                  onChange={(e) => updateOperatingHours(direction, 'lastBus', e.target.value)}
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 text-sm"
                />
                <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Slots (only if Manual Time Entry is selected for this direction) */}
      {(direction === 'forward' ? scheduleData.forwardFrequency : scheduleData.returnFrequency) === "Manual Time Entry" && (
        <div className="space-y-3">
          {timeSlots.map((slot, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 p-3 border rounded-lg relative">
              {timeSlots.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTimeSlot(direction, index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  title="Remove time slot"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Departure Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="--:-- --"
                    value={slot.departure}
                    onChange={(e) => updateTimeSlot(direction, index, "departure", e.target.value)}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 text-sm"
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">
                  Arrival Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="--:-- --"
                    value={slot.arrival}
                    onChange={(e) => updateTimeSlot(direction, index, "arrival", e.target.value)}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 text-sm"
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (!startPoint || !endPoint) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 text-center">
          Please select start and end points to configure bidirectional schedules
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          ↔️ Bidirectional Schedule Configuration
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Configure schedules for both directions independently
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forward Direction */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            {renderTimeSlots('forward', scheduleData.forwardTimeSlots, `${startPoint} → ${endPoint}`)}
          </div>

          {/* Return Direction */}
          <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
            {renderTimeSlots('return', scheduleData.returnTimeSlots, `${endPoint} → ${startPoint}`)}
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="text-yellow-600">💡</div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                Bidirectional Schedule Tips
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Each direction can have different frequencies and time slots</li>
                <li>• Days of operation and validity period will apply to both directions</li>
                <li>• Route group will be shared between both directions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
