"use client";

// import { MOTLayout } from "@/components/mot/layout";
import { EditPolicyHeader } from "@/components/mot/edit-policy-header";
import { EditPolicyTabs } from "@/components/mot/edit-policy-tabs";
import { DocumentDetailsForm } from "@/components/mot/document-details-form";
import { ContentEditorForm } from "@/components/mot/content-editor-form";
import { FileManagementSection } from "@/components/mot/file-management-section";
import { VersionHistorySection } from "@/components/mot/version-history-section";
import { EditPolicyActions } from "@/components/mot/edit-policy-actions";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/components/shared/layout";

export default function EditPolicy() {
  const router = useRouter();
  const params = useParams();
  const policyId = params?.id || "POL001";
  const [activeTab, setActiveTab] = useState("details");

  // Mock existing policy data - in real app, this would come from API
  const [formData, setFormData] = useState({
    title: "Bus Operational Guidelines 2024",
    type: "operational",
    description:
      "Comprehensive guidelines for bus operations, safety protocols, and service standards.",
    documentUrl: "https://example.com/bus-guidelines-2024.pdf",
    version: "v2.1",
    author: "Transport Authority",
    effectiveDate: "2024-02-01",
    expiryDate: "2024-12-31",
    tags: "transport, operations, safety, guidelines, 2024",
    priority: "high",
    status: "published",
    content: `# Bus Operational Guidelines 2024

## 1. Introduction

This policy document outlines the operational guidelines for all public bus services operating within the transportation network. These guidelines are designed to ensure safe, efficient, and reliable public transportation services while maintaining high standards of customer service and operational excellence.

## 2. General Guidelines

### 2.1 Service Standards
- All buses must maintain punctuality within ±5 minutes of scheduled times
- Vehicle cleanliness and maintenance standards must be upheld
- Professional conduct is required from all drivers and conductors
- Passenger safety protocols must be strictly followed

## 3. Safety Requirements

**Important Notice:** All safety requirements outlined in this section are mandatory and subject to regular inspections and compliance audits.

- Emergency exits must be clearly marked and unobstructed
- First aid kits and fire extinguishers must be present and functional
- Driver fatigue management protocols must be implemented
- Regular vehicle safety inspections are mandatory

## 4. Driver Qualifications

All bus drivers must meet the following minimum requirements:
- Valid commercial driving license with appropriate endorsements
- Minimum 3 years of professional driving experience
- Clean driving record for the past 2 years
- Completion of defensive driving course
- Regular medical fitness certifications

## 5. Vehicle Standards

### Engine Requirements
- Euro 4 emission standards minimum
- Regular emission testing required
- Fuel efficiency monitoring

### Safety Features
- ABS braking system mandatory
- GPS tracking system required
- CCTV surveillance system

## 6. Compliance and Enforcement

Non-compliance with these guidelines may result in penalties including fines, license suspension, or permit revocation. Regular audits will be conducted to ensure adherence to all operational standards.`,
  });

  const [versionHistory] = useState([
    {
      version: "v2.1",
      date: "2024-01-20",
      author: "Transport Authority",
      changes: "Updated safety requirements and driver qualifications",
      status: "Current",
    },
    {
      version: "v2.0",
      date: "2024-01-15",
      author: "Transport Authority",
      changes: "Major revision with new compliance standards",
      status: "Previous",
    },
    {
      version: "v1.3",
      date: "2023-12-10",
      author: "Safety Department",
      changes: "Added environmental compliance guidelines",
      status: "Previous",
    },
  ]);

  const handleSave = () => {
    alert("Policy updated successfully!");
    router.push("/mot/policy-update");
  };

  const handleSaveAsDraft = () => {
    alert("Policy saved as draft!");
    router.push("/mot/policy-update");
  };

  const handlePreview = () => {
    router.push(`/mot/view-policy/${policyId}`);
  };

  const handleBack = () => {
    router.push("/mot/policy-update");
  };

  const handleFormChange = (updates: Partial<typeof formData>) => {
    setFormData({ ...formData, ...updates });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleDocumentUrlChange = (documentUrl: string) => {
    setFormData({ ...formData, documentUrl });
  };

  return (
    <Layout
      activeItem="policy"
      pageTitle="Edit Policy"
      pageDescription="Update and modify policy document"
      role = "mot"
    >
      <div className="space-y-6">
        <EditPolicyHeader
          policyId={policyId as string}
          version={formData.version}
          onBack={handleBack}
          onPreview={handlePreview}
        />

        <EditPolicyTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Document Details Tab */}
        {activeTab === "details" && (
          <DocumentDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
          />
        )}

        {/* Content Editor Tab */}
        {activeTab === "content" && (
          <ContentEditorForm
            content={formData.content}
            onContentChange={handleContentChange}
          />
        )}

        {/* File Management Tab */}
        {activeTab === "files" && (
          <FileManagementSection
            documentUrl={formData.documentUrl}
            onDocumentUrlChange={handleDocumentUrlChange}
          />
        )}

        {/* Version History Tab */}
        {activeTab === "history" && (
          <VersionHistorySection versionHistory={versionHistory} />
        )}

        <EditPolicyActions
          onCancel={handleBack}
          onSaveAsDraft={handleSaveAsDraft}
          onSaveAndPublish={handleSave}
        />
      </div>
    </Layout>
  );
}
