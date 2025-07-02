import { PageHeader } from "@/components/admin/page-header"
import { SystemSettings } from "@/components/admin/system-settings"
import { Button } from "@/components/admin/ui/button"
import { Download } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <PageHeader
        title="System Settings"
        subtitle="Configure system-wide settings and preferences"
        showSearch={true}
        showPerformanceIndicator={false}
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        }
      />
      <SystemSettings />
    </div>
  )
}
