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

export function TopRoutesRevenue() {
  const data = {
    labels: ["Colombo-Kandy", "Colombo-Galle", "Kandy-Nuwara Eliya", "Colombo-Negombo", "Galle-Matara"],
    datasets: [
      {
        label: "Revenue (Rs.)",
        data: [2500000, 2100000, 1850000, 1600000, 1400000],
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
            return `Revenue: Rs. ${context.parsed.x.toLocaleString()}`;
          }
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "#CBD5E1",
        },
        ticks: {
          color: "#111827",
          callback: function(value: any) {
            return 'Rs. ' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#111827",
          font: {
            size: 11,
          }
        }
      },
    },
  };

  return (
    <div className="mb-8 rounded-lg border bg-white shadow-sm">
      <div className="p-6">
        <h3 className="text-lg text-black font-semibold">
          Top 5 Routes by Revenue
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="h-48">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
