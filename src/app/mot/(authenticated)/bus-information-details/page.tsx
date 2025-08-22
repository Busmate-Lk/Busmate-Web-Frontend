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
  permitValidFrom?: string
  permitValidTo?: string
  assignedRoute?: string
  notes?: string
  photo?: string
}

// Updated sample bus data with correct photo paths
const sampleBus: Bus[] = [
  {
    id: "1",
    busNumber: "ND-4536",
    busType: "AC",
    operator: "Southern Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 45,
    standingCapacity: 15,
    status: "Active",
    chassisNo: "CH789456123",
    engineNo: "EN987654321",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2022-03-15",
    permitValidFrom: "2024-11-20",
    permitValidTo: "2026-11-15",
    photo: "/images/buses/bus1.png", // ✅ Fixed path
    assignedRoute: "MATARA-GALLE",
    notes: "",
  },
  {
    id: "2",
    busNumber: "ND-7892",
    busType: "AC",
    operator: "Ceylon Transport Board",
    operatorType: "SLTB",
    seatingCapacity: 52,
    standingCapacity: 20,
    status: "Active",
    chassisNo: "CH456789012",
    engineNo: "EN123456789",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2021-08-10",
    permitValidFrom: "2024-10-15",
    permitValidTo: "2026-10-20",
    photo: "/images/buses/bus2.png", // ✅ Fixed path
    assignedRoute: "MATARA-COLOMBO",
    notes: "",
  },
  {
    id: "3",
    busNumber: "ND-3421",
    busType: "Non-AC",
    operator: "Southern Express",
    operatorType: "Private",
    seatingCapacity: 48,
    status: "Active",
    chassisNo: "CH123456789",
    engineNo: "EN456789012",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Matara Depot",
    registrationDate: "2020-12-05",
    permitValidFrom: "2024-09-30",
    permitValidTo: "2027-01-15",
    photo: "/images/buses/bus3.png", // ✅ Fixed path
    assignedRoute: "MATARA-TANGALLE",
    notes: "",
  },
  {
    id: "4",
    busNumber: "ND-8765",
    busType: "Semi-Luxury",
    operator: "Ruhunu Transport",
    operatorType: "Private",
    seatingCapacity: 40,
    status: "Active",
    chassisNo: "CH987654321",
    engineNo: "EN789012345",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Hambantota Depot",
    registrationDate: "2023-01-20",
    permitValidFrom: "2024-11-05",
    permitValidTo: "2027-07-10",
    photo: "/images/buses/bus4.png", // ✅ Fixed path
    assignedRoute: "MATARA-HAMBANTOTA",
    notes: "",
  },
  {
    id: "5",
    busNumber: "ND-5234",
    busType: "Non-AC",
    operator: "Akuressa Transport",
    operatorType: "Private",
    seatingCapacity: 50,
    status: "Active",
    chassisNo: "CH654321098",
    engineNo: "EN321098765",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Akuressa Depot",
    registrationDate: "2019-06-15",
    permitValidFrom: "2024-08-20",
    permitValidTo: "2027-11-30",
    photo: "/images/buses/bus5.png", // ✅ Fixed path
    assignedRoute: "MATARA-AKURESSA",
    notes: "",
  },
  {
    id: "6",
    busNumber: "ND-9876",
    busType: "AC",
    operator: "Weligama Bay Transport",
    operatorType: "SLTB",
    seatingCapacity: 42,
    status: "Inactive",
    chassisNo: "CH135792468",
    engineNo: "EN246813579",
    fuelType: "Diesel",
    regionAssigned: "Southern Province",
    depotName: "Weligama Depot",
    registrationDate: "2022-07-12",
    permitValidFrom: "2024-10-25",
    permitValidTo: "2027-01-25",
    photo: "/images/buses/bus6.png", // ✅ Fixed path
    assignedRoute: "MATARA-WELIGAMA",
    notes: "",
  }
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
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Bus not found</p>
          <button
            onClick={() => router.push("/mot/bus-infomation")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
    console.log("View full size photo")
    // You can implement a modal or new page to show full size image
  }

  const handleChangePhoto = () => {
    console.log("Change photo")
    // You can implement photo upload functionality
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

        <BusActionButtons
          onEdit={handleEdit}
        />
      </div>
    </Layout>
  )
}