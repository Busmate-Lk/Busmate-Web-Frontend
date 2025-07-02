"use client";

import { ArrowLeft, Eye } from "lucide-react";

interface EditPolicyHeaderProps {
  policyId: string;
  version: string;
  onBack: () => void;
  onPreview: () => void;
}

export function EditPolicyHeader({
  policyId,
  version,
  onBack,
  onPreview,
}: EditPolicyHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Policy Management
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Policy Document
          </h2>
          <p className="text-gray-600">Update policy information and content</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
              ID: {policyId}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Current Version: {version}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 inline-flex items-center"
            onClick={onPreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
