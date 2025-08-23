import { FileText, Calendar } from "lucide-react";

interface PolicyData {
  id: string;
  type: string;
  lastModified: string;
  effectiveDate: string;
  tags: string[];
}

interface PolicySidebarProps {
  policy: PolicyData;
}

export function PolicySidebar({ policy }: PolicySidebarProps) {
  return (
    <div className="space-y-6">
      {/* Policy Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Policy Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Policy ID
            </label>
            <p className="text-sm text-gray-900 font-mono">{policy.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Type</label>
            <p className="text-sm text-gray-900">{policy.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Last Modified
            </label>
            <p className="text-sm text-gray-900">{policy.lastModified}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Effective Date
            </label>
            <p className="text-sm text-gray-900">{policy.effectiveDate}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {policy.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            View Version History
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Related Policies
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
