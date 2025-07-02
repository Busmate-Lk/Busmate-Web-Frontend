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
      <div className="h-full bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            Active Buses
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              {buses.length}
            </span>
          </h3>
        </div>
        <div className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onBusClick(bus)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 ${getStatusColor(
                        bus.status
                      )} rounded-full`}
                    ></div>
                    <span className="font-medium">{bus.busNumber}</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      bus.status
                    )}`}
                  >
                    {bus.status.replace("-", " ")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{bus.route}</p>
                <p className="text-xs text-gray-500">
                  <MapPin className="inline w-3 h-3 mr-1" />
                  {bus.location.address}
                </p>
                <p className="text-xs text-gray-500">
                  <Clock className="inline w-3 h-3 mr-1" />
                  Updated {bus.lastUpdate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
