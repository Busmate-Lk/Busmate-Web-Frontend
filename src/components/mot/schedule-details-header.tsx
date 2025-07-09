"use client";

interface ScheduleDetailsHeaderProps {
  scheduleId: string;
  onBack?: () => void;
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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        {onBack && (
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={onBack}
          >
            ← Back to the Schedule Management
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          onClick={onEdit}
        >
          Edit Schedule
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          onClick={onArchive}
        >
          Archive
        </button>
      </div>
    </div>
  );
}
