"use client"

import { useState } from "react"
import { Sidebar } from "@/components/operator/sidebar"
import { Header } from "@/components/operator/header"
import { MetricCard } from "@/components/operator/metric-card"
import { StaffTable } from "@/components/operator/staff-table"
import { StaffAssignment } from "@/components/operator/staff-assignment"
import { StaffAttendance } from "@/components/operator/staff-attendance"
import { Users, Car, Ticket, Calendar, Plus, Search } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  role: "Driver" | "Conductor"
  nic: string
  phone: string
  address: string
  assignment: string
  status: "Assigned" | "Available"
  avatar: string
}

export default function StaffManagement() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const staffData: StaffMember[] = [
    {
      id: "1",
      name: "Kasun Perera",
      role: "Driver",
      nic: "912345678V",
      phone: "+94 77 123 4567",
      address: "123/A, Galle Road, Matara",
      assignment: "Mandakini Express",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Nuwan Silva",
      role: "Conductor",
      nic: "901234567V",
      phone: "+94 77 234 5678",
      address: "45/B, Station Road, Matara",
      assignment: "Mandakini Express",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Chaminda Fernando",
      role: "Driver",
      nic: "892345671V",
      phone: "+94 77 345 6789",
      address: "78/C, Beach Road, Matara",
      assignment: "Mandakini Super",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Roshan Jayawardena",
      role: "Conductor",
      nic: "881234562V",
      phone: "+94 77 456 7890",
      address: "12/D, Temple Street, Matara",
      assignment: "Mandakini Super",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Pradeep Kumara",
      role: "Driver",
      nic: "872345673V",
      phone: "+94 77 567 8901",
      address: "34/E, Market Road, Matara",
      assignment: "Mandakini Classic",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "6",
      name: "Mahinda Rathnayake",
      role: "Conductor",
      nic: "861234564V",
      phone: "+94 77 678 9012",
      address: "56/F, Hill Street, Matara",
      assignment: "Mandakini Classic",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "7",
      name: "Dinesh Bandara",
      role: "Driver",
      nic: "852345675V",
      phone: "+94 77 789 0123",
      address: "89/G, Canal Road, Matara",
      assignment: "Mandakini Deluxe",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "8",
      name: "Sampath Wijesinghe",
      role: "Conductor",
      nic: "841234566V",
      phone: "+94 77 890 1234",
      address: "23/H, School Lane, Matara",
      assignment: "Mandakini Deluxe",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "9",
      name: "Thilaka Dissanayake",
      role: "Driver",
      nic: "832345677V",
      phone: "+94 77 901 2345",
      address: "67/I, Police Road, Matara",
      assignment: "Mandakini Premium",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "10",
      name: "Ruwan Gunawardena",
      role: "Conductor",
      nic: "821234568V",
      phone: "+94 77 012 3456",
      address: "90/J, Hospital Street, Matara",
      assignment: "Mandakini Premium",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "11",
      name: "Sunil Rajapaksha",
      role: "Driver",
      nic: "812345679V",
      phone: "+94 77 123 4567",
      address: "14/K, Port Road, Matara",
      assignment: "Mandakini Royal",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "12",
      name: "Chandana Senanayake",
      role: "Conductor",
      nic: "801234560V",
      phone: "+94 77 234 5678",
      address: "36/L, Railway Avenue, Matara",
      assignment: "Mandakini Royal",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "13",
      name: "Upul Mendis",
      role: "Driver",
      nic: "792345680V",
      phone: "+94 77 345 6789",
      address: "58/M, Bridge Road, Matara",
      assignment: "Mandakini Highway",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "14",
      name: "Gamini Wickramasinghe",
      role: "Conductor",
      nic: "781234561V",
      phone: "+94 77 456 7890",
      address: "81/N, Church Street, Matara",
      assignment: "Mandakini Highway",
      status: "Assigned",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "15",
      name: "Arjuna Ranatunga",
      role: "Driver",
      nic: "772345681V",
      phone: "+94 77 567 8901",
      address: "25/O, Garden Road, Matara",
      assignment: "-",
      status: "Available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "16",
      name: "Lalith Jayasuriya",
      role: "Conductor",
      nic: "761234562V",
      phone: "+94 77 678 9012",
      address: "47/P, Lake View, Matara",
      assignment: "-",
      status: "Available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.nic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || staff.role.toLowerCase() === activeTab.toLowerCase()
    const matchesRole = roleFilter === "all" || staff.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || staff.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesTab && matchesRole && matchesStatus
  })

  const handleAddStaff = () => {
    console.log("Add new staff")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* <Sidebar activeItem="staff" /> */}

      <div className="flex-1">
        <Header 
          pageTitle="Staff Management" 
          pageDescription="Manage drivers, conductors, assignments, and staff performance"
        />

        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Staff Assignment & Management</h1>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Staff"
              value={16}
              icon={<Users className="w-6 h-6 text-blue-600" />}
            />
            <MetricCard
              title="Drivers"
              value={8}
              icon={<Car className="w-6 h-6 text-green-600" />}
            />
            <MetricCard
              title="Conductors"
              value={8}
              icon={<Ticket className="w-6 h-6 text-purple-600" />}
            />
            <MetricCard
              title="Assigned Today"
              value={14}
              icon={<Calendar className="w-6 h-6 text-orange-600" />}
            />
          </div>

          {/* Add Staff Button */}
          <div className="mb-6">
            <button
              onClick={handleAddStaff}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Staff
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
            <div className="p-6">
              {/* Tab Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500">
                  {["all", "drivers", "conductors"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                        activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "hover:bg-gray-200"
                      }`}
                    >
                      {tab === "all" ? "All Staff" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or NIC"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="flex h-10 w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Filter by Role</option>
                  <option value="driver">Driver</option>
                  <option value="conductor">Conductor</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex h-10 w-40 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Filter by Status</option>
                  <option value="assigned">Assigned</option>
                  <option value="available">Available</option>
                </select>
              </div>
            </div>

            {/* Staff Table */}
            <StaffTable staff={filteredStaff} currentPage={currentPage} totalStaff={16} onPageChange={setCurrentPage} />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StaffAssignment />
            <StaffAttendance />
          </div>
        </div>
      </div>
    </div>
  )
}
