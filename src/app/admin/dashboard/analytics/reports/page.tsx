import { PageHeader } from "@/components/admin/page-header"
import { AnalyticsReports } from "@/components/admin/analytics-reports"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft, RefreshCw, Plus } from "lucide-react"
import Link from "next/link"

export default function AnalyticsReportsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Analytics & Reports"
        subtitle="Generate and manage system analytics reports"
        showSearch={true}
        showPerformanceIndicator={false}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard/analytics">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Monitoring
              </Link>
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        }
      />
      <AnalyticsReports />
    </div>
  )
}
