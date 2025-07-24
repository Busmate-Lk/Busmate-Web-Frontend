'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit2,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  MapPin,
  Award,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import { TimeKeeper, Operator } from '@/types/models/staff';
import { dummyTimeKeepers, dummyOperators } from '@/lib/data/staffData';
import Link from 'next/link';

export default function StaffDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const staffType = searchParams.get('type') as 'timekeeper' | 'operator';
  const staffId = searchParams.get('id');

  const [staffMember, setStaffMember] = useState<TimeKeeper | Operator | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (staffId && staffType) {
      let foundStaff: TimeKeeper | Operator | undefined;

      if (staffType === 'timekeeper') {
        foundStaff = dummyTimeKeepers.find((tk) => tk.id === staffId);
      } else {
        foundStaff = dummyOperators.find((op) => op.id === staffId);
      }

      if (foundStaff) {
        setStaffMember(foundStaff);
      }
      setLoading(false);
    }
  }, [staffId, staffType]);

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getExperienceBadge = (years: number) => {
    if (years <= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (years <= 5) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (years <= 10) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!staffMember) {
    return (
      <div className="space-y-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Staff member not found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              The staff member you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isTimeKeeper = staffType === 'timekeeper';
  const timeKeeper = isTimeKeeper ? (staffMember as TimeKeeper) : null;
  const operator = !isTimeKeeper ? (staffMember as Operator) : null;

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {staffMember.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {isTimeKeeper ? 'Time Keeper' : 'Bus Operator'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={getStatusBadge(staffMember.status)}>
              {staffMember.status.charAt(0).toUpperCase() +
                staffMember.status.slice(1)}
            </span>
            <Link
              href={`/mot/staff-form?id=${staffMember.id}&type=${staffType}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
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
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <p className="text-sm text-gray-900">{staffMember.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    NIC Number
                  </label>
                  <p className="text-sm text-gray-900">{staffMember.nic}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Date of Birth
                  </label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {new Date(staffMember.dateOfBirth).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Age
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date().getFullYear() -
                      new Date(staffMember.dateOfBirth).getFullYear()}{' '}
                    years
                  </p>
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
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <a
                      href={`tel:${staffMember.contactNo}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {staffMember.contactNo}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <a
                      href={`mailto:${staffMember.email}`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {staffMember.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Role-specific Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                {isTimeKeeper ? (
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                ) : (
                  <Award className="w-5 h-5 text-gray-400 mr-2" />
                )}
                <h2 className="text-lg font-semibold text-gray-900">
                  {isTimeKeeper
                    ? 'Station Information'
                    : 'Professional Information'}
                </h2>
              </div>

              {isTimeKeeper && timeKeeper ? (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Working Bus Station
                  </label>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {timeKeeper.workingBusStation}
                    </p>
                  </div>
                </div>
              ) : operator ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      License Number
                    </label>
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-900">
                        {operator.licenseNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Experience
                    </label>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-gray-400 mr-2" />
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getExperienceBadge(
                          operator.experienceYears || 0
                        )}`}
                      >
                        {operator.experienceYears} years
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href={`/mot/staff-form?id=${staffMember.id}&type=${staffType}`}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 mr-3 text-gray-400" />
                  Edit Information
                </Link>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  Call Staff Member
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  Send Email
                </button>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Staff ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {staffMember.id}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Created At
                  </label>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {new Date(staffMember.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </label>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {new Date(staffMember.updatedAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Status
                  </label>
                  <span className={getStatusBadge(staffMember.status)}>
                    {staffMember.status.charAt(0).toUpperCase() +
                      staffMember.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistics for Operators */}
            {!isTimeKeeper && operator && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Experience Level
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getExperienceBadge(
                        operator.experienceYears || 0
                      )}`}
                    >
                      {operator.experienceYears && operator.experienceYears > 10
                        ? 'Expert'
                        : operator.experienceYears &&
                          operator.experienceYears > 5
                        ? 'Experienced'
                        : operator.experienceYears &&
                          operator.experienceYears > 2
                        ? 'Intermediate'
                        : 'Beginner'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Trips</span>
                    <span className="text-sm font-medium text-gray-900">
                      1,247
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Safety Rating</span>
                    <span className="text-sm font-medium text-green-600">
                      4.8/5.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">On-time Rate</span>
                    <span className="text-sm font-medium text-blue-600">
                      94%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
