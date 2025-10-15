'use client';

import { Download, XCircle } from 'lucide-react';

interface OperatorTripActionButtonsProps {
  onExportAll: () => void;
  onBulkCancel?: () => void;
  isLoading?: boolean;
  selectedCount?: number;
}

export function OperatorTripActionButtons({
  onExportAll,
  onBulkCancel,
  isLoading = false,
  selectedCount = 0
}: OperatorTripActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Export Action */}
      <div className="flex gap-3">
        <button
          onClick={onExportAll}
          disabled={isLoading}
          className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export All</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>

      {/* Bulk Operations - Only show when items are selected */}
      {selectedCount > 0 && (
        <div className="flex gap-3">
          {/* Bulk Cancel Trips */}
          {onBulkCancel && (
            <button
              onClick={onBulkCancel}
              disabled={isLoading}
              className="flex items-center gap-2 border border-red-300 text-red-700 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              <XCircle className="h-4 w-4" />
              <span className="hidden sm:inline">
                Cancel Selected ({selectedCount})
              </span>
              <span className="sm:hidden">
                Cancel ({selectedCount})
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}