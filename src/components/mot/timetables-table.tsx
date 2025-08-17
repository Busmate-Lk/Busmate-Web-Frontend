'use client';

import { 
  Eye, 
  Edit, 
  Bus, 
  Power, 
  Trash2, 
  Clock, 
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Info
} from 'lucide-react';
import { useState } from 'react';

interface RouteSchedule {
  id: string;
  routeId: string;
  routeName: string;
  routeGroup?: string;
  daysOfWeek: string[];
  numberOfDays: number;
  status: string;
  totalTimeSlots: number;
  assignedBuses: number;
  createdDate: string;
  lastModified: string;
  scheduleType?: string;
  effectiveStartDate?: string;
  effectiveEndDate?: string;
  description?: string;
}

interface TimetablesTableProps {
  schedules: RouteSchedule[];
  onView: (scheduleId: string) => void;
  onEdit: (scheduleId: string) => void;
  onAssignBuses: (scheduleId: string, routeName: string) => void;
  onDeactivate: (scheduleId: string, routeName: string) => void;
  onDelete: (scheduleId: string, routeName: string) => void;
  isLoading?: boolean;
}

export function TimetablesTable({
  schedules,
  onView,
  onEdit,
  onAssignBuses,
  onDeactivate,
  onDelete,
  isLoading = false,
}: TimetablesTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusConfig = (status: string) => {
    const configs = {
      ACTIVE: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: '●',
        label: 'Active'
      },
      PENDING: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '◐',
        label: 'Pending'
      },
      INACTIVE: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '○',
        label: 'Inactive'
      },
      CANCELLED: {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: '✕',
        label: 'Cancelled'
      }
    };
    
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const getScheduleTypeConfig = (type: string) => {
    const configs = {
      REGULAR: {
        color: 'bg-blue-100 text-blue-800',
        label: 'Regular'
      },
      SPECIAL: {
        color: 'bg-purple-100 text-purple-800',
        label: 'Special'
      }
    };
    
    return configs[type as keyof typeof configs] || configs.REGULAR;
  };

  const formatDaysOfWeek = (days: string[]) => {
    if (days.length === 7) return 'Daily';
    if (days.length === 5 && !days.includes('Saturday') && !days.includes('Sunday')) {
      return 'Weekdays';
    }
    if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) {
      return 'Weekends';
    }

    const dayAbbr: { [key: string]: string } = {
      Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
      Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun',
    };

    return days.map((day) => dayAbbr[day] || day).join(', ');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  const getBusUtilizationColor = (assigned: number, total: number) => {
    if (total === 0) return 'text-gray-500';
    const ratio = assigned / total;
    if (ratio >= 0.8) return 'text-green-600';
    if (ratio >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Schedules</h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage route schedules and bus assignments
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{schedules.length} schedules</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operating Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Assignment
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
            {schedules.map((schedule) => {
              const statusConfig = getStatusConfig(schedule.status);
              const typeConfig = getScheduleTypeConfig(schedule.scheduleType || 'REGULAR');
              const isExpanded = expandedRow === schedule.id;
              
              return (
                <>
                  <tr 
                    key={schedule.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Route Details */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                            {schedule.routeId}
                          </span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeConfig.color}`}>
                            {typeConfig.label}
                          </span>
                        </div>
                        <div className="font-medium text-gray-900 text-sm">
                          {schedule.routeName}
                        </div>
                        {schedule.routeGroup && (
                          <div className="text-xs text-gray-500">
                            {schedule.routeGroup}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Schedule Info */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {schedule.totalTimeSlots} time slots
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {schedule.effectiveStartDate ? formatDate(schedule.effectiveStartDate) : 'No start date'}
                          </span>
                        </div>
                        {schedule.description && (
                          <div className="text-xs text-gray-500 truncate max-w-[200px]" title={schedule.description}>
                            {schedule.description}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Operating Days */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-sm text-gray-900">
                          {schedule.numberOfDays} days
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatDaysOfWeek(schedule.daysOfWeek)}
                        </div>
                      </div>
                    </td>

                    {/* Bus Assignment */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bus className="h-3.5 w-3.5 text-gray-400" />
                          <span className={`text-sm font-medium ${getBusUtilizationColor(schedule.assignedBuses, schedule.totalTimeSlots)}`}>
                            {schedule.assignedBuses}/{schedule.totalTimeSlots}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              schedule.totalTimeSlots > 0
                                ? schedule.assignedBuses / schedule.totalTimeSlots >= 0.8
                                  ? 'bg-green-500'
                                  : schedule.assignedBuses / schedule.totalTimeSlots >= 0.5
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                                : 'bg-gray-300'
                            }`}
                            style={{
                              width: schedule.totalTimeSlots > 0
                                ? `${Math.min((schedule.assignedBuses / schedule.totalTimeSlots) * 100, 100)}%`
                                : '0%'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <span className="mr-1">{statusConfig.icon}</span>
                        {statusConfig.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onView(schedule.id)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => onEdit(schedule.id)}
                          className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                          title="Edit Schedule"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => onAssignBuses(schedule.id, schedule.routeName)}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Assign Buses"
                        >
                          <Bus className="h-4 w-4" />
                        </button>
                        
                        {schedule.status === 'ACTIVE' && (
                          <button
                            onClick={() => onDeactivate(schedule.id, schedule.routeName)}
                            className="p-1.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md transition-colors"
                            title="Deactivate"
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => onDelete(schedule.id, schedule.routeName)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : schedule.id)}
                          className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                          title="More Info"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Schedule Details</h4>
                            <div className="space-y-1 text-gray-600">
                              <div>Created: {formatDate(schedule.createdDate)}</div>
                              <div>Last Modified: {formatDate(schedule.lastModified)}</div>
                              {schedule.effectiveEndDate && (
                                <div>End Date: {formatDate(schedule.effectiveEndDate)}</div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Operating Schedule</h4>
                            <div className="space-y-1 text-gray-600">
                              <div>Days: {schedule.daysOfWeek.join(', ')}</div>
                              <div>Time Slots: {schedule.totalTimeSlots}</div>
                              <div>Type: {schedule.scheduleType || 'Regular'}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Resource Allocation</h4>
                            <div className="space-y-1 text-gray-600">
                              <div>Assigned Buses: {schedule.assignedBuses}</div>
                              <div>
                                Utilization: {schedule.totalTimeSlots > 0 
                                  ? Math.round((schedule.assignedBuses / schedule.totalTimeSlots) * 100) 
                                  : 0}%
                              </div>
                              <div>Status: {schedule.status}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {schedules.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">No schedules found</div>
          <div className="text-gray-400 text-sm">
            Schedules will appear here once they are created
          </div>
        </div>
      )}
    </div>
  );
}
