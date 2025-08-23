"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PermitCategoriesChart() {
  const data = {
    labels: ["Regular Permits", "Temporary Permits", "Special Permits"],
    datasets: [
      {
        data: [145, 32, 12],
        backgroundColor: [
          "rgba(37, 99, 235, 0.8)",
          "rgba(234, 88, 12, 0.8)",
          "rgba(220, 38, 38, 0.8)",
        ],
        borderColor: [
          "#2563eb",
          "#ea580c",
          "#dc2626",
        ],
        borderWidth: 2,
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
            const total = 189;
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="rounded-lg  bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg text-black font-semibold">
          Permit Categories
        </h3>
        <button className="p-0 h-auto hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64">
          <Pie data={data} options={options} />
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Regular</span>
              <span className="text-slate-600 ml-2">145 (77%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Temporary</span>
              <span className="text-slate-600 ml-2">32 (17%)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Special</span>
              <span className="text-slate-600 ml-2">12 (6%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
