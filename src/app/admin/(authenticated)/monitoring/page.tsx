import { redirect } from 'next/navigation'

export default function MonitoringPage() {
    redirect('/admin/monitoring/api-health')
}
