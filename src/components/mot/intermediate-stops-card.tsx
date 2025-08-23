"use client";

interface IntermediateStop {
  id: number;
  name: string;
  time: string;
}

interface IntermediateStopsCardProps {
  stops: IntermediateStop[];
}

export function IntermediateStopsCard({ stops }: IntermediateStopsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Intermediate Stops
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {stops.map((stop, index) => (
            <div
              key={stop.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-600">{stop.name}</span>
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {stop.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
