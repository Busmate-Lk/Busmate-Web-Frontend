import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 6.9271, // Example: Colombo, Sri Lanka
  lng: 79.8612
};

export default function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Store your key in .env.local
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Marker position={center} />
    </GoogleMap>
  );
}