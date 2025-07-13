import { Header } from "@/components/admin/shared"
import { SystemAnalytics } from "@/components/admin/analytics"

export default function AnalyticsPage() {
  return (
    <div className="p-0">
      <Header title="System Logs & Analytics" description="Analyze system performance, user behavior, and generate detailed reports" />
      <div className="p-6">
        <SystemAnalytics />
      </div>
    </div>
  )
}
