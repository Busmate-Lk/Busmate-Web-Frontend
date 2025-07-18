"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { MetricCard } from "@/components/operator/metric-card"
import { ChartPlaceholder } from "@/components/operator/chat-placeholder"
import { Bus, Users, DollarSign, Map } from "lucide-react"

export default function Dashboard() {
  const [revenuePeriod, setRevenuePeriod] = useState("last7days")
  const [ridershipPeriod, setRidershipPeriod] = useState("thisweek")

  const revenuePeriods = [
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "last90days", label: "Last 90 days" },
  ]

  const ridershipPeriods = [
    { value: "thisweek", label: "This week" },
    { value: "lastweek", label: "Last week" },
    { value: "thismonth", label: "This month" },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="dashboard" /> */}

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            <MetricCard
              title="Total Active Buses"
              value={142}
              trend={{
                value: "+5.2%",
                type: "positive",
                label: "from yesterday",
              }}
              icon={<Bus className="w-6 h-6 text-blue-600" />}
              iconBgColor="bg-blue-100"
            />

            <MetricCard
              title="Staff on Duty"
              value={89}
              trend={{
                value: "All shifts covered",
                type: "positive",
                label: "",
              }}
              icon={<Users className="w-6 h-6 text-green-600" />}
              iconBgColor="bg-green-100"
            />

            <MetricCard
              title="Ticket Revenue"
              value="$24,580"
              trend={{
                value: "+12.3%",
                type: "positive",
                label: "this week",
              }}
              icon={<DollarSign className="w-6 h-6 text-blue-600" />}
              iconBgColor="bg-blue-100"
            />

            <MetricCard
              title="Passenger Count"
              value={7}
              icon={<Bus className="w-6 h-6 text-red-600" />}
              warning={true}
            />
            <MetricCard
              title="Active Routes"
              value={23}
              trend={{
                value: "+2",
                type: "positive",
                label: "since last month",
              }}
              icon={<Map className="w-6 h-6 text-purple-600" />}
              iconBgColor="bg-purple-100"/>


          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600">
            <ChartPlaceholder
              title="Revenue Trends"
              selectedPeriod={revenuePeriod}
              onPeriodChange={setRevenuePeriod}
              periods={revenuePeriods}
              placeholder="Revenue chart will display here"
            />

            <ChartPlaceholder
              title="Ridership Trends"
              selectedPeriod={ridershipPeriod}
              onPeriodChange={setRidershipPeriod}
              periods={ridershipPeriods}
              placeholder="Ridership chart will display here"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
