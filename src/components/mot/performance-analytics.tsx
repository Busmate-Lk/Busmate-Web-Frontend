"use client";

import { Line, Bar, Radar } from "react-chartjs-2";
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
  RadialLinearScale,
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
  RadialLinearScale
);

export function PerformanceAnalytics() {
  // On-time performance data
  const onTimePerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "On-Time Performance (%)",
        data: [78, 82, 85, 88, 86, 89],
        borderColor: "#16A34A",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "SLTB Performance (%)",
        data: [75, 79, 82, 85, 83, 86],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Private Performance (%)",
        data: [80, 84, 87, 90, 88, 91],
        borderColor: "#CBD5E1",
        backgroundColor: "rgba(203, 213, 225, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Fleet utilization data
  const fleetUtilizationData = {
    labels: ["Active Buses", "Maintenance", "Idle", "Out of Service"],
    datasets: [
      {
        data: [85, 8, 5, 2],
        backgroundColor: [
          "rgba(22, 163, 74, 0.8)",
          "rgba(30, 58, 138, 0.8)",
          "rgba(203, 213, 225, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "#16A34A",
          "#1E3A8A",
          "#CBD5E1",
          "#EF4444",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Service quality metrics
  const serviceQualityData = {
    labels: [
      "On-Time Performance",
      "Customer Satisfaction",
      "Safety Rating",
      "Vehicle Condition",
      "Route Coverage",
      "Frequency Adherence",
    ],
    datasets: [
      {
        label: "SLTB",
        data: [86, 78, 92, 75, 88, 82],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        pointBackgroundColor: "#1E3A8A",
        pointBorderColor: "#FFFFFF",
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#1E3A8A",
      },
      {
        label: "Private",
        data: [91, 85, 88, 89, 82, 87],
        borderColor: "#16A34A",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        pointBackgroundColor: "#16A34A",
        pointBorderColor: "#FFFFFF",
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#16A34A",
      },
    ],
  };

  // Fuel efficiency data
  const fuelEfficiencyData = {
    labels: ["SLTB", "Private Operators"],
    datasets: [
      {
        label: "Fuel Efficiency (km/L)",
        data: [12.5, 14.2],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
        ],
        borderColor: [
          "#1E3A8A",
          "#16A34A",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Route efficiency data
  const routeEfficiencyData = {
    labels: ["Colombo-Kandy", "Colombo-Galle", "Kandy-Nuwara Eliya", "Colombo-Negombo", "Galle-Matara"],
    datasets: [
      {
        label: "Occupancy Rate (%)",
        data: [78, 85, 72, 68, 75],
        backgroundColor: "rgba(22, 163, 74, 0.8)",
        borderColor: "#16A34A",
        borderWidth: 2,
      },
      {
        label: "On-Time Performance (%)",
        data: [92, 88, 85, 90, 87],
        backgroundColor: "rgba(30, 58, 138, 0.8)",
        borderColor: "#1E3A8A",
        borderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
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
        max: 100,
        grid: {
          color: "#CBD5E1",
        },
        ticks: {
          color: "#111827",
          callback: function(value: any) {
            return value + '%';
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

  const radarOptions = {
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
      r: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#CBD5E1",
        },
        pointLabels: {
          color: "#111827",
        },
        ticks: {
          stepSize: 20,
          color: "#111827",
        },
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
            return `${context.label}: ${context.parsed}%`;
          }
        }
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* On-Time Performance Trends */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          On-Time Performance Trends
        </h3>
        <div className="h-80">
          <Line data={onTimePerformanceData} options={lineChartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Utilization */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fleet Utilization
          </h3>
          <div className="h-64">
            <Bar data={fleetUtilizationData} options={doughnutOptions} />
          </div>
        </div>

        {/* Service Quality Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Service Quality Comparison
          </h3>
          <div className="h-64">
            <Radar data={serviceQualityData} options={radarOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fuel Efficiency */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fuel Efficiency Comparison
          </h3>
          <div className="h-64">
            <Bar data={fuelEfficiencyData} options={barChartOptions} />
          </div>
        </div>

        {/* Route Efficiency */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Route Efficiency Metrics
          </h3>
          <div className="h-64">
            <Bar data={routeEfficiencyData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Performance Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600">On-Time Performance</div>
            <div className="text-sm text-green-600">+3% from last month</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Fleet Utilization</div>
            <div className="text-sm text-green-600">+2% from last month</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">13.4 km/L</div>
            <div className="text-sm text-gray-600">Avg Fuel Efficiency</div>
            <div className="text-sm text-green-600">+1.2% from last month</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">76%</div>
            <div className="text-sm text-gray-600">Avg Occupancy Rate</div>
            <div className="text-sm text-red-600">-1.5% from last month</div>
          </div>
        </div>
      </div>
    </div>
  );
}
