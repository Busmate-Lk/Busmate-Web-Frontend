"use client";

import { Download, DollarSign, Users, Bus, TrendingUp } from "lucide-react";
import { AnalyticsKeyMetrics } from "@/components/mot/analytics-key-metrics";
import { AnalyticsTabs } from "@/components/mot/analytics-tabs";
import { AnalyticsFilters } from "@/components/mot/analytics-filters";
import { useState, useEffect } from "react";
import { Layout } from "@/components/shared/layout";
import { PassengerInformation } from "@/components/mot/passenger-information";
import { BusDetails } from "@/components/mot/bus-details";
import { JourneyDetails } from "@/components/mot/journey-details";
import { TicketInformation } from "@/components/mot/ticket-information";
import { DriverOperationalInsights } from "@/components/mot/driver-conductor-insights";
import { RevenueInsights } from "@/components/mot/revenue-insights";

export default function InsightsAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedOperator, setSelectedOperator] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [activeTab, setActiveTab] = useState("passenger");
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Key metrics for the dashboard
  const keyMetrics = [
    {
      title: "Total Passengers",
      value: "8,180",
      change: "+5%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Buses",
      value: "68",
      change: "+3%",
      trend: "up" as const,
      icon: Bus,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Tickets Sold",
      value: "9,230",
      change: "+12%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Revenue Generated",
      value: "Rs. 2,847,500",
      change: "+8%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Fetch analytics data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/analytics-data.json');
        const data = await response.json();
        setAnalyticsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadReport = () => {
    alert("Downloading Analytics Report PDF...");
  };

  return (
    <Layout
      activeItem="dataInsights"
      pageTitle="Insights & Analytics"
      pageDescription="Comprehensive data insights and performance analytics for your transport system"
      role="mot"
    >
      <div className="space-y-6">

        {/* <AnalyticsKeyMetrics metrics={keyMetrics} /> */}

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Analytics Report PDF
          </button>
        </div>

        {/* Analytics Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* <AnalyticsFilters
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedOperator={selectedOperator}
              setSelectedOperator={setSelectedOperator}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            /> */}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">Loading analytics data...</p>
            </div>
          )}

          {/* Tab Content */}
          {!loading && analyticsData && (
            <>
              {activeTab === "passenger" && <PassengerInformation data={analyticsData} />}
              {activeTab === "bus" && <BusDetails data={analyticsData} />}
              {activeTab === "journey" && <JourneyDetails data={analyticsData} />}
              {activeTab === "ticket" && <TicketInformation data={analyticsData} />}
              {activeTab === "operational" && <DriverOperationalInsights data={analyticsData} />}
              {activeTab === "revenue" && <RevenueInsights data={analyticsData} />}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
