"use client";

interface DocumentMetadataFormProps {
  priority: string;
  onPriorityChange: (value: string) => void;
}

export function DocumentMetadataForm({
  priority,
  onPriorityChange,
}: DocumentMetadataFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Additional Metadata
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="effectiveDate"
              className="block text-sm font-medium text-gray-700"
            >
              Effective Date
            </label>
            <input
              id="effectiveDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date (Optional)
            </label>
            <input
              id="expiryDate"
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            placeholder="transport, safety, guidelines, 2024"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority Level
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
