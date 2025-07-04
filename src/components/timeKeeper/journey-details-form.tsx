interface JourneyDetailsFormProps {
  startPoint: string;
  endPoint: string;
  onStartPointChange: (value: string) => void;
  onEndPointChange: (value: string) => void;
}

export function JourneyDetailsForm({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
}: JourneyDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🗺️ Journey Details
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="startPoint"
              className="block text-sm font-medium text-gray-700"
            >
              Start Point *
            </label>
            <input
              id="startPoint"
              type="text"
              placeholder="Enter start point"
              value={startPoint}
              onChange={(e) => onStartPointChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="endPoint"
              className="block text-sm font-medium text-gray-700"
            >
              End Point *
            </label>
            <input
              id="endPoint"
              type="text"
              placeholder="Enter end point"
              value={endPoint}
              onChange={(e) => onEndPointChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
