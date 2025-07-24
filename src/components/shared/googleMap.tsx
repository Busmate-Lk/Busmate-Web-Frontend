import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

interface GoogleMapComponentProps {
  containerStyle?: React.CSSProperties;
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: { lat: number; lng: number };
    title?: string;
  }>;
  showDirections?: boolean;
  origin?: { lat: number; lng: number };
  destination?: { lat: number; lng: number };
}

const defaultContainerStyle = {
  width: '100%',
  height: '400px',
};

// Default center (Colombo, Sri Lanka)
const defaultCenter = { lat: 6.9271, lng: 79.8612 };

export default function GoogleMapComponent({
  containerStyle = defaultContainerStyle,
  center = defaultCenter,
  zoom = 10,
  markers = [],
  showDirections = false,
  origin,
  destination,
}: GoogleMapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });
  const [directions, setDirections] = useState(null);

  const directionsCallback = useCallback((result: any, status: string) => {
    if (status === 'OK') {
      setDirections(result);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div style={containerStyle} className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap 
      mapContainerStyle={containerStyle} 
      center={center} 
      zoom={zoom}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
      }}
    >
      {/* Render markers */}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
        />
      ))}

      {/* Directions Service and Renderer */}
      {showDirections && origin && destination && !directions && (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={directionsCallback}
        />
      )}
      {directions && (
        <DirectionsRenderer directions={directions} />
      )}
    </GoogleMap>
  );
}