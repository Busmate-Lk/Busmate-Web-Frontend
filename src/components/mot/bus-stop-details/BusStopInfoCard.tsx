import { Edit, MapPin, Calendar, User, Check, X } from 'lucide-react';
import { BusStopResponse } from '@/types/responsedto/bus-stop';

export default function BusStopInfoCard({
  busStop,
  onEdit,
}: {
  busStop: BusStopResponse;
  onEdit: () => void;
}) {
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Stop Information
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Stop ID</span>
          <span className="font-semibold text-gray-900">{busStop.id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Stop Name</span>
          <span className="font-semibold text-gray-900">{busStop.name}</span>
        </div>

        {busStop.description && (
          <div>
            <span className="text-gray-600 block mb-2">Description</span>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
              {busStop.description}
            </p>
          </div>
        )}

        <div>
          <h4 className="text-gray-600 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location Details
          </h4>
          <div className="space-y-3 ml-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Address:</span>
              <span className="text-gray-900 text-right max-w-xs">
                {busStop.location.address}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">City:</span>
              <span className="text-gray-900">{busStop.location.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">State:</span>
              <span className="text-gray-900">{busStop.location.state}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">ZIP Code:</span>
              <span className="text-gray-900">{busStop.location.zipCode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Country:</span>
              <span className="text-gray-900">{busStop.location.country}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-gray-600 mb-3">Coordinates</h4>
          <div className="space-y-2 ml-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Latitude:</span>
              <span className="text-gray-900 font-mono">
                {busStop.location.latitude}°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Longitude:</span>
              <span className="text-gray-900 font-mono">
                {busStop.location.longitude}°
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Accessibility</span>
          <div className="flex items-center gap-2">
            {busStop.isAccessible ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">Accessible</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-medium">Not Accessible</span>
              </>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-gray-600 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Record Information
          </h4>
          <div className="space-y-3 ml-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Created:</span>
              <span className="text-gray-900 text-sm">
                {formatDate(busStop.createdAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Created By:</span>
              <span className="text-gray-900">{busStop.createdBy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Last Updated:</span>
              <span className="text-gray-900 text-sm">
                {formatDate(busStop.updatedAt)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Updated By:</span>
              <span className="text-gray-900">{busStop.updatedBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
