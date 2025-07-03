"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BusTypesData {
  total: number;
  regular: number;
  express: number;
}

interface BusTypesChartProps {
  data: BusTypesData;
}

export function BusTypesChart({ data }: BusTypesChartProps) {
  const others = data.total - data.regular - data.express;
  
  const chartData = {
    labels: ["Regular", "Express", "Others"],
    datasets: [
      {
        data: [data.regular, data.express, others],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(22, 163, 74, 0.8)",
          "rgba(203, 213, 225, 0.8)",
        ],
        borderColor: [
          "#1E3A8A",
          "#16A34A",
          "#CBD5E1",
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
            const percentage = ((context.parsed / data.total) * 100).toFixed(1);
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
          Bus Types Distribution
        </h3>
        <button className="p-0 h-auto hover:bg-gray-100 hover:text-gray-900 h-9 rounded-md px-3">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6 pt-0">
        <div className="h-64 relative">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {data.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Buses</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1E3A8A" }}></div>
            <div className="text-sm">
              <span className="font-medium" style={{ color: "#111827" }}>Regular</span>
              <span className="text-slate-600 ml-2">{data.regular}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#16A34A" }}></div>
            <div className="text-sm">
              <span className="font-medium" style={{ color: "#111827" }}>Express</span>
              <span className="text-slate-600 ml-2">{data.express}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#CBD5E1" }}></div>
            <div className="text-sm">
              <span className="font-medium" style={{ color: "#111827" }}>Others</span>
              <span className="text-slate-600 ml-2">{others}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
