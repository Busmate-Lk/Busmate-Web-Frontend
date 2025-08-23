"use client";

interface DocumentActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export function DocumentActionButtons({
  onCancel,
  onSubmit,
}: DocumentActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3 pt-6">
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors">
        Save as Draft
      </button>
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors"
        onClick={onSubmit}
      >
        Upload & Publish
      </button>
    </div>
  );
}
