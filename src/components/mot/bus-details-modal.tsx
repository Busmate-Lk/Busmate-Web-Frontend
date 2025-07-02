"use client";

import { X, Phone, MapPin } from "lucide-react";
import { Bus } from "./live-map-view";

interface BusDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBus: Bus | null;
}

export function BusDetailsModal({
  isOpen,
  onClose,
  selectedBus,
}: BusDetailsModalProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (!isOpen || !selectedBus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Bus Details - {selectedBus.busNumber}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                  selectedBus.status
                )}`}
              >
                {selectedBus.status.replace("-", " ")}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Route:</p>
                <p className="font-medium">{selectedBus.route}</p>
              </div>
              <div>
                <p className="text-gray-600">Driver:</p>
                <p className="font-medium">{selectedBus.driver}</p>
              </div>
              <div>
                <p className="text-gray-600">Passengers:</p>
                <p className="font-medium">{selectedBus.passengers}</p>
              </div>
              <div>
                <p className="text-gray-600">Next Stop:</p>
                <p className="font-medium">{selectedBus.nextStop}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Current Location:</p>
              <p className="font-medium">{selectedBus.location.address}</p>
              <p className="text-xs text-gray-500">
                Lat: {selectedBus.location.lat}, Lng: {selectedBus.location.lng}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>ETA to Next Stop:</span>
              <span className="font-medium">{selectedBus.eta}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Last Update:</span>
              <span className="font-medium">{selectedBus.lastUpdate}</span>
            </div>

            <div className="flex gap-2 pt-4">
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Contact Driver
              </button>
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <MapPin className="mr-2 h-4 w-4" />
                View Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
