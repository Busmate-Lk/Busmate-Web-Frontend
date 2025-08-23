import { Card, CardContent, CardHeader, CardTitle } from "@/components/operator/ui/card"
import { Button } from "@/components/operator/ui/button"

const activities = [
  {
    type: "bus",
    message: "Bus LA-1234 completed Colombo-Kandy route",
    location: "Route 001",
    time: "2 minutes ago",
    color: "green",
  },
  {
    type: "driver",
    message: "Driver Kamal Silva started shift",
    location: "Bus LA-5678",
    time: "5 minutes ago",
    color: "blue",
  },
  {
    type: "maintenance",
    message: "Bus LA-9012 scheduled for service",
    location: "Workshop A",
    time: "8 minutes ago",
    color: "yellow",
  },
  {
    type: "alert",
    message: "Low fuel alert: Bus LA-3456",
    location: "Near Galle",
    time: "12 minutes ago",
    color: "red",
  },
  {
    type: "route",
    message: "New route added: Colombo-Matara",
    location: "Route 025",
    time: "15 minutes ago",
    color: "purple",
  },
  {
    type: "revenue",
    message: "Daily revenue target achieved",
    location: "Fleet Total",
    time: "20 minutes ago",
    color: "green",
  },
  {
    type: "staff",
    message: "New driver completed training",
    location: "Training Center",
    time: "25 minutes ago",
    color: "blue",
  },
]

export function FleetActivityFeed() {
  return (
    <Card className="border-l-4 border-l-green-500 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">Live Fleet Activity</CardTitle>
          <p className="text-sm text-gray-600">Real-time updates from your fleet operations</p>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.color === "green"
                    ? "bg-green-500"
                    : activity.color === "blue"
                      ? "bg-blue-500"
                      : activity.color === "yellow"
                        ? "bg-yellow-500"
                        : activity.color === "red"
                          ? "bg-red-500"
                          : "bg-purple-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">
                  {activity.location} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
