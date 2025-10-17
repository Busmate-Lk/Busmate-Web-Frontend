'use client';

import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Calendar,
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  MapPin,
  Users,
  Eye,
  FileText,
  MoreVertical
} from 'lucide-react';
import { TripResponse } from '@/lib/api-client/route-management';

interface TimeKeeperTripsTableProps {
  trips: TripResponse[];
  onView: (tripId: string) => void;
  onAddNotes: (tripId: string) => void;
  onSort: (sortBy: string, sortDir: 'asc' | 'desc') => void;
  activeFilters: Record<string, any>;
  loading: boolean;
  currentSort: { field: string; direction: 'asc' | 'desc' };
}

export function TimeKeeperTripsTable({
  trips,
  onView,
  onAddNotes,
  onSort,
  activeFilters,
  loading,
  currentSort,
}: TimeKeeperTripsTableProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getSortIcon = (field: string) => {
    if (currentSort.field !== field) {
      return <ChevronUp className="w-4 h-4 text-gray-300" />;
    }
    return currentSort.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const handleSort = (field: string) => {
    const newDirection = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
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

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    try {
      const timePart = timeString.includes('T') ? timeString.split('T')[1] : timeString;
      const [hours, minutes] = timePart.split(':');
      return `${hours}:${minutes}`;
    } catch {
      return 'Invalid time';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'delayed':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'in_transit':
        return <MapPin className="w-4 h-4 text-blue-600" />;
      case 'boarding':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'departed':
        return <CheckCircle className="w-4 h-4 text-indigo-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return 'Unknown';
    return status.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'delayed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'boarding':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'departed':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  if (loading && trips.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading trips...</p>
        </div>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-500 mb-4">
            {Object.keys(activeFilters).length > 0
              ? "No trips match your current filters. Try adjusting your search criteria."
              : "No trips are scheduled for your assigned station."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('tripDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {getSortIcon('tripDate')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operator
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('scheduledDepartureTime')}
              >
                <div className="flex items-center space-x-1">
                  <span>Departure</span>
                  {getSortIcon('scheduledDepartureTime')}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('scheduledArrivalTime')}
              >
                <div className="flex items-center space-x-1">
                  <span>Arrival</span>
                  {getSortIcon('scheduledArrivalTime')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus / PSP
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(trip.tripDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{trip.routeName || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{trip.routeGroupName || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trip.operatorName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{formatTime(trip.scheduledDepartureTime)}</div>
                  {trip.actualDepartureTime && (
                    <div className="text-xs text-gray-500">Act: {formatTime(trip.actualDepartureTime)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{formatTime(trip.scheduledArrivalTime)}</div>
                  {trip.actualArrivalTime && (
                    <div className="text-xs text-gray-500">Act: {formatTime(trip.actualArrivalTime)}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center text-gray-900">
                      <span className="font-medium mr-1">Bus:</span>
                      {trip.busPlateNumber || 'Not assigned'}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium mr-1">PSP:</span>
                      {trip.passengerServicePermitNumber || 'Not assigned'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(trip.status)}`}>
                    {getStatusIcon(trip.status)}
                    <span className="ml-1">{getStatusLabel(trip.status)}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {trip.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onView(trip.id!)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddNotes(trip.id!)}
                      className="text-green-600 hover:text-green-900"
                      title="Add/Edit notes"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
