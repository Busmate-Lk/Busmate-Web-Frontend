"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, Home } from "lucide-react"
import { Layout } from "@/components/shared/layout"
import BusHeaderInfo from "@/components/mot/BusHeaderInfo"
import BusPhotoDisplay from "@/components/mot/BusPhotoDisplay"
import BusDetailedInfo from "@/components/mot/BusDetailedInfo"
import BusDocuments from "@/components/mot/BusDocuments"
import BusActionButtons from "@/components/mot/BusActionButtons"

interface Bus {
  id: string
  busNumber: string
  busType: string
  operator: string
  operatorType: string
  seatingCapacity: number
  standingCapacity?: number
  status: string
  chassisNo: string
  engineNo: string
  fuelType: string
  regionAssigned: string
  depotName: string
  registrationDate: string
  lastInspectionDate: string
  nextMaintenanceDate: string
  photo?: string
}

// Sample bus data - replace with real data fetching
const sampleBus: Bus[] = [
  {
    id: "1",
    busNumber: "NB-1234",
    busType: "AC",
    operator: "Ceylon Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 45,
    standingCapacity: 15,
    status: "Active",
    chassisNo: "CH789456123",
    engineNo: "EN987654321",
    fuelType: "Diesel",
    regionAssigned: "Western Province",
    depotName: "Colombo Central Depot",
    registrationDate: "2022-03-15",
    lastInspectionDate: "2024-11-20",
    nextMaintenanceDate: "2025-01-15",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    busNumber: "PV-5678",
    busType: "Non-AC",
    operator: "Lanka Private Bus",
    operatorType: "Private",
    seatingCapacity: 52,
    status: "Active",
    chassisNo: "CH456789012",
    engineNo: "EN123456789",
    fuelType: "Diesel",
    regionAssigned: "Western Province",
    depotName: "Pettah Depot",
    registrationDate: "2021-08-10",
    lastInspectionDate: "2024-10-15",
    nextMaintenanceDate: "2025-02-20",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    busNumber: "SL-9012",
    busType: "Sleeper",
    operator: "Express Lanka",
    operatorType: "Private",
    seatingCapacity: 32,
    status: "Maintenance",
    chassisNo: "CH123456789",
    engineNo: "EN456789012",
    fuelType: "Diesel",
    regionAssigned: "Central Province",
    depotName: "Kandy Depot",
    registrationDate: "2020-12-05",
    lastInspectionDate: "2024-09-30",
    nextMaintenanceDate: "2024-12-15",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    busNumber: "NB-3456",
    busType: "AC",
    operator: "SLTB Western",
    operatorType: "SLTB",
    seatingCapacity: 48,
    status: "Active",
    chassisNo: "CH987654321",
    engineNo: "EN789012345",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Galle Depot",
    registrationDate: "2023-01-20",
    lastInspectionDate: "2024-11-05",
    nextMaintenanceDate: "2025-03-10",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "5",
    busNumber: "WP-7890",
    busType: "AC",
    operator: "Kurunegala Express",
    operatorType: "Private",
    seatingCapacity: 50,
    status: "Active",
    chassisNo: "CH654321098",
    engineNo: "EN321098765",
    fuelType: "Diesel",
    regionAssigned: "North Western Province",
    depotName: "Kurunegala Depot",
    registrationDate: "2019-06-15",
    lastInspectionDate: "2024-08-20",
    nextMaintenanceDate: "2024-11-30",
    photo: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "6",
    busNumber: "UP-2468",
    busType: "Semi-Luxury",
    operator: "Hill Country Transport",
    operatorType: "SLTB",
    seatingCapacity: 40,
    status: "Active",
    chassisNo: "CH135792468",
    engineNo: "EN246813579",
    fuelType: "Diesel",
    regionAssigned: "Uva Province",
    depotName: "Badulla Depot",
    registrationDate: "2022-07-12",
    lastInspectionDate: "2024-10-25",
    nextMaintenanceDate: "2025-01-25",
    photo: "/placeholder.svg?height=300&width=400",
  },
]

export default function ViewBus() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const busId = searchParams.get("id")

  // In real app, fetch bus data based on busId
  const bus = sampleBus.find(b => b.id === busId)

  // Breadcrumb configuration
  const getBreadcrumbs = () => {
    return [
      {
        label: "Bus Information",
        href: "/mot/bus-infomation",
        current: false
      },
      {
        label: bus ? `${bus.busNumber} Details` : "Bus Details",
        href: null,
        current: true
      }
    ]
  }

  if (!bus) {
    return (
      <Layout
        activeItem="bus-infomation"
        pageTitle="Bus Not Found"
        pageDescription="The requested bus information could not be found"
        role="mot"
      >
        <div className="text-center">
          <p className="text-gray-500">Bus not found</p>
          <button
            onClick={() => router.push("/mot/bus-infomation")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Bus List
          </button>
        </div>
      </Layout>
    )
  }

  const handleEdit = () => {
    console.log("Edit button clicked, bus ID:", busId)
    router.push(`/mot/bus-information-form?edit=${busId}`)
  }

  const handleViewFullSize = () => {
    // Handle view full size photo
    console.log("View full size photo")
  }

  const handleChangePhoto = () => {
    // Handle change photo
    console.log("Change photo")
  }

  const handleMarkMaintenance = () => {
    // Handle mark for maintenance
    console.log("Mark for maintenance")
  }

  const handleViewDocument = (document: any) => {
    // Handle view document
    console.log("View document:", document)
  }

  const handleDownloadDocument = (document: any) => {
    // Handle download document
    console.log("Download document:", document)
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <Layout
      activeItem="bus-infomation"
      pageTitle="Bus Information Details"
      pageDescription="View detailed information about bus fleet"
      role="mot"
    >
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="text-gray-400 mx-2">/</span>
                  )}

                  {breadcrumb.current ? (
                    <span className="text-sm font-medium text-gray-900">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => router.push(breadcrumb.href!)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {breadcrumb.label}
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>


        <BusHeaderInfo bus={bus} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BusPhotoDisplay
            photo={bus.photo}
            onViewFullSize={handleViewFullSize}
            onChangePhoto={handleChangePhoto}
          />
          <BusDetailedInfo bus={bus} />
        </div>

        <BusDocuments
          onViewDocument={handleViewDocument}
          onDownloadDocument={handleDownloadDocument}
        />

        <BusActionButtons
          onEdit={handleEdit}
          onMarkMaintenance={handleMarkMaintenance}
        />
      </div>
    </Layout>
  )
}