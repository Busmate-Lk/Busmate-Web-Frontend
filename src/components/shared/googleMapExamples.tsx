// Example usage of the enhanced GoogleMapComponent

import GoogleMapComponent from '@/components/shared/googleMap';

// Example 1: Basic map with markers
export function BasicMapExample() {
  const markers = [
    {
      id: "1",
      position: { lat: 6.9271, lng: 79.8612 },
      title: "Colombo Fort"
    },
    {
      id: "2", 
      position: { lat: 7.2906, lng: 80.6337 },
      title: "Kandy"
    }
  ];

  return (
    <GoogleMapComponent
      markers={markers}
      center={{ lat: 7.1, lng: 80.0 }}
      zoom={8}
    />
  );
}

// Example 2: Map with directions
export function DirectionsMapExample() {
  const galle = { lat: 6.0328, lng: 80.217 };
  const matara = { lat: 5.9485, lng: 80.5353 };

  return (
    <GoogleMapComponent
      showDirections={true}
      origin={galle}
      destination={matara}
      center={{
        lat: (galle.lat + matara.lat) / 2,
        lng: (galle.lng + matara.lng) / 2,
      }}
      zoom={10}
    />
  );
}

// Example 3: Bus tracking usage (similar to what's now in LiveMapView)
export function BusTrackingExample() {
  const buses = [
    {
      id: "1",
      position: { lat: 6.9271, lng: 79.8612 },
      title: "Bus NB-1234 - On Time"
    },
    {
      id: "2",
      position: { lat: 6.0535, lng: 80.221 },
      title: "Bus NB-5678 - Delayed"
    }
  ];

  return (
    <GoogleMapComponent
      markers={buses}
      center={{ lat: 6.5, lng: 80.0 }}
      zoom={9}
      containerStyle={{ width: '100%', height: '500px' }}
    />
  );
}
