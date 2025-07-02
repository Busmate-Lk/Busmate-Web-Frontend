"use client";

import { ArrowLeft, Edit, Archive } from "lucide-react";

interface ScheduleDetailsHeaderProps {
  scheduleId: string;
  onBack: () => void;
  onEdit: () => void;
  onArchive: () => void;
}

export function ScheduleDetailsHeader({
  scheduleId,
  onBack,
  onEdit,
  onArchive,
}: ScheduleDetailsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Schedule Management
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Schedule Details</h2>
          <p className="text-gray-600">
            Detailed information for Schedule #{scheduleId}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 inline-flex items-center gap-2"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
            Edit Schedule
          </button>
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 inline-flex items-center gap-2"
            onClick={onArchive}
          >
            <Archive className="h-4 w-4" />
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}
