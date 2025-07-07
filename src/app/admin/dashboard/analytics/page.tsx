import { Header } from "@/components/admin/shared"
import { SystemAnalytics } from "@/components/admin/analytics"

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <Header title="System Logs & Analytics" />
      <SystemAnalytics />
    </div>
  )
}
