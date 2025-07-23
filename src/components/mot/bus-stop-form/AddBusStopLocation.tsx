import { MapPin, Map } from 'lucide-react';
import { BusStopFormData } from '@/types/models/BusStop';

export default function AddBusStopLocation({
  formData,
  handleInputChange,
}: {
  formData: BusStopFormData;
  handleInputChange: (field: string, value: string | number | boolean) => void;
}) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">
            Location Details
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude *
            </label>
            <input
              type="number"
              step="any"
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., 6.9271"
              value={formData.location.latitude}
              onChange={(e) =>
                handleInputChange(
                  'location.latitude',
                  parseFloat(e.target.value) || 0
                )
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude *
            </label>
            <input
              type="number"
              step="any"
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., 79.8612"
              value={formData.location.longitude}
              onChange={(e) =>
                handleInputChange(
                  'location.longitude',
                  parseFloat(e.target.value) || 0
                )
              }
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address *
          </label>
          <textarea
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="Enter the complete address of the bus stop..."
            value={formData.location.address}
            onChange={(e) =>
              handleInputChange('location.address', e.target.value)
            }
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., Colombo"
              value={formData.location.city}
              onChange={(e) =>
                handleInputChange('location.city', e.target.value)
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State/Province *
            </label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., Western Province"
              value={formData.location.state}
              onChange={(e) =>
                handleInputChange('location.state', e.target.value)
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zip Code
            </label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., 00100"
              value={formData.location.zipCode}
              onChange={(e) =>
                handleInputChange('location.zipCode', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
              placeholder="e.g., Sri Lanka"
              value={formData.location.country}
              onChange={(e) =>
                handleInputChange('location.country', e.target.value)
              }
              required
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Map className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-lg text-gray-900">
            Location Preview
          </span>
        </div>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Interactive map will appear here</p>
          <p className="text-sm text-gray-500">
            {formData.location.latitude && formData.location.longitude
              ? `Location: ${formData.location.latitude}, ${formData.location.longitude}`
              : 'Enter coordinates to see location preview'}
          </p>
          <button
            type="button"
            className="mt-4 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Open Full Screen Map
          </button>
        </div>
      </div>
    </>
  );
}
