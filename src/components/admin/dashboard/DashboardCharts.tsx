'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { ChartData } from '@/app/mot/(authenticated)/dashboard/data';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  height?: string;
}

function ChartCard({ title, description, children, height = 'h-80' }: ChartCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className={height}>
        {children}
      </div>
    </div>
  );
}

interface FleetDistributionChartProps {
  data: ChartData;
}

export function FleetDistributionChart({ data }: FleetDistributionChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} buses (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <ChartCard 
      title="Fleet Distribution by Bus Type" 
      description="Distribution of registered buses by type"
    >
      <Doughnut data={data} options={options} />
    </ChartCard>
  );
}

interface RouteAnalyticsChartProps {
  data: ChartData;
}

export function RouteAnalyticsChart({ data }: RouteAnalyticsChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <ChartCard 
      title="Route Analytics by District" 
      description="Number of active routes per district"
    >
      <Line data={data} options={options} />
    </ChartCard>
  );
}

interface PermitStatusChartProps {
  data: ChartData;
}

export function PermitStatusChart({ data }: PermitStatusChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} permits (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <ChartCard 
      title="Permit Status Distribution" 
      description="Current status of all service permits"
    >
      <Pie data={data} options={options} />
    </ChartCard>
  );
}

interface OperatorPerformanceChartProps {
  data: ChartData;
}

export function OperatorPerformanceChart({ data }: OperatorPerformanceChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  return (
    <ChartCard 
      title="Operator Performance Metrics" 
      description="Fleet size and active routes by operator"
    >
      <Bar data={data} options={options} />
    </ChartCard>
  );
}

interface MonthlyTrendChartProps {
  data: ChartData;
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
      },
    },
  };

  return (
    <ChartCard 
      title="Monthly Trends" 
      description="Registration and permit application trends"
      height="h-96"
    >
      <Line data={data} options={options} />
    </ChartCard>
  );
}

interface GeographicDistributionChartProps {
  data: ChartData;
}

export function GeographicDistributionChart({ data }: GeographicDistributionChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 10,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} buses (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <ChartCard 
      title="Geographic Distribution" 
      description="Bus distribution across provinces"
    >
      <Doughnut data={data} options={options} />
    </ChartCard>
  );
}

interface CapacityUtilizationChartProps {
  data: ChartData;
}

export function CapacityUtilizationChart({ data }: CapacityUtilizationChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.y}% capacity utilized`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <ChartCard 
      title="Capacity Utilization by Route Type" 
      description="Average capacity utilization across different route types"
    >
      <Bar data={data} options={options} />
    </ChartCard>
  );
}