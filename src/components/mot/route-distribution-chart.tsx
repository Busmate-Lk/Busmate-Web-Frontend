"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function RouteDistributionChart() {
  const data = {
    labels: ["City Routes", "Intercity Routes", "Express Routes"],
    datasets: [
      {
        data: [156, 68, 23],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(147, 51, 234, 0.8)",
        ],
        borderColor: [
          "#2563eb",
          "#22c55e",
          "#9333ea",
        ],
        borderWidth: 2,
        cutout: "60%",
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
            const total = 247;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg text-black font-semibold">
          Route Distribution
        </h3>
        <button className="p-0 h-auto hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64 relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm text-gray-600">Total Routes</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">City Routes</span>
              <span className="text-slate-600 ml-2">156 (63%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Intercity</span>
              <span className="text-slate-600 ml-2">68 (28%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Express</span>
              <span className="text-slate-600 ml-2">23 (9%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
