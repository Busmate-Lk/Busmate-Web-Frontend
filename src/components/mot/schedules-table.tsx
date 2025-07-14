"use client";

import { Eye, Edit, MapPin, Power, Trash2 } from "lucide-react";
import { Pagination } from "./pagination";

interface Schedule {
  id: string;
  routeId: string;
  routeName: string;
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Schedule ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Route
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Departure Time
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Frequency
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {schedule.id}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.routeName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {schedule.startPoint} → {schedule.endPoint}
                      </div>
                      <div className="text-sm text-gray-500">
                        Route ID: {schedule.routeId}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {schedule.departure}
                      </div>
                      <div className="text-sm text-gray-500">
                        Arrives: {schedule.arrival}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border">
                        {schedule.frequency}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">
                        {schedule.days}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        schedule.status
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => onView(schedule.id)}
                        title="View Schedule"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        onClick={() => onEdit(schedule.id)}
                        title="Edit Schedule"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                        onClick={() => onIntermediateStops(schedule.id)}
                        title="View Intermediate Stops"
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors"
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
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
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
