import { Eye, Edit, Trash2, MapPin, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BusStopResponse } from '@/types/responsedto/bus-stop';
import useBusStops from '@/hooks/use-bus-stops';
import { useState } from 'react';

function getAccessibilityBadge(isAccessible: boolean) {
  if (isAccessible) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <Check className="w-3 h-3 mr-1" />
        Accessible
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <X className="w-3 h-3 mr-1" />
        Not Accessible
      </span>
    );
  }
}

export default function BusStopTable({
  busStops,
  loading,
}: {
  busStops: BusStopResponse[];
  loading: boolean;
}) {
  const router = useRouter();
  const { deleteBusStop } = useBusStops();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (stopId: string, stopName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${stopName}"? This action cannot be undone.`
      )
    ) {
      setIsDeleting(stopId);
      try {
        await deleteBusStop(stopId);
      } catch (error) {
        console.error('Failed to delete bus stop:', error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Bus Stops Directory
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stop Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                City/State
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Accessibility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-500">
                      Loading bus stops...
                    </span>
                  </div>
                </td>
              </tr>
            ) : busStops?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <div className="text-lg font-medium">
                      No bus stops found
                    </div>
                    <div className="text-sm">
                      Try adjusting your search criteria or add a new bus stop.
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              busStops?.map((stop) => (
                <tr key={stop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {stop.name}
                      </div>
                      {stop.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {stop.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <div className="text-sm">
                        <div className="font-mono">
                          {stop.location.latitude.toFixed(4)},{' '}
                          {stop.location.longitude.toFixed(4)}
                        </div>
                        <div className="text-gray-500 truncate max-w-xs">
                          {stop.location.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {stop.location.city}
                      </div>
                      <div className="text-gray-500">{stop.location.state}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getAccessibilityBadge(stop.isAccessible)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(stop.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          router.push(`/mot/bus-stop-details?id=${stop.id}`)
                        }
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/mot/bus-stop-form?id=${stop.id}`)
                        }
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stop.id, stop.name)}
                        disabled={isDeleting === stop.id}
                        className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
