"use client";

import { Clock, Plus, Trash2 } from "lucide-react";

export interface Stop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  time: string;
}

interface PermitStopSequenceProps {
  stops: Stop[];
  errors?: Record<string, string>;
  onAddStop: () => void;
  onRemoveStop: (id: number) => void;
  onUpdateStop: (id: number, field: string, value: string) => void;
}

export function PermitStopSequence({
  stops,
  errors = {},
  onAddStop,
  onRemoveStop,
  onUpdateStop,
}: PermitStopSequenceProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Stop Sequence</h3>
      </div>
      <div className="p-6 space-y-4">
        {errors.stops && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.stops}</p>
          </div>
        )}
        {stops.map((stop, index) => (
          <div key={stop.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Stop #{stop.id}</h4>
              {stops.length > 1 && (
                <button
                  onClick={() => onRemoveStop(stop.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor={`stopName${stop.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Stop Name *
                </label>
                <input
                  id={`stopName${stop.id}`}
                  value={stop.name}
                  onChange={(e) =>
                    onUpdateStop(stop.id, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`latitude${stop.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Latitude *
                </label>
                <input
                  id={`latitude${stop.id}`}
                  value={stop.latitude}
                  onChange={(e) =>
                    onUpdateStop(stop.id, "latitude", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_coords`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`longitude${stop.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Longitude *
                </label>
                <input
                  id={`longitude${stop.id}`}
                  value={stop.longitude}
                  onChange={(e) =>
                    onUpdateStop(stop.id, "longitude", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                    errors[`stop_${stop.id}_coords`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor={`time${stop.id}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Time *
                </label>
                <div className="relative">
                  <input
                    id={`time${stop.id}`}
                    value={stop.time}
                    onChange={(e) =>
                      onUpdateStop(stop.id, "time", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                      errors[`stop_${stop.id}_time`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>
            </div>
            {(errors[`stop_${stop.id}_coords`] || errors[`stop_${stop.id}_time`]) && (
              <div className="space-y-1">
                {errors[`stop_${stop.id}_coords`] && (
                  <p className="text-sm text-red-600">{errors[`stop_${stop.id}_coords`]}</p>
                )}
                {errors[`stop_${stop.id}_time`] && (
                  <p className="text-sm text-red-600">{errors[`stop_${stop.id}_time`]}</p>
                )}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onAddStop}
          className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Stop
        </button>
      </div>
    </div>
  );
}
