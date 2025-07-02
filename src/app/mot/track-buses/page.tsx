"use client";

import { MOTLayout } from "@/components/mot/layout";
import { TrackingStatsCards } from "@/components/mot/tracking-stats-cards";
import { TrackingFilters } from "@/components/mot/tracking-filters";
import { TrackingLegend } from "@/components/mot/tracking-legend";
import { LiveMapView } from "@/components/mot/live-map-view";
import { BusListSidebar } from "@/components/mot/bus-list-sidebar";
import { BusDetailsModal } from "@/components/mot/bus-details-modal";
import { useState, useEffect } from "react";

interface Bus {
  id: string;
  busNumber: string;
  route: string;
  driver: string;
  status: "on-time" | "delayed" | "inactive";
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  lastUpdate: string;
  passengers: number;
  nextStop: string;
  eta: string;
}

export default function TrackBuses() {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock bus data - in real app, this would come from GPS tracking API
  const [buses] = useState<Bus[]>([
    {
      id: "1",
      busNumber: "NB-1234",
      route: "Colombo - Kandy",
      driver: "K. Silva",
      status: "on-time",
      location: { lat: 6.9271, lng: 79.8612, address: "Colombo Fort" },
      lastUpdate: "2 mins ago",
      passengers: 45,
      nextStop: "Kelaniya",
      eta: "15 mins",
    },
    {
      id: "2",
      busNumber: "NB-5678",
      route: "Galle - Matara",
      driver: "P. Fernando",
      status: "delayed",
      location: { lat: 6.0535, lng: 80.221, address: "Galle" },
      lastUpdate: "1 min ago",
      passengers: 32,
      nextStop: "Hikkaduwa",
      eta: "25 mins",
    },
    {
      id: "3",
      busNumber: "NB-9012",
      route: "Negombo - Airport",
      driver: "S. Perera",
      status: "on-time",
      location: { lat: 7.2083, lng: 79.8358, address: "Negombo" },
      lastUpdate: "3 mins ago",
      passengers: 28,
      nextStop: "Katunayake",
      eta: "12 mins",
    },
    {
      id: "4",
      busNumber: "NB-3456",
      route: "Kandy - Nuwara Eliya",
      driver: "R. Jayasinghe",
      status: "inactive",
      location: { lat: 7.2906, lng: 80.6337, address: "Kandy Central" },
      lastUpdate: "15 mins ago",
      passengers: 0,
      nextStop: "Depot",
      eta: "N/A",
    },
    {
      id: "5",
      busNumber: "NB-7890",
      route: "Colombo - Jaffna",
      driver: "M. Kumar",
      status: "delayed",
      location: { lat: 7.8731, lng: 80.7718, address: "Anuradhapura" },
      lastUpdate: "5 mins ago",
      passengers: 52,
      nextStop: "Vavuniya",
      eta: "45 mins",
    },
  ]);

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
    setIsDetailsModalOpen(true);
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In real app, this would fetch latest GPS data
  };

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch =
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MOTLayout
      activeItem="tracking"
      pageTitle="Track Buses"
      pageDescription="Real-time bus tracking and location monitoring"
    >
      <div className="space-y-6">
        <TrackingFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onRefresh={handleRefresh}
        />

        <TrackingLegend />

        <TrackingStatsCards />

        <div className="flex gap-6 h-96">
          <LiveMapView
            buses={filteredBuses}
            onBusClick={handleBusClick}
            lastRefresh={lastRefresh}
          />

          <BusListSidebar buses={filteredBuses} onBusClick={handleBusClick} />
        </div>

        <BusDetailsModal
          selectedBus={selectedBus}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </div>
    </MOTLayout>
  );
}
