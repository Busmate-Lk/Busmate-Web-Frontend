"use client";

interface ContentEditorFormProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function ContentEditorForm({
  content,
  onContentChange,
}: ContentEditorFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold text-gray-900">
            Policy Content
          </h3>
          <p className="text-sm text-gray-600">
            Edit the policy document content using Markdown format
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Supports:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                Markdown
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                Headers
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                Lists
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                Links
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full min-h-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Enter policy content using Markdown format..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
