"use client";

import { ArrowLeft } from 'lucide-react';

interface RouteDetailsHeaderProps {
  routeName: string;
  routeNumber: string;
  routeGroup: string;
  onBack: () => void;
  onEdit: () => void;
}

export function RouteDetailsHeader({
  routeName,
  routeNumber,
  routeGroup,
  onBack,
  onEdit,
}: RouteDetailsHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{routeName}</h1>
            <p className="text-sm text-gray-600">Route #{routeNumber} • {routeGroup}</p>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Route
        </button>
      </div>
    </div>
  );
}
