"use client"

import { useState } from "react"
import { Grid3X3 } from "lucide-react"

interface Seat {
  number: number
  status: "available" | "booked" | "notInUse"
  position: { row: number; column: number }
}

interface BusSeatingMapProps {
  showAllSeats: boolean
  onToggleShowAll: (show: boolean) => void
}

export function BusSeatingMap({ showAllSeats, onToggleShowAll }: BusSeatingMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null)

  // Define seat layout (48 seats total)
  const seats: Seat[] = [
    // Front section (seats 1-20)
    { number: 1, status: "available", position: { row: 1, column: 1 } },
    { number: 2, status: "booked", position: { row: 1, column: 2 } },
    { number: 3, status: "available", position: { row: 1, column: 4 } },
    { number: 4, status: "available", position: { row: 1, column: 5 } },
    { number: 5, status: "booked", position: { row: 2, column: 1 } },
    { number: 6, status: "available", position: { row: 2, column: 2 } },
    { number: 7, status: "available", position: { row: 2, column: 4 } },
    { number: 8, status: "booked", position: { row: 2, column: 5 } },
    { number: 9, status: "available", position: { row: 3, column: 1 } },
    { number: 10, status: "available", position: { row: 3, column: 2 } },
    { number: 11, status: "available", position: { row: 3, column: 4 } },
    { number: 12, status: "available", position: { row: 3, column: 5 } },
    { number: 13, status: "booked", position: { row: 4, column: 1 } },
    { number: 14, status: "available", position: { row: 4, column: 2 } },
    { number: 15, status: "available", position: { row: 4, column: 4 } },
    { number: 16, status: "available", position: { row: 4, column: 5 } },
    { number: 17, status: "available", position: { row: 5, column: 1 } },
    { number: 18, status: "available", position: { row: 5, column: 2 } },
    { number: 19, status: "available", position: { row: 5, column: 4 } },
    { number: 20, status: "booked", position: { row: 5, column: 5 } },

    { number: 7, status: "available", position: { row: 2, column: 4 } },
    { number: 8, status: "booked", position: { row: 2, column: 5 } },
    { number: 9, status: "available", position: { row: 3, column: 1 } },
    { number: 10, status: "available", position: { row: 3, column: 2 } },
    { number: 11, status: "available", position: { row: 3, column: 4 } },
    { number: 12, status: "available", position: { row: 3, column: 5 } },
    { number: 13, status: "booked", position: { row: 4, column: 1 } },
    { number: 14, status: "available", position: { row: 4, column: 2 } },
    { number: 15, status: "available", position: { row: 4, column: 4 } },
    { number: 16, status: "available", position: { row: 4, column: 5 } },
    { number: 17, status: "available", position: { row: 5, column: 1 } },
    { number: 18, status: "available", position: { row: 5, column: 2 } },
    { number: 19, status: "available", position: { row: 5, column: 4 } },
    { number: 20, status: "booked", position: { row: 5, column: 5 } },
    // Back section (seats 47-48)
    { number: 47, status: "available", position: { row: 7, column: 1 } },
    { number: 48, status: "available", position: { row: 7, column: 2 } },
  ]

  const getSeatColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600 text-white"
      case "booked":
        return "bg-red-500 text-white"
      case "notInUse":
        return "bg-gray-400 text-gray-600"
      default:
        return "bg-gray-200"
    }
  }

  const seatCounts = {
    available: seats.filter((seat) => seat.status === "available").length,
    booked: seats.filter((seat) => seat.status === "booked").length,
    notInUse: seats.filter((seat) => seat.status === "notInUse").length,
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Bus Seating Arrangement</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show All Seats</span>
            <button
              onClick={() => onToggleShowAll(!showAllSeats)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showAllSeats ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showAllSeats ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-gray-600">Front of Bus</span>
          </div>

          {/* Driver Area */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="space-y-4">
            {/* Main seating area */}
            <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="contents">
                  {[1, 2, 3, 4, 5].map((col) => {
                    if (col === 3) {
                      return (
                        <div key={`${row}-${col}`} className="flex items-center justify-center">
                          {row === 3 && <span className="text-xs text-gray-500 font-medium">AISLE</span>}
                        </div>
                      )
                    }

                    const seatNumber =
                      row === 1 ? col : row === 2 ? col + 4 : row === 3 ? col + 6 : row === 4 ? col + 10 : col + 14
                    const adjustedSeatNumber = col > 3 ? seatNumber - 1 : seatNumber
                    const seat = seats.find((s) => s.number === adjustedSeatNumber)

                    if (!seat) return <div key={`${row}-${col}`} className="w-10 h-10"></div>

                    return (
                      <button
                        key={`${row}-${col}`}
                        onClick={() => setSelectedSeat(seat.number)}
                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-colors ${getSeatColor(seat.status)} ${
                          selectedSeat === seat.number ? "ring-2 ring-blue-500" : ""
                        }`}
                        disabled={seat.status === "booked" || seat.status === "notInUse"}
                      >
                        {seat.number}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Additional seats indicator */}
            <div className="text-center py-2">
              <span className="text-xs text-gray-400">... Additional 28 seats ...</span>
            </div>

            {/* Back seats */}
            <div className="flex justify-center gap-2">
              <button
                className={`w-10 h-10 rounded-lg text-xs font-bold transition-colors ${getSeatColor("available")}`}
                onClick={() => setSelectedSeat(47)}
              >
                47
              </button>
              <button
                className={`w-10 h-10 rounded-lg text-xs font-bold transition-colors ${getSeatColor("available")}`}
                onClick={() => setSelectedSeat(48)}
              >
                48
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          <div className="text-center mt-6">
            <span className="text-sm font-medium text-gray-600">Back of Bus</span>
          </div>
        </div>

        {/* Seat Status Legend */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Seat Status Legend</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Available ({seatCounts.available + 26})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700">Booked ({seatCounts.booked + 10})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-700">Not in Use ({seatCounts.notInUse})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
