import { Card, CardContent } from "@/components/operator/ui/card"
import { Users, AlertTriangle, Bus, TrendingUp, MapPin, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Active Buses",
    value: "24",
    change: "+2 new",
    changeType: "positive",
    icon: Bus,
    color: "blue",
  },
  {
    title: "Active Conductors",
    value: "42",
    change: "On duty",
    changeType: "positive",
    icon: Users,
    color: "green",
  },
  {
    title: "Maintenance Due",
    value: "3",
    change: "This week",
    changeType: "warning",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    title: "Active Drivers",
    value: "48",
    change: "All shifts covered",
    changeType: "positive",
    icon: Users,
    color: "purple",
  },
  {
    title: "Daily Revenue",
    value: "Rs 124,320.00",
    change: "+12.3%",
    changeType: "positive",
    icon: DollarSign,
    color: "green",
  }
//   {
//     title: "Routes Covered",
//     value: "12",
//     change: "Operational",
//     changeType: "neutral",
//     icon: MapPin,
//     color: "blue",
//   },
]

export function FleetStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p
                  className={`text-xs sm:text-sm mt-1 ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "warning"
                        ? "text-yellow-600"
                        : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`p-2 sm:p-3 rounded-full shadow-sm flex-shrink-0 ml-3 ${
                  stat.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : stat.color === "green"
                      ? "bg-green-100 text-green-600"
                      : stat.color === "yellow"
                        ? "bg-yellow-100 text-yellow-600"
                        : stat.color === "purple"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                }`}
              >
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
