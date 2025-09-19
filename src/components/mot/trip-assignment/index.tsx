'use client';

import { useState } from 'react';
import { RoutesList } from './RoutesList';
import { TripsCalendar } from './TripsCalendar';
import { PSPList } from './PSPList';

export function TripAssignment() {
  // State management
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [routeSearch, setRouteSearch] = useState('');
  const [pspSearch, setPspSearch] = useState('');
  
  // Dummy data for UI development
  const routeGroups = [
    {
      id: 'rg1',
      name: 'Colombo - Kandy',
      routes: [
        { id: 'r1', name: 'Colombo - Kandy UP', direction: 'OUTBOUND' as const },
        { id: 'r2', name: 'Kandy - Colombo DOWN', direction: 'INBOUND' as const }
      ]
    },
    {
      id: 'rg2',
      name: 'Colombo - Galle',
      routes: [
        { id: 'r3', name: 'Colombo - Galle UP', direction: 'OUTBOUND' as const },
        { id: 'r4', name: 'Galle - Colombo DOWN', direction: 'INBOUND' as const }
      ]
    }
  ];

  const trips = [
    { 
      id: 't1', 
      routeId: 'r1', 
      departureTime: '08:30', 
      arrivalTime: '12:00', 
      pspId: 'PSP001', 
      busNumber: 'BUS-123',
      assigned: true
    },
    { 
      id: 't2', 
      routeId: 'r1', 
      departureTime: '10:30', 
      arrivalTime: '14:00', 
      pspId: null, 
      busNumber: null,
      assigned: false
    },
    { 
      id: 't3', 
      routeId: 'r2', 
      departureTime: '09:00', 
      arrivalTime: '12:30', 
      pspId: 'PSP002', 
      busNumber: 'BUS-456',
      assigned: true
    }
  ];

  const psps = [
    { 
      id: 'PSP001', 
      permitNumber: 'PSP/2025/001',
      routeGroupId: 'rg1',
      operator: 'ABC Travels',
      maxBusAssigned: 5,
      currentlyAssigned: 3,
      expiryDate: '2026-12-31'
    },
    { 
      id: 'PSP002', 
      permitNumber: 'PSP/2025/002',
      routeGroupId: 'rg1',
      operator: 'XYZ Bus Lines',
      maxBusAssigned: 3,
      currentlyAssigned: 1,
      expiryDate: '2026-10-15'
    },
    { 
      id: 'PSP003', 
      permitNumber: 'PSP/2025/003',
      routeGroupId: 'rg2',
      operator: '123 Express',
      maxBusAssigned: 4,
      currentlyAssigned: 2,
      expiryDate: '2026-11-20'
    }
  ];

  // Handle trip selection
  const handleTripSelect = (tripId: string) => {
    setSelectedTrip(tripId === selectedTrip ? null : tripId);
  };

  // Handle PSP assignment
  const handleAssignPsp = (pspId: string) => {
    if (!selectedTrip) return;
    
    // In a real app, this would make an API call to update the trip
    console.log(`Assigning PSP ${pspId} to Trip ${selectedTrip}`);
    
    // For demo purposes, we'll update our local state
    // In a real app, this would be handled by refreshing from the API
    setSelectedTrip(null);
  };

  return (
    <div className="flex h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="flex w-full max-w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <RoutesList
          routeGroups={routeGroups}
          selectedRoute={selectedRoute}
          onRouteSelect={setSelectedRoute}
          searchValue={routeSearch}
          onSearchChange={setRouteSearch}
        />
        
        <TripsCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          onTripSelect={handleTripSelect}
          selectedRoute={selectedRoute}
        />
        
        <PSPList
          psps={psps}
          trips={trips}
          routeGroups={routeGroups}
          selectedTrip={selectedTrip}
          selectedRoute={selectedRoute}
          searchValue={pspSearch}
          onSearchChange={setPspSearch}
          onAssignPsp={handleAssignPsp}
        />
      </div>
    </div>
  );
}
