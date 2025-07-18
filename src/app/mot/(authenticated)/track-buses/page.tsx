"use client";

// import { MOTLayout } from "@/components/mot/layout";
import { TrackingStatsCards } from "@/components/mot/tracking-stats-cards";
import { TrackingFilters } from "@/components/mot/tracking-filters";
import { TrackingLegend } from "@/components/mot/tracking-legend";
import { LiveMapView } from "@/components/mot/live-map-view";
import { BusListSidebar } from "@/components/mot/bus-list-sidebar";
import { BusDetailsModal } from "@/components/mot/bus-details-modal";
import { useState, useEffect } from "react";
import { Layout } from "@/components/shared/layout";

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
    // New entries
    {
      id: "6",
      busNumber: "NB-1122",
      route: "Batticaloa - Polonnaruwa",
      driver: "H. De Alwis",
      status: "on-time",
      location: { lat: 7.7331, lng: 81.6938, address: "Batticaloa Town" },
      lastUpdate: "1 min ago",
      passengers: 40,
      nextStop: "Valachchenai",
      eta: "18 mins",
    },
    {
      id: "7",
      busNumber: "NB-3344",
      route: "Trincomalee - Colombo",
      driver: "W. Senanayake",
      status: "on-time",
      location: { lat: 8.5874, lng: 81.2152, address: "Trincomalee Depot" },
      lastUpdate: "4 mins ago",
      passengers: 50,
      nextStop: "Kantale",
      eta: "35 mins",
    },
    {
      id: "8",
      busNumber: "NB-5566",
      route: "Kurunegala - Dambulla",
      driver: "N. Bandara",
      status: "delayed",
      location: { lat: 7.4808, lng: 80.3629, address: "Kurunegala Town" },
      lastUpdate: "6 mins ago",
      passengers: 37,
      nextStop: "Ibbagamuwa",
      eta: "20 mins",
    },
    {
      id: "9",
      busNumber: "NB-7788",
      route: "Monaragala - Badulla",
      driver: "T. Rathnayake",
      status: "on-time",
      location: { lat: 6.8722, lng: 81.3505, address: "Wellawaya" },
      lastUpdate: "2 mins ago",
      passengers: 29,
      nextStop: "Ella",
      eta: "30 mins",
    },
    {
      id: "10",
      busNumber: "NB-9900",
      route: "Colombo - Hambantota",
      driver: "L. Gamage",
      status: "inactive",
      location: { lat: 6.1248, lng: 80.1003, address: "Colombo Depot" },
      lastUpdate: "25 mins ago",
      passengers: 0,
      nextStop: "Depot",
      eta: "N/A",
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

  // Calculate real-time stats based on filtered buses
  const calculateStats = () => {
    if (filteredBuses.length === 0) {
      return {
        activeBuses: { count: 0, operational: "No buses" },
        passengers: { count: 0, change: "No data" },
        delayedBuses: { count: 0, avgDelay: "No delays" },
        routesCovered: { count: 0 },
      };
    }

    const activeBuses = filteredBuses.filter(bus => bus.status !== "inactive");
    const delayedBuses = filteredBuses.filter(bus => bus.status === "delayed");
    const onTimeBuses = filteredBuses.filter(bus => bus.status === "on-time");
    const totalPassengers = filteredBuses.reduce((sum, bus) => sum + bus.passengers, 0);
    
    // Calculate operational percentage
    const operationalPercentage = Math.round((activeBuses.length / filteredBuses.length) * 100);
    
    // Calculate average delay for delayed buses (mock realistic calculation)
    const avgDelayMinutes = delayedBuses.length > 0 
      ? Math.round(delayedBuses.reduce((sum, bus) => {
          // Extract delay from lastUpdate or calculate based on status
          const updateTime = bus.lastUpdate;
          if (updateTime.includes("min")) {
            const minutes = parseInt(updateTime.split(" ")[0]);
            return sum + Math.max(5, minutes + Math.random() * 10);
          }
          return sum + (Math.random() * 15 + 5); // 5-20 min delay
        }, 0) / delayedBuses.length)
      : 0;
    
    // Calculate unique routes from filtered buses
    const uniqueRoutes = new Set(filteredBuses.map(bus => bus.route)).size;
    
    // Calculate passenger change percentage (mock - could be based on time of day)
    const hour = new Date().getHours();
    const isRushHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    const baseChange = isRushHour ? 5 + Math.random() * 10 : -2 + Math.random() * 8;
    const passengerChange = Math.round(baseChange);
    
    return {
      activeBuses: { 
        count: activeBuses.length, 
        operational: `${operationalPercentage}% operational` 
      },
      passengers: { 
        count: totalPassengers, 
        change: `${passengerChange >= 0 ? '+' : ''}${passengerChange}% from yesterday` 
      },
      delayedBuses: { 
        count: delayedBuses.length, 
        avgDelay: delayedBuses.length > 0 ? `Avg delay: ${avgDelayMinutes}min` : "No delays" 
      },
      routesCovered: { 
        count: uniqueRoutes 
      },
    };
  };

  const stats = calculateStats();

  return (
    <Layout
    role = "mot"
      activeItem="tracking"
      pageTitle="Track Buses"
      pageDescription="Real-time bus tracking and location monitoring"
    >
      <div className="space-y-6">
        <TrackingStatsCards stats={stats} />

        <TrackingFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onRefresh={handleRefresh}
        />

        <TrackingLegend />

        <div className="flex gap-6 min-h-[500px] max-h-[600px]">
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
    </Layout>
  );
}
