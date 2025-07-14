"use client";

import { AlertTriangle, X } from "lucide-react";

interface RouteDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
  isLoading?: boolean;
}

export function RouteDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isLoading = false,
}: RouteDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                Are you sure?
              </h4>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              You are about to permanently delete the route:{" "}
              <span className="font-medium text-gray-900">"{itemName}"</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This will also remove all associated schedules and assignments.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Deleting..." : "Delete Route"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
