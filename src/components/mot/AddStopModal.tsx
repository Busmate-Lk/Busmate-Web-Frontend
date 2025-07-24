'use client';

import { useState } from 'react';
import { X, MapPin, AlertCircle, Save } from 'lucide-react';

interface BusStopFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  facilities: string[];
}

interface AddStopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStopAdded: (stop: any) => void;
}

const availableFacilities = [
  { id: 'parking', label: 'Parking' },
  { id: 'shelter', label: 'Shelter' },
  { id: 'ticket_booth', label: 'Ticket Booth' },
  { id: 'restroom', label: 'Restroom' },
  { id: 'refreshments', label: 'Refreshments' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'charging_station', label: 'Charging Station' },
  { id: 'wheelchair_access', label: 'Wheelchair Access' },
];

export function AddStopModal({
  isOpen,
  onClose,
  onStopAdded,
}: AddStopModalProps) {
  const [formData, setFormData] = useState<BusStopFormData>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Sri Lanka',
    latitude: 0,
    longitude: 0,
    facilities: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (
    field: keyof BusStopFormData,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (touched[field] && errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleFacilityToggle = (facilityId: string) => {
    const newFacilities = formData.facilities.includes(facilityId)
      ? formData.facilities.filter((f) => f !== facilityId)
      : [...formData.facilities, facilityId];

    handleInputChange('facilities', newFacilities);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Stop name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Stop name must be at least 3 characters long';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip/Postal code is required';
    }

    if (formData.latitude === 0 && formData.longitude === 0) {
      newErrors.coordinates = 'Please provide valid coordinates';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const touchedFields: Record<string, boolean> = {
      name: true,
      address: true,
      city: true,
      state: true,
      zipCode: true,
      coordinates: true,
    };
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Create new stop with generated ID
      const newStop = {
        id: `stop-${Date.now()}`,
        name: formData.name.trim(),
        location: {
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zipCode: formData.zipCode.trim(),
          country: formData.country,
        },
        facilities: formData.facilities,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'current-user',
        updatedBy: 'current-user',
      };

      onStopAdded(newStop);
      onClose();

      // Reset form
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Sri Lanka',
        latitude: 0,
        longitude: 0,
        facilities: [],
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Failed to add stop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" fixed inset-0 bg-gradient-to-br from-gray-100/30 via-white/20 to-gray-200/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Bus Stop
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Stop Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Stop Name *
            </label>
            <input
              type="text"
              placeholder="e.g., Colombo Fort, Pettah Bus Stand"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleFieldBlur('name')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                touched.name && errors.name
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {touched.name && errors.name && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Address *
            </label>
            <input
              type="text"
              placeholder="e.g., 1 Fort Road, Main Street"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              onBlur={() => handleFieldBlur('address')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                touched.address && errors.address
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {touched.address && errors.address && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                placeholder="e.g., Colombo"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onBlur={() => handleFieldBlur('city')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.city && errors.city
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.city && errors.city && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.city}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                State/Province *
              </label>
              <input
                type="text"
                placeholder="e.g., Western"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                onBlur={() => handleFieldBlur('state')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.state && errors.state
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.state && errors.state && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Zip/Postal Code *
              </label>
              <input
                type="text"
                placeholder="e.g., 00100"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                onBlur={() => handleFieldBlur('zipCode')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.zipCode && errors.zipCode
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.zipCode && errors.zipCode && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.zipCode}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Latitude *
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="e.g., 6.9344"
                value={formData.latitude || ''}
                onChange={(e) =>
                  handleInputChange('latitude', parseFloat(e.target.value) || 0)
                }
                onBlur={() => handleFieldBlur('coordinates')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.coordinates && errors.coordinates
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Longitude *
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="e.g., 79.8428"
                value={formData.longitude || ''}
                onChange={(e) =>
                  handleInputChange(
                    'longitude',
                    parseFloat(e.target.value) || 0
                  )
                }
                onBlur={() => handleFieldBlur('coordinates')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  touched.coordinates && errors.coordinates
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          {touched.coordinates && errors.coordinates && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.coordinates}
            </p>
          )}

          {/* Facilities
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Available Facilities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableFacilities.map((facility) => (
                <label
                  key={facility.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.facilities.includes(facility.id)}
                    onChange={() => handleFacilityToggle(facility.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {facility.label}
                  </span>
                </label>
              ))}
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Adding...' : 'Add Stop'}
          </button>
        </div>
      </div>
    </div>
  );
}
