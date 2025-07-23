"use client"

import { BarChart3, ChevronDown } from "lucide-react"
import { useState } from "react"

interface ChartPlaceholderProps {
  title: string
  selectedPeriod: string
  onPeriodChange: (period: string) => void
  periods: { value: string; label: string }[]
  placeholder?: string
}

export function ChartPlaceholder({
  title,
  selectedPeriod,
  onPeriodChange,
  periods,
  placeholder = "Chart will display here",
}: ChartPlaceholderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-row items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>{periods.find((p) => p.value === selectedPeriod)?.label}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          {isOpen && (
            <div className="absolute top-full mt-1 w-32 rounded-md border border-gray-200 bg-white shadow-lg z-50">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => {
                    onPeriodChange(period.value)
                    setIsOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">{placeholder}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
