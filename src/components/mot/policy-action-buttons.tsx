import { Archive, Trash2 } from "lucide-react";

interface PolicyActionButtonsProps {
  onArchive: () => void;
  onDelete: () => void;
}

export function PolicyActionButtons({
  onArchive,
  onDelete,
}: PolicyActionButtonsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Policy Actions
      </h3>
      <div className="space-y-3">
        <button
          onClick={onArchive}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <Archive className="h-4 w-4" />
          Archive Policy
        </button>
        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 outline-none transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          Delete Policy
        </button>
      </div>
    </div>
  );
}
