import { PageHeader } from "@/components/admin/page-header"
import { BackupRecovery } from "@/components/admin/backup-recovery"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft, RefreshCw, Play } from "lucide-react"
import Link from "next/link"

export default function BackupRecoveryPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="Backup & Recovery"
        subtitle="Manage system backups and recovery options"
        showSearch={false}
        showPerformanceIndicator={false}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/dashboard/settings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Link>
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4 mr-2" />
              Start Backup
            </Button>
          </div>
        }
      />
      <BackupRecovery />
    </div>
  )
}
