import { FileText } from 'lucide-react';
import { BusStopRequest } from '@/types/requestdto/bus-stop';

export default function AddBusStopBasicInfo({
  formData,
  handleInputChange,
}: {
  formData: BusStopRequest;
  handleInputChange: (field: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-lg text-gray-900">
          Basic Information
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bus Stop Name *
          </label>
          <input
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="e.g., Fort Railway Station"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full border border-gray-400 rounded px-3 py-2 placeholder-gray-600"
            placeholder="Enter a description of the bus stop..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
