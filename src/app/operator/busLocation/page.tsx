"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { BusTrackingMap } from "@/components/operator/bus-tracking-map"
import { BusTrackingPanel } from "@/components/operator/bus-tracking-panel"
import { BusTrackingSidebar } from "@/components/operator/bus-tracking-sidebar"

export default function BusTracking() {
  const [lastUpdated, setLastUpdated] = useState("12:45:32 PM")
  const [selectedBus, setSelectedBus] = useState<string | null>(null)

  // Update timestamp every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setLastUpdated(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="tracking" /> */}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🚌</span>
                </div>
              </div>
              <h1 className="text-xl font-semibold">Live Bus Tracking System</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Last Updated: {lastUpdated}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Sidebar - Bus List */}
          <BusTrackingSidebar selectedBus={selectedBus} onSelectBus={setSelectedBus} />

          {/* Map Area */}
          <div className="flex-1 relative">
            <BusTrackingMap selectedBus={selectedBus} />
          </div>

          {/* Right Panel - Bus Details */}
          <BusTrackingPanel selectedBus={selectedBus} />
        </div>
      </div>
    </div>
  )
}
