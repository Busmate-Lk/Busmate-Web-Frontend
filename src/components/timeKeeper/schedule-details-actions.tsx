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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
            <p className="text-sm text-gray-500">
              Manage this schedule or make changes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onDeactivate}
              className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Deactivate Schedule
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Edit Schedule
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
