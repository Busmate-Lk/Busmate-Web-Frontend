import { Edit } from "lucide-react"

interface BusActionButtonsProps {
  onEdit: () => void
  onMarkMaintenance?: () => void
}

export default function BusActionButtons({ onEdit, onMarkMaintenance }: BusActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3">
      <button 
        onClick={onMarkMaintenance}
        className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
        type="button"
      >
        Mark for Maintenance
      </button>
      <button 
        onClick={onEdit}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
        type="button"
      >
        <Edit className="w-4 h-4" />
        Edit Info
      </button>
    </div>
  )
}