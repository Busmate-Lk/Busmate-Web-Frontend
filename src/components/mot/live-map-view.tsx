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

  // Function to convert lat/lng to map position (simplified projection)
  const getMapPosition = (lat: number, lng: number, index: number) => {
    // Sri Lanka bounds: roughly 5.9-9.8 lat, 79.5-81.9 lng
    const latRange = { min: 5.9, max: 9.8 };
    const lngRange = { min: 79.5, max: 81.9 };
    
    // Convert to percentage positions on the map
    const x = ((lng - lngRange.min) / (lngRange.max - lngRange.min)) * 80 + 10; // 10-90% range
    const y = ((latRange.max - lat) / (latRange.max - latRange.min)) * 80 + 10; // Inverted for map display
    
    // Add slight offset to prevent overlapping markers
    const offsetX = (index % 3) * 2;
    const offsetY = Math.floor(index / 3) * 2;
    
    return {
      left: `${Math.max(5, Math.min(95, x + offsetX))}%`,
      top: `${Math.max(5, Math.min(95, y + offsetY))}%`
    };
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Live Map View</h3>
          <button className="p-1 h-auto text-gray-500 hover:text-gray-700 rounded">
            <div className="flex items-center gap-1">
              <span className="text-xs">⋯</span>
            </div>
          </button>
        </div>
        <div className="relative bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden" style={{ height: 'calc(100% - 73px)' }}>
          {/* Map Background with Sri Lanka-like shape overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-yellow-100">
            {/* Subtle map grid lines */}
            <div className="absolute inset-0 opacity-20">
              {/* Vertical lines */}
              {[20, 40, 60, 80].map(pos => (
                <div
                  key={`v-${pos}`}
                  className="absolute h-full w-px bg-gray-400"
                  style={{ left: `${pos}%` }}
                />
              ))}
              {/* Horizontal lines */}
              {[20, 40, 60, 80].map(pos => (
                <div
                  key={`h-${pos}`}
                  className="absolute w-full h-px bg-gray-400"
                  style={{ top: `${pos}%` }}
                />
              ))}
            </div>

            {/* Bus count indicator */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
              <p className="text-sm font-medium text-gray-900">
                {buses.length} Bus{buses.length !== 1 ? 'es' : ''} Tracked
              </p>
            </div>
              {/* Bus Markers */}
              {buses.length > 0 ? (
                buses.map((bus, index) => {
                  const position = getMapPosition(bus.location.lat, bus.location.lng, index);
                  return (
                    <div
                      key={bus.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform group"
                      style={position}
                      onClick={() => onBusClick(bus)}
                    >
                      <div
                        className={`w-4 h-4 ${getStatusColor(
                          bus.status
                        )} rounded-full border-2 border-white shadow-lg pulse-${bus.status}`}
                      ></div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="font-semibold">{bus.busNumber}</div>
                        <div className="text-gray-600">{bus.route}</div>
                        <div className="text-gray-500">{bus.passengers} passengers</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow text-center">
                    <p className="text-gray-600 font-medium">No buses match current filters</p>
                    <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              )}

            {/* Last Update Info */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
              <p className="text-xs text-gray-600">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* CSS for animations */}
          <style jsx>{`
            .pulse-on-time {
              animation: pulse-green 2s infinite;
            }
            .pulse-delayed {
              animation: pulse-red 2s infinite;
            }
            .pulse-inactive {
              animation: none;
            }
            
            @keyframes pulse-green {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
              }
              50% {
                box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
              }
            }
            
            @keyframes pulse-red {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
              }
              50% {
                box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
