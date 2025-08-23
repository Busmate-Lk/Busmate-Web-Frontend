"use client";

import { FileText, Upload } from "lucide-react";

interface FileManagementSectionProps {
  documentUrl: string;
  onDocumentUrlChange: (url: string) => void;
}

export function FileManagementSection({
  documentUrl,
  onDocumentUrlChange,
}: FileManagementSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Files */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Current Files
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">bus-guidelines-2024.pdf</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                  Primary
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Uploaded: Jan 15, 2024 • Size: 2.4 MB
              </p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  View
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  Download
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  Replace
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="documentUrl"
                className="text-sm font-medium text-gray-700"
              >
                Document URL
              </label>
              <input
                id="documentUrl"
                value={documentUrl}
                onChange={(e) => onDocumentUrlChange(e.target.value)}
                placeholder="https://example.com/document.pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Upload New File */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload New Version
            </h3>
          </div>
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Upload new file</p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 inline-flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
