"use client";

import { MOTLayout } from "@/components/mot/layout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteConfirmationModal } from "@/components/mot/confirmation-modals";
import { PolicyStatsCards } from "@/components/mot/policy-stats-cards";
import { PolicySearchFilters } from "@/components/mot/policy-search-filters";
import { PoliciesTable, Policy } from "@/components/mot/policies-table";
import { usePagination } from "@/components/mot/pagination";

export default function PolicyUpdate() {
  const router = useRouter();
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
    {
      id: "POL006",
      title: "Emergency Response Procedures",
      type: "Safety",
      publishedDate: "2024-03-20",
      lastModified: "2024-03-25",
      status: "Published",
      version: "v1.1",
      author: "Emergency Response Team",
    },
    {
      id: "POL007",
      title: "Vehicle Maintenance Standards",
      type: "Operational",
      publishedDate: "2024-04-05",
      lastModified: "2024-04-10",
      status: "Published",
      version: "v1.4",
      author: "Maintenance Division",
    },
    {
      id: "POL008",
      title: "Passenger Rights and Responsibilities",
      type: "Service",
      publishedDate: "2024-01-10",
      lastModified: "2024-01-15",
      status: "Published",
      version: "v1.0",
      author: "Customer Service",
    },
    {
      id: "POL009",
      title: "Data Protection and Privacy Policy",
      type: "Legal",
      publishedDate: "2024-05-01",
      lastModified: "2024-05-05",
      status: "Draft",
      version: "v1.0",
      author: "Legal Department",
    },
    {
      id: "POL010",
      title: "Route Planning Guidelines",
      type: "Operational",
      publishedDate: "2024-02-28",
      lastModified: "2024-03-05",
      status: "Published",
      version: "v2.3",
      author: "Route Planning Division",
    },
    {
      id: "POL011",
      title: "Anti-Discrimination Policy",
      type: "HR",
      publishedDate: "2024-06-01",
      lastModified: "2024-06-05",
      status: "Under Review",
      version: "v1.2",
      author: "Human Resources",
    },
    {
      id: "POL012",
      title: "Quality Assurance Standards",
      type: "Service",
      publishedDate: "2024-03-15",
      lastModified: "2024-03-20",
      status: "Published",
      version: "v1.1",
      author: "Quality Control",
    },
    {
      id: "POL013",
      title: "Technology Integration Guidelines",
      type: "Technical",
      publishedDate: "2024-04-20",
      lastModified: "2024-04-25",
      status: "Draft",
      version: "v1.0",
      author: "IT Department",
    },
    {
      id: "POL014",
      title: "Financial Reporting Standards",
      type: "Financial",
      publishedDate: "2024-01-30",
      lastModified: "2024-02-02",
      status: "Published",
      version: "v1.5",
      author: "Finance Department",
    },
    {
      id: "POL015",
      title: "Staff Training and Development",
      type: "HR",
      publishedDate: "2024-05-10",
      lastModified: "2024-05-15",
      status: "Published",
      version: "v2.0",
      author: "Training Division",
    },
    {
      id: "POL016",
      title: "Contract Management Policy",
      type: "Legal",
      publishedDate: "2024-06-15",
      lastModified: "2024-06-20",
      status: "Under Review",
      version: "v1.3",
      author: "Legal Department",
    },
    {
      id: "POL017",
      title: "Asset Management Guidelines",
      type: "Operational",
      publishedDate: "2024-07-01",
      lastModified: "2024-07-05",
      status: "Draft",
      version: "v1.0",
      author: "Asset Management",
    },
    {
      id: "POL018",
      title: "Customer Feedback Management",
      type: "Service",
      publishedDate: "2024-02-10",
      lastModified: "2024-02-15",
      status: "Published",
      version: "v1.2",
      author: "Customer Service",
    },
    {
      id: "POL019",
      title: "Incident Reporting Procedures",
      type: "Safety",
      publishedDate: "2024-04-01",
      lastModified: "2024-04-05",
      status: "Published",
      version: "v1.1",
      author: "Safety Department",
    },
    {
      id: "POL020",
      title: "Performance Evaluation Framework",
      type: "HR",
      publishedDate: "2024-03-01",
      lastModified: "2024-03-05",
      status: "Published",
      version: "v1.0",
      author: "HR Department",
    },
  ];

  // Filter policies based on search term
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = searchTerm === '' || 
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Use pagination hook with initial page size of 8
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedPolicies,
    handlePageChange,
    handlePageSizeChange,
    totalItems,
    itemsPerPage,
  } = usePagination(filteredPolicies, 8); // Show 8 items per page initially

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
          policies={paginatedPolicies}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
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
