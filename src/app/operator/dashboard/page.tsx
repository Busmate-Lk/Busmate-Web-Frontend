"use client"

import { useState } from "react"
import { Header } from "@/components/operator/header"
import { 
  FleetStatsCards, 
  FleetPerformanceChart
} from "@/components/operator/dashboard"

export default function Dashboard() {
  const [revenuePeriod, setRevenuePeriod] = useState("today")
  const [performancePeriod, setPerformancePeriod] = useState("today")

  const revenuePeriods = [
    { value: "today", label: "Today" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "last90days", label: "Last 90 days" },
  ]

  const performancePeriods = [
    { value: "today", label: "Today" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "last90days", label: "Last 90 days" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        pageTitle="Dashboard" 
        pageDescription="Overview of your fleet operations and key performance metrics"
      />
      
      <div className="p-6 space-y-6">
        {/* Fleet Statistics Cards */}
        <FleetStatsCards />

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FleetPerformanceChart
            title="Revenue Analytics"
            selectedPeriod={revenuePeriod}
            onPeriodChange={setRevenuePeriod}
            periods={revenuePeriods}
            placeholder="Revenue trends and analytics will display here"
            chartType="line"
            metrics={{
              current: "Rs 124,320.00",
              change: "+12.3%",
              changeType: "positive"
            }}
          />

          <FleetPerformanceChart
            title="Daily Tickets Issued"
            selectedPeriod={performancePeriod}
            onPeriodChange={setPerformancePeriod}
            periods={performancePeriods}
            placeholder="Daily ticket sales data will display here"
            chartType="bar"
            metrics={{
              current: "467",
              change: "+8.3%",
              changeType: "positive"
            }}
          />
        </div>
      </div>
    </div>
  )
}
