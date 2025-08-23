"use client";

interface FormData {
  title: string;
  type: string;
  description: string;
  author: string;
  version: string;
  status: string;
  priority: string;
  effectiveDate: string;
  expiryDate: string;
  tags: string;
}

interface DocumentDetailsFormProps {
  formData: FormData;
  onFormChange: (updates: Partial<FormData>) => void;
}

export function DocumentDetailsForm({
  formData,
  onFormChange,
}: DocumentDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Document Title *
              </label>
              <input
                id="title"
                value={formData.title}
                onChange={(e) => onFormChange({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Document Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => onFormChange({ type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="operational">Operational Guidelines</option>
                <option value="safety">Safety Standards</option>
                <option value="licensing">Licensing Requirements</option>
                <option value="environmental">Environmental Compliance</option>
                <option value="financial">Financial Policy</option>
                <option value="regulatory">Regulatory Framework</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => onFormChange({ description: e.target.value })}
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="author"
                className="text-sm font-medium text-gray-700"
              >
                Author/Department
              </label>
              <input
                id="author"
                value={formData.author}
                onChange={(e) => onFormChange({ author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Version & Status */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Version & Status
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="version"
                className="text-sm font-medium text-gray-700"
              >
                Version
              </label>
              <input
                id="version"
                value={formData.version}
                onChange={(e) => onFormChange({ version: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => onFormChange({ status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="draft">Draft</option>
                <option value="under-review">Under Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700"
              >
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => onFormChange({ priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="effectiveDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Effective Date
                </label>
                <input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) =>
                    onFormChange({ effectiveDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="expiryDate"
                  className="text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => onFormChange({ expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="text-sm font-medium text-gray-700"
              >
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                value={formData.tags}
                onChange={(e) => onFormChange({ tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
