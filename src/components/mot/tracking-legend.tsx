"use client";

export function TrackingLegend() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="font-medium">Legend:</span>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span>On Time</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span>Delayed</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        <span>Inactive</span>
      </div>
    </div>
  );
}
