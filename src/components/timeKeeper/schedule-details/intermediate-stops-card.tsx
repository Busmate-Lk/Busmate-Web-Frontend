interface IntermediateStopsCardProps {
  stops: Array<{
    id: number;
    name: string;
    time: string;
  }>;
}

export function IntermediateStopsCard({ stops }: IntermediateStopsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          📍 Intermediate Stops
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {stops.map((stop, index) => (
            <div key={stop.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-800' : 
                  index === stops.length - 1 ? 'bg-red-500' : 
                  'bg-blue-500'
                }`}></div>
                {index < stops.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                )}
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{stop.name}</p>
                  <p className="text-sm text-gray-500">
                    {index === 0 ? 'Starting Point' : 
                     index === stops.length - 1 ? 'Destination' : 
                     'Intermediate Stop'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{stop.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
