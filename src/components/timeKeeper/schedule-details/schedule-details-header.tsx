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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Schedule Management
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit Schedule
        </button>
        <button
          onClick={onArchive}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Archive className="h-4 w-4" />
          Archive
        </button>
      </div>
    </div>
  );
}
