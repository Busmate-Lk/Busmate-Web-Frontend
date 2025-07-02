'use client';

import { MOTLayout } from '@/components/mot/layout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  DeleteConfirmationModal,
  DeactivationConfirmationModal,
} from '@/components/mot/confirmation-modals';
import { BusPermitStatsCards } from '@/components/mot/bus-permit-stats-cards';
import { BusPermitSearchFilters } from '@/components/mot/bus-permit-search-filters';
import { BusPermitsTable, BusPermit } from '@/components/mot/bus-permits-table';

export default function BusPermitManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
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
      routeName: 'Negombo - Airport',
      operator: 'Private',
      validFrom: 'Feb 1, 2024',
      validUntil: 'Jan 31, 2025',
      status: 'Pending',
    },
    {
      id: '004',
      routeNo: '004',
      routeName: 'Kurunegala - Dambulla',
      operator: 'SLTB',
      validFrom: 'Jun 1, 2024',
      validUntil: 'May 31, 2025',
      status: 'Active',
    },
    {
      id: '005',
      routeNo: '005',
      routeName: 'Anuradhapura - Jaffna',
      operator: 'Private',
      validFrom: 'Apr 10, 2024',
      validUntil: 'Apr 9, 2025',
      status: 'Expired',
    },
  ];

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
    <MOTLayout
      activeItem="bus-permits"
      pageTitle="Bus Permit Management"
      pageDescription="Manage and track bus route permits and approvals"
    >
      <div className="space-y-6">
        {/* Quick Stats Cards */}
        <BusPermitStatsCards />

        {/* Search and Filters */}
        <BusPermitSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNewPermit={handleAddNewPermit}
          onExportAll={handleExportAll}
        />

        {/* Permits Table */}
        <BusPermitsTable
          permits={permits}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onDeactivate={handleDeactivateClick}
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
    </MOTLayout>
  );
}
