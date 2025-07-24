'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Users,
  Clock,
  Wrench,
  Edit2,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  dummyTimeKeepers,
  dummyOperators,
  busStations,
} from '@/lib/data/staffData';
import { TimeKeeper, Operator } from '@/types/models/staff';
import Link from 'next/link';
import { Layout } from '@/components/shared/layout';

type StaffMember = (TimeKeeper | Operator) & {
  type: 'timekeeper' | 'operator';
};
type TabType = 'all' | 'timekeeper' | 'operator';

export default function UnifiedStaffManagementPage() {
  const [timeKeepers, setTimeKeepers] =
    useState<TimeKeeper[]>(dummyTimeKeepers);
  const [operators, setOperators] = useState<Operator[]>(dummyOperators);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');

  // Combine both types of staff into a single array
  const allStaff: StaffMember[] = [
    ...timeKeepers.map((tk) => ({ ...tk, type: 'timekeeper' as const })),
    ...operators.map((op) => ({ ...op, type: 'operator' as const })),
  ];

  const filteredStaff = allStaff.filter((staff) => {
    // Tab filter
    if (activeTab !== 'all' && staff.type !== activeTab) return false;

    // Search filter
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staff.type === 'operator' &&
        (staff as Operator).licenseNumber
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()));

    // Status filter
    const matchesStatus =
      statusFilter === 'all' || staff.status === statusFilter;

    // Station filter (only applies to timekeepers)
    const matchesStation =
      stationFilter === 'all' ||
      staff.type === 'operator' ||
      (staff.type === 'timekeeper' &&
        (staff as TimeKeeper).workingBusStation === stationFilter);

    // Experience filter (only applies to operators)
    let matchesExperience = true;
    if (experienceFilter !== 'all' && staff.type === 'operator') {
      const experience = (staff as Operator).experienceYears || 0;
      switch (experienceFilter) {
        case '0-2':
          matchesExperience = experience >= 0 && experience <= 2;
          break;
        case '3-5':
          matchesExperience = experience >= 3 && experience <= 5;
          break;
        case '6-10':
          matchesExperience = experience >= 6 && experience <= 10;
          break;
        case '10+':
          matchesExperience = experience > 10;
          break;
      }
    }

    return (
      matchesSearch && matchesStatus && matchesStation && matchesExperience
    );
  });

  const handleDelete = (id: string, type: 'timekeeper' | 'operator') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'timekeeper') {
        setTimeKeepers((prev) => prev.filter((tk) => tk.id !== id));
      } else {
        setOperators((prev) => prev.filter((op) => op.id !== id));
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
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

  const getTypeBadge = (type: 'timekeeper' | 'operator') => {
    return type === 'timekeeper'
      ? 'px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
      : 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
  };

  const getExperienceBadge = (years: number) => {
    if (years <= 2) return 'bg-yellow-100 text-yellow-800';
    if (years <= 5) return 'bg-blue-100 text-blue-800';
    if (years <= 10) return 'bg-purple-100 text-purple-800';
    return 'bg-green-100 text-green-800';
  };

  const uniqueStations = [
    ...new Set(timeKeepers.map((tk) => tk.workingBusStation)),
  ];

  // Calculate statistics
  const totalStaff = allStaff.length;
  const activeStaff = allStaff.filter((s) => s.status === 'active').length;
  const inactiveStaff = allStaff.filter((s) => s.status === 'inactive').length;
  const suspendedStaff = allStaff.filter(
    (s) => s.status === 'suspended'
  ).length;
  const avgOperatorExperience =
    operators.length > 0
      ? (
          operators.reduce((sum, op) => sum + (op.experienceYears || 0), 0) /
          operators.length
        ).toFixed(1)
      : '0';

  return (
    <Layout
      role="mot"
      activeItem="staff"
      pageTitle="Staff Management"
      pageDescription="Manage Time Keeper and Bus Operator Accounts"
    >
      <div className="space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            
            <div className="flex space-x-3">
              <Link
                href="/mot/staff-form?type=timekeeper"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Time Keeper
              </Link>
              <Link
                href="/mot/staff-form?type=operator"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Operator
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Staff
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalStaff}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Time Keepers
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {timeKeepers.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Operators</p>
                  <p className="text-2xl font-bold text-green-600">
                    {operators.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {activeStaff}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Experience
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {avgOperatorExperience}y
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'all'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Staff ({totalStaff})
                </button>
                <button
                  onClick={() => setActiveTab('timekeeper')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'timekeeper'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Time Keepers ({timeKeepers.length})
                </button>
                <button
                  onClick={() => setActiveTab('operator')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'operator'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Operators ({operators.length})
                </button>
              </nav>
            </div>

            {/* Filters */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, NIC, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>

                {/* Station Filter (visible when showing timekeepers) */}
                {(activeTab === 'all' || activeTab === 'timekeeper') && (
                  <select
                    value={stationFilter}
                    onChange={(e) => setStationFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Stations</option>
                    {uniqueStations.map((station) => (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    ))}
                  </select>
                )}

                {/* Experience Filter (visible when showing operators) */}
                {(activeTab === 'all' || activeTab === 'operator') && (
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((staff) => (
                    <tr
                      key={`${staff.type}-${staff.id}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900">
                                {staff.name}
                              </div>
                              <span className={getTypeBadge(staff.type)}>
                                {staff.type === 'timekeeper'
                                  ? 'Time Keeper'
                                  : 'Operator'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              NIC: {staff.nic}
                            </div>
                            <div className="text-sm text-gray-500">
                              DOB:{' '}
                              {new Date(staff.dateOfBirth).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {staff.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {staff.contactNo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.type === 'timekeeper' ? (
                          <div className="text-sm text-gray-900">
                            {(staff as TimeKeeper).workingBusStation}
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm text-gray-900">
                              {(staff as Operator).licenseNumber}
                            </div>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getExperienceBadge(
                                (staff as Operator).experienceYears || 0
                              )}`}
                            >
                              {(staff as Operator).experienceYears} years
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(staff.status)}>
                          {staff.status.charAt(0).toUpperCase() +
                            staff.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/mot/staff-details?id=${staff.id}&type=${staff.type}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/mot/staff-form?id=${staff.id}&type=${staff.type}`}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(staff.id, staff.type)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStaff.length === 0 && (
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
                  No staff members found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {searchTerm ||
                  statusFilter !== 'all' ||
                  stationFilter !== 'all' ||
                  experienceFilter !== 'all'
                    ? 'Try adjusting your search criteria.'
                    : 'Get started by adding new staff members.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
