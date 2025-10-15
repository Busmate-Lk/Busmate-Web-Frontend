'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
  Route,
  Users,
  FileText,
  Bus,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MapPin,
  Play,
  Flag,
  Navigation
} from 'lucide-react';

interface FilterOptions {
  statuses: Array<'pending' | 'active' | 'completed' | 'cancelled' | 'delayed' | 'in_transit' | 'boarding' | 'departed'>;
  routes: Array<{ id: string; name: string; routeGroup?: string }>;
  routeGroups: Array<{ id: string; name: string }>;
  schedules: Array<{ id: string; name: string }>;
  buses: Array<{ id: string; registrationNumber: string }>;
  passengerServicePermits: Array<{ id: string; permitNumber: string }>;
}

interface OperatorTripAdvancedFiltersProps {
  // Search
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  // Filters
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  routeFilter: string;
  setRouteFilter: (value: string) => void;
  routeGroupFilter: string;
  setRouteGroupFilter: (value: string) => void;
  scheduleFilter: string;
  setScheduleFilter: (value: string) => void;
  busFilter: string;
  setBusFilter: (value: string) => void;
  pspFilter: string;
  setPspFilter: (value: string) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;

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

export function OperatorTripAdvancedFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  routeFilter,
  setRouteFilter,
  routeGroupFilter,
  setRouteGroupFilter,
  scheduleFilter,
  setScheduleFilter,
  busFilter,
  setBusFilter,
  pspFilter,
  setPspFilter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  filterOptions,
  loading,
  totalCount = 0,
  filteredCount = 0,
  onClearAll,
  onSearch
}: OperatorTripAdvancedFiltersProps) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(searchTerm);

  // Debounced search effect
  useEffect(() => {
    if (searchValue !== searchTerm) {
      const timeoutId = setTimeout(() => {
        setSearchTerm(searchValue);
        if (onSearch) {
          onSearch(searchValue);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchValue, searchTerm, setSearchTerm, onSearch]);

  // Update local search when prop changes (but avoid infinite loops)
  useEffect(() => {
    if (searchTerm !== searchValue) {
      setSearchValue(searchTerm);
    }
  }, [searchTerm]);

  const hasActiveFilters = Boolean(
    searchTerm ||
    statusFilter !== 'all' ||
    routeFilter !== 'all' ||
    routeGroupFilter !== 'all' ||
    scheduleFilter !== 'all' ||
    busFilter !== 'all' ||
    pspFilter !== 'all' ||
    fromDate ||
    toDate
  );

  const activeFilterCount = [
    searchTerm && 'search',
    statusFilter !== 'all' && 'status',
    routeFilter !== 'all' && 'route',
    routeGroupFilter !== 'all' && 'route-group',
    scheduleFilter !== 'all' && 'schedule',
    busFilter !== 'all' && 'bus',
    pspFilter !== 'all' && 'psp',
    fromDate && 'from-date',
    toDate && 'to-date'
  ].filter(Boolean).length;

  const handleClearAll = useCallback(() => {
    setSearchValue('');
    setStatusFilter('all');
    setRouteFilter('all');
    setRouteGroupFilter('all');
    setScheduleFilter('all');
    setBusFilter('all');
    setPspFilter('all');
    setFromDate('');
    setToDate('');
    if (onClearAll) {
      onClearAll();
    }
  }, [
    setStatusFilter, setRouteFilter, setRouteGroupFilter, setScheduleFilter,
    setBusFilter, setPspFilter, setFromDate, setToDate, onClearAll
  ]);

  const getStatusIcon = (value: string) => {
    switch (value) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'in_transit': return <MapPin className="w-4 h-4 text-blue-600" />;
      case 'boarding': return <Users className="w-4 h-4 text-indigo-600" />;
      case 'departed': return <Play className="w-4 h-4 text-purple-600" />;
      default: return <Filter className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (value: string) => {
    switch (value) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'delayed': return 'Delayed';
      case 'in_transit': return 'In Transit';
      case 'boarding': return 'Boarding';
      case 'departed': return 'Departed';
      default: return 'All Statuses';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header with Search and Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search trips by route, schedule, bus registration, or permit number..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Actions */}
          <div className="flex items-center gap-3">
            {/* Results Summary */}
            {totalCount > 0 && (
              <div className="text-sm text-gray-600 whitespace-nowrap">
                {filteredCount === totalCount ? (
                  <span>Showing all {totalCount.toLocaleString()} trips</span>
                ) : (
                  <span>
                    Showing {filteredCount.toLocaleString()} of {totalCount.toLocaleString()} trips
                  </span>
                )}
              </div>
            )}

            {/* Toggle Advanced Filters */}
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                hasActiveFilters
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              {isFilterExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear all</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {isFilterExpanded && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Statuses</option>
                  {filterOptions.statuses.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {getStatusIcon(statusFilter)}
                </div>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Route Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route Group
              </label>
              <div className="relative">
                <select
                  value={routeGroupFilter}
                  onChange={(e) => setRouteGroupFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Route Groups</option>
                  {filterOptions.routeGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Route Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Route
              </label>
              <div className="relative">
                <select
                  value={routeFilter}
                  onChange={(e) => setRouteFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Routes</option>
                  {filterOptions.routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                      {route.routeGroup && ` (${route.routeGroup})`}
                    </option>
                  ))}
                </select>
                <Route className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Schedule Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule
              </label>
              <div className="relative">
                <select
                  value={scheduleFilter}
                  onChange={(e) => setScheduleFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Schedules</option>
                  {filterOptions.schedules.map((schedule) => (
                    <option key={schedule.id} value={schedule.id}>
                      {schedule.name}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Bus Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bus
              </label>
              <div className="relative">
                <select
                  value={busFilter}
                  onChange={(e) => setBusFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Buses</option>
                  {filterOptions.buses.map((bus) => (
                    <option key={bus.id} value={bus.id}>
                      {bus.registrationNumber}
                    </option>
                  ))}
                </select>
                <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* PSP Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Permit
              </label>
              <div className="relative">
                <select
                  value={pspFilter}
                  onChange={(e) => setPspFilter(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 appearance-none bg-white"
                >
                  <option value="all">All Permits</option>
                  {filterOptions.passengerServicePermits.map((permit) => (
                    <option key={permit.id} value={permit.id}>
                      {permit.permitNumber}
                    </option>
                  ))}
                </select>
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Search: {searchTerm}
                    <button onClick={() => setSearchValue('')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Status: {getStatusLabel(statusFilter)}
                    <button onClick={() => setStatusFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {routeGroupFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Route Group: {filterOptions.routeGroups.find(g => g.id === routeGroupFilter)?.name}
                    <button onClick={() => setRouteGroupFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {routeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Route: {filterOptions.routes.find(r => r.id === routeFilter)?.name}
                    <button onClick={() => setRouteFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {scheduleFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Schedule: {filterOptions.schedules.find(s => s.id === scheduleFilter)?.name}
                    <button onClick={() => setScheduleFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {busFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Bus: {filterOptions.buses.find(b => b.id === busFilter)?.registrationNumber}
                    <button onClick={() => setBusFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {pspFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    PSP: {filterOptions.passengerServicePermits.find(p => p.id === pspFilter)?.permitNumber}
                    <button onClick={() => setPspFilter('all')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {fromDate && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    From: {fromDate}
                    <button onClick={() => setFromDate('')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {toDate && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    To: {toDate}
                    <button onClick={() => setToDate('')} className="hover:text-blue-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}