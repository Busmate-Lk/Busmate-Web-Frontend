'use client';

// import { Layout } from '@/components/mot/layout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals';
import { BusPermitStatsCards } from '@/components/mot/bus-permit-stats-cards';
import { BusPermitSearchFilters } from '@/components/mot/bus-permit-search-filters';
import { BusPermitsTable, BusPermit } from '@/components/mot/bus-permits-table';
import { usePagination } from '@/components/mot/pagination';
import { Layout } from '@/components/shared/layout';
import { permits } from './data';

export default function BusPermitManagement() {
 
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    permitId: '',
    permitName: '',
  });
  const [deactivateModal, setDeactivateModal] = useState({
    isOpen: false,
    permitId: '',
    permitName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Filter permits based on search term, status, and operator
  const filteredPermits = permits.filter(permit => {
    const matchesSearch = searchTerm === '' || 
      permit.routeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permit.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || permit.status === statusFilter;
    const matchesOperator = operatorFilter === '' || permit.operator === operatorFilter;
    
    return matchesSearch && matchesStatus && matchesOperator;
  });

  // Use pagination hook with initial page size of 5
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedPermits,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPermits, 5); // Start with 5 items per page

  // Calculate stats from filtered permit data (use filteredPermits for accurate stats)
  const calculateStats = () => {
    const activeCount = filteredPermits.filter(permit => permit.status === 'Active').length;
    const pendingCount = filteredPermits.filter(permit => permit.status === 'Pending').length;
    const expiredCount = filteredPermits.filter(permit => permit.status === 'Expired').length;
    const totalCount = filteredPermits.length;

    return {
      active: { count: activeCount, change: "+1 this month" },
      pending: { count: pendingCount },
      expired: { count: expiredCount },
      total: { count: totalCount, change: "No change from last month" },
    };
  };

  const stats = calculateStats();

  const handleDeleteClick = (permitId: string, routeName: string) => {
    setDeleteModal({ isOpen: true, permitId, permitName: routeName });
  };

  const handleDeactivateClick = (permitId: string, routeName: string) => {
    setDeactivateModal({ isOpen: true, permitId, permitName: routeName });
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDeleteModal({ isOpen: false, permitId: '', permitName: '' });
    alert(
      `Route permit "${deleteModal.permitName}" has been permanently deleted.`
    );
  };

  const handleDeactivateConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setDeactivateModal({ isOpen: false, permitId: '', permitName: '' });
    alert(`Route permit "${deactivateModal.permitName}" has been deactivated.`);
  };

  const handleView = (permitId: string) => {
    router.push(`/mot/route-permit-details/${permitId}`);
  };

  const handleEdit = (permitId: string) => {
    router.push(`/mot/route-permit-form?permitId=${permitId}`);
  };

  const handleAddNewPermit = () => {
    router.push('/mot/route-permit-form');
  };

  const handleExportAll = () => {
    // Handle export functionality
    console.log('Exporting all permits...');
  };

  return (
    <Layout
      activeItem="bus-permits"
      pageTitle="Bus Permit Management"
      pageDescription="Manage and track bus route permits and approvals"
      role = "mot"
    >
      <div className="space-y-6">
        {/* Quick Stats Cards */}
        <BusPermitStatsCards stats={stats} />

        {/* Search and Filters */}
        <BusPermitSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          operatorFilter={operatorFilter}
          setOperatorFilter={setOperatorFilter}
          onAddNewPermit={handleAddNewPermit}
          onExportAll={handleExportAll}
        />

        {/* Permits Table */}
        <BusPermitsTable
          permits={paginatedPermits}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDeactivate={handleDeactivateClick}
          activeFilters={{
            status: statusFilter,
            operator: operatorFilter,
            search: searchTerm,
          }}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, permitId: '', permitName: '' })
        }
        onConfirm={handleDeleteConfirm}
        title="Delete Route Permit"
        itemName={deleteModal.permitName}
        isLoading={isLoading}
      />

      {/* Deactivation Confirmation Modal */}
      <DeactivationConfirmationModal
        isOpen={deactivateModal.isOpen}
        onClose={() =>
          setDeactivateModal({ isOpen: false, permitId: '', permitName: '' })
        }
        onConfirm={handleDeactivateConfirm}
        title="Deactivate Route Permit"
        itemName={deactivateModal.permitName}
        isLoading={isLoading}
      />
    </Layout>
  );
}
