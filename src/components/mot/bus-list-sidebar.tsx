"use client";

import { MapPin, Clock } from "lucide-react";
import { Bus } from "./live-map-view";

interface BusListSidebarProps {
  buses: Bus[];
  onBusClick: (bus: Bus) => void;
}

export function BusListSidebar({ buses, onBusClick }: BusListSidebarProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500";
      case "delayed":
        return "bg-red-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

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

  return (
    <div className="w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            Active Buses
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {buses.length}
            </span>
          </h3>
        </div>
        <div className="bg-white">
          <div className="max-h-80 overflow-y-auto">{/* Reduced height */}
            {buses.length > 0 ? (
              buses.map((bus) => (
                <div
                  key={bus.id}
                  className="px-4 py-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                  onClick={() => onBusClick(bus)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 ${getStatusColor(
                          bus.status
                        )} rounded-full shadow-sm`}
                      ></div>
                      <span className="font-semibold text-gray-900">{bus.busNumber}</span>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        bus.status
                      )}`}
                    >
                      {bus.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 font-medium">{bus.route}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600 flex items-center">
                      <MapPin className="inline w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{bus.location.address}</span>
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <Clock className="inline w-3 h-3 mr-1 flex-shrink-0" />
                      <span>Updated {bus.lastUpdate}</span>
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                      <span>{bus.passengers} passengers</span>
                      <span className="font-medium">{bus.eta}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center bg-gray-50">
                <p className="text-gray-600 font-medium mb-1">No buses found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
