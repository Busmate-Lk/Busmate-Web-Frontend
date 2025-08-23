"use client";

interface RouteBasicData {
  routeGroup: string;
  routeNo: string;
  routeName: string;
  startingPoint: string;
  endPoint: string;
  startLat: string;
  startLng: string;
  endLat: string;
  endLng: string;
  routeStatus: string;
}

interface RouteBasicInformationProps {
  data: RouteBasicData;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof RouteBasicData, value: string) => void;
  onBlur?: (field: string) => void;
}

export function RouteBasicInformation({
  data,
  errors = {},
  touched = {},
  onChange,
  onBlur,
}: RouteBasicInformationProps) {
  const routeGroups = [
    { value: "intercity", label: "Intercity" },
    { value: "suburban", label: "Suburban" },
    { value: "express", label: "Express" },
    { value: "local", label: "Local" },
    { value: "highway", label: "Highway" },
  ];

  const routeStatuses = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "undermaintenance", label: "Under Maintenance" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          Route Basic Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Route Group */}
          <div className="space-y-2">
            <label
              htmlFor="routeGroup"
              className="text-sm font-medium text-gray-700"
            >
              Route Group *
            </label>
            <select
              id="routeGroup"
              value={data.routeGroup}
              onChange={(e) => onChange("routeGroup", e.target.value)}
              onBlur={() => onBlur?.("routeGroup")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                touched.routeGroup && errors.routeGroup ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select route group</option>
              {routeGroups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
            {touched.routeGroup && errors.routeGroup && (
              <p className="text-sm text-red-600">{errors.routeGroup}</p>
            )}
          </div>

          {/* Route No */}
          <div className="space-y-2">
            <label
              htmlFor="routeNo"
              className="text-sm font-medium text-gray-700"
            >
              Route No *
            </label>
            <input
              id="routeNo"
              placeholder="Enter route number (e.g., R001)"
              value={data.routeNo}
              onChange={(e) => onChange("routeNo", e.target.value)}
              onBlur={() => onBlur?.("routeNo")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.routeNo && errors.routeNo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.routeNo && errors.routeNo && (
              <p className="text-sm text-red-600">{errors.routeNo}</p>
            )}
          </div>

          {/* Route Name */}
          <div className="space-y-2 md:col-span-2">
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

          {/* Starting Point */}
          <div className="space-y-2">
            <label
              htmlFor="startingPoint"
              className="text-sm font-medium text-gray-700"
            >
              Starting Point *
            </label>
            <input
              id="startingPoint"
              placeholder="Enter starting point"
              value={data.startingPoint}
              onChange={(e) => onChange("startingPoint", e.target.value)}
              onBlur={() => onBlur?.("startingPoint")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.startingPoint && errors.startingPoint ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.startingPoint && errors.startingPoint && (
              <p className="text-sm text-red-600">{errors.startingPoint}</p>
            )}
          </div>

          {/* End Point */}
          <div className="space-y-2">
            <label
              htmlFor="endPoint"
              className="text-sm font-medium text-gray-700"
            >
              End Point *
            </label>
            <input
              id="endPoint"
              placeholder="Enter end point"
              value={data.endPoint}
              onChange={(e) => onChange("endPoint", e.target.value)}
              onBlur={() => onBlur?.("endPoint")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.endPoint && errors.endPoint ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.endPoint && errors.endPoint && (
              <p className="text-sm text-red-600">{errors.endPoint}</p>
            )}
          </div>

          {/* Starting Point Coordinates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Starting Point Coordinates *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Latitude"
                value={data.startLat}
                onChange={(e) => onChange("startLat", e.target.value)}
                onBlur={() => onBlur?.("startLat")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.startLat && errors.startCoords ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <input
                placeholder="Longitude"
                value={data.startLng}
                onChange={(e) => onChange("startLng", e.target.value)}
                onBlur={() => onBlur?.("startLng")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.startLng && errors.startCoords ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {(touched.startLat || touched.startLng) && errors.startCoords && (
              <p className="text-sm text-red-600">{errors.startCoords}</p>
            )}
          </div>

          {/* End Point Coordinates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              End Point Coordinates *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Latitude"
                value={data.endLat}
                onChange={(e) => onChange("endLat", e.target.value)}
                onBlur={() => onBlur?.("endLat")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.endLat && errors.endCoords ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <input
                placeholder="Longitude"
                value={data.endLng}
                onChange={(e) => onChange("endLng", e.target.value)}
                onBlur={() => onBlur?.("endLng")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                  touched.endLng && errors.endCoords ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {(touched.endLat || touched.endLng) && errors.endCoords && (
              <p className="text-sm text-red-600">{errors.endCoords}</p>
            )}
          </div>

          {/* Route Status */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="routeStatus"
              className="text-sm font-medium text-gray-700"
            >
              Route Status *
            </label>
            <select
              id="routeStatus"
              value={data.routeStatus}
              onChange={(e) => onChange("routeStatus", e.target.value)}
              onBlur={() => onBlur?.("routeStatus")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 ${
                touched.routeStatus && errors.routeStatus ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select route status</option>
              {routeStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {touched.routeStatus && errors.routeStatus && (
              <p className="text-sm text-red-600">{errors.routeStatus}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
