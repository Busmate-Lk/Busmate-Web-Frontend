import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card"
import { Button } from "@/components/admin/ui/button"
import { Radio, BarChart3, Users, MessageSquare, Settings, Plus } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Send Broadcast",
    description: "Send messages to users",
    icon: Radio,
    color: "bg-blue-500 hover:bg-blue-600",
    href: "/admin/dashboard/broadcast/compose",
  },
  {
    title: "Add MoT User",
    description: "Register new MoT admin",
    icon: Plus,
    color: "bg-green-500 hover:bg-green-600",
    href: "/admin/dashboard/users/add-mot",
  },
  {
    title: "View Analytics",
    description: "System performance data",
    icon: BarChart3,
    color: "bg-purple-500 hover:bg-purple-600",
    href: "/admin/dashboard/analytics",
  },
  {
    title: "Manage Users",
    description: "User accounts & profiles",
    icon: Users,
    color: "bg-orange-500 hover:bg-orange-600",
    href: "/admin/dashboard/users",
  },
  {
    title: "Message History",
    description: "View sent messages",
    icon: MessageSquare,
    color: "bg-indigo-500 hover:bg-indigo-600",
    href: "/admin/dashboard/broadcast/history",
  },
  {
    title: "System Settings",
    description: "Configure system",
    icon: Settings,
    color: "bg-gray-500 hover:bg-gray-600",
    href: "/admin/dashboard/settings",
  },
]

export function QuickActions() {
  return (
    <Card className="shadow-sm border-0 bg-white border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
        <p className="text-sm text-gray-600">Frequently used administrative tasks</p>
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
