"use client";

import { Clock } from "lucide-react";

interface RouteData {
  routeName: string;
  upStartPoint: string;
  upEndPoint: string;
  upStartLat: string;
  upStartLng: string;
  upEndLat: string;
  upEndLng: string;
  downStartPoint: string;
  downEndPoint: string;
  downStartLat: string;
  downStartLng: string;
  downEndLat: string;
  downEndLng: string;
  totalDistance: string;
  totalDuration: string;
}

interface PermitRouteDetailsProps {
  data: RouteData;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof RouteData, value: string) => void;
  onBlur?: (field: string) => void;
}

const inputClassName =
  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500";

export function PermitRouteDetails({
  data,
  errors = {},
  touched = {},
  onChange,
  onBlur,
}: PermitRouteDetailsProps) {
  const getInputClassName = (fieldName: string) => 
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
      touched[fieldName] && errors[fieldName] ? 'border-red-500' : 'border-gray-300'
    }`;
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Route Details</h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="routeName"
            className="text-sm font-medium text-gray-700"
          >
            Route Name *
          </label>
          <input
            id="routeName"
            placeholder="Enter route name"
            value={data.routeName}
            onChange={(e) => onChange("routeName", e.target.value)}
            onBlur={() => onBlur?.("routeName")}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
              touched.routeName && errors.routeName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.routeName && errors.routeName && (
            <p className="text-sm text-red-600">{errors.routeName}</p>
          )}
        </div>

        {/* Up Route */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Up Route</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="upStartPoint"
                className="text-sm font-medium text-gray-700"
              >
                Start Point *
              </label>
              <input
                id="upStartPoint"
                placeholder="Enter start point"
                value={data.upStartPoint}
                onChange={(e) => onChange("upStartPoint", e.target.value)}
                onBlur={() => onBlur?.("upStartPoint")}
                className={getInputClassName("upStartPoint")}
              />
              {touched.upStartPoint && errors.upStartPoint && (
                <p className="text-sm text-red-600">{errors.upStartPoint}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="upEndPoint"
                className="text-sm font-medium text-gray-700"
              >
                End Point *
              </label>
              <input
                id="upEndPoint"
                placeholder="Enter end point"
                value={data.upEndPoint}
                onChange={(e) => onChange("upEndPoint", e.target.value)}
                onBlur={() => onBlur?.("upEndPoint")}
                className={getInputClassName("upEndPoint")}
              />
              {touched.upEndPoint && errors.upEndPoint && (
                <p className="text-sm text-red-600">{errors.upEndPoint}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Start Point Coordinates *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Latitude"
                  value={data.upStartLat}
                  onChange={(e) => onChange("upStartLat", e.target.value)}
                  onBlur={() => onBlur?.("upStartLat")}
                  className={getInputClassName("upStartLat")}
                />
                <input
                  placeholder="Longitude"
                  value={data.upStartLng}
                  onChange={(e) => onChange("upStartLng", e.target.value)}
                  onBlur={() => onBlur?.("upStartLng")}
                  className={getInputClassName("upStartLng")}
                />
              </div>
              {touched.upStartLat && errors.upStartCoords && (
                <p className="text-sm text-red-600">{errors.upStartCoords}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                End Point Coordinates *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Latitude"
                  value={data.upEndLat}
                  onChange={(e) => onChange("upEndLat", e.target.value)}
                  onBlur={() => onBlur?.("upEndLat")}
                  className={getInputClassName("upEndLat")}
                />
                <input
                  placeholder="Longitude"
                  value={data.upEndLng}
                  onChange={(e) => onChange("upEndLng", e.target.value)}
                  onBlur={() => onBlur?.("upEndLng")}
                  className={getInputClassName("upEndLng")}
                />
              </div>
              {touched.upEndLat && errors.upEndCoords && (
                <p className="text-sm text-red-600">{errors.upEndCoords}</p>
              )}
            </div>
          </div>
        </div>

        {/* Down Route */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Down Route</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="downStartPoint"
                className="text-sm font-medium text-gray-700"
              >
                Start Point *
              </label>
              <input
                id="downStartPoint"
                placeholder="Enter start point"
                value={data.downStartPoint}
                onChange={(e) => onChange("downStartPoint", e.target.value)}
                onBlur={() => onBlur?.("downStartPoint")}
                className={getInputClassName("downStartPoint")}
              />
              {touched.downStartPoint && errors.downStartPoint && (
                <p className="text-sm text-red-600">{errors.downStartPoint}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="downEndPoint"
                className="text-sm font-medium text-gray-700"
              >
                End Point *
              </label>
              <input
                id="downEndPoint"
                placeholder="Enter end point"
                value={data.downEndPoint}
                onChange={(e) => onChange("downEndPoint", e.target.value)}
                onBlur={() => onBlur?.("downEndPoint")}
                className={getInputClassName("downEndPoint")}
              />
              {touched.downEndPoint && errors.downEndPoint && (
                <p className="text-sm text-red-600">{errors.downEndPoint}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Start Point Coordinates *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Latitude"
                  value={data.downStartLat}
                  onChange={(e) => onChange("downStartLat", e.target.value)}
                  onBlur={() => onBlur?.("downStartLat")}
                  className={getInputClassName("downStartLat")}
                />
                <input
                  placeholder="Longitude"
                  value={data.downStartLng}
                  onChange={(e) => onChange("downStartLng", e.target.value)}
                  onBlur={() => onBlur?.("downStartLng")}
                  className={getInputClassName("downStartLng")}
                />
              </div>
              {touched.downStartLat && errors.downStartCoords && (
                <p className="text-sm text-red-600">{errors.downStartCoords}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                End Point Coordinates *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Latitude"
                  value={data.downEndLat}
                  onChange={(e) => onChange("downEndLat", e.target.value)}
                  onBlur={() => onBlur?.("downEndLat")}
                  className={getInputClassName("downEndLat")}
                />
                <input
                  placeholder="Longitude"
                  value={data.downEndLng}
                  onChange={(e) => onChange("downEndLng", e.target.value)}
                  onBlur={() => onBlur?.("downEndLng")}
                  className={getInputClassName("downEndLng")}
                />
              </div>
              {touched.downEndLat && errors.downEndCoords && (
                <p className="text-sm text-red-600">{errors.downEndCoords}</p>
              )}
            </div>
          </div>
        </div>

        {/* Distance and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="totalDistance"
              className="text-sm font-medium text-gray-700"
            >
              Total Distance (km) *
            </label>
            <input
              id="totalDistance"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={data.totalDistance}
              onChange={(e) => onChange("totalDistance", e.target.value)}
              onBlur={() => onBlur?.("totalDistance")}
              className={getInputClassName("totalDistance")}
            />
            {touched.totalDistance && errors.totalDistance && (
              <p className="text-sm text-red-600">{errors.totalDistance}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="totalDuration"
              className="text-sm font-medium text-gray-700"
            >
              Total Duration (HH:MM) *
            </label>
            <div className="relative">
              <input
                id="totalDuration"
                placeholder="HH:MM"
                value={data.totalDuration}
                onChange={(e) => onChange("totalDuration", e.target.value)}
                onBlur={() => onBlur?.("totalDuration")}
                className={getInputClassName("totalDuration")}
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {touched.totalDuration && errors.totalDuration && (
              <p className="text-sm text-red-600">{errors.totalDuration}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
