"use client"

import { useRouter } from "next/navigation"
import { Layout } from "@/components/shared/layout"
import BroadcastStats from "@/components/mot/BroadcastStats"
import CreateMessageForm from "@/components/mot/CreateMessageForm"
import MessageBox, { BroadcastMessage } from "@/components/mot/MessageBox"
import MessagesTable from "@/components/mot/MessagesTable"
import QuickTemplates from "@/components/mot/QuickTemplates"

// Data directly in main file
const broadcastMessages: BroadcastMessage[] = [
  {
    id: "BM001",
    title: "Route 138 Service Disruption - Colombo to Matara",
    body: "Due to road construction on Galle Road near Kalutara, Route 138 services will be delayed by 30-45 minutes from 9:00 AM to 5:00 PM today. Alternative routes via A2 highway are recommended. Passengers are advised to plan accordingly.",
    targetGroups: ["Bus Operators", "Drivers", "Passengers"],
    priority: "High",
    category: "Route Update",
    scheduledTime: "2024-12-01 08:00",
    status: "Sent",
    createdAt: "2024-12-01 07:30",
    sentAt: "2024-12-01 08:00",
  },
  {
    id: "BM002",
    title: "New Fare Structure Implementation - Effective January 1st, 2025",
    body: "The Ministry of Transport announces new fare structures for all SLTB and private bus services effective January 1st, 2025. AC buses: Rs. 3.50 per km, Non-AC buses: Rs. 2.80 per km. Student discounts remain at 50%. Please update your fare collection systems accordingly.",
    targetGroups: ["Bus Operators", "Conductors", "Fleet Operators"],
    priority: "High",
    category: "Policy",
    scheduledTime: "2024-12-15 09:00",
    status: "Pending",
    createdAt: "2024-11-28 14:20",
  },
  {
    id: "BM003",
    title: "Mandatory Vehicle Inspection Reminder - December 2024",
    body: "All bus operators are reminded that annual vehicle inspections must be completed before December 31st, 2024. Inspection centers are available in Colombo, Kandy, Galle, and Kurunegala. Book your appointments early to avoid last-minute rush.",
    targetGroups: ["Bus Operators", "Fleet Operators"],
    priority: "Medium",
    category: "Maintenance",
    scheduledTime: "2024-12-01 10:00",
    status: "Sent",
    createdAt: "2024-11-25 16:45",
    sentAt: "2024-12-01 10:00",
  },
  {
    id: "BM004",
    title: "Driver Training Program - Road Safety Initiative",
    body: "The National Transport Commission is conducting mandatory road safety training for all bus drivers. Sessions will be held from January 15-30, 2025, across all provinces. Registration is now open. Contact your regional transport office for details.",
    targetGroups: ["Drivers", "Bus Operators"],
    priority: "Medium",
    category: "Training",
    scheduledTime: "2024-12-10 14:00",
    status: "Pending",
    createdAt: "2024-11-30 11:15",
  },
  {
    id: "BM005",
    title: "Fuel Subsidy Program Update - December 2024",
    body: "The government fuel subsidy program for public transport continues for December 2024. Eligible operators can claim Rs. 15 per liter subsidy for diesel. Submit your monthly fuel consumption reports by the 5th of each month to qualify.",
    targetGroups: ["Bus Operators", "Fleet Operators"],
    priority: "Medium",
    category: "Policy",
    scheduledTime: "2024-12-01 12:00",
    status: "Sent",
    createdAt: "2024-11-28 09:30",
    sentAt: "2024-12-01 12:00",
  },
  {
    id: "BM006",
    title: "Emergency Contact System Activation",
    body: "New emergency contact system is now active. In case of accidents or breakdowns, drivers can call 1919 for immediate assistance. GPS tracking will help locate vehicles quickly. All buses must have emergency contact stickers displayed.",
    targetGroups: ["Drivers", "Conductors", "Bus Operators"],
    priority: "High",
    category: "Emergency",
    scheduledTime: "2024-12-02 08:00",
    status: "Pending",
    createdAt: "2024-12-01 15:20",
  },
  {
    id: "BM007",
    title: "Holiday Schedule Changes - Christmas & New Year 2024",
    body: "Special holiday schedules will be in effect from December 24th to January 2nd. Increased frequency on popular routes to Kandy, Galle, and Anuradhapura. Night services extended until 11:00 PM. Check with your depot for specific route changes.",
    targetGroups: ["All Users"],
    priority: "Medium",
    category: "General",
    scheduledTime: "2024-12-01 16:00",
    status: "Sent",
    createdAt: "2024-11-29 13:45",
    sentAt: "2024-12-01 16:00",
  },
  {
    id: "BM008",
    title: "Digital Ticketing System Rollout - Phase 2",
    body: "Phase 2 of digital ticketing system launches in Colombo, Kandy, and Galle from January 2025. QR code payments and mobile apps will be available. Training sessions for conductors scheduled for December 15-20. Contact IT support for device installation.",
    targetGroups: ["Conductors", "Bus Operators"],
    priority: "Medium",
    category: "Technology",
    scheduledTime: "2024-12-05 11:00",
    status: "Pending",
    createdAt: "2024-12-01 08:15",
  },
  {
    id: "BM009",
    title: "Weather Alert - Heavy Rains Expected in Southern Province",
    body: "Meteorological Department warns of heavy rainfall in Southern Province from December 3-5. Routes to Galle, Matara, and Hambantota may experience delays. Drivers are advised to exercise caution and reduce speed on wet roads.",
    targetGroups: ["Drivers", "Bus Operators", "Passengers"],
    priority: "High",
    category: "Emergency",
    scheduledTime: "2024-12-03 06:00",
    status: "Pending",
    createdAt: "2024-12-02 18:30",
  },
  {
    id: "BM010",
    title: "New Bus Terminal Opening - Maharagama",
    body: "The new Maharagama Bus Terminal will commence operations from December 15th, 2024. All routes currently terminating at Maharagama Junction will be redirected to the new terminal. Updated route maps and schedules are available at regional offices.",
    targetGroups: ["Bus Operators", "Drivers", "Passengers"],
    priority: "Medium",
    category: "Route Update",
    scheduledTime: "2024-12-10 09:00",
    status: "Pending",
    createdAt: "2024-12-01 12:45",
  },
]

export default function Broadcast() {
  const router = useRouter()

  const sentMessages = broadcastMessages.filter((message) => message.status === "Sent")
  const pendingMessages = broadcastMessages.filter((message) => message.status === "Pending")

  const handleSendMessage = (messageData: any) => {
    console.log("Sending message:", messageData)
  }

  const handleSaveDraft = (messageData: any) => {
    console.log("Saving draft:", messageData)
  }

  return (
    <Layout
      activeItem="broadcast"
      pageTitle="Broadcast Messages"
      pageDescription="Manage and send notifications to bus operators, drivers, and passengers"
      role="mot"
    >
      <div className="space-y-6">
       

        <BroadcastStats
          totalMessages={broadcastMessages.length}
          sentMessages={sentMessages.length}
          pendingMessages={pendingMessages.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CreateMessageForm
            onSendMessage={handleSendMessage}
            onSaveDraft={handleSaveDraft}
          />

          <MessageBox
            messages={broadcastMessages}
            sentMessages={sentMessages}
            pendingMessages={pendingMessages}
          />
        </div>

        <div className="mt-6">
          <MessagesTable messages={broadcastMessages} />
        </div>

        <div className="mt-6">
          <QuickTemplates />
        </div>
      </div>
    </Layout>
  )
}