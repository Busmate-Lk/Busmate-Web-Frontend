'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    X,
    ChevronDown,
    Filter,
    CheckCircle,
    XCircle,
    Clock,
    MapPin,
    Building
} from 'lucide-react';

interface FilterOptions {
    statuses: Array<'pending' | 'active' | 'inactive' | 'cancelled'>;
    provinces: Array<string>;
    stands: Array<string>;
}

interface TimekeeperAdvancedFiltersProps {
    // Search
    searchTerm: string;
    setSearchTerm: (value: string) => void;

    // Filters
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    provinceFilter: string;
    setProvinceFilter: (value: string) => void;
    standFilter: string;
    setStandFilter: (value: string) => void;

    // Data
    filterOptions: FilterOptions;
    loading: boolean;

    // Stats for display
    totalCount?: number;
    filteredCount?: number;

    // Event handlers
    onClearAll?: () => void;
    onSearch?: (term: string) => void;
}

export default function TimekeeperAdvancedFilters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    provinceFilter,
    setProvinceFilter,
    standFilter,
    setStandFilter,
    filterOptions,
    loading,
    totalCount = 0,
    filteredCount = 0,
    onClearAll,
    onSearch
}: TimekeeperAdvancedFiltersProps) {
    const [searchValue, setSearchValue] = useState(searchTerm);

    // Debounced search effect
    useEffect(() => {
        if (searchValue !== searchTerm) {
            const handler = setTimeout(() => {
                setSearchTerm(searchValue);
                if (onSearch) {
                    onSearch(searchValue);
                }
            }, 400);

            return () => {
                clearTimeout(handler);
            };
        }
    }, [searchValue, searchTerm, setSearchTerm, onSearch]);

    // Update local search when prop changes
    useEffect(() => {
        if (searchTerm !== searchValue) {
            setSearchValue(searchTerm);
        }
    }, [searchTerm]);

    const hasActiveFilters = Boolean(
        searchTerm ||
        statusFilter !== 'all' ||
        provinceFilter !== 'all' ||
        standFilter !== 'all'
    );

    const activeFilterCount = [
        searchTerm && 'search',
        statusFilter !== 'all' && 'status',
        provinceFilter !== 'all' && 'province',
        standFilter !== 'all' && 'stand'
    ].filter(Boolean).length;

    const handleClearAll = useCallback(() => {
        setSearchValue('');
        setStatusFilter('all');
        setProvinceFilter('all');
        setStandFilter('all');
        if (onClearAll) {
            onClearAll();
        }
    }, [setStatusFilter, setProvinceFilter, setStandFilter, onClearAll]);

    const getStatusIcon = (value: string) => {
        switch (value) {
            case 'active':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'inactive':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4 text-gray-600" />;
            default:
                return <Filter className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusLabel = (value: string) => {
        switch (value) {
            case 'active':
                return 'Active Only';
            case 'inactive':
                return 'Inactive Only';
            case 'pending':
                return 'Pending Only';
            case 'cancelled':
                return 'Cancelled Only';
            default:
                return 'All Statuses';
        }
    };

    const getProvinceIcon = () => <MapPin className="w-4 h-4 text-indigo-600" />;
    const getStandIcon = () => <Building className="w-4 h-4 text-blue-600" />;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Compact Main Filter Section */}
            <div className="p-4">
                {/* Header with Count */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-900">Search & Filters</h3>
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">
                            {filteredCount.toLocaleString()}
                        </span>
                        <> of {totalCount.toLocaleString()} timekeepers</>
                    </div>
                </div>

                {/* Compact Filter Row */}
                <div className="flex flex-col gap-3">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search timekeepers by name or stand..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="block w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {searchValue !== searchTerm && searchValue && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            )}
                            {searchValue && (
                                <button
                                    onClick={() => setSearchValue('')}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                disabled={loading}
                                className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                            >
                                <option value="all">All Statuses</option>
                                {filterOptions.statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Province Filter */}
                        <div className="relative">
                            <select
                                value={provinceFilter}
                                onChange={(e) => setProvinceFilter(e.target.value)}
                                disabled={loading}
                                className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                            >
                                <option value="all">All Provinces</option>
                                {filterOptions.provinces.map((prov) => (
                                    <option key={prov} value={prov}>
                                        {prov}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Stand Filter */}
                        <div className="relative">
                            <select
                                value={standFilter}
                                onChange={(e) => setStandFilter(e.target.value)}
                                disabled={loading}
                                className="block w-full lg:w-48 pl-3 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                            >
                                <option value="all">All Stands</option>
                                {filterOptions.stands.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Filters Section */}
            {hasActiveFilters && (
                <div className="border-t border-gray-100">
                    <div className="p-3">
                        <div className="flex items-center justify-between w-full text-left">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">
                                    {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                                </span>
                                <div className='flex items-center gap-2 ml-4 flex-wrap'>
                                    {searchTerm && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800">
                                            <Search className="w-3 h-3 mr-1" />
                                            "{searchTerm}"
                                            <button
                                                onClick={() => setSearchValue('')}
                                                className="ml-1 hover:text-blue-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {statusFilter !== 'all' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 text-green-800">
                                            {getStatusIcon(statusFilter)}
                                            <span className="ml-1">{getStatusLabel(statusFilter)}</span>
                                            <button
                                                onClick={() => setStatusFilter('all')}
                                                className="ml-1 hover:text-green-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {provinceFilter !== 'all' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-indigo-100 text-indigo-800">
                                            {getProvinceIcon()}
                                            <span className="ml-1">{provinceFilter}</span>
                                            <button
                                                onClick={() => setProvinceFilter('all')}
                                                className="ml-1 hover:text-indigo-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {standFilter !== 'all' && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-800">
                                            {getStandIcon()}
                                            <span className="ml-1">{standFilter}</span>
                                            <button
                                                onClick={() => setStandFilter('all')}
                                                className="ml-1 hover:text-purple-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Clear All Button */}
                            {hasActiveFilters && (
                                <button
                                    onClick={handleClearAll}
                                    className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-auto"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        <span className="text-xs text-blue-800">Loading filter options...</span>
                    </div>
                </div>
            )}
        </div>
    );
}