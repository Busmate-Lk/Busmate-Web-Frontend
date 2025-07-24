'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/header';
import { StaffStats } from '@/components/shared/StaffStats';
import { StaffTable } from '@/components/shared/StaffTable';
import { StaffFilters } from '@/components/shared/StaffFilters';
import { Plus } from 'lucide-react';
import { dummyOperators } from '@/lib/data/staffData';
import { Operator } from '@/types/models/staff';
import Link from 'next/link';

export default function OperatorManagementPage() {
  const [operators, setOperators] = useState<Operator[]>(dummyOperators);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');

  const filteredOperators = operators.filter((op) => {
    const matchesSearch =
      op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.licenseNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || op.status === statusFilter;

    let matchesExperience = true;
    if (experienceFilter !== 'all') {
      const experience = op.experienceYears || 0;
      switch (experienceFilter) {
        case '0-2':
          matchesExperience = experience >= 0 && experience <= 2;
          break;
        case '3-5':
          matchesExperience = experience >= 3 && experience <= 5;
          break;
        case '6-10':
          matchesExperience = experience >= 6 && experience <= 10;
          break;
        case '10+':
          matchesExperience = experience > 10;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesExperience;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this operator?')) {
      setOperators((prev) => prev.filter((op) => op.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        pageTitle="Operator Management"
        pageDescription="Manage bus operators and their information"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bus Operators</h1>
            <p className="text-gray-600 mt-1">
              Manage bus operator staff members
            </p>
          </div>
          <Link
            href="/mot/staff-form?type=operator"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Operator
          </Link>
        </div>

        {/* Filters */}
        <StaffFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          additionalFilter={{
            value: experienceFilter,
            onChange: setExperienceFilter,
            options: [
              { value: '0-2', label: '0-2 years' },
              { value: '3-5', label: '3-5 years' },
              { value: '6-10', label: '6-10 years' },
              { value: '10+', label: '10+ years' },
            ],
            placeholder: 'All Experience',
          }}
        />

        {/* Stats Cards */}
        <StaffStats operators={operators} type="operator" />

        {/* Table */}
        <StaffTable
          staff={filteredOperators}
          type="operator"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
