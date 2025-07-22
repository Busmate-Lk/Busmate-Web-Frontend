import { Card, CardContent } from "@/components/admin/ui/card"
import { Users, Shield, Truck, Award, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Passengers",
    value: "1,002,384",
    change: "+8.2% from last month",
    changeType: "positive",
    icon: Users,
    color: "blue",
  },
  {
    title: "Conductors",
    value: "23,132",
    change: "+3.1% from last month",
    changeType: "positive",
    icon: Shield,
    color: "green",
  },
  {
    title: "Fleet Operators",
    value: "231",
    change: "-1.2% from last month",
    changeType: "negative",
    icon: Truck,
    color: "yellow",
  },
  {
    title: "MoT Officials",
    value: "1500",
    change: "No change",
    changeType: "neutral",
    icon: Award,
    color: "purple",
  },
  {
    title: "Time Keepers",
    value: "4600",
    change: "+2.0% from last month",
    changeType: "positive",
    icon: Clock,
    color: "teal",
  },
]

export function UserStats() {
  return (
    <div className="flex flex-row gap-4 mb-6 w-full">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className={`shadow-lg bg-gradient-to-br from-white to-gray-50 border-l-4 flex-1 p-0 ${stat.color === "blue"
            ? "border-l-blue-500"
            : stat.color === "green"
              ? "border-l-green-500"
              : stat.color === "yellow"
                ? "border-l-yellow-500"
                : stat.color === "purple"
                  ? "border-l-purple-500"
                  : "border-l-teal-500"
            }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p
                  className={`text-xs ${stat.changeType === "positive"
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
                className={`p-2 rounded-full ${stat.color === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : stat.color === "green"
                    ? "bg-green-100 text-green-600"
                    : stat.color === "yellow"
                      ? "bg-yellow-100 text-yellow-600"
                      : stat.color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-teal-100 text-teal-600"
                  }`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
