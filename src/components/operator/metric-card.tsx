import type React from "react"
import { TrendingUp, AlertTriangle } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: string
    type: "positive" | "negative" | "neutral"
    label: string
  }
  icon: React.ReactNode
  iconBgColor?: string
  warning?: boolean
}

export function MetricCard({
  title,
  value,
  trend,
  icon,
  iconBgColor = "bg-blue-100",
  warning = false,
}: MetricCardProps) {
  const getTrendColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-500"
      case "negative":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-4 h-4 ${getTrendColor(trend.type)}`} />
                <span className={`text-sm ${getTrendColor(trend.type)}`}>
                  {trend.value} {trend.label}
                </span>
              </div>
            )}
          </div>
          <div className={`${warning ? "bg-red-100" : iconBgColor} p-3 rounded-lg`}>
            {warning ? <AlertTriangle className="w-6 h-6 text-red-600" /> : icon}
          </div>
        </div>
      </div>
    </div>
  )
}
