interface BusPhotoDisplayProps {
  photo?: string
  onViewFullSize?: () => void
  onChangePhoto?: () => void
}

export default function BusPhotoDisplay({ photo, onViewFullSize, onChangePhoto }: BusPhotoDisplayProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bus Photo</h3>
        <div className="relative">
          <img
            src={photo || "/placeholder.svg?height=300&width=400"}
            alt="Bus"
            className="w-full h-64 object-cover rounded-lg"
          />
          
          </div>
        </div>
      </div>
  )
}