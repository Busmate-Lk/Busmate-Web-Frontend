"use client";

import { Save } from "lucide-react";

interface EditPolicyActionsProps {
  onCancel: () => void;
  onSaveAsDraft: () => void;
  onSaveAndPublish: () => void;
}

export function EditPolicyActions({
  onCancel,
  onSaveAsDraft,
  onSaveAndPublish,
}: EditPolicyActionsProps) {
  return (
    <div className="flex justify-between pt-6 border-t">
      <button
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={onCancel}
      >
        Cancel Changes
      </button>
      <div className="flex gap-3">
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={onSaveAsDraft}
        >
          Save as Draft
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
          onClick={onSaveAndPublish}
        >
          <Save className="mr-2 h-4 w-4" />
          Save & Publish
        </button>
      </div>
    </div>
  );
}
