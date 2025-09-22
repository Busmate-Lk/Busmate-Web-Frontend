'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { MapPin, RotateCcw, Maximize2, AlertCircle } from 'lucide-react';
import type { RouteResponse, LocationDto } from '@/lib/api-client/route-management';

interface RouteMapProps {
  route: RouteResponse;
  className?: string;
}

interface RouteStop {
  stopId?: string;
  stopName?: string;
  location?: LocationDto;
  distanceFromStartKm?: number;
  stopOrder?: number;
}

// Declare global google maps types
declare global {
  interface Window {
    google: typeof google;
    initMap: () => void;
  }
}

export function RouteMap({ route, className = "" }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Process route stops and add start/end stops
  const getOrderedStops = useCallback((): RouteStop[] => {
    const stops: RouteStop[] = [];
    
    // Add start stop (only if coordinates are valid)
    if (route.startStopName && route.startStopLocation && 
        typeof route.startStopLocation.latitude === 'number' && 
        typeof route.startStopLocation.longitude === 'number') {
      stops.push({
        stopName: route.startStopName,
        location: route.startStopLocation,
        distanceFromStartKm: 0,
        stopOrder: 0
      });
    }

    // Add intermediate stops (sorted by stopOrder, only with valid coordinates)
    if (route.routeStops && route.routeStops.length > 0) {
      const sortedStops = [...route.routeStops]
        .filter(stop => 
          stop.location?.latitude != null && 
          stop.location?.longitude != null &&
          typeof stop.location.latitude === 'number' &&
          typeof stop.location.longitude === 'number'
        )
        .sort((a, b) => (a.stopOrder || 0) - (b.stopOrder || 0));
      
      stops.push(...sortedStops);
    }

    // Add end stop if it's different from start and not already in routeStops (only if coordinates are valid)
    if (route.endStopName && route.endStopLocation && 
        typeof route.endStopLocation.latitude === 'number' && 
        typeof route.endStopLocation.longitude === 'number' &&
        route.endStopName !== route.startStopName) {
      const endStopExists = stops.some(stop => 
        stop.stopName === route.endStopName ||
        (stop.location?.latitude === route.endStopLocation?.latitude &&
         stop.location?.longitude === route.endStopLocation?.longitude)
      );
      
      if (!endStopExists) {
        stops.push({
          stopName: route.endStopName,
          location: route.endStopLocation,
          distanceFromStartKm: route.distanceKm || 0,
          stopOrder: 999
        });
      }
    }

    return stops.filter(stop => 
      stop.location?.latitude != null && 
      stop.location?.longitude != null &&
      typeof stop.location.latitude === 'number' &&
      typeof stop.location.longitude === 'number'
    );
  }, [route]);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = async () => {
      try {
        setIsLoading(true);
        setMapError(null);

        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          createMap();
          return;
        }

        // Load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          createMap();
        };
        
        script.onerror = () => {
          setMapError('Failed to load Google Maps');
          setIsLoading(false);
        };

        document.head.appendChild(script);

        // Cleanup function
        return () => {
          const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
          if (existingScript && existingScript.parentNode) {
            existingScript.parentNode.removeChild(existingScript);
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const stops = getOrderedStops();
        
        if (stops.length === 0) {
          setMapError('No valid stops found for this route');
          setIsLoading(false);
          return;
        }

        // Calculate map center and bounds
        const bounds = new window.google.maps.LatLngBounds();
        stops.forEach(stop => {
          if (stop.location && 
              typeof stop.location.latitude === 'number' && 
              typeof stop.location.longitude === 'number') {
            bounds.extend({
              lat: stop.location.latitude,
              lng: stop.location.longitude
            });
          }
        });

        const center = bounds.getCenter();

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: 13,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        });

        googleMapRef.current = map;

        // Clear existing markers and polyline
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
        if (polylineRef.current) {
          polylineRef.current.setMap(null);
        }

        // Create markers for each stop
        const path: google.maps.LatLng[] = [];
        
        stops.forEach((stop, index) => {
          if (!stop.location || 
              typeof stop.location.latitude !== 'number' || 
              typeof stop.location.longitude !== 'number') return;

          const position = {
            lat: stop.location.latitude,
            lng: stop.location.longitude
          };

          path.push(new window.google.maps.LatLng(position.lat, position.lng));

          // Determine marker color based on stop type
          let markerColor = '#2563eb'; // Default blue
          if (index === 0) markerColor = '#16a34a'; // Green for start
          else if (index === stops.length - 1) markerColor = '#dc2626'; // Red for end

          // Create custom marker
          const marker = new window.google.maps.Marker({
            position,
            map,
            title: stop.stopName || `Stop ${index + 1}`,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: markerColor,
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          // Create info window for marker
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-2">
                <h4 class="font-semibold text-sm">${stop.stopName || 'Unknown Stop'}</h4>
                <p class="text-xs text-gray-600">Stop ${index + 1} of ${stops.length}</p>
                <p class="text-xs text-gray-600">Distance: ${(stop.distanceFromStartKm || 0).toFixed(1)} km</p>
                <p class="text-xs text-gray-600">Coordinates: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            // Close other info windows
            markersRef.current.forEach(m => {
              if ((m as any).infoWindow) {
                (m as any).infoWindow.close();
              }
            });
            
            infoWindow.open(map, marker);
            (marker as any).infoWindow = infoWindow;
          });

          markersRef.current.push(marker);
        });

        // Create polyline to show route path
        if (path.length > 1) {
          const polyline = new window.google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#2563eb',
            strokeOpacity: 1.0,
            strokeWeight: 3,
          });

          polyline.setMap(map);
          polylineRef.current = polyline;
        }

        // Fit map to show all stops
        map.fitBounds(bounds);
        
        // Add some padding
        const padding = { top: 50, right: 50, bottom: 50, left: 50 };
        map.fitBounds(bounds, padding);

        setIsMapLoaded(true);
        setIsLoading(false);

      } catch (error) {
        console.error('Error creating map:', error);
        setMapError('Failed to create map');
        setIsLoading(false);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [route, getOrderedStops]);

  // Reset map view
  const resetMapView = useCallback(() => {
    if (googleMapRef.current) {
      const stops = getOrderedStops();
      
      if (stops.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        stops.forEach(stop => {
          if (stop.location && 
              typeof stop.location.latitude === 'number' && 
              typeof stop.location.longitude === 'number') {
            bounds.extend({
              lat: stop.location.latitude,
              lng: stop.location.longitude
            });
          }
        });
        
        googleMapRef.current.fitBounds(bounds);
        const padding = { top: 50, right: 50, bottom: 50, left: 50 };
        googleMapRef.current.fitBounds(bounds, padding);
      }
    }
  }, [getOrderedStops]);

  // Open in full screen Google Maps
  const openInFullMaps = useCallback(() => {
    const stops = getOrderedStops();
    if (stops.length > 0 && stops[0].location) {
      const { latitude, longitude } = stops[0].location;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`;
      window.open(url, '_blank');
    }
  }, [getOrderedStops]);

  if (mapError) {
    return (
      <div className={`bg-gray-50 rounded-lg p-8 text-center ${className}`}>
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Map Error</h3>
        <p className="text-gray-600 mb-4">{mapError}</p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const stops = getOrderedStops();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Route Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-blue-900">
              {route.name || 'Route Map'}
            </h4>
            <p className="text-sm text-blue-700">
              {stops.length} stops • {(route.distanceKm || 0).toFixed(1)} km • Direction: {route.direction || 'OUTBOUND'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Start
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Stop
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              End
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full h-96 rounded-lg bg-gray-200 border border-gray-300"
          style={{ minHeight: '384px' }}
        />
        
        {(isLoading || !isMapLoaded) && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading route map...</p>
            </div>
          </div>
        )}

        {/* Map Controls */}
        {isMapLoaded && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <button
              onClick={resetMapView}
              className="bg-white shadow-md rounded p-2 hover:bg-gray-50 transition-colors"
              title="Reset view"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={openInFullMaps}
              className="bg-white shadow-md rounded p-2 hover:bg-gray-50 transition-colors"
              title="Open in Google Maps"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}

        {/* Coordinates overlay */}
        {isMapLoaded && stops.length > 0 && (() => {
          const firstStop = stops[0];
          const lastStop = stops[stops.length - 1];
          
          if (firstStop?.location && 
              typeof firstStop.location.latitude === 'number' && 
              typeof firstStop.location.longitude === 'number' && 
              lastStop?.location && 
              typeof lastStop.location.latitude === 'number' && 
              typeof lastStop.location.longitude === 'number') {
            return (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                Route: {firstStop.location.latitude.toFixed(4)}, {firstStop.location.longitude.toFixed(4)} → {lastStop.location.latitude.toFixed(4)}, {lastStop.location.longitude.toFixed(4)}
              </div>
            );
          }
          return null;
        })()}
      </div>

      {/* Stops List */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-900 mb-3">Route Stops ({stops.length})</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {stops.map((stop, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' : 
                    index === stops.length - 1 ? 'bg-red-500' : 
                    'bg-blue-500'
                  }`}
                />
                <span>{stop.stopName || `Stop ${index + 1}`}</span>
              </div>
              <span className="text-gray-500">
                {(stop.distanceFromStartKm || 0).toFixed(1)} km
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}