import { MapPin, Search, Navigation, ExternalLink } from 'lucide-react';
import { BusStopResponse } from '@/types/responsedto/bus-stop';

export default function BusStopMapCard({
  busStop,
}: {
  busStop: BusStopResponse;
}) {
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${busStop.location.latitude},${busStop.location.longitude}`;
    window.open(url, '_blank');
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${busStop.location.latitude},${busStop.location.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Location Map</h3>
        <button
          onClick={openInGoogleMaps}
          className="p-2 rounded hover:bg-gray-100 text-blue-600"
          title="Open in Google Maps"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-80 flex flex-col items-center justify-center relative overflow-hidden mb-4 border">
        <div className="bg-blue-600 text-white p-3 rounded-full mb-4 shadow-lg">
          <MapPin className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-1 text-center px-4">
          {busStop.name}
        </h4>
        <p className="text-gray-600 text-sm mb-2 font-mono">
          {busStop.location.latitude.toFixed(6)}°,{' '}
          {busStop.location.longitude.toFixed(6)}°
        </p>
        <p className="text-gray-500 text-xs mb-2 text-center px-4">
          {busStop.location.address}
        </p>
        <p className="text-gray-400 text-xs">
          Click "Open in Maps" for interactive view
        </p>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, #3b82f6 1px, transparent 1px),
              linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
            `,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={openInGoogleMaps}
          className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors"
        >
          <Search className="w-4 h-4 mr-2" />
          Open in Maps
        </button>
        <button
          onClick={getDirections}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center transition-colors"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <h5 className="text-sm font-medium text-gray-700 mb-2">
          Address Details
        </h5>
        <div className="text-sm text-gray-600 space-y-1">
          <div>
            {busStop.location.city}, {busStop.location.state}
          </div>
          <div>
            {busStop.location.zipCode}, {busStop.location.country}
          </div>
        </div>
      </div>
    </div>
  );
}
