'use client';

import React from 'react';
import {
    ChevronUp,
    ChevronDown,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    MapPin,
    Users
} from 'lucide-react';

interface TimekeeperTableData {
    id: string;
    fullname: string;
    phonenumber?: string;
    email?: string;
    assign_stand?: string;
    nic?: string;
    province?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface TimekeepersTableProps {
    timekeepers: TimekeeperTableData[];
    onView: (timekeeperId: string) => void;
    onEdit: (timekeeperId: string) => void;
    onDelete: (timekeeperId: string) => void;
    onSort: (sortBy: string, sortDir: 'asc' | 'desc') => void;
    activeFilters: Record<string, any>;
    loading: boolean;
    currentSort: { field: string; direction: 'asc' | 'desc' };
}

export function TimekeepersTable({
    timekeepers,
    onView,
    onEdit,
    onDelete,
    onSort,
    activeFilters,
    loading,
    currentSort
}: TimekeepersTableProps) {
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

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'inactive':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-gray-600" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusLabel = (status?: string) => {
        if (!status) return 'Unknown';
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'inactive':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    if (loading && timekeepers.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading timekeepers...</p>
                </div>
            </div>
        );
    }

    if (timekeepers.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No timekeepers found</h3>
                    <p className="text-gray-500 mb-4">
                        {Object.keys(activeFilters).some(key => activeFilters[key])
                            ? "No timekeepers match your current filters. Try adjusting your search criteria."
                            : "No timekeepers have been created yet."}
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('fullname')}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Full Name</span>
                                    {getSortIcon('fullname')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stand & Province
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('createdAt')}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Created</span>
                                    {getSortIcon('createdAt')}
                                </div>
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort('updatedAt')}
                            >
                                <div className="flex items-center gap-1">
                                    <span>Updated</span>
                                    {getSortIcon('updatedAt')}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {timekeepers.map((tk) => (
                            <tr key={tk.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <Users className="h-5 w-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {tk.fullname || 'Unnamed'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {tk.id}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1 text-sm">
                                        <div className="text-gray-900">{tk.phonenumber || 'N/A'}</div>
                                        <div className="text-gray-500">{tk.email || 'N/A'}</div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="space-y-1">
                                        <div className="inline-flex items-center text-sm text-gray-900">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {tk.assign_stand || 'Unassigned'}
                                        </div>
                                        <div className="text-sm text-gray-500">{tk.province || 'N/A'}</div>
                                        {tk.nic && <div className="text-xs text-gray-400">NIC: {tk.nic}</div>}
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(tk.status)}`}>
                                        {getStatusIcon(tk.status)}
                                        <span className="ml-1">{getStatusLabel(tk.status)}</span>
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="space-y-1">
                                        <div>{formatDate(tk.createdAt)}</div>
                                        <div className="text-xs text-gray-500">
                                            {tk.createdAt ? new Date(tk.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="space-y-1">
                                        <div>{formatDate(tk.updatedAt)}</div>
                                        <div className="text-xs text-gray-500">
                                            {tk.updatedAt ? new Date(tk.updatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onView(tk.id)}
                                            className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                            title="View timekeeper details"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(tk.id)}
                                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                                            title="Edit timekeeper"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(tk.id)}
                                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                                            title="Delete timekeeper"
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

            {loading && timekeepers.length > 0 && (
                <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        <span className="text-xs text-blue-800">Updating...</span>
                    </div>
                </div>
            )}
        </div>
    );
}