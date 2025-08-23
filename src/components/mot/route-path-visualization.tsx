"use client";

interface RoutePathVisualizationProps {
  startingPoint: string;
  endPoint: string;
  intermediateStops: any[];
}

export function RoutePathVisualization({
  startingPoint,
  endPoint,
  intermediateStops,
}: RoutePathVisualizationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Route Path</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-900">{startingPoint}</span>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-px bg-gray-300 relative">
              {intermediateStops.map((_, index) => (
                <div 
                  key={index}
                  className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-y-1/2"
                  style={{ left: `${((index + 1) / (intermediateStops.length + 1)) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">{endPoint}</span>
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <span className="text-xs text-gray-500">{intermediateStops.length} intermediate stops</span>
        </div>
      </div>
    </div>
  );
}
