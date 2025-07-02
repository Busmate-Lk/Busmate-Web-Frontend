"use client";

interface BusTypesData {
  total: number;
  regular: number;
  express: number;
}

interface BusTypesChartProps {
  data: BusTypesData;
}

export function BusTypesChart({ data }: BusTypesChartProps) {
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
        <div className="h-64 flex items-center justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-8 border-blue-200"></div>
            <div
              className="absolute inset-2 rounded-full border-8 border-blue-600"
              style={{
                clipPath:
                  "polygon(50% 50%, 50% 0%, 100% 0%, 100% 60%, 50% 50%)",
              }}
            ></div>
            <div
              className="absolute inset-4 rounded-full border-8 border-green-500"
              style={{
                clipPath:
                  "polygon(50% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {data.total.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Buses</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Regular</span>
              <span className="text-slate-600 ml-2">{data.regular}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="text-sm">
              <span className="font-medium text-gray-900">Express</span>
              <span className="text-slate-600 ml-2">{data.express}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
