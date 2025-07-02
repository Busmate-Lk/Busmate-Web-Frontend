"use client";

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
        <div className="h-64 flex items-end justify-center gap-2 px-4">
          {chartData.map((dataPoint, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`w-8 ${dataPoint.height} rounded-t ${
                  dataPoint.isToday ? "bg-green-600" : "bg-blue-800"
                }`}
              ></div>
              <span className="text-xs text-slate-600">{dataPoint.day}</span>
              <span className="text-xs font-medium text-gray-900">
                {dataPoint.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
