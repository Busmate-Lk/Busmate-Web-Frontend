"use client";

interface RouteFormActionsProps {
  isEdit?: boolean;
  routeId?: string | null;
  isValid: boolean;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndAddAnother?: () => void;
}

export function RouteFormActions({
  isEdit = false,
  routeId,
  isValid,
  onCancel,
  onSave,
  onSaveAndAddAnother,
}: RouteFormActionsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>

          {/* Save and Add Another Button (only for new routes) */}
          {!isEdit && onSaveAndAddAnother && (
            <button
              type="button"
              onClick={onSaveAndAddAnother}
              disabled={!isValid}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Save & Add Another
            </button>
          )}

          {/* Save/Update Button */}
          <button
            type="button"
            onClick={onSave}
            disabled={!isValid}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {isEdit ? "Update Route" : "Save Route"}
          </button>
        </div>

        {/* Validation Message */}
        {!isValid && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  Please fill in all required fields to {isEdit ? "update" : "save"} the route.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
