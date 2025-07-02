"use client";

import { History } from "lucide-react";

interface VersionHistoryItem {
  version: string;
  date: string;
  author: string;
  changes: string;
  status: string;
}

interface VersionHistorySectionProps {
  versionHistory: VersionHistoryItem[];
}

export function VersionHistorySection({
  versionHistory,
}: VersionHistorySectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <History className="h-5 w-5" />
            Version History
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {versionHistory.map((version, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        version.status === "Current"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800 border"
                      }`}
                    >
                      {version.version}
                    </span>
                    <span className="font-medium">{version.date}</span>
                    <span className="text-sm text-gray-600">
                      by {version.author}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {version.status !== "Current" && (
                      <>
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          View
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          Restore
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{version.changes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
