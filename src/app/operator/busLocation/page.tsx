"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { BusTrackingMap } from "@/components/operator/bus-tracking-map"
import { BusTrackingPanel } from "@/components/operator/bus-tracking-panel"
import { BusTrackingSidebar } from "@/components/operator/bus-tracking-sidebar"
import GoogleMapComponent from "@/components/shared/googleMap"

export default function BusTracking() {
  return (
    <div className="w-screen h-screen min-h-0 min-w-0 overflow-hidden">
      <GoogleMapComponent />
    </div>
  )
}
