"use client";

interface DocumentInformationFormProps {
  documentType: string;
  onDocumentTypeChange: (value: string) => void;
}

export function DocumentInformationForm({
  documentType,
  onDocumentTypeChange,
}: DocumentInformationFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Document Information
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="documentTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Document Title *
          </label>
          <input
            id="documentTitle"
            type="text"
            placeholder="Enter document title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="documentType"
            className="block text-sm font-medium text-gray-700"
          >
            Document Type *
          </label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            <option value="">Select document type</option>
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
            htmlFor="documentDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Document Description
          </label>
          <textarea
            id="documentDescription"
            placeholder="Provide a brief description of the policy document..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="documentUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Document URL (Optional)
          </label>
          <input
            id="documentUrl"
            type="url"
            placeholder="https://example.com/policy-document"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="version"
            className="block text-sm font-medium text-gray-700"
          >
            Version
          </label>
          <input
            id="version"
            type="text"
            placeholder="v1.0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author/Department
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author or department name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
