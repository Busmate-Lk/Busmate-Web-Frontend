'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bus, 
  Users, 
  Route, 
  Shield, 
  Calendar, 
  Activity,
  BarChart3,
  Settings,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { QuickAction } from '@/app/mot/(authenticated)/dashboard/data';

interface QuickActionsProps {
  actions: QuickAction[];
  loading?: boolean;
}

const iconMap = {
  bus: Bus,
  users: Users,
  route: Route,
  shield: Shield,
  calendar: Calendar,
  activity: Activity,
  chart: BarChart3,
  settings: Settings
};

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-100 text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-100 text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-100 text-orange-600',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100'
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'bg-teal-100 text-teal-600',
    border: 'border-teal-200',
    hover: 'hover:bg-teal-100'
  },
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'bg-indigo-100 text-indigo-600',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100'
  },
  pink: {
    bg: 'bg-pink-50',
    icon: 'bg-pink-100 text-pink-600',
    border: 'border-pink-200',
    hover: 'hover:bg-pink-100'
  },
  gray: {
    bg: 'bg-gray-50',
    icon: 'bg-gray-100 text-gray-600',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-100'
  }
};

export function QuickActions({ actions, loading = false }: QuickActionsProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-600 mt-1">
            Common administrative tasks and navigation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const IconComponent = iconMap[action.icon as keyof typeof iconMap];
          const colors = colorMap[action.color as keyof typeof colorMap];

          return (
            <Link
              key={index}
              href={action.href}
              className={`${colors.bg} ${colors.border} ${colors.hover} border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`${colors.icon} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1 group-hover:text-gray-800">
                      {action.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">98.5%</div>
            <div className="text-sm text-gray-600">System Availability</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">245ms</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-gray-600">Total Registrations</div>
          </div>
        </div>
      </div>
    </div>
  );
}