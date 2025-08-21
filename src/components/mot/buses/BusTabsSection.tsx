'use client';

import { useState } from 'react';
import { 
  RouteIcon, 
  FileText, 
  Activity, 
  MapPin, 
  MoreHorizontal, 
  Building2,
  RefreshCw,
  ExternalLink,
  Calendar,
  Clock,
  Bus,
  AlertCircle
} from 'lucide-react';
import type { BusResponse, OperatorResponse } from '@/lib/api-client/route-management';

interface TabType {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface BusTabsSectionProps {
  bus: BusResponse;
  operator?: OperatorResponse | null;
  onRefresh: () => Promise<void>;
}

export function BusTabsSection({ 
  bus, 
  operator,
  onRefresh 
}: BusTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('trips');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const tabs: TabType[] = [
    { 
      id: 'trips', 
      label: 'Trips & Schedules', 
      icon: <RouteIcon className="w-4 h-4" />, 
      count: 0 // TODO: Get from API
    },
    { 
      id: 'operator', 
      label: 'Operator Details', 
      icon: <Building2 className="w-4 h-4" />
    },
    { 
      id: 'permits', 
      label: 'Service Permits', 
      icon: <FileText className="w-4 h-4" />,
      count: 0 // TODO: Get from API
    },
    { 
      id: 'tracking', 
      label: 'Tracking & Location', 
      icon: <MapPin className="w-4 h-4" />
    },
    { 
      id: 'maintenance', 
      label: 'Maintenance', 
      icon: <Activity className="w-4 h-4" />
    },
    { 
      id: 'more', 
      label: 'More', 
      icon: <MoreHorizontal className="w-4 h-4" />
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return '';
    
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'inactive':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const renderTripsTab = () => (
    <div className="space-y-4">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Trip Assignments</h3>
          <p className="text-sm text-gray-600">Scheduled trips and routes for this bus</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Placeholder for trips */}
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <RouteIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Trip Management</h3>
        <p className="text-gray-600 mb-4">
          Trip and schedule assignments for this bus will be displayed here.
        </p>
        <div className="text-sm text-gray-500">
          <p>Features coming soon:</p>
          <ul className="mt-2 space-y-1">
            <li>• Active route assignments</li>
            <li>• Schedule management</li>
            <li>• Trip history</li>
            <li>• Performance metrics</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderOperatorTab = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Operator Information</h3>
          <p className="text-sm text-gray-600">Details about the bus owner/operator</p>
        </div>
        {operator && (
          <button
            onClick={() => window.open(`/mot/users/operators/${operator.id}`, '_blank')}
            className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Profile
          </button>
        )}
      </div>

      {operator ? (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{operator.name}</h4>
                  <p className="text-sm text-gray-600">
                    {operator.operatorType} Operator
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Operator ID:</span>
                  <span className="font-medium">{operator.id?.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    operator.operatorType === 'PRIVATE' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {operator.operatorType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={getStatusBadge(operator.status)}>
                    {operator.status?.charAt(0).toUpperCase() + (operator.status?.slice(1) || '')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Region:</span>
                  <span className="font-medium">{operator.region || 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Contact & Additional Info */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-900">Contact Information</h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Person:</span>
                  <span className="font-medium">{operator.contactPerson || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{operator.phoneNumber || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{operator.email || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-right max-w-48">
                    {operator.address || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Date:</span>
                <span className="font-medium">{formatDate(operator.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{formatDate(operator.updatedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License Number:</span>
                <span className="font-medium">{operator.licenseNumber || 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Operator Information</h3>
          <p className="text-gray-600">
            Operator details are not available for this bus.
          </p>
        </div>
      )}
    </div>
  );

  const renderPlaceholderTab = (
    title: string, 
    description: string, 
    icon: React.ReactNode,
    features: string[]
  ) => (
    <div className="space-y-4">
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-gray-500">
          <p>Features coming soon:</p>
          <ul className="mt-2 space-y-1">
            {features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trips':
        return renderTripsTab();
      case 'operator':
        return renderOperatorTab();
      case 'permits':
        return renderPlaceholderTab(
          'Service Permit Assignments',
          'View and manage passenger service permit assignments for this bus.',
          <FileText className="w-8 h-8 text-gray-400" />,
          [
            'Active permit assignments',
            'Permit history',
            'Route authorizations',
            'Compliance status'
          ]
        );
      case 'tracking':
        return renderPlaceholderTab(
          'GPS Tracking & Location',
          'Real-time location tracking and route monitoring for this bus.',
          <MapPin className="w-8 h-8 text-gray-400" />,
          [
            'Real-time GPS location',
            'Route tracking',
            'Geofencing alerts',
            'Location history'
          ]
        );
      case 'maintenance':
        return renderPlaceholderTab(
          'Maintenance Records',
          'Track maintenance schedules, repairs, and vehicle health status.',
          <Activity className="w-8 h-8 text-gray-400" />,
          [
            'Maintenance schedules',
            'Repair history',
            'Vehicle health monitoring',
            'Cost tracking'
          ]
        );
      case 'more':
        return renderPlaceholderTab(
          'Additional Features',
          'Extended functionality and detailed analytics for bus management.',
          <MoreHorizontal className="w-8 h-8 text-gray-400" />,
          [
            'Revenue analytics',
            'Performance reports',
            'Driver assignments',
            'Insurance details'
          ]
        );
      default:
        return renderTripsTab();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}