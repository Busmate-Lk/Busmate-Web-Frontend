"use client"

import { useState } from "react"
import { Download, User } from "lucide-react"

interface AttendanceRecord {
  id: string
  name: string
  role: "Driver" | "Conductor"
  status: "Present" | "Absent"
  avatar: string
}

export function StaffAttendance() {
  const [selectedDate, setSelectedDate] = useState("2025-07-22")

  const attendanceData: AttendanceRecord[] = [
    {
      id: "1",
      name: "Kasun Perera",
      role: "Driver",
      status: "Present",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Nuwan Silva",
      role: "Conductor",
      status: "Present",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Chaminda Fernando",
      role: "Driver",
      status: "Present",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Roshan Jayawardena",
      role: "Conductor",
      status: "Absent",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "5",
      name: "Pradeep Kumara",
      role: "Driver",
      status: "Present",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "6",
      name: "Mahinda Rathnayake",
      role: "Conductor",
      status: "Present",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const handleExportCSV = () => {
    console.log("Export CSV for date:", selectedDate)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Staff Attendance</h3>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <Download className="w-4 h-4 mr-1" />
            Export CSV
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="space-y-3">
          {attendanceData.map((record) => (
            <div key={record.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  record.role === "Driver" ? "bg-green-100" : "bg-purple-100"
                }`}>
                  <User className={`w-4 h-4 ${record.role === "Driver" ? "text-green-600" : "text-purple-600"}`} />
                </div>
                <span className="font-medium text-gray-900">{record.name}</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  record.status === "Present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
