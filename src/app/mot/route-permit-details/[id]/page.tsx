"use client";

import { ArrowLeft } from "lucide-react";
// import { MOTLayout } from "@/components/mot/layout";
import { RoutePermitHeader } from "@/components/mot/route-permit-header";
import { RouteMapView } from "@/components/mot/route-map-view";
import { PermitInformationPanel } from "@/components/mot/permit-information-panel";
import { PermitProcessingTimeline } from "@/components/mot/permit-processing-timeline";
import { AttachedDocuments } from "@/components/mot/attached-documents";
import { InternalNotes } from "@/components/mot/internal-notes";
import { RoutePermitActions } from "@/components/mot/route-permit-actions";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Layout } from "@/app/shared/layout";

export default function RoutePermitDetails() {
  const router = useRouter();
  const params = useParams();
  const permitId = params?.id || "138";

  const permitInfo = {
    busRouteNo: "138",
    routeName: "Colombo - Kandy",
    operator: "CTB",
    status: "Active",
    permitId: "PRM-2024-001",
    issueDate: "Jan 15, 2024",
    expiryDate: "Jan 15, 2025",
    authorizedBuses: "12",
    permitType: "Regular Service",
    region: "Western Province",
    depot: "Colombo Central Depot",
  };

  const timelineSteps = [
    { status: "Requested", date: "Jan 10, 2024", completed: true },
    { status: "Under Review", date: "Jan 12, 2024", completed: true },
    { status: "Approved", date: "Jan 15, 2024", completed: true },
  ];

  const documents = [
    { name: "Route Plan.pdf", type: "pdf" },
    { name: "Vehicle Registration.jpg", type: "image" },
    { name: "Insurance Certificate.pdf", type: "pdf" },
    { name: "Driver License.jpg", type: "image" },
  ];

  const [notes, setNotes] = useState([
    {
      author: "Transport Officer - John Silva",
      date: "Jan 19, 2024",
      content:
        "Route inspection completed. All requirements met. Approved for operation.",
    },
    {
      author: "Safety Inspector - Maria Fernando",
      date: "Jan 16, 2024",
      content:
        "Safety compliance verified. All vehicles meet the required standards.",
    },
  ]);

  const handleAddNote = (noteContent: string) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    setNotes([
      {
        author: "Current Officer - Admin User",
        date: currentDate,
        content: noteContent,
      },
      ...notes,
    ]);
  };

  const handleEdit = () => {
    router.push(`/mot/route-permit-form?permitId=${permitInfo.permitId}`);
  };

  const handleReject = () => {
    alert("Permit rejected");
  };

  const handleClose = () => {
    router.push("/mot/busPermits");
  };

  const handleApprove = () => {
    alert("Permit approved successfully!");
  };

  return (
    <Layout
    role = "mot"
      activeItem="busPermits"
      pageTitle="Route Permit Details"
      pageDescription="View detailed information about the route permit"
    >
      <div className="space-y-6">
        {/* Header and Basic Info */}
        <RoutePermitHeader 
          permitInfo={permitInfo} 
          onEdit={handleEdit} 
          onBack={() => router.push("/mot/bus-permits")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Route Map */}
          <RouteMapView routeName={permitInfo.routeName} />

          {/* Permit Information */}
          <PermitInformationPanel permitInfo={permitInfo} />
        </div>

        {/* Permit Processing Timeline */}
        <PermitProcessingTimeline timelineSteps={timelineSteps} />

        {/* Attached Documents */}
        <AttachedDocuments documents={documents} />

        {/* Internal Notes */}
        <InternalNotes notes={notes} onAddNote={handleAddNote} />

        {/* Action Buttons */}
        <RoutePermitActions
          onReject={handleReject}
          onClose={handleClose}
          onApprove={handleApprove}
        />
      </div>
    </Layout>
  );
}
