'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckSquare, 
  Square, 
  MapPin, 
  User, 
  Bus, 
  AlertCircle, 
  CheckCircle,
  X,
  Eye,
  Filter,
  Grid,
  List
} from 'lucide-react';
import type { WorkspaceState } from '../TripAssignmentWorkspace';
import type { TripResponse } from '@/lib/api-client/route-management/models/TripResponse';
import { TripContextMenu } from './TripContextMenu';
import { TripDetailsModal } from './TripDetailsModal';
import { TripManagementService } from '@/lib/api-client/route-management/services/TripManagementService';

interface TripsWorkspaceProps {
  workspace: WorkspaceState;
  onTripSelect: (tripId: string, multi: boolean) => void;
  activeSection: 'planning' | 'assignments' | 'monitoring';
  onRefreshTrips?: () => void;
}

export function TripsWorkspace({
  workspace,
  onTripSelect,
  activeSection,
  onRefreshTrips,
}: TripsWorkspaceProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');
  const [selectedTripForDetails, setSelectedTripForDetails] = useState<TripResponse | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getFilteredTrips = () => {
    let filtered = workspace.trips;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(trip => trip.status === statusFilter);
    }

    // Assignment filter
    if (assignmentFilter === 'assigned') {
      filtered = filtered.filter(trip => trip.passengerServicePermitId);
    } else if (assignmentFilter === 'unassigned') {
      filtered = filtered.filter(trip => !trip.passengerServicePermitId);
    }

    return filtered;
  };

  const getTripStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'delayed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleTripClick = (tripId: string, event: React.MouseEvent) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    onTripSelect(tripId, isMultiSelect);
  };

  const isSelected = (tripId: string) => {
    return workspace.selectedTrips.includes(tripId);
  };

  // Handle individual PSP assignment
  const handleAssignPsp = async (tripId: string, pspId: string) => {
    try {
      await TripManagementService.assignPassengerServicePermitToTrip(tripId, pspId);
      onRefreshTrips?.();
    } catch (error) {
      console.error('Error assigning PSP to trip:', error);
    }
  };

  // Handle PSP removal
  const handleRemovePsp = async (tripId: string) => {
    try {
      await TripManagementService.removePassengerServicePermitFromTrip(tripId);
      onRefreshTrips?.();
    } catch (error) {
      console.error('Error removing PSP from trip:', error);
    }
  };

  // Handle view trip details
  const handleViewTripDetails = (tripId: string) => {
    const trip = workspace.trips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTripForDetails(trip);
      setIsDetailsModalOpen(true);
    }
  };

  const filteredTrips = getFilteredTrips();

  if (!workspace.selectedRoute) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Route Selected</h3>
          <p className="text-gray-500 max-w-md">
            Select a route from the sidebar to view and manage trips for that route
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
      {/* Trips Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Trips for {workspace.routeGroups
                .find(rg => rg.id === workspace.selectedRouteGroup)
                ?.routes?.find(r => r.id === workspace.selectedRoute)?.name}
            </h2>
            <p className="text-sm text-gray-600">
              {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} 
              {workspace.selectedTrips.length > 0 && (
                <span className="font-medium text-blue-600">
                  {' '}• {workspace.selectedTrips.length} selected
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="delayed">Delayed</option>
              </select>

              {/* Assignment Filter */}
              <select
                value={assignmentFilter}
                onChange={(e) => setAssignmentFilter(e.target.value as 'all' | 'assigned' | 'unassigned')}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Trips</option>
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>

            {/* Clear Selection */}
            {workspace.selectedTrips.length > 0 && (
              <button
                onClick={() => workspace.selectedTrips.forEach(id => onTripSelect(id, false))}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
              >
                Clear Selection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trips Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {workspace.isLoadingTrips ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <div className="text-gray-600">Loading trips...</div>
          </div>
        ) : workspace.tripsError ? (
          <div className="text-center py-16">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <div className="text-red-600 mb-2">Error Loading Trips</div>
            <div className="text-gray-600">{workspace.tripsError}</div>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-600 mb-2">No trips found</div>
            <div className="text-gray-500">
              {workspace.trips.length === 0 
                ? "No trips have been generated for this route yet"
                : "No trips match the current filters"
              }
            </div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-3"
          }>
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                isSelected={isSelected(trip.id || '')}
                onSelect={(tripId, multi) => handleTripClick(tripId, { ctrlKey: multi } as React.MouseEvent)}
                viewMode={viewMode}
                activeSection={activeSection}
                permits={workspace.permits}
                onAssignPsp={handleAssignPsp}
                onRemovePsp={handleRemovePsp}
                onViewDetails={handleViewTripDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trip Details Modal */}
      <TripDetailsModal
        trip={selectedTripForDetails}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTripForDetails(null);
        }}
      />
    </div>
  );
}

interface TripCardProps {
  trip: TripResponse;
  isSelected: boolean;
  onSelect: (tripId: string, multi: boolean) => void;
  viewMode: 'grid' | 'list';
  activeSection: 'planning' | 'assignments' | 'monitoring';
  permits: any[];
  onAssignPsp: (tripId: string, pspId: string) => void;
  onRemovePsp: (tripId: string) => void;
  onViewDetails: (tripId: string) => void;
}

function TripCard({ trip, isSelected, onSelect, viewMode, activeSection, permits, onAssignPsp, onRemovePsp, onViewDetails }: TripCardProps) {
  const getTripStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'delayed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'N/A';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (viewMode === 'grid') {
    return (
      <div
        className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
          isSelected 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={(e) => onSelect(trip.id || '', e.ctrlKey || e.metaKey)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {isSelected ? (
              <CheckSquare className="h-4 w-4 text-blue-600" />
            ) : (
              <Square className="h-4 w-4 text-gray-400" />
            )}
            <div className="text-sm font-medium text-gray-900">
              Trip #{trip.id?.slice(-8)}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTripStatusColor(trip.status)}`}>
              {trip.status}
            </span>
            <TripContextMenu
              trip={trip}
              permits={permits}
              onAssignPsp={onAssignPsp}
              onRemovePsp={onRemovePsp}
              onViewDetails={onViewDetails}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">{formatDate(trip.tripDate)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-3 w-3 text-gray-400" />
            <span className="text-gray-600">
              {formatTime(trip.scheduledDepartureTime)} - {formatTime(trip.scheduledArrivalTime)}
            </span>
          </div>

          {trip.passengerServicePermitNumber && (
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-green-600 font-medium">
                PSP: {trip.passengerServicePermitNumber}
              </span>
            </div>
          )}

          {trip.busPlateNumber && (
            <div className="flex items-center space-x-2 text-sm">
              <Bus className="h-3 w-3 text-gray-400" />
              <span className="text-gray-600">{trip.busPlateNumber}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={(e) => onSelect(trip.id || '', e.ctrlKey || e.metaKey)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {isSelected ? (
            <CheckSquare className="h-4 w-4 text-blue-600" />
          ) : (
            <Square className="h-4 w-4 text-gray-400" />
          )}
          
          <div className="flex-1 grid grid-cols-5 gap-4 items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">
                #{trip.id?.slice(-8)}
              </div>
              <div className="text-xs text-gray-500">{formatDate(trip.tripDate)}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-900">
                {formatTime(trip.scheduledDepartureTime)}
              </div>
              <div className="text-xs text-gray-500">Departure</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-900">
                {formatTime(trip.scheduledArrivalTime)}
              </div>
              <div className="text-xs text-gray-500">Arrival</div>
            </div>
            
            <div>
              {trip.passengerServicePermitNumber ? (
                <div>
                  <div className="text-sm text-green-600 font-medium">
                    {trip.passengerServicePermitNumber}
                  </div>
                  <div className="text-xs text-gray-500">Assigned PSP</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-400">Unassigned</div>
                  <div className="text-xs text-gray-400">No PSP</div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTripStatusColor(trip.status)}`}>
                {trip.status}
              </span>
              <TripContextMenu
                trip={trip}
                permits={permits}
                onAssignPsp={onAssignPsp}
                onRemovePsp={onRemovePsp}
                onViewDetails={onViewDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}