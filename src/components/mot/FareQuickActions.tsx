import { Plus, FileText, Calculator } from "lucide-react"

interface FareQuickActionsProps {
  onAddFare: () => void
}

export default function FareQuickActions({ onAddFare }: FareQuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        onClick={onAddFare}
        className="bg-white rounded-lg shadow border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="p-6 text-center">
          <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Add New Fare Structure</h3>
          <p className="text-sm text-gray-600">Create fare structures for new routes or services</p>
        </div>
      </div>

     
      
    </div>
  )
}