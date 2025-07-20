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

  const permits: BusPermit[] = [
    {
      id: '001',
      routeNo: '001',
      routeName: 'Colombo - Kandy',
      operator: 'SLTB',
      validFrom: 'Jan 1, 2024',
      validUntil: 'Dec 31, 2024',
      status: 'Active',
    },
    {
      id: '002',
      routeNo: '002',
      routeName: 'Galle - Matara',
      operator: 'SLTB',
      validFrom: 'Mar 15, 2024',
      validUntil: 'Mar 14, 2025',
      status: 'Active',
    },
    {
      id: '003',
      routeNo: '003',
      routeName: 'Colombo - Kataragama',
      operator: 'Private',
      validFrom: 'Feb 1, 2024',
      validUntil: 'Jan 31, 2025',
      status: 'Pending',
    },
    {
      id: '004',
      routeNo: '004',
      routeName: 'Colombo - Mannar',
      operator: 'SLTB',
      validFrom: 'Jun 1, 2024',
      validUntil: 'May 31, 2025',
      status: 'Active',
    },
    {
      id: '005',
      routeNo: '005',
      routeName: 'Colombo - Kurunegala',
      operator: 'Private',
      validFrom: 'Apr 10, 2024',
      validUntil: 'Apr 9, 2025',
      status: 'Expired',
    },
    {
      id: '006',
      routeNo: '006',
      routeName: 'Jaffna - Vavuniya',
      operator: 'SLTB',
      validFrom: 'Jul 1, 2024',
      validUntil: 'Jun 30, 2025',
      status: 'Active',
    },
    {
      id: '007',
      routeNo: '007',
      routeName: 'Negombo - Anuradhapura',
      operator: 'Private',
      validFrom: 'May 20, 2024',
      validUntil: 'May 19, 2025',
      status: 'Pending',
    },
    {
      id: '008',
      routeNo: '008',
      routeName: 'Colombo - Trincomalee',
      operator: 'SLTB',
      validFrom: 'Aug 1, 2024',
      validUntil: 'Jul 31, 2025',
      status: 'Active',
    },
    {
      id: '009',
      routeNo: '009',
      routeName: 'Matara - Nuwara Eliya',
      operator: 'Private',
      validFrom: 'Feb 15, 2023',
      validUntil: 'Feb 14, 2024',
      status: 'Expired',
    },
    {
      id: '010',
      routeNo: '010',
      routeName: 'Batticaloa - Polonnaruwa',
      operator: 'SLTB',
      validFrom: 'Sep 1, 2024',
      validUntil: 'Aug 31, 2025',
      status: 'Active',
    },
    {
      id: '011',
      routeNo: '011',
      routeName: 'Colombo - Badulla',
      operator: 'SLTB',
      validFrom: 'Jan 15, 2024',
      validUntil: 'Jan 14, 2025',
      status: 'Active',
    },
    {
      id: '012',
      routeNo: '012',
      routeName: 'Kandy - Nuwara Eliya',
      operator: 'Private',
      validFrom: 'Mar 1, 2024',
      validUntil: 'Feb 28, 2025',
      status: 'Active',
    },
    {
      id: '013',
      routeNo: '013',
      routeName: 'Colombo - Hambantota',
      operator: 'SLTB',
      validFrom: 'Apr 1, 2024',
      validUntil: 'Mar 31, 2025',
      status: 'Pending',
    },
    {
      id: '014',
      routeNo: '014',
      routeName: 'Galle - Tissamaharama',
      operator: 'Private',
      validFrom: 'May 1, 2024',
      validUntil: 'Apr 30, 2025',
      status: 'Active',
    },
    {
      id: '015',
      routeNo: '015',
      routeName: 'Colombo - Chilaw',
      operator: 'SLTB',
      validFrom: 'Jun 15, 2024',
      validUntil: 'Jun 14, 2025',
      status: 'Active',
    },
    {
      id: '016',
      routeNo: '016',
      routeName: 'Ratnapura - Embilipitiya',
      operator: 'Private',
      validFrom: 'Jul 10, 2024',
      validUntil: 'Jul 9, 2025',
      status: 'Expired',
    },
    {
      id: '017',
      routeNo: '017',
      routeName: 'Ampara - Batticaloa',
      operator: 'SLTB',
      validFrom: 'Aug 15, 2024',
      validUntil: 'Aug 14, 2025',
      status: 'Active',
    },
    {
      id: '018',
      routeNo: '018',
      routeName: 'Monaragala - Wellawaya',
      operator: 'Private',
      validFrom: 'Sep 10, 2024',
      validUntil: 'Sep 9, 2025',
      status: 'Pending',
    },
  ];

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
