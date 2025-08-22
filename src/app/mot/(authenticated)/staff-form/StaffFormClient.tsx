"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MapPin,
  Award,
} from 'lucide-react';
import { StaffFormData, TimeKeeper, Operator } from '@/types/models/staff';
import {
  dummyTimeKeepers,
  dummyOperators,
  busStations,
} from '@/lib/data/staffData';
import { Layout } from '@/components/shared/layout';

export default function StaffFormClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const staffType = searchParams.get('type') as 'timekeeper' | 'operator';
  const staffId = searchParams.get('id');
  const isEdit = !!staffId;

  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    nic: '',
    dateOfBirth: '',
    contactNo: '',
    email: '',
    workingBusStation: '',
    licenseNumber: '',
    experienceYears: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && staffId) {
      // Load existing data for editing
      let existingStaff: TimeKeeper | Operator | undefined;

      if (staffType === 'timekeeper') {
        existingStaff = dummyTimeKeepers.find((tk) => tk.id === staffId);
      } else {
        existingStaff = dummyOperators.find((op) => op.id === staffId);
      }

      if (existingStaff) {
        setFormData({
          name: existingStaff.name,
          nic: existingStaff.nic,
          dateOfBirth: existingStaff.dateOfBirth,
          contactNo: existingStaff.contactNo,
          email: existingStaff.email,
          workingBusStation:
            staffType === 'timekeeper'
              ? (existingStaff as TimeKeeper).workingBusStation
              : '',
          licenseNumber:
            staffType === 'operator'
              ? (existingStaff as Operator).licenseNumber
              : '',
          experienceYears:
            staffType === 'operator'
              ? (existingStaff as Operator).experienceYears
              : 0,
        });
      }
    }
  }, [isEdit, staffId, staffType]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.nic.trim()) {
      newErrors.nic = 'NIC is required';
    } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(formData.nic)) {
      newErrors.nic = 'Invalid NIC format';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (
      !/^\+?[0-9]{10,15}$/.test(formData.contactNo.replace(/\s/g, ''))
    ) {
      newErrors.contactNo = 'Invalid contact number format';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (staffType === 'timekeeper' && !formData.workingBusStation) {
      newErrors.workingBusStation = 'Working bus station is required';
    }

    if (staffType === 'operator') {
      if (!formData.licenseNumber?.trim()) {
        newErrors.licenseNumber = 'License number is required';
      }
      if (!formData.experienceYears || formData.experienceYears < 0) {
        newErrors.experienceYears = 'Valid experience years required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form submitted:', formData);

      // Redirect back to management page
      if (staffType === 'timekeeper') {
        router.push('/mot/staff-management');
      } else {
        router.push('/mot/operator-management');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof StaffFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getPageTitle = () => {
    if (isEdit) {
      return staffType === 'timekeeper' ? 'Edit Time Keeper' : 'Edit Operator';
    }
    return staffType === 'timekeeper'
      ? 'Add New Time Keeper'
      : 'Add New Operator';
  };

  const getPageDescription = () => {
    if (isEdit) {
      return staffType === 'timekeeper'
        ? 'Update time keeper information'
        : 'Update operator information';
    }
    return staffType === 'timekeeper'
      ? 'Add a new time keeper to the system'
      : 'Add a new operator to the system';
  };

  return (
      <div className="space-y-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 mt-1">{getPageDescription()}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nic"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    id="nic"
                    value={formData.nic}
                    onChange={(e) => handleInputChange('nic', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.nic ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter NIC number"
                  />
                  {errors.nic && (
                    <p className="mt-1 text-sm text-red-600">{errors.nic}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange('dateOfBirth', e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.dateOfBirth
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contactNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      id="contactNo"
                      value={formData.contactNo}
                      onChange={(e) =>
                        handleInputChange('contactNo', e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.contactNo ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+94712345678"
                    />
                  </div>
                  {errors.contactNo && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contactNo}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Role-specific Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                {staffType === 'timekeeper' ? (
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                ) : (
                  <Award className="w-5 h-5 text-gray-400 mr-2" />
                )}
                <h2 className="text-lg font-semibold text-gray-900">
                  {staffType === 'timekeeper'
                    ? 'Station Information'
                    : 'Professional Information'}
                </h2>
              </div>

              {staffType === 'timekeeper' ? (
                <div>
                  <label
                    htmlFor="workingBusStation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Working Bus Station *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="workingBusStation"
                      value={formData.workingBusStation}
                      onChange={(e) =>
                        handleInputChange('workingBusStation', e.target.value)
                      }
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.workingBusStation
                          ? 'border-red-300'
                          : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a bus station</option>
                      {busStations.map((station) => (
                        <option key={station} value={station}>
                          {station}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.workingBusStation && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.workingBusStation}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="licenseNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      License Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange('licenseNumber', e.target.value)
                        }
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.licenseNumber
                            ? 'border-red-300'
                            : 'border-gray-300'
                        }`}
                        placeholder="DL-123456789"
                      />
                    </div>
                    {errors.licenseNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.licenseNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="experienceYears"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Experience (Years) *
                    </label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        id="experienceYears"
                        min="0"
                        max="50"
                        value={formData.experienceYears}
                        onChange={(e) =>
                          handleInputChange(
                            'experienceYears',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.experienceYears
                            ? 'border-red-300'
                            : 'border-gray-300'
                        }`}
                        placeholder="Years of experience"
                      />
                    </div>
                    {errors.experienceYears && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.experienceYears}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
