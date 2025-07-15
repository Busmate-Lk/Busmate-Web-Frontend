import { FileText, Download } from "lucide-react"

interface DocumentItem {
  name: string
  size: string
  type: "pdf" | "image" | "other"
  iconColor: string
}

interface BusDocumentsProps {
  documents?: DocumentItem[]
  onViewDocument?: (document: DocumentItem) => void
  onDownloadDocument?: (document: DocumentItem) => void
}

export default function BusDocuments({ documents, onViewDocument, onDownloadDocument }: BusDocumentsProps) {
  const defaultDocuments: DocumentItem[] = [
    {
      name: "Insurance Certificate",
      size: "2.4 MB",
      type: "pdf",
      iconColor: "text-red-600"
    },
    {
      name: "Inspection Report", 
      size: "1.8 MB",
      type: "pdf",
      iconColor: "text-blue-600"
    }
  ]

  const documentList = documents || defaultDocuments

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>

        <div className="space-y-3">
          {documentList.map((document, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${document.iconColor}`} />
                <div>
                  <p className="font-medium">{document.name}</p>
                  <p className="text-sm text-gray-500">{document.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onViewDocument?.(document)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                >
                  View
                </button>
                <button 
                  onClick={() => onDownloadDocument?.(document)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}