'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/shared/layout';
import TimekeeperAdvancedFilters from '@/components/mot/timekeepers/TimekeeperAdvancedFilters/page';
import { TimekeeperActionButtons } from '@/components/mot/timekeepers/TimekeeperActionButtons/page';
import { TimekeeperStatsCards } from '@/components/mot/timekeepers/TimekeeperStatsCards/page';
import { TimekeepersTable } from '@/components/mot/timekeepers/TimekeepersTable/page';
import Pagination from '@/components/shared/Pagination';
import { TimekeeperControllerService } from '@/lib/api-client/user-management/services/TimekeeperControllerService';

interface TimekeeperResponse {
  id: string;
  fullname: string;
  phonenumber: string;
  email: string;
  assign_stand: string;
  nic: string;
  province: string;
  user_id?: string;
  createdAt?: string;
  status?: string;
}

interface QueryParams {
  page: number;
  size: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  search: string;
  status?: 'pending' | 'active' | 'inactive' | 'cancelled';
}

interface FilterOptions {
  statuses: Array<'pending' | 'active' | 'inactive' | 'cancelled'>;
  provinces: Array<string>;
  stands: Array<string>;
}

export default function TimekeepersPage() {
  const router = useRouter();
  const [timekeepers, setTimekeepers] = useState<TimekeeperResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [standFilter, setStandFilter] = useState('all');

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    statuses: ['pending', 'active', 'inactive', 'cancelled'],
    provinces: [],
    stands: [],
  });

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    size: 10,
    sortBy: 'fullname',
    sortDir: 'asc',
    search: '',
  });

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  const [stats, setStats] = useState({
    totalTimekeepers: { count: 0 },
    activeTimekeepers: { count: 0 },
    inactiveTimekeepers: { count: 0 },
    provincesCount: { count: 0 },
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [timekeeperToDelete, setTimekeeperToDelete] = useState<TimekeeperResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /** Load all timekeepers */
  const loadTimekeepers = useCallback(async () => {
  try {
    setIsLoading(true);
    setError(null);

    const response = await TimekeeperControllerService.getAllTimekeepers();
    console.log('Timekeepers response:', response);

    // normalize response items to match TimekeeperResponse shape
    const normalized = (response || []).map((r: any) => ({
      id: r.id ?? r.timekeeperId ?? r._id ?? r.userId ?? '',
      fullname: r.fullname ?? r.name ?? '',
      phonenumber: r.phonenumber ?? r.phone ?? '',
      email: r.email ?? '',
      assign_stand: r.assign_stand ?? r.assignStand ?? r.assignedStand ?? '',
      nic: r.nic ?? '',
      province: r.province ?? '',
      user_id: r.user_id ?? r.userId ?? undefined,
      createdAt: r.createdAt ?? r.created_at ?? undefined,
      status: r.status ?? undefined,
    }));

    setTimekeepers(normalized);
    setPagination({
      currentPage: 0,
      totalPages: 1,
      totalElements: normalized.length || 0,
      pageSize: normalized.length || 10,
    });
  } catch (err) {
    console.error('Error loading timekeepers:', err);
    setError('Failed to load timekeepers. Please try again.');
    setTimekeepers([]);
  } finally {
    setIsLoading(false);
  }
}, []);

  /** Load stats */
  /**const loadStatistics = useCallback(async () => {
    try {
      const s = await TimekeeperControllerService.getTimekeeperStatistics();
      setStats({
        totalTimekeepers: { count: s.totalTimekeepers || 0 },
        activeTimekeepers: { count: s.activeTimekeepers || 0 },
        inactiveTimekeepers: { count: s.inactiveTimekeepers || 0 },
        provincesCount: {
          count: s.timekeepersByProvince ? Object.keys(s.timekeepersByProvince).length : 0,
        },
      });
    } catch (err) {
      console.error('Error loading timekeeper statistics:', err);
    }
  }, []);*/

  /** ✅ Initial load */
  /** 
  useEffect(() => {
    loadTimekeepers();
    loadStatistics();
  }, [loadTimekeepers, loadStatistics]); */

  /** ✅ Update query params */
  const updateQueryParams = useCallback(
    (updates: Partial<QueryParams>) => {
      setQueryParams((prev) => {
        const newParams = { ...prev, ...updates };
        if (!('status' in updates)) {
          if (statusFilter !== 'all') {
            newParams.status = statusFilter as QueryParams['status'];
          } else {
            delete newParams.status;
          }
        }
        return newParams;
      });
    },
    [statusFilter]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateQueryParams({ page: 0 });
    }, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, provinceFilter, standFilter, updateQueryParams]);

  /** ✅ Actions */
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    updateQueryParams({ search: term, page: 0 });
  };

  const handleAddNew = () => {
    // 🔹 Navigate to Add New Timekeeper page
    router.push('/mot/staff-management/add-new');
  };

  const handleExportAll = async () => {
    try {
      const dataToExport = timekeepers.map((tk) => ({
        Fullname: tk.fullname || '',
        Phone: tk.phonenumber || '',
        Email: tk.email || '',
        'Assigned Stand': tk.assign_stand || '',
        NIC: tk.nic || '',
        Province: tk.province || '',
        Status: tk.status || '',
        'Created At': tk.createdAt ? new Date(tk.createdAt).toLocaleDateString() : '',
      }));

      if (dataToExport.length === 0) {
        alert('No data to export');
        return;
      }

      const headers = Object.keys(dataToExport[0]);
      const csvContent = [
        headers.join(','),
        ...dataToExport.map((row) =>
          headers
            .map((h) => {
              const v = row[h as keyof typeof row];
              return typeof v === 'string' && v.includes(',')
                ? `"${v.replace(/"/g, '""')}"`
                : v;
            })
            .join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `timekeepers-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleView = (id: string) => router.push(`/mot/users/timekeepers/${id}`);
  const handleEdit = (id: string) => router.push(`/mot/users/timekeepers/${id}/edit`);

  const handleDelete = (id: string) => {
    const tk = timekeepers.find((t) => t.id === id);
    if (tk) {
      setTimekeeperToDelete(tk);
      setShowDeleteModal(true);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setTimekeeperToDelete(null);
  };
/** 
  const handleDeleteConfirm = async () => {
    if (!timekeeperToDelete?.id) return;
    try {
      setIsDeleting(true);
      await TimekeeperControllerService.deleteTimekeeper(timekeeperToDelete.id);
      await loadTimekeepers();
      await loadStatistics();
      setShowDeleteModal(false);
      setTimekeeperToDelete(null);
    } catch (err) {
      console.error('Error deleting timekeeper:', err);
      setError('Failed to delete timekeeper. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }; */

  /** ✅ Filters and table data */
  const filteredTimekeepers = React.useMemo(() => {
    let list = timekeepers;
    if (provinceFilter !== 'all') list = list.filter((t) => t.province === provinceFilter);
    if (standFilter !== 'all') list = list.filter((t) => t.assign_stand === standFilter);
    return list;
  }, [timekeepers, provinceFilter, standFilter]);

  const transformed = React.useMemo(
    () =>
      filteredTimekeepers.map((tk) => ({
        id: tk.id || '',
        fullname: tk.fullname || '',
        phonenumber: tk.phonenumber || '',
        assign_stand: tk.assign_stand || '',
        province: tk.province || '',
        status: tk.status,
        createdAt: tk.createdAt,
      })),
    [filteredTimekeepers]
  );

  return (
    <Layout
      activeItem="timekeepers"
      pageTitle="Timekeepers"
      pageDescription="Manage timekeepers (stand assignments and staff)"
      role="mot"
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm text-red-600 hover:text-red-800 underline mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Stats cards */}
        <TimekeeperStatsCards stats={stats} />

        {/* Add & Export buttons */}
        {/* 
        <TimekeeperActionButtons
          onAddTimekeeper={handleAddNew}
          onExportAll={handleExportAll}
          isLoading={isLoading}
        />  */}

        {/* Filters */}
        <TimekeeperAdvancedFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          provinceFilter={provinceFilter}
          setProvinceFilter={setProvinceFilter}
          standFilter={standFilter}
          setStandFilter={setStandFilter}
          filterOptions={filterOptions}
          loading={false}
          totalCount={pagination.totalElements}
          filteredCount={transformed.length}
          onSearch={handleSearch}
          onClearAll={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setProvinceFilter('all');
            setStandFilter('all');
          }}
        />

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <TimekeepersTable
            timekeepers={transformed}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSort={(sortBy, sortDir) => updateQueryParams({ sortBy, sortDir })}
            activeFilters={{
              search: searchTerm,
              status: statusFilter !== 'all' ? statusFilter : undefined,
              province: provinceFilter !== 'all' ? provinceFilter : undefined,
              stand: standFilter !== 'all' ? standFilter : undefined,
            }}
            loading={isLoading}
            currentSort={{ field: queryParams.sortBy, direction: queryParams.sortDir }}
          />

          {pagination.totalElements > 0 && (
            <div className="border-t border-gray-200">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalElements={pagination.totalElements}
                pageSize={pagination.pageSize}
                onPageChange={(page) => updateQueryParams({ page })}
                onPageSizeChange={(size) => updateQueryParams({ size, page: 0 })}
                loading={isLoading}
                searchActive={Boolean(searchTerm)}
                filterCount={[
                  statusFilter !== 'all',
                  provinceFilter !== 'all',
                  standFilter !== 'all',
                ].filter(Boolean).length}
              />
            </div>
          )}
        </div>

        {/* Delete modal */}
        {/*
        <DeleteTimekeeperModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          timekeeper={timekeeperToDelete}
          isDeleting={isDeleting}
        />*/}
      </div>
    </Layout>
  );
}
