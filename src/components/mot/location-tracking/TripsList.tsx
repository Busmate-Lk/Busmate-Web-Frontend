'use client';

import React from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle,
  XCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

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

interface TripsListProps {
  trips: ActiveTripData[];
  selectedTrip: ActiveTripData | null;
  onTripSelect: (trip: ActiveTripData) => void;
  onTripFocus: (trip: ActiveTripData) => void;
  isLoading: boolean;
  error: string | null;
}

export function TripsList({
  trips,
  selectedTrip,
  onTripSelect,
  onTripFocus,
  isLoading,
  error
}: TripsListProps) {
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

  const getStatusIcon = (status?: string, deviceStatus?: string) => {
    if (deviceStatus === 'offline') {
      return <WifiOff className="h-4 w-4 text-red-500" />;
    }
    
    switch (status?.toLowerCase()) {
      case 'active':
      case 'in_transit':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status?: string, deviceStatus?: string) => {
    if (deviceStatus === 'offline') {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    switch (status?.toLowerCase()) {
      case 'active':
      case 'in_transit':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'delayed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Trips</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (isLoading && trips.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
        <p className="text-gray-600">Loading active trips...</p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="p-6 text-center">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trips</h3>
        <p className="text-gray-600">No trips are currently being tracked.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Active Trips ({trips.length})
        </h3>
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        )}
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
              selectedTrip?.id === trip.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => onTripSelect(trip)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {getStatusIcon(trip.status, trip.deviceStatus)}
                  <span className="font-semibold text-gray-900">
                    {trip.bus?.registrationNumber || `Bus ${trip.busId}`}
                  </span>
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(trip.status, trip.deviceStatus)}`}>
                  {trip.deviceStatus === 'online' ? (
                    <Wifi className="h-3 w-3" />
                  ) : (
                    <WifiOff className="h-3 w-3" />
                  )}
                  {trip.deviceStatus || 'unknown'}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTripFocus(trip);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Focus
              </button>
            </div>

            {/* Route Info */}
            {trip.route?.name && (
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Route:</span>
                <span className="text-sm font-medium text-gray-900">{trip.route.name}</span>
              </div>
            )}

            {/* Speed & Location */}
            {trip.currentLocation && (
              <div className="grid grid-cols-2 gap-4 mb-3">
                {trip.currentLocation.speed !== undefined && (
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {trip.currentLocation.speed.toFixed(1)} km/h
                      </div>
                      <div className="text-xs text-gray-500">Speed</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatTime(trip.currentLocation.timestamp)}
                    </div>
                    <div className="text-xs text-gray-500">Last update</div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Stop & ETA */}
            {(trip.nextStop || trip.estimatedArrival) && (
              <div className="space-y-1 mb-3">
                {trip.nextStop && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">Next:</span>
                    <span className="text-xs font-medium text-gray-900">{trip.nextStop}</span>
                  </div>
                )}
                {trip.estimatedArrival && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">ETA:</span>
                    <span className="text-xs font-medium text-gray-900">
                      {formatTime(trip.estimatedArrival)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {trip.progress !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Trip Progress</span>
                  <span>{trip.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trip.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Capacity */}
            {trip.bus?.capacity && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Capacity:</span>
                <span className="text-sm font-medium text-gray-900">
                  {trip.bus.capacity} seats
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}