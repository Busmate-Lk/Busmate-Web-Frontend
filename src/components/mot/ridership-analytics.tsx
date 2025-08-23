"use client";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function RidershipAnalytics() {
  // Mock data for ridership trends
  const ridershipTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Ridership",
        data: [65000, 68000, 72000, 75000, 78000, 82000],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "SLTB Ridership",
        data: [28000, 30000, 32000, 33000, 35000, 37000],
        borderColor: "#16A34A",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Private Ridership",
        data: [37000, 38000, 40000, 42000, 43000, 45000],
        borderColor: "#CBD5E1",
        backgroundColor: "rgba(203, 213, 225, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Peak hours ridership data
  const peakHoursData = {
    labels: ["6 AM", "7 AM", "8 AM", "9 AM", "5 PM", "6 PM", "7 PM", "8 PM"],
    datasets: [
      {
        label: "Peak Hours Ridership",
        data: [2500, 4200, 5800, 3400, 5200, 6100, 4800, 3200],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(203, 213, 225, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(17, 24, 39, 0.8)",
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(203, 213, 225, 0.8)",
        ],
        borderColor: [
          "#1E3A8A",
          "#16A34A",
          "#CBD5E1",
          "#EF4444",
          "#111827",
          "#1E3A8A",
          "#16A34A",
          "#CBD5E1",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Route popularity data
  const routePopularityData = {
    labels: ["Colombo-Kandy", "Colombo-Galle", "Kandy-Nuwara Eliya", "Colombo-Negombo", "Galle-Matara"],
    datasets: [
      {
        data: [25, 20, 18, 15, 12],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(203, 213, 225, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(17, 24, 39, 0.8)",
        ],
        borderColor: [
          "#1E3A8A",
          "#16A34A",
          "#CBD5E1",
          "#EF4444",
          "#111827",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#111827",
        }
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#CBD5E1",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#CBD5E1",
        },
        ticks: {
          color: "#111827",
        }
      },
      x: {
        grid: {
          color: "#CBD5E1",
        },
        ticks: {
          color: "#111827",
        }
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#111827",
        }
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#CBD5E1",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Ridership Trends */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ridership Trends (Monthly)
        </h3>
        <div className="h-80">
          <Line data={ridershipTrendData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Peak Hours Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Peak Hours Ridership
          </h3>
          <div className="h-64">
            <Bar data={peakHoursData} options={chartOptions} />
          </div>
        </div>

        {/* Route Popularity */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Routes (%)
          </h3>
          <div className="h-64">
            <Doughnut data={routePopularityData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Ridership Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ridership Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">82,000</div>
            <div className="text-sm text-gray-600">Total Passengers (June)</div>
            <div className="text-sm text-green-600">+5.1% from last month</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">1,367</div>
            <div className="text-sm text-gray-600">Daily Average</div>
            <div className="text-sm text-green-600">+3.2% from last month</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Peak Hour Occupancy</div>
            <div className="text-sm text-red-600">-2.1% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
