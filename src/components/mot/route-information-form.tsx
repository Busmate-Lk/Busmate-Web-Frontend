interface RouteInformationFormProps {
  routeId: string;
  frequency: string;
  onRouteIdChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
}

export function RouteInformationForm({
  routeId,
  frequency,
  onRouteIdChange,
  onFrequencyChange,
}: RouteInformationFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🚌 Route Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="routeId"
              className="block text-sm font-medium text-gray-700"
            >
              Route ID *
            </label>
            <select
              id="routeId"
              value={routeId}
              onChange={(e) => onRouteIdChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            >
              <option value="">Select Route</option>
              <option value="RT001">RT-001 (Colombo - Kandy)</option>
              <option value="RT002">RT-002 (Galle - Matara)</option>
              <option value="RT003">RT-003 (Negombo - Chilaw)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700"
            >
              Service Frequency *
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => onFrequencyChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            >
              <option value="">Select Frequency</option>
              <option value="Every 15 minutes">Every 15 minutes</option>
              <option value="Every 20 minutes">Every 20 minutes</option>
              <option value="Every 30 minutes">Every 30 minutes</option>
              <option value="Every 45 minutes">Every 45 minutes</option>
              <option value="Every 1 hour">Every 1 hour</option>
              <option value="Every 1.5 hours">Every 1.5 hours</option>
              <option value="Every 2 hours">Every 2 hours</option>
              <option value="Every 3 hours">Every 3 hours</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
