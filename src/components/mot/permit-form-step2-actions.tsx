"use client";

interface PermitFormStep2ActionsProps {
  isEdit: boolean;
  permitId?: string | null;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export function PermitFormStep2Actions({
  isEdit,
  permitId,
  onPrevious,
  onCancel,
  onSubmit,
}: PermitFormStep2ActionsProps) {
  return (
    <div className="flex justify-between pt-6">
      <button
        className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        onClick={onPrevious}
      >
        Previous Page
      </button>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onSubmit}
        >
          {isEdit ? "Update Permit" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
