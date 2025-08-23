"use client";

import { MapPin } from 'lucide-react';

interface IntermediateStop {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  travelTimeFromPrevious: string;
  sequence: number;
}

interface RouteStopsTableProps {
  route: {
    startingPoint: string;
    endPoint: string;
    startLat: string;
    startLng: string;
    endLat: string;
    endLng: string;
    intermediateStops: IntermediateStop[];
  };
  calculateTotalTravelTime: () => number;
}

export function RouteStopsTable({ route, calculateTotalTravelTime }: RouteStopsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-gray-900">Intermediate Stops & Travel Times</h3>
        <span className="text-sm text-gray-600">
          Total travel time: {calculateTotalTravelTime()} minutes
        </span>
      </div>
      
      {route.intermediateStops.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sequence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coordinates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travel Time from Previous
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cumulative Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Starting Point Row */}
                <tr className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">S</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{route.startingPoint}</div>
                    <div className="text-xs text-gray-500">Starting Point</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{route.startLat}, {route.startLng}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">0 min</div>
                  </td>
                </tr>
                
                {/* Intermediate Stops */}
                {route.intermediateStops.map((stop, index) => {
                  const cumulativeTime = route.intermediateStops
                    .slice(0, index + 1)
                    .reduce((total, s) => total + (parseFloat(s.travelTimeFromPrevious) || 0), 0);
                  
                  return (
                    <tr key={stop.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{stop.sequence}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{stop.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{stop.latitude}, {stop.longitude}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{stop.travelTimeFromPrevious} min</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{cumulativeTime} min</div>
                      </td>
                    </tr>
                  );
                })}
                
                {/* End Point Row */}
                <tr className="bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">E</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{route.endPoint}</div>
                    <div className="text-xs text-gray-500">End Point</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{route.endLat}, {route.endLng}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">-</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{calculateTotalTravelTime()} min</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-500 mb-2">No intermediate stops configured</p>
          <p className="text-sm text-gray-400">This route goes directly from start to end point</p>
        </div>
      )}
    </div>
  );
}
