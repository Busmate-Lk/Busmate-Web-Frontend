import { Edit } from "lucide-react"

interface BusActionButtonsProps {
  onEdit: () => void
  onMarkMaintenance?: () => void
}

export default function BusActionButtons({ onEdit, onMarkMaintenance }: BusActionButtonsProps) {
  return (
    <div className="flex justify-end gap-3">
      
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