'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Clock,
  User,
  Check,
  X,
  Navigation,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Copy,
  CheckCircle,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import { Layout } from '@/components/shared/layout';
import useBusStops from '@/hooks/use-bus-stops';
import { StopResponse } from '@/lib/api-client/route-management';
import DeleteBusStopModal from '@/components/mot/bus-stops/DeleteBusStopModal';

interface BusStopDetailsPageProps {
  params: { busStopId: string };
}

// Google Maps Mini Map Component
const BusStopMiniMap = ({ 
  latitude, 
  longitude, 
  name, 
  address 
}: { 
  latitude: number; 
  longitude: number; 
  name: string; 
  address?: string; 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Check if Google Maps is available
        if (typeof window === 'undefined' || !window.google) {
          // Load Google Maps script
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            createMap();
          };
          
          script.onerror = () => {
            setMapError('Failed to load Google Maps');
          };
          
          document.head.appendChild(script);
        } else {
          createMap();
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Error initializing map');
      }
    };

    const createMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: latitude, lng: longitude },
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          fullscreenControl: false,
          gestureHandling: 'cooperative',
        };

        // Create map
        googleMapRef.current = new google.maps.Map(mapRef.current, mapOptions);

        // Create marker
        markerRef.current = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: googleMapRef.current,
          title: name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#dc2626">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32),
          },
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h4 style="margin: 0 0 4px 0; font-weight: 600; color: #1f2937;">${name}</h4>
              ${address ? `<p style="margin: 0; font-size: 12px; color: #6b7280;">${address}</p>` : ''}
              <div style="margin-top: 8px;">
                <small style="color: #9ca3af;">Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}</small>
              </div>
            </div>
          `,
        });

        // Add click listener to marker
        markerRef.current.addListener('click', () => {
          infoWindow.open(googleMapRef.current, markerRef.current);
        });

        setIsMapLoaded(true);
        setMapError(null);
      } catch (error) {
        console.error('Error creating map:', error);
        setMapError('Error creating map');
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [latitude, longitude, name, address]);

  // Reset map view
  const resetMapView = useCallback(() => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: latitude, lng: longitude });
      googleMapRef.current.setZoom(16);
    }
  }, [latitude, longitude]);

  // Open in full screen Google Maps
  const openInFullMaps = useCallback(() => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}&z=16`;
    window.open(url, '_blank');
  }, [latitude, longitude]);

  if (mapError) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-3">{mapError}</p>
        <button
          onClick={openInFullMaps}
          className="text-blue-600 hover:text-blue-700 text-sm underline"
        >
          View on Google Maps
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-64 rounded-lg bg-gray-200"
        style={{ minHeight: '256px' }}
      />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      {isMapLoaded && (
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <button
            onClick={resetMapView}
            className="bg-white hover:bg-gray-50 p-2 rounded-md shadow-md border border-gray-200 transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={openInFullMaps}
            className="bg-white hover:bg-gray-50 p-2 rounded-md shadow-md border border-gray-200 transition-colors"
            title="Open in Google Maps"
          >
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Coordinates overlay */}
      {isMapLoaded && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default function BusStopDetailsPage({ params }: BusStopDetailsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get bus stop ID from params or search params
  const busStopId = params.busStopId || searchParams.get('id') || '';
  
  // State management
  const [busStop, setBusStop] = useState<StopResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Hook usage
  const {
    loadBusStopById,
    deleteBusStop,
    clearError: clearHookError,
  } = useBusStops();

  // Load bus stop details
  const loadBusStopDetails = useCallback(async () => {
    if (!busStopId) {
      setError('Bus stop ID is required');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await loadBusStopById(busStopId);
      if (data) {
        setBusStop(data);
      } else {
        setError('Bus stop not found');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load bus stop details');
    } finally {
      setLoading(false);
    }
  }, [busStopId, loadBusStopById]);

  // Copy to clipboard functionality
  const copyToClipboard = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, []);

  // Delete handlers
  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!busStop?.id) return;

    setIsDeleting(true);
    try {
      const success = await deleteBusStop(busStop.id);
      if (success) {
        setShowDeleteModal(false);
        // Add a small delay to show the modal closing animation
        setTimeout(() => {
          router.push('/mot/bus-stops');
        }, 300);
      }
    } catch (err) {
      console.error('Failed to delete bus stop:', err);
      // Keep the modal open on error so user can see what happened
    } finally {
      setIsDeleting(false);
    }
  }, [busStop, deleteBusStop, router]);

  // Open in Google Maps
  const openInMaps = useCallback(() => {
    if (busStop?.location?.latitude && busStop?.location?.longitude) {
      const url = `https://www.google.com/maps?q=${busStop.location.latitude},${busStop.location.longitude}`;
      window.open(url, '_blank');
    }
  }, [busStop]);

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Load data on mount
  useEffect(() => {
    loadBusStopDetails();
  }, [loadBusStopDetails]);

  // Loading state
  if (loading) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stop Details"
        pageDescription="View detailed information about this bus stop"
        role="mot"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !busStop) {
    return (
      <Layout
        activeItem="bus-stops"
        pageTitle="Bus Stop Details"
        pageDescription="View detailed information about this bus stop"
        role="mot"
      >
        <div className="mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-red-800">Error Loading Bus Stop</h3>
                <p className="text-red-700 mt-1">{error || 'Bus stop not found'}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={loadBusStopDetails}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 inline" />
                    Try Again
                  </button>
                  <button
                    onClick={() => router.push('/mot/bus-stops')}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 inline" />
                    Back to Bus Stops
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const CopyableField = ({ value, field, className = "" }: { value: string; field: string; className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex-1">{value}</span>
      <button
        onClick={() => copyToClipboard(value, field)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        title="Copy to clipboard"
      >
        {copiedField === field ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  // Check if coordinates are available for map
  const hasCoordinates = busStop.location?.latitude && busStop.location?.longitude;

  return (
    <Layout
      activeItem="bus-stops"
      pageTitle={`${busStop.name || 'Bus Stop'} - Details`}
      pageDescription="View detailed information about this bus stop"
      role="mot"
    >
      <div className="mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col items-start gap-2">
            <button
              onClick={() => router.push('/mot/bus-stops')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Bus Stops
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {busStop.name || 'Unnamed Bus Stop'}
              </h1>
              <p className="text-gray-600 mt-1">
                {busStop.location?.city && busStop.location?.state
                  ? `${busStop.location.city}, ${busStop.location.state}`
                  : 'Location information not available'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadBusStopDetails}
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={() => router.push(`/mot/bus-stops/${busStop.id}/edit`)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stop Name
                  </label>
                  <CopyableField 
                    value={busStop.name || 'N/A'} 
                    field="name"
                    className="text-lg font-medium text-gray-900"
                  />
                </div>

                {busStop.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <p className="text-gray-600 leading-relaxed">{busStop.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stop ID
                  </label>
                  <CopyableField 
                    value={busStop.id || 'N/A'} 
                    field="id"
                    className="text-sm font-mono text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Accessibility
                  </label>
                  <div className="flex items-center gap-2">
                    {busStop.isAccessible ? (
                      <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-green-700 font-medium">Accessible</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-red-500" />
                        <span className="text-red-700 font-medium">Not Accessible</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Details
              </h2>
              <div className="space-y-4">
                {busStop.location?.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <CopyableField 
                      value={busStop.location.address} 
                      field="address"
                      className="text-gray-900"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {busStop.location?.city && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <CopyableField 
                        value={busStop.location.city} 
                        field="city"
                        className="text-gray-900"
                      />
                    </div>
                  )}

                  {busStop.location?.state && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <CopyableField 
                        value={busStop.location.state} 
                        field="state"
                        className="text-gray-900"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {busStop.location?.zipCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code
                      </label>
                      <CopyableField 
                        value={busStop.location.zipCode} 
                        field="zipCode"
                        className="text-gray-900"
                      />
                    </div>
                  )}

                  {busStop.location?.country && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <CopyableField 
                        value={busStop.location.country} 
                        field="country"
                        className="text-gray-900"
                      />
                    </div>
                  )}
                </div>

                {hasCoordinates && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coordinates
                    </label>
                    <div className="flex items-center gap-4">
                      <CopyableField 
                        value={`${busStop.location!.latitude}, ${busStop.location!.longitude}`} 
                        field="coordinates"
                        className="font-mono text-gray-900"
                      />
                      <button
                        onClick={openInMaps}
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open in Maps
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Lat: {busStop.location!.latitude!.toFixed(6)}, Lng: {busStop.location!.longitude!.toFixed(6)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Map and Metadata */}
          <div className="space-y-6">
            {/* Location Map */}
            {hasCoordinates && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Location Map
                </h3>
                <BusStopMiniMap
                  latitude={busStop.location!.latitude!}
                  longitude={busStop.location!.longitude!}
                  name={busStop.name || 'Bus Stop'}
                  address={busStop.location?.address}
                />
                <div className="mt-3 text-center">
                  <button
                    onClick={openInMaps}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors underline"
                  >
                    View larger map
                  </button>
                </div>
              </div>
            )}

            {/* System Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                System Information
              </h3>
              <div className="space-y-4 text-sm">
                {busStop.createdAt && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Created At
                    </label>
                    <p className="text-gray-600">{formatDate(busStop.createdAt)}</p>
                  </div>
                )}

                {busStop.createdBy && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Created By
                    </label>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      {busStop.createdBy}
                    </div>
                  </div>
                )}

                {busStop.updatedAt && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Last Updated
                    </label>
                    <p className="text-gray-600">{formatDate(busStop.updatedAt)}</p>
                  </div>
                )}

                {busStop.updatedBy && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Updated By
                    </label>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      {busStop.updatedBy}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteBusStopModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          busStop={busStop}
          isDeleting={isDeleting}
        />
      </div>
    </Layout>
  );
}