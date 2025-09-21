'use client';

import { Plus, Download, FileSpreadsheet } from 'lucide-react';

interface ScheduleActionsProps {
  onAddNew: () => void;
  onExportAll: () => void;
  isLoading?: boolean;
  totalSchedules?: number;
}

export function ScheduleActions({
  onAddNew,
  onExportAll,
  isLoading = false,
  totalSchedules = 0,
}: ScheduleActionsProps) {

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 justify-end items-start sm:items-center">
        {/* Left side - Page info */}
        {/* <div>
          <h2 className="text-xl font-semibold text-gray-900">Schedule Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage route schedules and time slots. 
            {totalSchedules > 0 && (
              <span className="ml-1 font-medium text-gray-800">
                {totalSchedules} schedule{totalSchedules !== 1 ? 's' : ''} total
              </span>
            )}
          </p>
        </div> */}

        {/* Right side - Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onExportAll}
            disabled={isLoading || totalSchedules === 0}
            className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            title={totalSchedules === 0 ? "No schedules to export" : "Export all schedules"}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          
          <button
            onClick={onAddNew}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </button>
        </div>
      </div>
    </div>
  );
}