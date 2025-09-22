'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { StopResponse } from '@/lib/api-client/route-management';
import { 
  MapPin, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';

interface BusStopsMapViewProps {
  busStops: StopResponse[];
  loading: boolean;
  onDelete?: (busStop: StopResponse) => void;
}

// Custom marker colors for accessibility status
const ACCESSIBLE_MARKER_COLOR = '#10B981'; // Green
const NOT_ACCESSIBLE_MARKER_COLOR = '#EF4444'; // Red
const DEFAULT_MARKER_COLOR = '#6B7280'; // Gray

// Map configuration
const DEFAULT_CENTER = { lat: 7.8731, lng: 80.7718 }; // Sri Lanka center
const DEFAULT_ZOOM = 8;
const CLUSTER_ZOOM = 12;

declare global {
  interface Window {
    google: typeof google;
    busStopMapActions?: {
      viewDetails: (id: string) => void;
      editStop: (id: string) => void;
      deleteStop: (id: string) => void;
    };
  }
}

export default function BusStopsMapView({ 
  busStops, 
  loading, 
  onDelete 
}: BusStopsMapViewProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markerClustererRef = useRef<any>(null);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedBusStop, setSelectedBusStop] = useState<StopResponse | null>(null);

  // Filter bus stops that have valid coordinates
  const validBusStops = useMemo(() => {
    return busStops.filter(stop => 
      stop.location?.latitude && 
      stop.location?.longitude &&
      !isNaN(Number(stop.location.latitude)) &&
      !isNaN(Number(stop.location.longitude))
    );
  }, [busStops]);

  // Calculate map bounds to fit all bus stops
  const getMapBounds = useCallback(() => {
    if (validBusStops.length === 0) return null;

    const bounds = new window.google.maps.LatLngBounds();
    validBusStops.forEach(stop => {
      if (stop.location?.latitude && stop.location?.longitude) {
        bounds.extend({
          lat: Number(stop.location.latitude),
          lng: Number(stop.location.longitude)
        });
      }
    });
    return bounds;
  }, [validBusStops]);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Wait for Google Maps to be available
        if (!window.google) {
          // Load Google Maps if not already loaded
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        createMap();
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
        setMapError('Failed to load Google Maps. Please check your internet connection and try again.');
      }
    };

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        // Create map instance
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: DEFAULT_ZOOM,
          center: DEFAULT_CENTER,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        });

        googleMapRef.current = map;

        // Create info window
        infoWindowRef.current = new window.google.maps.InfoWindow({
          maxWidth: 350
        });

        setIsMapLoaded(true);
        setMapError(null);

      } catch (error) {
        console.error('Error creating map:', error);
        setMapError('Error initializing map. Please refresh the page and try again.');
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
      }
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Create markers for bus stops
  useEffect(() => {
    if (!isMapLoaded || !googleMapRef.current || !window.google) return;

    // Clear existing markers
    if (markerClustererRef.current) {
      markerClustererRef.current.clearMarkers();
    }
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create new markers
    const newMarkers = validBusStops.map(stop => {
      if (!stop.location?.latitude || !stop.location?.longitude) return null;

      const position = {
        lat: Number(stop.location.latitude),
        lng: Number(stop.location.longitude)
      };

      // Choose marker color based on accessibility
      const markerColor = stop.isAccessible 
        ? ACCESSIBLE_MARKER_COLOR 
        : NOT_ACCESSIBLE_MARKER_COLOR;

      const marker = new window.google.maps.Marker({
        position,
        map: googleMapRef.current,
        title: stop.name || 'Unnamed Stop',
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 12 12 20 12 20s12-8 12-20c0-6.6-5.4-12-12-12z" fill="${markerColor}"/>
              <circle cx="12" cy="12" r="6" fill="white"/>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(24, 32),
          anchor: new window.google.maps.Point(12, 32)
        },
        animation: window.google.maps.Animation.DROP
      });

      // Add click listener to show info window
      marker.addListener('click', () => {
        setSelectedBusStop(stop);
        showInfoWindow(marker, stop);
      });

      return marker;
    }).filter(Boolean) as google.maps.Marker[];

    markersRef.current = newMarkers;

    // Initialize marker clusterer if there are many markers
    if (newMarkers.length > 10) {
      // Simple clustering logic (you might want to use @googlemaps/markerclusterer for advanced clustering)
      markerClustererRef.current = {
        clearMarkers: () => {
          newMarkers.forEach(marker => marker.setMap(null));
        }
      };
    }

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const bounds = getMapBounds();
      if (bounds) {
        googleMapRef.current.fitBounds(bounds);
        
        // Set minimum zoom level
        const listener = window.google.maps.event.addListenerOnce(googleMapRef.current, 'bounds_changed', () => {
          if (googleMapRef.current!.getZoom()! > 15) {
            googleMapRef.current!.setZoom(15);
          }
        });
      }
    }

  }, [isMapLoaded, validBusStops, getMapBounds]);

  // Show info window for a bus stop
  const showInfoWindow = (marker: google.maps.Marker, stop: StopResponse) => {
    if (!infoWindowRef.current) return;

    const accessibilityBadge = stop.isAccessible 
      ? `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
           ✓ Accessible
         </span>`
      : `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
           ✗ Not Accessible
         </span>`;

    const content = `
      <div class="p-4 min-w-[280px]">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-gray-900 pr-2">${stop.name || 'Unnamed Stop'}</h3>
          ${accessibilityBadge}
        </div>
        
        ${stop.description ? `<p class="text-sm text-gray-600 mb-3">${stop.description}</p>` : ''}
        
        <div class="space-y-2 mb-4">
          <div class="flex items-start text-sm">
            <span class="font-medium text-gray-500 w-16">Address:</span>
            <span class="text-gray-900">${stop.location?.address || 'N/A'}</span>
          </div>
          <div class="flex items-center text-sm">
            <span class="font-medium text-gray-500 w-16">City:</span>
            <span class="text-gray-900">${stop.location?.city || 'N/A'}</span>
          </div>
          <div class="flex items-center text-sm">
            <span class="font-medium text-gray-500 w-16">State:</span>
            <span class="text-gray-900">${stop.location?.state || 'N/A'}</span>
          </div>
        </div>
        
        <div class="flex gap-2 pt-2 border-t border-gray-200">
          <button 
            onclick="window.busStopMapActions.viewDetails('${stop.id}')"
            class="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            👁 View
          </button>
          <button 
            onclick="window.busStopMapActions.editStop('${stop.id}')"
            class="flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
          >
            ✏️ Edit
          </button>
          ${onDelete ? `
            <button 
              onclick="window.busStopMapActions.deleteStop('${stop.id}')"
              class="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            >
              🗑️ Delete
            </button>
          ` : ''}
        </div>
      </div>
    `;

    infoWindowRef.current.setContent(content);
    infoWindowRef.current.open(googleMapRef.current, marker);
  };

  // Map action handlers
  useEffect(() => {
    window.busStopMapActions = {
      viewDetails: (id: string) => {
        router.push(`/mot/bus-stops/${id}`);
      },
      editStop: (id: string) => {
        router.push(`/mot/bus-stops/${id}/edit`);
      },
      deleteStop: (id: string) => {
        const stop = busStops.find(s => s.id === id);
        if (stop && onDelete) {
          onDelete(stop);
        }
      }
    };

    return () => {
      delete window.busStopMapActions;
    };
  }, [router, busStops, onDelete]);

  // Map control handlers
  const handleZoomIn = () => {
    if (googleMapRef.current) {
      const currentZoom = googleMapRef.current.getZoom();
      if (currentZoom !== undefined) {
        googleMapRef.current.setZoom(Math.min(currentZoom + 1, 20));
      }
    }
  };

  const handleZoomOut = () => {
    if (googleMapRef.current) {
      const currentZoom = googleMapRef.current.getZoom();
      if (currentZoom !== undefined) {
        googleMapRef.current.setZoom(Math.max(currentZoom - 1, 1));
      }
    }
  };

  const handleResetView = () => {
    if (googleMapRef.current && validBusStops.length > 0) {
      const bounds = getMapBounds();
      if (bounds) {
        googleMapRef.current.fitBounds(bounds);
      } else {
        googleMapRef.current.setCenter(DEFAULT_CENTER);
        googleMapRef.current.setZoom(DEFAULT_ZOOM);
      }
    }
  };

  const handleFindMyLocation = () => {
    if (navigator.geolocation && googleMapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          googleMapRef.current!.setCenter(userLocation);
          googleMapRef.current!.setZoom(12);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (mapError) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Bus Stops Map</h3>
          <p className="text-sm text-gray-600 mt-1">Visual representation of all bus stops</p>
        </div>
        <div className="p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h4>
          <p className="text-gray-600 mb-4">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Bus Stops Map</h3>
            <p className="text-sm text-gray-600 mt-1">
              {validBusStops.length} of {busStops.length} bus stops displayed
              {validBusStops.length !== busStops.length && (
                <span className="text-orange-600 ml-1">
                  ({busStops.length - validBusStops.length} stops without coordinates)
                </span>
              )}
            </p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: ACCESSIBLE_MARKER_COLOR }}
              ></div>
              <span className="text-gray-600">Accessible</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: NOT_ACCESSIBLE_MARKER_COLOR }}
              ></div>
              <span className="text-gray-600">Not Accessible</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full h-96 bg-gray-200"
          style={{ minHeight: '720px' }}
        />

        {/* Loading overlay */}
        {(loading || !isMapLoaded) && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <span className="text-gray-600">
                {loading ? 'Loading bus stops...' : 'Initializing map...'}
              </span>
            </div>
          </div>
        )}

        {/* Map controls */}
        {isMapLoaded && (
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white shadow-md rounded-md hover:bg-gray-50 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white shadow-md rounded-md hover:bg-gray-50 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 bg-white shadow-md rounded-md hover:bg-gray-50 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleFindMyLocation}
              className="p-2 bg-white shadow-md rounded-md hover:bg-gray-50 transition-colors"
              title="Find My Location"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Statistics */}
        {isMapLoaded && validBusStops.length === 0 && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Bus Stops to Display</h4>
              <p className="text-gray-600">
                No bus stops have valid coordinates for map display.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}