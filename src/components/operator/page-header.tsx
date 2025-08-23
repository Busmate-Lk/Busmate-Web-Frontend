"use client"

import { Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  actionButton?: {
    label: string
    onClick: () => void
  }
}

export function PageHeader({ title, subtitle, actionButton }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {actionButton && (
        <button
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={actionButton.onClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionButton.label}
        </button>
      )}
    </div>
  )
}
