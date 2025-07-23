import { Card, CardContent, CardHeader, CardTitle } from "@/components/operator/ui/card"
import { Button } from "@/components/operator/ui/button"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { Line, Bar } from 'react-chartjs-2'
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
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface FleetChartProps {
  title: string
  selectedPeriod: string
  onPeriodChange: (period: string) => void
  periods: Array<{ value: string; label: string }>
  placeholder: string
  chartType: "line" | "bar"
  metrics?: {
    current: string
    change: string
    changeType: "positive" | "negative"
  }
}

export function FleetPerformanceChart({
  title,
  selectedPeriod,
  onPeriodChange,
  periods,
  placeholder,
  chartType,
  metrics
}: FleetChartProps) {
  // Generate sample data based on chart type and selected period
  const getChartData = () => {
    const isRevenue = title.includes("Revenue")
    const isTickets = title.includes("Tickets")
    const isLine = chartType === "line"

    // Sample data based on period
    const getData = (period: string) => {
      switch(period) {
        case "today":
          return {
            labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
            values: isRevenue ? [25000.00, 42000.00, 68000.00, 52000.00, 73000.00, 48000.00] 
                   : isTickets ? [32, 67, 89, 76, 98, 65] 
                   : [65, 78, 85, 72, 92, 68]
          }
        case "last7days":
          return {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            values: isRevenue ? [150000.00, 180000.00, 120000.00, 220000.00, 250000.00, 280000.00, 200000.00] 
                   : isTickets ? [376, 452, 298, 489, 456, 498, 423] 
                   : [75, 80, 65, 90, 85, 95, 78]
          }
        case "last30days":
          return {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            values: isRevenue ? [850000.00, 920000.00, 780000.00, 1050000.00] 
                   : isTickets ? [2856, 3124, 2567, 3398] 
                   : [78, 82, 75, 88]
          }
        case "last90days":
          return {
            labels: ["Month 1", "Month 2", "Month 3"],
            values: isRevenue ? [2850000.00, 3120000.00, 3450000.00] 
                   : isTickets ? [9876, 10234, 11567] 
                   : [82, 85, 88]
          }
        case "thisweek":
          return {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            values: isRevenue ? [180000.00, 220000.00, 150000.00, 250000.00, 280000.00] 
                   : isTickets ? [412, 478, 356, 489, 467] 
                   : [82, 88, 75, 92, 95]
          }
        case "thismonth":
          return {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            values: isRevenue ? [880000.00, 950000.00, 820000.00, 1080000.00] 
                   : isTickets ? [2987, 3245, 2734, 3567] 
                   : [85, 90, 78, 92]
          }
        default:
          return {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: isRevenue ? [950000.00, 1050000.00, 880000.00, 1120000.00, 1250000.00, 1380000.00] 
                   : isTickets ? [12456, 13789, 11234, 14567, 15234, 16789] 
                   : [82, 85, 78, 88, 92, 87]
          }
      }
    }

    const data = getData(selectedPeriod)
    
    const chartConfig = {
      labels: data.labels,
      datasets: [
        {
          label: isRevenue ? 'Revenue (LKR)' : isTickets ? 'Tickets Issued' : 'Utilization (%)',
          data: data.values,
          borderColor: isRevenue ? 'rgb(34, 197, 94)' : isTickets ? 'rgb(59, 130, 246)' : 'rgb(59, 130, 246)',
          backgroundColor: isLine 
            ? isRevenue ? 'rgba(34, 197, 94, 0.1)' : isTickets ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'
            : isRevenue ? 'rgba(34, 197, 94, 0.8)' : isTickets ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)',
          borderWidth: 2,
          fill: isLine,
          tension: 0.4,
        },
      ],
    }

    return chartConfig
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return title.includes("Revenue") ? `Rs ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                 : title.includes("Tickets") ? `${value} tickets`
                 : `${value}%`
          }
        },
      },
    },
  }
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
            {metrics && (
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-2xl font-bold text-gray-900">{metrics.current}</div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metrics.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {metrics.changeType === "positive" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-medium">{metrics.change}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="text-sm bg-white border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          {chartType === "line" ? (
            <Line data={getChartData()} options={chartOptions} />
          ) : (
            <Bar data={getChartData()} options={chartOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
