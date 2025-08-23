"use client";

import { X } from "lucide-react";

interface Stop {
  id: number;
  name: string;
  time: string;
}

interface IntermediateStopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: Stop[];
}

export function IntermediateStopsModal({
  isOpen,
  onClose,
  stops,
}: IntermediateStopsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Sequence of Stops
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {stops.map((stop, index) => (
              <div
                key={stop.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{stop.name}</span>
                </div>
                <span className="text-sm text-gray-600">{stop.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
