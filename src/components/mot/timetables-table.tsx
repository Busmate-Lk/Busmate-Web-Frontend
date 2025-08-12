'use client';

import { Eye, Edit, Bus, Power, Trash2 } from 'lucide-react';

interface RouteSchedule {
  id: string;
  routeId: string;
  routeName: string;
  daysOfWeek: string[];
  numberOfDays: number;
  status: string;
  totalTimeSlots: number;
  assignedBuses: number;
  createdDate: string;
  lastModified: string;
}

interface TimetablesTableProps {
  schedules: RouteSchedule[];
  onView: (scheduleId: string) => void;
  onEdit: (scheduleId: string) => void;
  onAssignBuses: (scheduleId: string, routeName: string) => void;
  onDeactivate: (scheduleId: string, routeName: string) => void;
  onDelete: (scheduleId: string, routeName: string) => void;
}

export function TimetablesTable({
  schedules,
  onView,
  onEdit,
  onAssignBuses,
  onDeactivate,
  onDelete,
}: TimetablesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDaysOfWeek = (days: string[]) => {
    if (days.length === 7) return 'Daily';
    if (
      days.length === 5 &&
      !days.includes('Saturday') &&
      !days.includes('Sunday')
    )
      return 'Weekdays';
    if (
      days.length === 2 &&
      days.includes('Saturday') &&
      days.includes('Sunday')
    )
      return 'Weekends';

    // Abbreviate day names for display
    const dayAbbr: { [key: string]: string } = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    };

    return days.map((day) => dayAbbr[day] || day).join(', ');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0 flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Route Timetables
        </h3>
        <button className="p-0 h-auto text-gray-400 hover:text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[100px]">
                  Route No.
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[200px]">
                  Route Name
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[80px]">
                  Days
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[150px]">
                  Schedule Details
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[100px]">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[250px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      {schedule.routeId}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900 text-sm">
                      {schedule.routeName}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">
                        {schedule.numberOfDays} days
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatDaysOfWeek(schedule.daysOfWeek)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">
                          Slots
                        </span>
                        <span className="font-medium text-gray-900 text-sm">
                          {schedule.totalTimeSlots}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">
                          Buses
                        </span>
                        <span className="text-sm text-gray-600">
                          {schedule.assignedBuses}/{schedule.totalTimeSlots}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        schedule.status
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        onClick={() => onView(schedule.id)}
                        title="View Timetable Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        onClick={() => onEdit(schedule.id)}
                        title="Edit Timetable"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                        onClick={() =>
                          onAssignBuses(schedule.id, schedule.routeName)
                        }
                        title="Assign Buses"
                      >
                        <Bus className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md transition-colors"
                        onClick={() =>
                          onDeactivate(schedule.id, schedule.routeName)
                        }
                        title="Deactivate Timetable"
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        onClick={() =>
                          onDelete(schedule.id, schedule.routeName)
                        }
                        title="Delete Timetable"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
