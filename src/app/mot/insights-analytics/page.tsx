"use client";

import { Download, DollarSign, Users, Bus, TrendingUp } from "lucide-react";
import { MOTLayout } from "@/components/mot/layout";
import { AnalyticsKeyMetrics } from "@/components/mot/analytics-key-metrics";
import { AnalyticsTabs } from "@/components/mot/analytics-tabs";
import { AnalyticsFilters } from "@/components/mot/analytics-filters";
import { useState } from "react";

export default function InsightsAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedOperator, setSelectedOperator] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [activeTab, setActiveTab] = useState("ridership");

  // Mock data for analytics
  const keyMetrics = [
    {
      title: "Total Fare Collected",
      value: "Rs. 2,847,500",
      change: "+8%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Average Fare per Trip",
      value: "Rs. 38.72",
      change: "+6%",
      trend: "up" as const,
      icon: Bus,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Revenue by SLTB",
      value: "Rs. 1,125,900",
      change: "+12%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Revenue by Private",
      value: "Rs. 1,721,600",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const downloadReport = () => {
    alert("Downloading Revenue Insights PDF...");
  };

  return (
    <MOTLayout
      activeItem="dataInsights"
      pageTitle="Insights & Analytics"
      pageDescription="Data insights and performance analytics for your fleet"
    >
      <div className="space-y-6">
        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Revenue Insights PDF
          </button>
        </div>

        <AnalyticsKeyMetrics metrics={keyMetrics} />

        {/* Analytics Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <AnalyticsFilters
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedOperator={selectedOperator}
              setSelectedOperator={setSelectedOperator}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
          </div>

          {/* Tab Content Placeholder */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab === "ridership"
                  ? "Ridership Analytics"
                  : activeTab === "revenue"
                  ? "Revenue & Fare Analytics"
                  : "Performance Metrics"}
              </h3>
              <p className="text-gray-600">
                Analytics content for {activeTab} would be displayed here with
                charts and detailed data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MOTLayout>
  );
}
