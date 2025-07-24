import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RouteScheduleDetailsFormProps {
  routeNumber: string;
  routeName: string;
  routeCategory: string;
  scheduleType: 'forward' | 'backward';
  onRouteNumberChange: (value: string) => void;
  onRouteNameChange: (value: string) => void;
  onRouteCategoryChange: (value: string) => void;
  onScheduleTypeChange: (value: 'forward' | 'backward') => void;
}

export function RouteScheduleDetailsForm({
  routeNumber,
  routeName,
  routeCategory,
  scheduleType,
  onRouteNumberChange,
  onRouteNameChange,
  onRouteCategoryChange,
  onScheduleTypeChange,
}: RouteScheduleDetailsFormProps) {
  const [isRouteCategoryOpen, setIsRouteCategoryOpen] = useState(false);
  const [isScheduleTypeOpen, setIsScheduleTypeOpen] = useState(false);

  const routeCategories = [
    { value: 'expressway', label: 'Expressway' },
    { value: 'normal', label: 'Normal' },
    { value: 'inter-city', label: 'Inter-City' },
    { value: 'local', label: 'Local' },
  ];

  const scheduleTypes = [
    { value: 'forward', label: 'Forward Route' },
    { value: 'backward', label: 'Backward Route' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📋 Route & Schedule Details
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="routeNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Route Number *
            </label>
            <input
              id="routeNumber"
              type="text"
              placeholder="e.g., RT001"
              value={routeNumber}
              onChange={(e) => onRouteNumberChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="routeName"
              className="block text-sm font-medium text-gray-700"
            >
              Route Name *
            </label>
            <input
              id="routeName"
              type="text"
              placeholder="e.g., Colombo - Kandy Express Route"
              value={routeName}
              onChange={(e) => onRouteNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Route Category *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRouteCategoryOpen(!isRouteCategoryOpen)}
                className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white flex items-center justify-between"
              >
                <span
                  className={routeCategory ? 'text-gray-900' : 'text-gray-500'}
                >
                  {routeCategory
                    ? routeCategories.find((cat) => cat.value === routeCategory)
                        ?.label
                    : 'Select route category'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    isRouteCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isRouteCategoryOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {routeCategories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        onRouteCategoryChange(category.value);
                        setIsRouteCategoryOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Direction *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsScheduleTypeOpen(!isScheduleTypeOpen)}
                className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white flex items-center justify-between"
              >
                <span
                  className={scheduleType ? 'text-gray-900' : 'text-gray-500'}
                >
                  {scheduleType
                    ? scheduleTypes.find((type) => type.value === scheduleType)
                        ?.label
                    : 'Select schedule direction'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    isScheduleTypeOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isScheduleTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {scheduleTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        onScheduleTypeChange(
                          type.value as 'forward' | 'backward'
                        );
                        setIsScheduleTypeOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
