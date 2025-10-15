"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useMemo } from 'react';

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

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Center of Sri Lanka
const defaultCenter = {
  lat: 7.8731,
  lng: 80.7718
};

export function LiveMapView({
  buses,
  onBusClick,
  lastRefresh,
}: LiveMapViewProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geometry', 'places'],
  });

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  // Calculate map center based on bus locations
  const mapCenter = useMemo(() => {
    if (buses.length === 0) return defaultCenter;
    
    const avgLat = buses.reduce((sum, bus) => sum + bus.location.lat, 0) / buses.length;
    const avgLng = buses.reduce((sum, bus) => sum + bus.location.lng, 0) / buses.length;
    
    return { lat: avgLat, lng: avgLng };
  }, [buses]);

  const getMarkerIcon = (status: string) => {
    const color = status === "on-time" ? "green" : status === "delayed" ? "red" : "gray";
    return {
      url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='${color}' stroke='white' stroke-width='2'/%3E%3C/svg%3E`,
      scaledSize: new google.maps.Size(24, 24),
    };
  };

  const handleMarkerClick = (bus: Bus) => {
    setSelectedBus(bus);
    onBusClick(bus);
  };

  if (!isLoaded) {
    return (
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Live Map View</h3>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading Map...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
        <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Live Map View</h3>
          <div className="flex items-center gap-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-600">
              {buses.length} Bus{buses.length !== 1 ? 'es' : ''} Tracked
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-600">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden" style={{ height: 'calc(100% - 73px)' }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={buses.length > 0 ? 8 : 7}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {buses.map((bus) => (
              <Marker
                key={bus.id}
                position={bus.location}
                onClick={() => handleMarkerClick(bus)}
                icon={getMarkerIcon(bus.status)}
              />
            ))}

            {selectedBus && (
              <InfoWindow
                position={selectedBus.location}
                onCloseClick={() => setSelectedBus(null)}
              >
                <div className="p-2">
                  <div className="font-semibold text-lg">{selectedBus.busNumber}</div>
                  <div className="text-gray-600 mb-2">{selectedBus.route}</div>
                  <div className="space-y-1 text-sm">
                    <div><strong>Driver:</strong> {selectedBus.driver}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        selectedBus.status === "on-time" ? "bg-green-100 text-green-800" :
                        selectedBus.status === "delayed" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {selectedBus.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                    <div><strong>Passengers:</strong> {selectedBus.passengers}</div>
                    <div><strong>Next Stop:</strong> {selectedBus.nextStop}</div>
                    <div><strong>ETA:</strong> {selectedBus.eta}</div>
                    <div><strong>Location:</strong> {selectedBus.location.address}</div>
                    <div className="text-gray-500"><strong>Last Update:</strong> {selectedBus.lastUpdate}</div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {buses.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="bg-white px-6 py-4 rounded-lg shadow text-center">
                <p className="text-gray-600 font-medium">No buses match current filters</p>
                <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
