import { Header } from "@/components/admin/shared"
import { BackupRecovery } from "@/components/admin/settings"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft, RefreshCw, Play } from "lucide-react"
import Link from "next/link"

export default function BackupRecoveryPage() {
  return (
    <div className="p-6">
      <Header title="Settings" />
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
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
        <h1 className="text-2xl font-bold">Backup & Recovery</h1>
        <p className="text-gray-600">Manage system backups and recovery options</p>
      </div>
      <BackupRecovery />
    </div>
  )
}
