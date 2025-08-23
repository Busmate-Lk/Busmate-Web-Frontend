interface RouteInformationCardProps {
  startPoint: string;
  endPoint: string;
}

export function RouteInformationCard({ startPoint, endPoint }: RouteInformationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🗺️ Route Information
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Start Point</p>
                <p className="text-lg font-semibold text-gray-900">{startPoint}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-full border-t border-dashed border-gray-300 relative">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <span className="text-xs text-gray-500">Route</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-500">End Point</p>
                <p className="text-lg font-semibold text-gray-900">{endPoint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
