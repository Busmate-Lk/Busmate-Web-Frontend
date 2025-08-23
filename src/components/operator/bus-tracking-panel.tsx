"use client"

interface BusTrackingPanelProps {
  selectedBus: string | null
}

export function BusTrackingPanel({ selectedBus }: BusTrackingPanelProps) {
  const trackingData = [
    { label: "Use drible", value: "16", color: "bg-blue-500" },
    { label: "Buy mays", value: "10500 m", color: "bg-cyan-500" },
    { label: "Kay dabs", value: "32.40 m", color: "bg-teal-500" },
    { label: "Feets tiess", value: "10.10 m", color: "bg-orange-500" },
  ]

  return (
    <div className="w-72 bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
        <h3 className="font-semibold">Bus Tracking</h3>
      </div>

      <div className="p-4 space-y-4">
        {trackingData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>

      {selectedBus && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Bus #{selectedBus} Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">On Time</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Speed:</span>
              <span className="font-medium">45 km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Passengers:</span>
              <span className="font-medium">28/50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Stop:</span>
              <span className="font-medium">Central Plaza</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
