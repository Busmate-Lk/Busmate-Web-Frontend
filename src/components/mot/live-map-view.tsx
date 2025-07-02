"use client";

export interface Bus {
  id: string;
  busNumber: string;
  route: string;
  driver: string;
  status: "on-time" | "delayed" | "inactive";
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  lastUpdate: string;
  passengers: number;
  nextStop: string;
  eta: string;
}

interface LiveMapViewProps {
  buses: Bus[];
  onBusClick: (bus: Bus) => void;
  lastRefresh: Date;
}

export function LiveMapView({
  buses,
  onBusClick,
  lastRefresh,
}: LiveMapViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500";
      case "delayed":
        return "bg-red-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="flex-1">
      <div className="h-full bg-white rounded-lg shadow border border-gray-200">
        <div className="flex flex-row items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Live Map View</h3>
          <button className="p-0 h-auto text-gray-500 hover:text-gray-700">
            <div className="flex items-center gap-1">
              <span className="text-xs">...</span>
            </div>
          </button>
        </div>
        <div className="p-0 h-full">
          <div className="relative h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100">
              {/* Bus Markers */}
              {buses.map((bus, index) => (
                <div
                  key={bus.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{
                    left: `${45 + index * 8}%`,
                    top: `${35 + index * 12}%`,
                  }}
                  onClick={() => onBusClick(bus)}
                >
                  <div
                    className={`w-4 h-4 ${getStatusColor(
                      bus.status
                    )} rounded-full border-2 border-white shadow-lg`}
                  ></div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                    {bus.busNumber}
                  </div>
                </div>
              ))}

              {/* Last Update Info */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
                <p className="text-xs text-gray-600">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
