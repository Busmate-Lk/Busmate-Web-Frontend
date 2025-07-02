import { PageHeader } from "@/components/admin/page-header"
import { SystemAnalytics } from "@/components/admin/system-analytics"

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="System Logs & Analytics"
        subtitle="Monitor system performance and generate reports"
        showSearch={true}
        showPerformanceIndicator={true}
        actions={
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">System Online</span>
          </div>
        }
      />
      <SystemAnalytics />
    </div>
  )
}
