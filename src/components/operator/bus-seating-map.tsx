"use client"

import { User } from "lucide-react"
import { useState } from "react"

const seatLayout = [
  ["A1", "A2", "A3", "A4", "A5"],
  ["B1", "B2", "B3", "B4", "B5"],
  ["C1", "C2", "C3", "C4", "C5"],
  ["D1", "D2", "D3", "D4", "D5"],
  ["E1", "E2", "E3", "E4", "E5"],
  ["F1", "F2", "F3", "F4", "F5"],
  ["G1", "G2", "G3", "G4", "G5"],
  ["H1", "H2", "H3", "H4", "H5"],
  ["I1", "I2", "I3", "I4", "I5"],
  ["J1", "J2", "J3", "J4", "J5"],
  ["K1", "K2", "K3", "K4", "K5"],
]

// Example seat status map
const seatStatus: Record<string, "available" | "reserved" | "booked" | "notInUse"> = {
  A1: "available", A2: "reserved", A4: "available", A5: "notInUse", A3: "available",
  B1: "available", B2: "available", B3: "reserved", B4: "available", B5: "notInUse",
  C1: "booked",    C2: "available", C3: "available", C4: "reserved", C5: "available",
  D1: "available", D2: "notInUse", D3: "available", D4: "available", D5: "reserved",
  E1: "reserved", E2: "available", E3: "available", E4: "notInUse", E5: "available",
  F1: "available", F2: "available", F3: "reserved", F4: "available", F5: "available",
  G1: "available", G2: "available", G3: "reserved", G4: "reserved", G5: "available",
  H1: "available", H2: "available", H3: "available", H4: "available", H5: "available",
  I1: "reserved", I2: "available", I3: "available", I4: "available",  I5: "available",
  J1: "available", J2: "available", J3: "reserved", J4: "available", J5: "notInUse",
  K1: "available", K2: "available", K3: "available", K4: "reserved", K5: "available",
}

const seatColors: Record<string, string> = {
  available: "bg-green-500 text-white",
  reserved: "bg-yellow-400 text-white",
  booked: "bg-red-500 text-white",
  notInUse: "bg-gray-200 text-gray-400",
}

export function BusSeatingMap() {
  const [selected, setSelected] = useState<string | null>(null)

  // Count for legend
  const legendCount = {
    available: Object.values(seatStatus).filter((s) => s === "available").length,
    reserved: Object.values(seatStatus).filter((s) => s === "reserved").length,
    booked: Object.values(seatStatus).filter((s) => s === "booked").length,
    notInUse: Object.values(seatStatus).filter((s) => s === "notInUse").length,
  }

  return (
    <div className="flex flex-col items-center py-8">
      {/* Driver */}
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 text-white rounded shadow px-3 py-2 flex flex-col items-center">
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">Driver</span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-6 gap-3 mb-8">
        {seatLayout.map((row, rowIdx) =>
          row.flatMap((seat, colIdx) => {
            const elements = [];
            // After 2nd column, insert a spacer
            if (colIdx === 2) {
              elements.push(
                <div key={`spacer-${rowIdx}`} className="w-6 h-12" />
              );
            }
            if (seat) {
              elements.push(
                <button
                  key={seat}
                  className={`w-12 h-12 rounded-md font-bold text-sm flex items-center justify-center shadow transition-all border-2 border-white focus:outline-none ${seatColors[seatStatus[seat]]} ${selected === seat ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setSelected(seat)}
                  disabled={seatStatus[seat] === "notInUse"}
                  title={seat}
                >
                  {seat}
                </button>
              );
            } else {
              elements.push(
                <div key={`empty-${rowIdx}-${colIdx}`} className="w-12 h-12" />
              );
            }
            return elements;
          })
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-green-500" />
          <span className="text-sm">Available ({legendCount.available})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-yellow-400" />
          <span className="text-sm">Reserved ({legendCount.reserved})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-red-500" />
          <span className="text-sm">Booked ({legendCount.booked})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-200 border border-gray-300" />
          <span className="text-sm text-gray-500">Not in Use ({legendCount.notInUse})</span>
        </div>
      </div>
    </div>
  )
}
