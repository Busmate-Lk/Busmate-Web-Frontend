import { Header } from "@/components/admin/shared"
import { SystemSettings } from "@/components/admin/settings"
import { Button } from "@/components/admin/ui/button"
import { Download } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <Header title="System Settings" />
      <SystemSettings />
    </div>
  )
}
