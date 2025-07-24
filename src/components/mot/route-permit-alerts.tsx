"use client";

import { AlertTriangle } from "lucide-react";

export interface RouteAlert {
  route: string;
  status: string;
  type: "warning" | "danger";
}

interface RoutePermitAlertsProps {
  alerts: RouteAlert[];
}

export function RoutePermitAlerts({ alerts }: RoutePermitAlertsProps) {
  return (
    <div className="rounded-lg  bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg font-semibold text-black">
          Route Permit Expiry Alerts
        </h3>
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
      </div>
      <div className="space-y-4 p-6 pt-0">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-black">{alert.route}</p>
              <p className="text-xs text-gray-500">{alert.status}</p>
            </div>
            <div
              className={`w-3 h-3 rounded-full ${
                alert.type === "warning" ? "bg-yellow-400" : "bg-red-400"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
