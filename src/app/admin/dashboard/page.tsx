import { PageHeader } from "@/components/admin/page-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { QuickActions } from "@/components/admin/quick-actions"
import { ActivityFeed } from "@/components/admin/activity-feed"

export default function DashboardPage() {
  return (
    <div className="p-0">
      <PageHeader
        title="System Dashboard"
        subtitle="Welcome back, manage your bus transportation system"
        showSearch={true}
        showPerformanceIndicator={true}
      />

      <div className="p-6">
        <StatsCards />
        {/* User Growth Chart */}
        <div className="mt-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm borderborder-[hsl(214.3,31.8%,91.4%)] border-l-4 border-l-purple-500 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trends</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - User growth over time</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
