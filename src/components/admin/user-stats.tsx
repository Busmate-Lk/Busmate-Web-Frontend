import { Card, CardContent } from "@/components/admin/ui/card"
import { Users, Shield, Truck, Award } from "lucide-react"

const stats = [
  {
    title: "Total Passengers",
    value: "12,847",
    change: "+8.2% from last month",
    changeType: "positive",
    icon: Users,
    color: "blue",
  },
  {
    title: "Conductors",
    value: "342",
    change: "+3.1% from last month",
    changeType: "positive",
    icon: Shield,
    color: "green",
  },
  {
    title: "Fleet Operators",
    value: "89",
    change: "-1.2% from last month",
    changeType: "negative",
    icon: Truck,
    color: "yellow",
  },
  {
    title: "MoT Officials",
    value: "24",
    change: "No change",
    changeType: "neutral",
    icon: Award,
    color: "purple",
  },
]

export function UserStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={`border-l-4 ${stat.color === "blue"
          ? "border-l-blue-500"
          : stat.color === "green"
            ? "border-l-green-500"
            : stat.color === "yellow"
              ? "border-l-yellow-500"
              : "border-l-purple-500"
          }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                    }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${stat.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : stat.color === "green"
                    ? "bg-green-100 text-green-600"
                    : stat.color === "yellow"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
