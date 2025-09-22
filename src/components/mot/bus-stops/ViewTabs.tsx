'use client';

import React from 'react';
import { Table, Map } from 'lucide-react';

export type ViewType = 'directory' | 'map';

interface ViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  directoryCount?: number;
  mapCount?: number;
}

export default function ViewTabs({ 
  activeView, 
  onViewChange, 
  directoryCount = 0, 
  mapCount = 0 
}: ViewTabsProps) {
  const tabs = [
    {
      id: 'directory' as ViewType,
      name: 'Directory View',
      icon: Table,
      count: directoryCount,
      description: 'Table view with detailed information'
    },
    {
      id: 'map' as ViewType,
      name: 'Map View',
      icon: Map,
      count: mapCount,
      description: 'Visual map with bus stop locations'
    }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeView === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                className={`
                  -ml-0.5 mr-2 h-5 w-5 transition-colors
                  ${isActive 
                    ? 'text-blue-500' 
                    : 'text-gray-400 group-hover:text-gray-500'
                  }
                `}
                aria-hidden="true" 
              />
              <span>{tab.name}</span>
              {/* {tab.count > 0 && (
                <span 
                  className={`
                    ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${isActive
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 group-hover:bg-gray-200'
                    }
                  `}
                >
                  {tab.count}
                </span>
              )} */}
            </button>
          );
        })}
      </nav>
      
      {/* Tab descriptions */}
      <div className="mt-2 mb-4">
        {tabs.map((tab) => {
          if (activeView !== tab.id) return null;
          
          return (
            <p key={tab.id} className="text-sm text-gray-600">
              {/* {tab.description} */}
            </p>
          );
        })}
      </div>
    </div>
  );
}