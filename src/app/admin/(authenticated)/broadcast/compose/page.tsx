import { Header, NavigationBreadcrumb } from "@/components/admin/shared"
import { ComposeMessage } from "@/components/admin/broadcast"
import { Button } from "@/components/admin/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComposeMessagePage() {

  return (
    <div className="p-6">
      <Header title="Compose Message" />
      <ComposeMessage />
    </div>
  )
}
