'use client';

import { Search } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  direction: 'OUTBOUND' | 'INBOUND';
}

interface RouteGroup {
  id: string;
  name: string;
  routes: Route[];
}

interface RoutesListProps {
  routeGroups: RouteGroup[];
  selectedRoute: string | null;
  onRouteSelect: (routeId: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function RoutesList({
  routeGroups,
  selectedRoute,
  onRouteSelect,
  searchValue,
  onSearchChange,
}: RoutesListProps) {
  // Filter routes based on search input
  const filteredRouteGroups = routeGroups.filter(group => 
    group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    group.routes.some(route => route.name.toLowerCase().includes(searchValue.toLowerCase()))
  );

  return (
    <div className="w-1/5 bg-white p-6 border-r border-gray-100 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Routes</h2>
        <p className="text-sm text-gray-500">Select a route to view available trips</p>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search routes..."
          className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        {filteredRouteGroups.map((group) => (
          <div key={group.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="font-semibold text-blue-900 text-lg mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              {group.name}
            </div>
            <div className="ml-5 space-y-2">
              {group.routes.map((route) => (
                <div
                  key={route.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedRoute === route.id
                      ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                      : 'bg-white hover:bg-blue-50 hover:shadow-sm border border-gray-100'
                  }`}
                  onClick={() => onRouteSelect(route.id)}
                >
                  <div className="font-medium">{route.name}</div>
                  <div className={`text-xs mt-1 flex items-center ${
                    selectedRoute === route.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedRoute === route.id 
                        ? 'bg-blue-500 text-white' 
                        : route.direction === 'OUTBOUND'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {route.direction}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}