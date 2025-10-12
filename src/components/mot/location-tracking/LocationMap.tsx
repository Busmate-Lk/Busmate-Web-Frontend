'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Clock, Users, AlertCircle } from 'lucide-react';

// Types for location tracking
interface LocationData {
  tripId: string;
  busId: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  speed?: number;
  heading?: number;
  timestamp: string;
  accuracy?: number;
}

interface ActiveTripData {
  id: string;
  busId?: string;
  routeId?: string;
  currentLocation?: LocationData;
  progress?: number;
  nextStop?: string;
  estimatedArrival?: string;
  deviceStatus?: 'online' | 'offline' | 'unknown';
  status?: string;
  bus?: {
    registrationNumber?: string;
    capacity?: number;
  };
  route?: {
    name?: string;
  };
}

interface LocationMapProps {
  activeTrips: ActiveTripData[];
  selectedTrip: ActiveTripData | null;
  onTripSelect: (trip: ActiveTripData | null) => void;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  onMapCenterChange: (center: { lat: number; lng: number }) => void;
  onMapZoomChange: (zoom: number) => void;
  isLoaded: boolean;
}

// Google Maps configuration
const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px'
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

export function LocationMap({
  activeTrips,
  selectedTrip,
  onTripSelect,
  mapCenter,
  mapZoom,
  onMapCenterChange,
  onMapZoomChange,
  isLoaded
}: LocationMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const isUpdatingRef = useRef(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Handle center changes with debouncing to prevent infinite loops
  const handleCenterChanged = useCallback(() => {
    if (!mapRef.current || isUpdatingRef.current) return;
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Debounce the update
    debounceTimeoutRef.current = setTimeout(() => {
      if (!mapRef.current || isUpdatingRef.current) return;
      
      const center = mapRef.current.getCenter();
      if (center) {
        const newCenter = {
          lat: center.lat(),
          lng: center.lng()
        };
        
        // Only update if the center has actually changed significantly
        const latDiff = Math.abs(newCenter.lat - mapCenter.lat);
        const lngDiff = Math.abs(newCenter.lng - mapCenter.lng);
        
        if (latDiff > 0.0001 || lngDiff > 0.0001) {
          onMapCenterChange(newCenter);
        }
      }
    }, 300); // 300ms debounce
  }, [mapCenter, onMapCenterChange]);

  // Handle zoom changes with debouncing
  const handleZoomChanged = useCallback(() => {
    if (!mapRef.current || isUpdatingRef.current) return;
    
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Debounce the update
    debounceTimeoutRef.current = setTimeout(() => {
      if (!mapRef.current || isUpdatingRef.current) return;
      
      const zoom = mapRef.current.getZoom();
      if (zoom && zoom !== mapZoom) {
        onMapZoomChange(zoom);
      }
    }, 300); // 300ms debounce
  }, [mapZoom, onMapZoomChange]);

  // Effect to handle programmatic center changes
  useEffect(() => {
    if (mapRef.current) {
      const currentCenter = mapRef.current.getCenter();
      if (currentCenter) {
        const currentLat = currentCenter.lat();
        const currentLng = currentCenter.lng();
        
        // Only update if there's a significant difference
        const latDiff = Math.abs(currentLat - mapCenter.lat);
        const lngDiff = Math.abs(currentLng - mapCenter.lng);
        
        if (latDiff > 0.0001 || lngDiff > 0.0001) {
          isUpdatingRef.current = true;
          mapRef.current.setCenter(mapCenter);
          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 100);
        }
      }
    }
  }, [mapCenter]);

  // Effect to handle programmatic zoom changes
  useEffect(() => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      if (currentZoom && currentZoom !== mapZoom) {
        isUpdatingRef.current = true;
        mapRef.current.setZoom(mapZoom);
        setTimeout(() => {
          isUpdatingRef.current = false;
        }, 100);
      }
    }
  }, [mapZoom]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const getMarkerIcon = (trip: ActiveTripData) => {
    const isSelected = selectedTrip?.id === trip.id;
    const isOnline = trip.deviceStatus === 'online';
    
    if (isSelected) {
      return {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="#ffffff" stroke-width="3"/>
            <circle cx="16" cy="16" r="6" fill="#ffffff"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      };
    }

    const color = isOnline ? '#10B981' : '#EF4444';
    return {
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="#ffffff" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="#ffffff"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(24, 24),
      anchor: new google.maps.Point(12, 12)
    };
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return 'Invalid time';
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onMapLoad}
        options={mapOptions}
        onCenterChanged={handleCenterChanged}
        onZoomChanged={handleZoomChanged}
      >
        {/* Trip Markers */}
        {activeTrips.map((trip) => {
          if (!trip.currentLocation?.location?.coordinates) return null;
          
          const [lng, lat] = trip.currentLocation.location.coordinates;
          
          return (
            <Marker
              key={trip.id}
              position={{ lat, lng }}
              icon={getMarkerIcon(trip)}
              onClick={() => onTripSelect(trip)}
              title={`Trip ${trip.id} - ${trip.bus?.registrationNumber || 'Unknown Bus'}`}
            />
          );
        })}

        {/* Info Window for Selected Trip */}
        {selectedTrip && selectedTrip.currentLocation?.location?.coordinates && (
          <InfoWindow
            position={{
              lat: selectedTrip.currentLocation.location.coordinates[1],
              lng: selectedTrip.currentLocation.location.coordinates[0]
            }}
            onCloseClick={() => onTripSelect(null)}
          >
            <div className="p-3 max-w-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">
                  {selectedTrip.bus?.registrationNumber || 'Unknown Bus'}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedTrip.deviceStatus === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedTrip.deviceStatus || 'unknown'}
                </span>
              </div>

              {/* Trip Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Route:</span>
                  <span className="text-gray-900">{selectedTrip.route?.name || 'Unknown Route'}</span>
                </div>

                {selectedTrip.currentLocation?.speed !== undefined && (
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Speed:</span>
                    <span className="text-gray-900">{selectedTrip.currentLocation.speed.toFixed(1)} km/h</span>
                  </div>
                )}

                {selectedTrip.nextStop && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Next Stop:</span>
                    <span className="text-gray-900">{selectedTrip.nextStop}</span>
                  </div>
                )}

                {selectedTrip.estimatedArrival && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">ETA:</span>
                    <span className="text-gray-900">{formatTime(selectedTrip.estimatedArrival)}</span>
                  </div>
                )}

                {selectedTrip.bus?.capacity && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Capacity:</span>
                    <span className="text-gray-900">{selectedTrip.bus.capacity} seats</span>
                  </div>
                )}

                {selectedTrip.progress !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{selectedTrip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedTrip.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: {formatTime(selectedTrip.currentLocation?.timestamp)}</span>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <h4 className="font-medium text-gray-900 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}