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

export function RevenueAnalytics() {
  // Revenue trends data
  const revenueTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Revenue (Rs.)",
        data: [2200000, 2350000, 2480000, 2610000, 2720000, 2847500],
        borderColor: "#16A34A",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y",
      },
      {
        label: "Average Fare (Rs.)",
        data: [33.85, 34.56, 34.44, 34.80, 34.87, 38.72],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  // Revenue by operator type
  const revenueByOperatorData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "SLTB Revenue (Rs.)",
        data: [950000, 1020000, 1080000, 1140000, 1180000, 1125900],
        backgroundColor: "rgba(22, 163, 74, 0.8)",
        borderColor: "#16A34A",
        borderWidth: 2,
      },
      {
        label: "Private Revenue (Rs.)",
        data: [1250000, 1330000, 1400000, 1470000, 1540000, 1721600],
        backgroundColor: "rgba(30, 58, 138, 0.8)",
        borderColor: "#1E3A8A",
        borderWidth: 2,
      },
    ],
  };

  // Revenue by route data
  const revenueByRouteData = {
    labels: ["Colombo-Kandy", "Colombo-Galle", "Kandy-Nuwara Eliya", "Colombo-Negombo", "Galle-Matara"],
    datasets: [
      {
        data: [680000, 520000, 485000, 420000, 380000],
        backgroundColor: [
          "rgba(22, 163, 74, 0.8)",
          "rgba(30, 58, 138, 0.8)",
          "rgba(203, 213, 225, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(17, 24, 39, 0.8)",
        ],
        borderColor: [
          "#16A34A",
          "#1E3A8A",
          "#CBD5E1",
          "#EF4444",
          "#111827",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Daily revenue pattern
  const dailyRevenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Revenue (Rs.)",
        data: [125000, 132000, 128000, 135000, 142000, 98000, 85000],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(203, 213, 225, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(17, 24, 39, 0.8)",
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
        ],
        borderColor: [
          "#1E3A8A",
          "#16A34A",
          "#CBD5E1",
          "#EF4444",
          "#111827",
          "#1E3A8A",
          "#16A34A",
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
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            if (label.includes('Revenue')) {
              return `${label}: Rs. ${context.parsed.y.toLocaleString()}`;
            }
            return `${label}: Rs. ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        beginAtZero: true,
        grid: {
          color: "#CBD5E1",
        },
        ticks: {
          color: "#111827",
          callback: function(value: any) {
            return 'Rs. ' + value.toLocaleString();
          }
        }
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "#111827",
          callback: function(value: any) {
            return 'Rs. ' + value;
          }
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

  const barChartOptions = {
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
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: Rs. ${context.parsed.y.toLocaleString()}`;
          }
        }
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
          callback: function(value: any) {
            return 'Rs. ' + value.toLocaleString();
          }
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
        callbacks: {
          label: function(context: any) {
            return `${context.label}: Rs. ${context.parsed.toLocaleString()}`;
          }
        }
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Revenue Trends */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue & Fare Trends (Monthly)
        </h3>
        <div className="h-80">
          <Line data={revenueTrendData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Operator */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue by Operator Type
          </h3>
          <div className="h-64">
            <Bar data={revenueByOperatorData} options={barChartOptions} />
          </div>
        </div>

        {/* Revenue by Route */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Revenue Routes
          </h3>
          <div className="h-64">
            <Doughnut data={revenueByRouteData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Daily Revenue Pattern */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Daily Revenue Pattern
        </h3>
        <div className="h-64">
          <Bar data={dailyRevenueData} options={barChartOptions} />
        </div>
      </div>

      {/* Revenue Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">Rs. 2.85M</div>
            <div className="text-sm text-gray-600">Total Revenue (June)</div>
            <div className="text-sm text-green-600">+8% from last month</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">Rs. 38.72</div>
            <div className="text-sm text-gray-600">Avg Fare per Trip</div>
            <div className="text-sm text-green-600">+6% from last month</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">Rs. 1.13M</div>
            <div className="text-sm text-gray-600">SLTB Revenue</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">Rs. 1.72M</div>
            <div className="text-sm text-gray-600">Private Revenue</div>
            <div className="text-sm text-green-600">+12% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
