"use client";

import { Edit } from "lucide-react";

interface ScheduleDetailsActionsProps {
  onDeactivate: () => void;
  onClose: () => void;
  onEdit: () => void;
}

export function ScheduleDetailsActions({
  onDeactivate,
  onClose,
  onEdit,
}: ScheduleDetailsActionsProps) {
  return (
    <div className="flex justify-between pt-6 border-t">
      <button
        className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
        onClick={onDeactivate}
      >
        Deactivate Schedule
      </button>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-flex items-center gap-2"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
          Edit Schedule
        </button>
      </div>
    </div>
  );
}
