import { Plus, FileText } from "lucide-react"

interface FareHeaderProps {
  onAddFare: () => void
  onViewChart: () => void
}

export default function FareHeader({ onAddFare, onViewChart }: FareHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onViewChart}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          View Fare Chart
        </button>
        <button 
          onClick={onAddFare}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Fare
        </button>
      </div>
    </div>
  )
}