"use client"

import { BarChart3, Map } from "lucide-react"

interface RoutePreviewProps {
  stops: string[]
}

export function RoutePreview({ stops }: RoutePreviewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Route Preview</h2>
        </div>

        {/* Map Preview */}
        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Map Preview</p>
              <p className="text-xs text-gray-400">Route will appear here</p>
            </div>
          </div>
        </div>

        {/* Route Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Route Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Distance:</span>
              <span className="text-sm font-medium text-gray-900">--</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Estimated Duration:</span>
              <span className="text-sm font-medium text-gray-900">--</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Stops:</span>
              <span className="text-sm font-medium text-gray-900">{stops.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
