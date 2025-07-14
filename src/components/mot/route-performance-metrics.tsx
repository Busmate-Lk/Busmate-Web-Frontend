"use client";

interface RoutePerformanceData {
  totalDistance: string;
  estimatedTravelTime: string;
  averageSpeed: string;
  fuelConsumption: string;
}

interface RoutePerformanceMetricsProps {
  data: RoutePerformanceData;
  errors?: Record<string, string>;
  touched?: Record<string, boolean>;
  onChange: (field: keyof RoutePerformanceData, value: string) => void;
  onBlur?: (field: string) => void;
}

export function RoutePerformanceMetrics({
  data,
  errors = {},
  touched = {},
  onChange,
  onBlur,
}: RoutePerformanceMetricsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">
          Route Performance Metrics
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Performance indicators for route planning and optimization
        </p>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Distance */}
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
              min="0"
              placeholder="Enter distance in kilometers"
              value={data.totalDistance}
              onChange={(e) => onChange("totalDistance", e.target.value)}
              onBlur={() => onBlur?.("totalDistance")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.totalDistance && errors.totalDistance ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.totalDistance && errors.totalDistance && (
              <p className="text-sm text-red-600">{errors.totalDistance}</p>
            )}
          </div>

          {/* Estimated Travel Time */}
          <div className="space-y-2">
            <label
              htmlFor="estimatedTravelTime"
              className="text-sm font-medium text-gray-700"
            >
              Estimated Travel Time *
            </label>
            <input
              id="estimatedTravelTime"
              placeholder="e.g., 02:30 (HH:MM)"
              value={data.estimatedTravelTime}
              onChange={(e) => onChange("estimatedTravelTime", e.target.value)}
              onBlur={() => onBlur?.("estimatedTravelTime")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.estimatedTravelTime && errors.estimatedTravelTime ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.estimatedTravelTime && errors.estimatedTravelTime && (
              <p className="text-sm text-red-600">{errors.estimatedTravelTime}</p>
            )}
          </div>

          {/* Average Speed */}
          <div className="space-y-2">
            <label
              htmlFor="averageSpeed"
              className="text-sm font-medium text-gray-700"
            >
              Average Speed (km/h)
            </label>
            <input
              id="averageSpeed"
              type="number"
              step="0.1"
              min="0"
              placeholder="Enter average speed"
              value={data.averageSpeed}
              onChange={(e) => onChange("averageSpeed", e.target.value)}
              onBlur={() => onBlur?.("averageSpeed")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.averageSpeed && errors.averageSpeed ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.averageSpeed && errors.averageSpeed && (
              <p className="text-sm text-red-600">{errors.averageSpeed}</p>
            )}
          </div>

          {/* Fuel Consumption */}
          <div className="space-y-2">
            <label
              htmlFor="fuelConsumption"
              className="text-sm font-medium text-gray-700"
            >
              Est. Fuel Consumption (L/100km)
            </label>
            <input
              id="fuelConsumption"
              type="number"
              step="0.1"
              min="0"
              placeholder="Enter fuel consumption"
              value={data.fuelConsumption}
              onChange={(e) => onChange("fuelConsumption", e.target.value)}
              onBlur={() => onBlur?.("fuelConsumption")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                touched.fuelConsumption && errors.fuelConsumption ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.fuelConsumption && errors.fuelConsumption && (
              <p className="text-sm text-red-600">{errors.fuelConsumption}</p>
            )}
          </div>
        </div>

        {/* Performance Summary */}
        {data.totalDistance && data.estimatedTravelTime && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Performance Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Distance:</span>
                <span className="text-blue-900 ml-1">{data.totalDistance} km</span>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Duration:</span>
                <span className="text-blue-900 ml-1">{data.estimatedTravelTime}</span>
              </div>
              {data.averageSpeed && (
                <div>
                  <span className="text-blue-700 font-medium">Avg Speed:</span>
                  <span className="text-blue-900 ml-1">{data.averageSpeed} km/h</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
