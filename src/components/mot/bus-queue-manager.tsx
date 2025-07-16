"use client";

import { useState } from "react";
import { Bus, Clock, RotateCw, Users, AlertTriangle } from "lucide-react";

interface QueuedBus {
  id: string;
  registrationNumber: string;
  operator: string;
  type: 'SLTB' | 'Private';
  capacity: number;
  queuePosition: number;
  estimatedAssignmentTime: string;
}

interface BusQueueManagerProps {
  queuedBuses: QueuedBus[];
  onPromoteBus: (busId: string) => void;
  onRemoveFromQueue: (busId: string) => void;
  rotationEnabled: boolean;
}

export function BusQueueManager({
  queuedBuses,
  onPromoteBus,
  onRemoveFromQueue,
  rotationEnabled,
}: BusQueueManagerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div 
        className="p-4 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Bus className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bus Assignment Queue</h3>
              <p className="text-sm text-gray-600">
                {queuedBuses.length} buses waiting for assignment
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {rotationEnabled && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 rounded-full">
                <RotateCw className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800 font-medium">Auto-Rotation Active</span>
              </div>
            )}
            <button className="text-gray-400 hover:text-gray-600">
              {isExpanded ? '−' : '+'}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          {queuedBuses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bus className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium mb-1">Queue is Empty</p>
              <p className="text-sm">All buses are either assigned or available for assignment</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">Queue Order</h4>
                <div className="text-sm text-gray-600">
                  Next assignment in: <span className="font-medium text-blue-600">2h 30m</span>
                </div>
              </div>

              {queuedBuses.map((bus, index) => (
                <div
                  key={bus.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    index === 0
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Queue Position Badge */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {bus.queuePosition}
                      </div>

                      {/* Bus Information */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-semibold text-gray-900">
                            {bus.registrationNumber}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            bus.type === 'SLTB' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {bus.type}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-medium">
                              Next Up
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>{bus.operator}</div>
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {bus.capacity} seats
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Est. assignment: {bus.estimatedAssignmentTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {index > 0 && (
                        <button
                          onClick={() => onPromoteBus(bus.id)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="Move up in queue"
                        >
                          Promote
                        </button>
                      )}
                      <button
                        onClick={() => onRemoveFromQueue(bus.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        title="Remove from queue"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Rotation Information */}
                  {rotationEnabled && index === 0 && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <div className="font-medium mb-1">Rotation Schedule Active</div>
                          <div>
                            This bus will be automatically assigned to the next available time slot
                            and rotated clockwise each day according to the rotation pattern.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Queue Statistics */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Queue Statistics</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Total in Queue</div>
                    <div className="font-semibold text-gray-900">{queuedBuses.length}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">SLTB Buses</div>
                    <div className="font-semibold text-gray-900">
                      {queuedBuses.filter(b => b.type === 'SLTB').length}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Private Buses</div>
                    <div className="font-semibold text-gray-900">
                      {queuedBuses.filter(b => b.type === 'Private').length}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg. Wait Time</div>
                    <div className="font-semibold text-gray-900">3h 45m</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
