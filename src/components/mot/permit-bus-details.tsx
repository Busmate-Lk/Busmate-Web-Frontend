"use client";

interface BusDetailsData {
  busId: string;
  busNumber: string;
  seats: string;
}

interface PermitBusDetailsProps {
  data: BusDetailsData;
  routeType: string;
  onChange: (field: keyof BusDetailsData, value: string) => void;
  onRouteTypeChange: (value: string) => void;
}

export function PermitBusDetails({
  data,
  routeType,
  onChange,
  onRouteTypeChange,
}: PermitBusDetailsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0">
        <h3 className="text-lg font-semibold text-gray-900">Bus Details</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="busId"
              className="text-sm font-medium text-gray-700"
            >
              Bus ID *
            </label>
            <input
              id="busId"
              placeholder="Enter bus ID"
              value={data.busId}
              onChange={(e) => onChange("busId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="busNumber"
              className="text-sm font-medium text-gray-700"
            >
              Bus Number *
            </label>
            <input
              id="busNumber"
              placeholder="Enter bus number"
              value={data.busNumber}
              onChange={(e) => onChange("busNumber", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="seats"
              className="text-sm font-medium text-gray-700"
            >
              No. of Seats *
            </label>
            <input
              id="seats"
              placeholder="Enter number of seats"
              type="number"
              value={data.seats}
              onChange={(e) => onChange("seats", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="routeType"
              className="text-sm font-medium text-gray-700"
            >
              Route Type *
            </label>
            <select
              id="routeType"
              value={routeType}
              onChange={(e) => onRouteTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select Route Type</option>
              <option value="intercity">Intercity</option>
              <option value="local">Local</option>
              <option value="express">Express</option>
              <option value="semi-luxury">Semi-Luxury</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
