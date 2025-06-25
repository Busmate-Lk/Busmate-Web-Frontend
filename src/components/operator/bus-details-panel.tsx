"use client"

import { Hash, CreditCard, Users, Route, Triangle, User, UserCheck } from "lucide-react"

export function BusDetailsPanel() {
  const busDetails = {
    busId: "BUS-001",
    busNumber: "NB-7845",
    totalSeats: "48 Seats",
    route: "Colombo - Kandy",
    routeType: "Express",
    driver: "Sunil Perera",
    conductor: "Kamal Silva",
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Bus Details</h2>
        </div>

        <div className="space-y-6">
          {/* Bus Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Hash className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bus ID</p>
                <p className="font-semibold text-gray-900">{busDetails.busId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bus Number</p>
                <p className="font-semibold text-gray-900">{busDetails.busNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Seats</p>
                <p className="font-semibold text-gray-900">{busDetails.totalSeats}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Route className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-semibold text-gray-900">{busDetails.route}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Triangle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Route Type</p>
                <p className="font-semibold text-gray-900">{busDetails.routeType}</p>
              </div>
            </div>
          </div>

          {/* Assigned Staff */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Assigned Staff</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Driver</p>
                  <p className="font-medium text-gray-900">{busDetails.driver}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conductor</p>
                  <p className="font-medium text-gray-900">{busDetails.conductor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
