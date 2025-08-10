"use client";

import type React from "react";
import { ArrowLeft } from "lucide-react";
// import { MOTLayout } from "@/components/mot/layout";
import { DocumentInformationForm } from "@/components/mot/document-information-form";
import { FileUploadSection } from "@/components/mot/file-upload-section";
import { DocumentMetadataForm } from "@/components/mot/document-metadata-form";
import { DocumentActionButtons } from "@/components/mot/document-action-buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/components/shared/layout";

export default function UploadPolicy() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [priority, setPriority] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  const handleSubmit = () => {
    alert("Policy document uploaded successfully!");
    router.push("/mot/policy-update");
  };

  const handleCancel = () => {
    router.push("/mot/policy-update");
  };

  return (
    <Layout
    role = "mot"
      activeItem="policy"
      pageTitle="Upload Policy Document"
      pageDescription="Upload and publish new policy documents"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          onClick={() => router.push("/mot/policy-update")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Policy Management
        </button>

        <DocumentInformationForm
          documentType={documentType}
          onDocumentTypeChange={setDocumentType}
        />

        <FileUploadSection
          dragActive={dragActive}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />

        <DocumentMetadataForm
          priority={priority}
          onPriorityChange={setPriority}
        />

        <DocumentActionButtons
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
}
