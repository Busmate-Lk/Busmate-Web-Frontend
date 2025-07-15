"use client";

import { Eye, Edit, MapPin, Power, Trash2 } from "lucide-react";
import { Pagination } from "./pagination";

interface Schedule {
  id: string;
  routeId: string;
  routeName: string;
  routeGroup: string;
  startPoint: string;
  endPoint: string;
  departure: string;
  arrival: string;
  validFrom: string;
  validUntil: string;
  days: string;
  frequency: string;
  status: string;
}

interface SchedulesTableProps {
  schedules: Schedule[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onView: (scheduleId: string) => void;
  onEdit: (scheduleId: string) => void;
  onIntermediateStops: (scheduleId: string) => void;
  onDeactivate: (scheduleId: string, routeName: string) => void;
  onDelete: (scheduleId: string, routeName: string) => void;
}

export function SchedulesTable({
  schedules,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onIntermediateStops,
  onDeactivate,
  onDelete,
}: SchedulesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 pb-0 flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Bus Schedules</h3>
        <button className="p-0 h-auto text-gray-400 hover:text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-xs">...</span>
          </div>
        </button>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1400px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[120px]">
                  Schedule ID
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[250px]">
                  Route Details
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[140px]">
                  Route Group
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[180px]">
                  Schedule Times
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[160px]">
                  Valid Period
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[150px]">
                  Frequency & Days
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[100px]">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[200px]">
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
                    <span className="font-mono font-semibold text-gray-900 text-sm">
                      {schedule.id}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        Route {schedule.routeId}: {schedule.routeName}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <span className="inline-flex items-center">
                          {schedule.startPoint} 
                          <span className="mx-2 text-gray-400">→</span>
                          {schedule.endPoint}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                        {schedule.routeGroup}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                          DEP
                        </span>
                        <span className="font-medium text-gray-900 text-sm">
                          {schedule.departure}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                          ARR
                        </span>
                        <span className="text-sm text-gray-600">
                          {schedule.arrival}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">
                        Duration: {(() => {
                          const dep = new Date(`2024-01-01 ${schedule.departure}`);
                          const arr = new Date(`2024-01-01 ${schedule.arrival}`);
                          let diff = arr.getTime() - dep.getTime();
                          if (diff < 0) diff += 24 * 60 * 60 * 1000; // Handle overnight trips
                          const hours = Math.floor(diff / (1000 * 60 * 60));
                          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                          return `${hours}h ${minutes}m`;
                        })()}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-gray-500">From:</span>
                        <span className="font-medium text-gray-900 ml-1">{schedule.validFrom}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Until:</span>
                        <span className="font-medium text-gray-900 ml-1">{schedule.validUntil}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        {schedule.frequency}
                      </span>
                      <div className="text-sm font-medium text-gray-700">
                        {schedule.days}
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
                        title="View Schedule Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        onClick={() => onEdit(schedule.id)}
                        title="Edit Schedule"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                        onClick={() => onIntermediateStops(schedule.id)}
                        title="View Intermediate Stops"
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md transition-colors"
                        onClick={() =>
                          onDeactivate(
                            schedule.id,
                            `${schedule.startPoint} - ${schedule.endPoint}`
                          )
                        }
                        title="Deactivate Schedule"
                      >
                        <Power className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        onClick={() =>
                          onDelete(
                            schedule.id,
                            `${schedule.startPoint} - ${schedule.endPoint}`
                          )
                        }
                        title="Delete Schedule"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={[5, 10, 15, 20]}
          />
        </div>
      </div>
    </div>
  );
}
