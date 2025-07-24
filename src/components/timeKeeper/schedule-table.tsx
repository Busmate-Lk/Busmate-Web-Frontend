'use client';

import { Eye, Edit, Trash2, MoreHorizontal, Bus, FileText } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from '@/components/mot/pagination';

interface Schedule {
  id: string;
  routeId: string;
  busNo: string;
  route: string;
  operator: string;
  departure: string;
  arrival: string;
  days: string;
  status: string;
  assignedBus?: string;
  notes?: string;
  platform?: string;
}

interface ScheduleTableProps {
  schedules: Schedule[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  onAssignBus?: (id: string, routeName: string) => void;
  onAddNotes?: (id: string, routeName: string) => void;
  isTimeKeeper?: boolean;
}

export function ScheduleTable({
  schedules,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
  onAssignBus,
  onAddNotes,
  isTimeKeeper = false,
}: ScheduleTableProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timing
              </th>
              {isTimeKeeper && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days
              </th>
              {isTimeKeeper && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Bus
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedules.length === 0 ? (
              <tr>
                <td
                  colSpan={isTimeKeeper ? 8 : 6}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No schedules found</p>
                    <p className="text-sm">
                      Try adjusting your search filters or select a different
                      date
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {schedule.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        Bus: {schedule.busNo}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {schedule.route}
                      </div>
                      <div className="text-sm text-gray-500">
                        {schedule.operator}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>
                        {schedule.departure} - {schedule.arrival}
                      </div>
                    </div>
                  </td>
                  {isTimeKeeper && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {schedule.platform || 'Not Assigned'}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.days}</div>
                  </td>
                  {isTimeKeeper && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {schedule.assignedBus ? (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {schedule.assignedBus}
                          </span>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Not Assigned
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        schedule.status
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === schedule.id ? null : schedule.id
                          )
                        }
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {openDropdown === schedule.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onView(schedule.id);
                                setOpenDropdown(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="mr-3 h-4 w-4" />
                              View Details
                            </button>

                            {isTimeKeeper ? (
                              <>
                                {onAssignBus && (
                                  <button
                                    onClick={() => {
                                      onAssignBus(schedule.id, schedule.route);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Bus className="mr-3 h-4 w-4" />
                                    Assign Bus
                                  </button>
                                )}
                                {onAddNotes && (
                                  <button
                                    onClick={() => {
                                      onAddNotes(schedule.id, schedule.route);
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <FileText className="mr-3 h-4 w-4" />
                                    {schedule.notes
                                      ? 'Edit Notes'
                                      : 'Add Notes'}
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    onEdit(schedule.id);
                                    setOpenDropdown(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="mr-3 h-4 w-4" />
                                  Edit Schedule
                                </button>
                                <button
                                  onClick={() => {
                                    onDelete(
                                      schedule.id,
                                      `${schedule.route} (${schedule.busNo})`
                                    );
                                    setOpenDropdown(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="mr-3 h-4 w-4" />
                                  Delete Schedule
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {currentPage &&
        totalPages &&
        totalItems &&
        itemsPerPage &&
        onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
    </div>
  );
}
