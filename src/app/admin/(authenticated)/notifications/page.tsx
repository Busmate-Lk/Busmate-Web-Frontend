import { redirect } from 'next/navigation'

export default function NotificationsPage() {
  redirect('/admin/notifications/sent')
}
