"use client";

import { Wrench } from "lucide-react";

export interface MaintenanceBus {
  bus: string;
  status: string;
  type: "warning" | "info";
}

interface MaintenanceBusesProps {
  buses: MaintenanceBus[];
}

export function MaintenanceBuses({ buses }: MaintenanceBusesProps) {
  return (
    <div className="rounded-lg  bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-black">
          Buses Marked for Maintenance
        </h3>
        <Wrench className="h-5 w-5 text-orange-600" />
      </div>
      <div className="space-y-4 p-6 pt-0">
        {buses.map((bus, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-black">{bus.bus}</p>
              <p className="text-xs text-gray-500">{bus.status}</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                bus.type === "warning" ? "bg-orange-400" : "bg-blue-400"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
