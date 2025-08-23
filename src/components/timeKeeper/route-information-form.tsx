interface RouteInformationFormProps {
  routeId: string;
  busNo: string;
  onRouteIdChange: (value: string) => void;
  onBusNoChange: (value: string) => void;
}

export function RouteInformationForm({
  routeId,
  busNo,
  onRouteIdChange,
  onBusNoChange,
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
              <option value="RT004">RT-004 (Jaffna - Vavuniya)</option>
              <option value="RT005">RT-005 (Batticaloa - Polonnaruwa)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="busNo"
              className="block text-sm font-medium text-gray-700"
            >
              Bus No. *
            </label>
            <select
              id="busNo"
              value={busNo}
              onChange={(e) => onBusNoChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
            >
              <option value="">Select Bus</option>
              <option value="NB-1234">NB-1234</option>
              <option value="NB-5678">NB-5678</option>
              <option value="NB-9012">NB-9012</option>
              <option value="NB-3456">NB-3456</option>
              <option value="NB-7890">NB-7890</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
