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

export function OperatorPerformanceChart() {
  const data = {
    labels: [
      "Sri Lanka Transport Board",
      "National Transport Commission",
      "Private Bus Operators Assoc.",
      "Regional Bus Services",
      "Metro Express Lines"
    ],
    datasets: [
      {
        label: "Fleet Size",
        data: [245, 189, 156, 134, 98],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(147, 51, 234, 0.8)",
          "rgba(234, 88, 12, 0.8)",
          "rgba(6, 182, 212, 0.8)",
        ],
        borderColor: [
          "#2563eb",
          "#22c55e",
          "#9333ea",
          "#ea580c",
          "#06b6d4",
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
    indexAxis: 'y' as const,
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
            return `Fleet Size: ${context.parsed.x} buses`;
          }
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          color: "#64748b",
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
          }
        }
      },
    },
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg text-black font-semibold">
          Top 5 Operators by Fleet Size
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
        <div className="mt-4 text-xs text-gray-500 text-center">
          Showing top 5 operators out of 85 total registered operators
        </div>
      </div>
    </div>
  );
}
