import { Eye, Edit, Trash2, MapPin, Check, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { StopResponse } from '@/lib/api-client/route-management';

interface BusStopTableProps {
  busStops: StopResponse[];
  loading: boolean;
  onSort?: (sortBy: string, sortDir: 'asc' | 'desc') => void;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  onDelete?: (busStop: StopResponse) => void; // Changed: now passes the bus stop object
}

function getAccessibilityBadge(isAccessible?: boolean) {
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
  onSort,
  sortBy = 'name',
  sortDir = 'asc',
  onDelete,
}: BusStopTableProps) {
  const router = useRouter();

  const handleSort = (field: string) => {
    if (onSort) {
      const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
      onSort(field, newSortDir);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const SortableHeader = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Bus Stops Directory
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {busStops?.length || 0} bus stops found
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="name">Stop Name</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <SortableHeader field="city">City/State</SortableHeader>
              <SortableHeader field="isAccessible">Accessibility</SortableHeader>
              <SortableHeader field="createdAt">Created</SortableHeader>
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
                <tr key={stop.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {stop.name || 'Unnamed Stop'}
                      </div>
                      {stop.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {stop.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        {stop.location?.latitude && stop.location?.longitude ? (
                          <div className="font-mono text-xs mb-1">
                            {stop.location.latitude.toFixed(4)},{' '}
                            {stop.location.longitude.toFixed(4)}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 mb-1">No coordinates</div>
                        )}
                        <div className="text-gray-600 text-xs max-w-xs truncate">
                          {stop.location?.address || 'No address provided'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {stop.location?.city || 'Unknown City'}
                      </div>
                      <div className="text-gray-500">
                        {stop.location?.state || 'Unknown State'}
                      </div>
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
                          router.push(`/mot/bus-stops/${stop.id}`)
                        }
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/mot/bus-stops/${stop.id}/edit`)
                        }
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(stop)} // Changed: pass the whole stop object
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
