interface RouteInformationFormProps {
  routeId: string;
  routeGroup: string;
  frequency: string;
  isBidirectional: boolean;
  onRouteIdChange: (value: string) => void;
  onRouteGroupChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
  onBidirectionalChange: (value: boolean) => void;
}

export function RouteInformationForm({
  routeId,
  routeGroup,
  frequency,
  isBidirectional,
  onRouteIdChange,
  onRouteGroupChange,
  onFrequencyChange,
  onBidirectionalChange,
}: RouteInformationFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        Route Information
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
              htmlFor="routeGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Route Group *
            </label>
            <select
              id="routeGroup"
              value={routeGroup}
              onChange={(e) => onRouteGroupChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            >
              <option value="">Select Route Group</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Group C">Group C</option>
              <option value="Group D">Group D</option>
              <option value="Group E">Group E</option>
              <option value="Group F">Group F</option>
              <option value="Group G">Group G</option>
              <option value="Group H">Group H</option>
              <option value="Group I">Group I</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700"
            >
              Service Frequency *
              {isBidirectional && (
                <span className="text-xs text-gray-500 ml-2">
                  (Individual frequencies will be set for each direction)
                </span>
              )}
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => onFrequencyChange(e.target.value)}
              disabled={isBidirectional}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900 ${
                isBidirectional ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
              }`}
            >
              <option value="">{isBidirectional ? 'Set individually for each direction' : 'Select Frequency'}</option>
              {!isBidirectional && (
                <>
                  <option value="Every 15 minutes">Every 15 minutes</option>
                  <option value="Every 20 minutes">Every 20 minutes</option>
                  <option value="Every 30 minutes">Every 30 minutes</option>
                  <option value="Every 45 minutes">Every 45 minutes</option>
                  <option value="Every 1 hour">Every 1 hour</option>
                  <option value="Every 1.5 hours">Every 1.5 hours</option>
                  <option value="Every 2 hours">Every 2 hours</option>
                  <option value="Every 3 hours">Every 3 hours</option>
                  <option value="Manual Time Entry">Manual Time Entry</option>
                </>
              )}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Schedule Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isBidirectional}
                  onChange={(e) => onBidirectionalChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Create bidirectional schedules (both directions)
                </span>
              </label>
            </div>
            {isBidirectional && (
              <p className="text-xs text-blue-600 mt-1">
                This will create schedules for both forward and return routes
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
