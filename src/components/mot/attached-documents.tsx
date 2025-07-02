"use client";

import { FileText, Download, Eye } from "lucide-react";

interface Document {
  name: string;
  type: string;
}

interface AttachedDocumentsProps {
  documents: Document[];
}

export function AttachedDocuments({ documents }: AttachedDocumentsProps) {
  const handleView = (docName: string) => {
    alert(`Viewing ${docName}`);
  };

  const handleDownload = (docName: string) => {
    alert(`Downloading ${docName}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📎 Attached Documents
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    doc.type === "pdf" ? "bg-red-50" : "bg-blue-50"
                  }`}
                >
                  <FileText
                    className={`h-6 w-6 ${
                      doc.type === "pdf" ? "text-red-500" : "text-blue-500"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{doc.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => handleView(doc.name)}
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => handleDownload(doc.name)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
