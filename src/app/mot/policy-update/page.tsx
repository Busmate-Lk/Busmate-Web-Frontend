"use client";

import { MOTLayout } from "@/components/mot/layout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/components/mot/confirmation-modals";
import { PolicyStatsCards } from "@/components/mot/policy-stats-cards";
import { PolicySearchFilters } from "@/components/mot/policy-search-filters";
import { PoliciesTable, Policy } from "@/components/mot/policies-table";

export default function PolicyUpdate() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const policies: Policy[] = [
    {
      id: "POL001",
      title: "Bus Operational Guidelines 2024",
      type: "Operational",
      publishedDate: "2024-01-15",
      lastModified: "2024-01-20",
      status: "Published",
      version: "v2.1",
      author: "Transport Authority",
    },
    {
      id: "POL002",
      title: "Safety Standards for Public Transport",
      type: "Safety",
      publishedDate: "2024-02-01",
      lastModified: "2024-02-05",
      status: "Published",
      version: "v1.3",
      author: "Safety Department",
    },
    {
      id: "POL003",
      title: "Driver Licensing Requirements",
      type: "Licensing",
      publishedDate: "2024-03-10",
      lastModified: "2024-03-12",
      status: "Draft",
      version: "v1.0",
      author: "HR Department",
    },
    {
      id: "POL004",
      title: "Environmental Compliance Guidelines",
      type: "Environmental",
      publishedDate: "2024-01-25",
      lastModified: "2024-01-30",
      status: "Published",
      version: "v1.2",
      author: "Environmental Unit",
    },
    {
      id: "POL005",
      title: "Fare Structure Policy 2024",
      type: "Financial",
      publishedDate: "2024-02-15",
      lastModified: "2024-02-20",
      status: "Under Review",
      version: "v2.0",
      author: "Finance Department",
    },
  ];

  const handleDeleteClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setShowDeleteModal(false);
    alert(`Policy "${selectedPolicy?.title}" deleted successfully!`);
    setSelectedPolicy(null);
  };

  const handleView = (policyId: string) => {
    router.push(`/mot/policy-details/${policyId}`);
  };

  const handleEdit = (policyId: string) => {
    router.push(`/mot/edit-policy/${policyId}`);
  };

  const handleUploadPolicy = () => {
    router.push("/mot/upload-policy");
  };

  const handleExportAll = () => {
    // Handle export functionality
    console.log("Exporting all policies...");
  };

  return (
    <MOTLayout
      activeItem="policy"
      pageTitle="Policy Update"
      pageDescription="View and manage transport policy updates"
    >
      <div className="space-y-6">
        {/* Search, Filters and Action Buttons */}
        <PolicySearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onUploadPolicy={handleUploadPolicy}
          onExportAll={handleExportAll}
        />

        {/* Quick Stats Cards */}
        <PolicyStatsCards />

        {/* Policies Table */}
        <PoliciesTable
          policies={policies}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Policy"
        itemName={selectedPolicy?.title || ""}
        isLoading={isDeleting}
      />
    </MOTLayout>
  );
}
