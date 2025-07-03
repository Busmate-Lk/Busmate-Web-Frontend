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

interface ChartDataPoint {
  day: string;
  value: number;
  height: string;
  isToday?: boolean;
}

interface RidershipChartProps {
  chartData: ChartDataPoint[];
}

export function RidershipChart({ chartData }: RidershipChartProps) {
  const data = {
    labels: chartData.map(point => point.day),
    datasets: [
      {
        label: "Daily Ridership",
        data: chartData.map(point => point.value),
        backgroundColor: chartData.map(point => 
          point.isToday ? "rgba(22, 163, 74, 0.8)" : "rgba(30, 58, 138, 0.8)"
        ),
        borderColor: chartData.map(point => 
          point.isToday ? "#16A34A" : "#1E3A8A"
        ),
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
            return `Ridership: ${context.parsed.y.toLocaleString()}`;
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
            return value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#111827",
        }
      },
    },
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between p-6">
        <h3 className="text-lg text-black font-semibold">
          Ridership Trend (Last 7 Days)
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
      </div>
    </div>
  );
}
