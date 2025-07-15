"use client";

export interface IntermediateStop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  travelTimeFromPrevious: string; // Time taken to travel from previous stop (in minutes)
  sequence: number;
}

interface RouteIntermediateStopsProps {
  stops: IntermediateStop[];
  errors?: Record<string, string>;
  onAddStop: () => void;
  onRemoveStop: (id: number) => void;
  onUpdateStop: (id: number, field: string, value: string) => void;
}

export function RouteIntermediateStops({
  stops,
  errors = {},
  onAddStop,
  onRemoveStop,
  onUpdateStop,
}: RouteIntermediateStopsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Intermediate Stops
          </h3>
          <button
            type="button"
            onClick={onAddStop}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Stop
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Add intermediate stops along the route with travel time between each stop
        </p>
      </div>
      <div className="p-6 space-y-4">
        {stops.map((stop, index) => (
          <div
            key={stop.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-md font-medium text-gray-900">
                  Stop {index + 1}
                </h4>
                {/* Calculate and display cumulative travel time */}
                {stops.slice(0, index + 1).some(s => s.travelTimeFromPrevious) && (
                  <p className="text-xs text-gray-500 mt-1">
                    Total time from start: {
                      stops.slice(0, index + 1)
                        .reduce((total, s) => total + (parseFloat(s.travelTimeFromPrevious) || 0), 0)
                    } minutes
                  </p>
                )}
              </div>
              {stops.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveStop(stop.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove stop"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stop Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Stop Name *
                </label>
                <input
                  placeholder="Enter stop name"
                  value={stop.name}
                  onChange={(e) => onUpdateStop(stop.id, "name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_name`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[`stop_${stop.id}_name`] && (
                  <p className="text-sm text-red-600">{errors[`stop_${stop.id}_name`]}</p>
                )}
              </div>

              {/* Latitude */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Latitude *
                </label>
                <input
                  placeholder="Enter latitude"
                  value={stop.latitude}
                  onChange={(e) => onUpdateStop(stop.id, "latitude", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_coords`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[`stop_${stop.id}_coords`] && (
                  <p className="text-sm text-red-600">{errors[`stop_${stop.id}_coords`]}</p>
                )}
              </div>

              {/* Longitude */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Longitude *
                </label>
                <input
                  placeholder="Enter longitude"
                  value={stop.longitude}
                  onChange={(e) => onUpdateStop(stop.id, "longitude", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_coords`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Travel Time from Previous Stop */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {index === 0 ? "Travel Time from Start (min) *" : "Travel Time from Previous Stop (min) *"}
                </label>
                <input
                  type="number"
                  placeholder="Enter time in minutes"
                  value={stop.travelTimeFromPrevious}
                  onChange={(e) => onUpdateStop(stop.id, "travelTimeFromPrevious", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_time`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="0"
                  step="1"
                />
                {errors[`stop_${stop.id}_time`] && (
                  <p className="text-sm text-red-600">{errors[`stop_${stop.id}_time`]}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {stops.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No intermediate stops added yet. Click "Add Stop" to get started.
          </div>
        )}

        {errors.stops && (
          <p className="text-sm text-red-600">{errors.stops}</p>
        )}
      </div>
    </div>
  );
}
