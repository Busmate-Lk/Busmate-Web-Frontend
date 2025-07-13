"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AssignmentTrendsChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Schedule Assignments",
        data: [310, 350, 285, 325, 390, 295, 245],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",
          "rgba(37, 99, 235, 0.8)",
          "rgba(37, 99, 235, 0.8)",
          "rgba(37, 99, 235, 0.8)",
          "rgba(34, 197, 94, 0.8)", // Friday highlighted in green
          "rgba(37, 99, 235, 0.8)",
          "rgba(37, 99, 235, 0.8)",
        ],
        borderColor: [
          "#2563eb",
          "#2563eb",
          "#2563eb",
          "#2563eb",
          "#22c55e", // Friday highlighted in green
          "#2563eb",
          "#2563eb",
        ],
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#CBD5E1",
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            return `Assignments: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          color: "#64748b",
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
        }
      },
    },
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg text-black font-semibold">
          Weekly Assignment Trends
        </h3>
        <button className="p-0 h-auto hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64">
          <Bar data={data} options={options} />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
          <span>Weekly Schedule Assignments</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Regular Days</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Peak Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
