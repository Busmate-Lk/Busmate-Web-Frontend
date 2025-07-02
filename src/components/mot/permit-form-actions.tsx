"use client";

interface PermitFormActionsProps {
  isEdit: boolean;
  permitId?: string | null;
  onCancel: () => void;
  onNext: () => void;
}

export function PermitFormActions({
  isEdit,
  permitId,
  onCancel,
  onNext,
}: PermitFormActionsProps) {
  return (
    <div className="flex justify-between pt-6">
      <div></div>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onNext}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
