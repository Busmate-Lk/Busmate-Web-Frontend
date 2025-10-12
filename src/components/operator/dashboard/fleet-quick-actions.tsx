import { Card, CardContent, CardHeader, CardTitle } from "@/components/operator/ui/card"
import { Button } from "@/components/operator/ui/button"
import { Bus, Users, MapPin, Settings, Calendar, BarChart3, Plus, Wrench } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Add New Bus",
    description: "Register new vehicle",
    icon: Plus,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/operator/fleet-management/add",
  },
  {
    title: "Assign Driver",
    description: "Schedule driver shifts",
    icon: Users,
    color: "bg-green-500 hover:bg-green-600",
    href: "/operator/staffManagement/assign",
  },
  {
    title: "Track Fleet",
    description: "Live GPS tracking",
    icon: MapPin,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/operator/busTracking",
  },
  {
    title: "Schedule Routes",
    description: "Plan bus schedules",
    icon: Calendar,
    color: "bg-orange-500 hover:bg-orange-600",
    href: "/operator/scheduleManagement",
  },
  {
    title: "Fleet Reports",
    description: "Performance analytics",
    icon: BarChart3,
    color: "bg-indigo-500 hover:bg-indigo-600",
    href: "/operator/reports",
  },
  {
    title: "Maintenance",
    description: "Schedule service",
    icon: Wrench,
    color: "bg-red-500 hover:bg-red-600",
    href: "/operator/maintenance",
  },
]

export function FleetQuickActions() {
  return (
    <Card className="shadow-sm border-0 bg-white border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
        <p className="text-sm text-gray-600">Frequently used fleet management tasks</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-3 text-left hover:shadow-md transition-all duration-200 border-gray-200 hover:border-gray-300 w-full"
              >
                <div className={`p-2 rounded-lg ${action.color} transition-colors`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
