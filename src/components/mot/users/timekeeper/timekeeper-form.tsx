'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  AlertCircle,
  User,
} from 'lucide-react';
import { TimekeeperControllerService } from '@/lib/api-client/user-management/services/TimekeeperControllerService';

//  Add manual interfaces since no models were generated
interface TimekeeperRequest {
  fullname: string;
  phonenumber: string;
  email: string;
  assign_stand: string;
  nic: string;
  province: string;
  password: string;
}

interface TimekeeperResponse {
  id: string;
  fullname: string;
  phonenumber: string;
  email: string;
  assign_stand: string;
  nic: string;
  province: string;
  user_id?: string;
  createdAt?: string;
}

interface TimekeeperFormProps {
  timekeeperId?: string;
  onSuccess?: (timekeeper: TimekeeperResponse) => void;
  onCancel?: () => void;
}

interface FormData extends TimekeeperRequest {}

interface FormErrors {
  fullname?: string;
  phonenumber?: string;
  email?: string;
  assign_stand?: string;
  nic?: string;
  province?: string;
  password?: string;
  general?: string;
}

const SRI_LANKAN_PROVINCES = [
  'Western Province',
  'Central Province',
  'Southern Province',
  'Northern Province',
  'Eastern Province',
  'North Western Province',
  'North Central Province',
  'Uva Province',
  'Sabaragamuwa Province',
];

export default function TimekeeperForm({ timekeeperId, onSuccess, onCancel }: TimekeeperFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    phonenumber: '',
    email: '',
    assign_stand: '',
    nic: '',
    province: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isEditMode = !!timekeeperId;

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!formData.phonenumber.trim()) newErrors.phonenumber = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.assign_stand.trim()) newErrors.assign_stand = 'Assigned stand is required';
    if (!formData.nic.trim()) newErrors.nic = 'NIC is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    if (!isEditMode && (!formData.password || formData.password.length < 6))
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Updated submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      let result: TimekeeperResponse | undefined;

      if (isEditMode && timekeeperId) {
        setErrors({ general: 'Edit feature not yet implemented for timekeepers.' });
      } else {
        result = await TimekeeperControllerService.signup(formData);
      }

      if (result) {
        if (onSuccess) onSuccess(result);
        else router.push('/mot/users/timekeepers');
      } else {
        setErrors({ general: 'Failed to register timekeeper' });
      }
    } catch (error: any) {
      console.error('Error saving timekeeper:', error);
      let message = 'Failed to register timekeeper';
      if (error?.status === 409) message = 'A timekeeper with this email or phone already exists';
      else if (error?.status === 400) message = 'Invalid input data';
      else if (error?.message) message = error.message;
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.push('/mot/users/timekeepers');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Timekeeper Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) => handleInputChange('fullname', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.fullname ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.fullname && <p className="text-red-600 text-sm mt-1">{errors.fullname}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phonenumber}
              onChange={(e) => handleInputChange('phonenumber', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.phonenumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phonenumber && <p className="text-red-600 text-sm mt-1">{errors.phonenumber}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* NIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nic}
              onChange={(e) => handleInputChange('nic', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.nic ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter NIC number"
            />
            {errors.nic && <p className="text-red-600 text-sm mt-1">{errors.nic}</p>}
          </div>

          {/* Assigned Stand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Stand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.assign_stand}
              onChange={(e) => handleInputChange('assign_stand', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.assign_stand ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Colombo Central Stand"
            />
            {errors.assign_stand && (
              <p className="text-red-600 text-sm mt-1">{errors.assign_stand}</p>
            )}
          </div>

          {/* Province */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.province ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a province</option>
              {SRI_LANKAN_PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password{' '}
              {isEditMode ? (
                <span className="text-gray-400 text-xs">(leave blank to keep current)</span>
              ) : (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={isEditMode ? 'Enter new password' : 'Enter password (min 6 chars)'}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !isDirty}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isEditMode ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {isEditMode ? 'Update Timekeeper' : 'Create Timekeeper'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
