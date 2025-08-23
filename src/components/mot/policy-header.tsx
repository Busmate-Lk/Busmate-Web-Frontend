import { Calendar, User, Printer, Share, Download, Edit } from "lucide-react";

interface PolicyData {
  id: string;
  title: string;
  type: string;
  version: string;
  status: string;
  publishedDate: string;
  author: string;
}

interface PolicyHeaderProps {
  policy: PolicyData;
  onEdit: () => void;
  onPrint: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export function PolicyHeader({
  policy,
  onEdit,
  onPrint,
  onShare,
  onDownload,
}: PolicyHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "under review":
        return "bg-blue-100 text-blue-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {policy.title}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Published: {policy.publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>By: {policy.author}</span>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              policy.status
            )}`}
          >
            {policy.status}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
            {policy.version}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <Share className="h-4 w-4" />
          Share
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );
}
