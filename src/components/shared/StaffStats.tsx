'use client';

import { TimeKeeper, Operator } from '@/types/models/staff';

interface StaffStatsProps {
  timeKeepers?: TimeKeeper[];
  operators?: Operator[];
  type: 'timekeeper' | 'operator';
}

export function StaffStats({
  timeKeepers = [],
  operators = [],
  type,
}: StaffStatsProps) {
  const data = type === 'timekeeper' ? timeKeepers : operators;

  const totalCount = data.length;
  const activeCount = data.filter((staff) => staff.status === 'active').length;
  const inactiveCount = data.filter(
    (staff) => staff.status === 'inactive'
  ).length;
  const suspendedCount = data.filter(
    (staff) => staff.status === 'suspended'
  ).length;

  // Additional stats for operators
  const avgExperience =
    type === 'operator'
      ? (
          operators.reduce((sum, op) => sum + (op.experienceYears || 0), 0) /
          operators.length
        ).toFixed(1)
      : null;

  const statsCards = [
    {
      title: `Total ${type === 'timekeeper' ? 'Time Keepers' : 'Operators'}`,
      value: totalCount,
      icon: (
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              type === 'timekeeper'
                ? 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                : 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            }
          />
        </svg>
      ),
      bgColor: 'bg-blue-100',
      textColor: 'text-gray-900',
    },
    {
      title: 'Active',
      value: activeCount,
      icon: (
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title:
        type === 'operator' && avgExperience ? 'Avg Experience' : 'Inactive',
      value:
        type === 'operator' && avgExperience
          ? `${avgExperience}y`
          : inactiveCount,
      icon:
        type === 'operator' && avgExperience ? (
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      bgColor:
        type === 'operator' && avgExperience ? 'bg-purple-100' : 'bg-gray-100',
      textColor:
        type === 'operator' && avgExperience
          ? 'text-purple-600'
          : 'text-gray-600',
    },
    {
      title: 'Suspended',
      value: suspendedCount,
      icon: (
        <svg
          className="w-5 h-5 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
