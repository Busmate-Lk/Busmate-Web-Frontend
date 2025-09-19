'use client';

import { Search } from 'lucide-react';

interface PSP {
  id: string;
  permitNumber: string;
  routeGroupId: string;
  operator: string;
  maxBusAssigned: number;
  currentlyAssigned: number;
  expiryDate: string;
}

interface Trip {
  id: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  pspId: string | null;
  busNumber: string | null;
  assigned: boolean;
}

interface RouteGroup {
  id: string;
  name: string;
  routes: Array<{ id: string; name: string; direction: string }>;
}

interface PSPListProps {
  psps: PSP[];
  trips: Trip[];
  routeGroups: RouteGroup[];
  selectedTrip: string | null;
  selectedRoute: string | null;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAssignPsp: (pspId: string) => void;
}

export function PSPList({
  psps,
  trips,
  routeGroups,
  selectedTrip,
  selectedRoute,
  searchValue,
  onSearchChange,
  onAssignPsp,
}: PSPListProps) {
  // Filter PSPs based on search input and selected route
  const filteredPSPs = selectedRoute 
    ? psps.filter(psp => {
        const matchesSearch = psp.permitNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
                             psp.operator.toLowerCase().includes(searchValue.toLowerCase());
        
        // Only show PSPs for the selected route group
        const matchesRoute = routeGroups.find(group => 
          group.routes.some(route => route.id === selectedRoute) && 
          group.id === psp.routeGroupId
        );
        
        return matchesSearch && matchesRoute;
      })
    : [];

  // Determine if a PSP is assignable to the selected trip
  const isPspAssignable = (psp: PSP) => {
    if (!selectedTrip) return true;
    
    const selectedTripObj = trips.find(trip => trip.id === selectedTrip);
    if (!selectedTripObj) return false;
    
    // Check if the PSP is already at max capacity
    if (psp.currentlyAssigned >= psp.maxBusAssigned) return false;
    
    // Check if the PSP is for the right route group
    const tripRoute = selectedTripObj.routeId;
    const routeGroup = routeGroups.find(group => 
      group.routes.some(route => route.id === tripRoute)
    );
    
    return routeGroup && routeGroup.id === psp.routeGroupId;
  };

  return (
    <div className="w-1/4 bg-white p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Permits</h2>
        <p className="text-sm text-gray-500">Available passenger service permits</p>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search permits..."
          className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {selectedTrip && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-blue-900">Trip Assignment Mode</p>
          </div>
          <p className="text-sm text-blue-700">
            Select a PSP to assign to the selected trip
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredPSPs.length > 0 ? (
          filteredPSPs.map((psp) => {
            const assignable = isPspAssignable(psp);
            const utilizationPercentage = (psp.currentlyAssigned / psp.maxBusAssigned) * 100;
            
            return (
              <div
                key={psp.id}
                className={`
                  border rounded-xl p-4 transition-all duration-300 
                  ${selectedTrip && !assignable ? 'opacity-50 cursor-not-allowed' : ''}
                  ${selectedTrip && assignable ? 'cursor-pointer hover:shadow-lg hover:border-blue-300 transform hover:scale-[1.02]' : 'cursor-default'}
                  ${assignable && selectedTrip ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}
                  shadow-sm
                `}
                onClick={() => {
                  if (selectedTrip && assignable) {
                    onAssignPsp(psp.id);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">{psp.permitNumber}</div>
                    <div className="text-sm text-gray-600 font-medium">{psp.operator}</div>
                  </div>
                  {selectedTrip && (
                    <div className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      assignable 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {assignable ? '✓ Assignable' : '✗ Not Available'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {/* Bus Capacity Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Bus Capacity</span>
                      <span className="text-sm text-gray-600">
                        {psp.currentlyAssigned}/{psp.maxBusAssigned}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          utilizationPercentage >= 100 
                            ? 'bg-red-500' 
                            : utilizationPercentage >= 80 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Expiry Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Expires</span>
                    <span className={`text-sm px-2 py-1 rounded-lg ${
                      new Date(psp.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {new Date(psp.expiryDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {!selectedRoute ? "Select a route first" : "No permits found"}
            </h3>
            <p className="text-gray-500">
              {!selectedRoute 
                ? "Choose a route from the left panel to view available passenger service permits"
                : filteredPSPs.length === 0 && searchValue
                ? "No PSPs match your search criteria"
                : "No PSPs are available for the selected route"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}