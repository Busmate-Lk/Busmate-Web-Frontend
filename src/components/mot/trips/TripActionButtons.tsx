'use client';

import React from 'react';
import { Plus, Upload, Download, FileText, CheckSquare, RotateCcw, Play, Square } from 'lucide-react';

interface TripActionButtonsProps {
  onAddTrip: () => void;
  onGenerateTrips: () => void;
  onExportAll: () => void;
  onBulkOperations?: () => void;
  onBulkAssignPsp?: () => void;
  onBulkStart?: () => void;
  onBulkComplete?: () => void;
  onBulkCancel?: () => void;
  isLoading?: boolean;
  selectedCount?: number;
}

export function TripActionButtons({
  onAddTrip,
  onGenerateTrips,
  onExportAll,
  onBulkOperations,
  onBulkAssignPsp,
  onBulkStart,
  onBulkComplete,
  onBulkCancel,
  isLoading = false,
  selectedCount = 0
}: TripActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Primary Actions */}
      <div className="flex gap-3">
        <button
          onClick={onGenerateTrips}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Generate Trips</span>
          <span className="sm:hidden">Generate</span>
        </button>
        
        {/* <button
          onClick={onGenerateTrips}
          disabled={isLoading}
          className="flex items-center gap-2 border border-blue-600 text-blue-600 bg-white px-4 py-2 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Generate Trips</span>
          <span className="sm:hidden">Generate</span>
        </button> */}
      </div>

      {/* Secondary Actions */}
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

        {/* Bulk Operations - Only show when items are selected */}
        {selectedCount > 0 && (
          <>
            {/* General Bulk Actions */}
            {onBulkOperations && (
              <button
                onClick={onBulkOperations}
                disabled={isLoading}
                className="flex items-center gap-2 border border-orange-300 text-orange-700 bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Bulk Actions ({selectedCount})
                </span>
                <span className="sm:hidden">
                  Actions ({selectedCount})
                </span>
              </button>
            )}

            {/* Specific Bulk Actions */}
            <div className="flex gap-2">
              {/* Bulk Assign PSP */}
              {onBulkAssignPsp && (
                <button
                  onClick={onBulkAssignPsp}
                  disabled={isLoading}
                  className="flex items-center gap-2 border border-purple-300 text-purple-700 bg-purple-50 px-3 py-2 rounded-lg hover:bg-purple-100 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                  title="Bulk Assign PSP"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden lg:inline">Assign PSP</span>
                </button>
              )}

              {/* Bulk Start Trips */}
              {onBulkStart && (
                <button
                  onClick={onBulkStart}
                  disabled={isLoading}
                  className="flex items-center gap-2 border border-green-300 text-green-700 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                  title="Bulk Start Trips"
                >
                  <Play className="h-4 w-4" />
                  <span className="hidden lg:inline">Start</span>
                </button>
              )}

              {/* Bulk Complete Trips */}
              {onBulkComplete && (
                <button
                  onClick={onBulkComplete}
                  disabled={isLoading}
                  className="flex items-center gap-2 border border-emerald-300 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                  title="Bulk Complete Trips"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span className="hidden lg:inline">Complete</span>
                </button>
              )}

              {/* Bulk Cancel Trips */}
              {onBulkCancel && (
                <button
                  onClick={onBulkCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2 border border-red-300 text-red-700 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
                  title="Bulk Cancel Trips"
                >
                  <Square className="h-4 w-4" />
                  <span className="hidden lg:inline">Cancel</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}