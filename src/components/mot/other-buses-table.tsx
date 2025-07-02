"use client";

import { Eye, Edit, Trash2 } from "lucide-react";

interface OtherBus {
  busNo: string;
  departure: string;
  arrival: string;
  operator: string;
}

interface OtherBusesTableProps {
  buses: OtherBus[];
  onView?: (busNo: string) => void;
  onEdit?: (busNo: string) => void;
  onDelete?: (busNo: string) => void;
}

export function OtherBusesTable({
  buses,
  onView,
  onEdit,
  onDelete,
}: OtherBusesTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🚌 Other Buses on Same Route
        </h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Bus No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Departure
                </th>
                <th scope="col" className="px-6 py-3">
                  Arrival
                </th>
                <th scope="col" className="px-6 py-3">
                  Operator
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {bus.busNo}
                  </td>
                  <td className="px-6 py-4">{bus.departure}</td>
                  <td className="px-6 py-4">{bus.arrival}</td>
                  <td className="px-6 py-4">{bus.operator}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => onView?.(bus.busNo)}
                        title="View Bus"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        onClick={() => onEdit?.(bus.busNo)}
                        title="Edit Bus"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        onClick={() => onDelete?.(bus.busNo)}
                        title="Delete Bus"
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
