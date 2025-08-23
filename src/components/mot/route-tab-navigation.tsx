"use client";

import { RouteIcon, MapPin, Gauge, Calendar } from 'lucide-react';

interface RouteTabNavigationProps {
  activeTab: 'details' | 'stops' | 'schedules' | 'performance';
  onTabChange: (tab: 'details' | 'stops' | 'schedules' | 'performance') => void;
}

export function RouteTabNavigation({ activeTab, onTabChange }: RouteTabNavigationProps) {
  const tabs = [
    { id: 'details' as const, label: 'Basic Details', icon: RouteIcon },
    { id: 'stops' as const, label: 'Intermediate Stops', icon: MapPin },
    { id: 'performance' as const, label: 'Performance Metrics', icon: Gauge },
    { id: 'schedules' as const, label: 'Schedules', icon: Calendar },
  ];

  return (
    <div className="border-t border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
