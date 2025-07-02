"use client";

import { DollarSign } from "lucide-react";

export function TopRoutesRevenue() {
  return (
    <div className="mb-8 rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <h3 className="text-lg text-black font-semibold">
          Top 5 Routes by Revenue
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <DollarSign className="h-12 w-12 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
