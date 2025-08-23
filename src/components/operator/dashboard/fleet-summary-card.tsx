import { Card, CardContent, CardHeader, CardTitle } from "@/components/operator/ui/card"
import { Badge } from "@/components/operator/ui/badge"
import { Bus, AlertCircle, CheckCircle, Clock } from "lucide-react"

const fleetSummary = {
  totalBuses: 24,
  activeBuses: 21,
  maintenanceBuses: 2,
  offlineBuses: 1,
  routes: [
    { name: "Colombo - Kandy", buses: 6, status: "active" },
    { name: "Colombo - Galle", buses: 4, status: "active" },
    { name: "Kandy - Matale", buses: 3, status: "active" },
    { name: "Galle - Matara", buses: 2, status: "maintenance" },
  ]
}

export function FleetSummaryCard() {
  return (
    <Card className="shadow-sm border-l-4 border-l-indigo-500">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Fleet Overview</CardTitle>
        <p className="text-sm text-gray-600">Current fleet status and route assignments</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fleet Status */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Bus className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{fleetSummary.totalBuses}</p>
            <p className="text-xs text-gray-600">Total Buses</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{fleetSummary.activeBuses}</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{fleetSummary.maintenanceBuses}</p>
            <p className="text-xs text-gray-600">Maintenance</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{fleetSummary.offlineBuses}</p>
            <p className="text-xs text-gray-600">Offline</p>
          </div>
        </div>

        {/* Route Status */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Active Routes</h3>
          <div className="space-y-2">
            {fleetSummary.routes.map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{route.name}</p>
                  <p className="text-sm text-gray-600">{route.buses} buses assigned</p>
                </div>
                <Badge 
                  className={
                    route.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {route.status === "active" ? "Operational" : "Maintenance"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
