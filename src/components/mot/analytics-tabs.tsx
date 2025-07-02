"use client";

interface AnalyticsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AnalyticsTabs({ activeTab, setActiveTab }: AnalyticsTabsProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
      <button
        onClick={() => setActiveTab("ridership")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === "ridership"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Ridership Analytics
      </button>
      <button
        onClick={() => setActiveTab("revenue")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === "revenue"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Revenue & Fare Analytics
      </button>
      <button
        onClick={() => setActiveTab("performance")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === "performance"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Performance Metrics
      </button>
    </div>
  );
}
