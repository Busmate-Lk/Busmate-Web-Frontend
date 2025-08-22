'use client';

// import { TimeKeeper, Operator } from '@/types/models/staff';
import { TimeKeeper } from '@/types/models/staff';
import { OperatorResponse as Operator } from "@/lib/api-client/route-management";

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
  const pendingCount = data.filter(
    (staff) => staff.status === 'pending'
  ).length;
  const suspendedCount = data.filter(
    (staff) => staff.status === 'suspended'
  ).length;

  // Additional stats for operators
  const privateOperators = type === 'operator' 
    ? operators.filter(op => op.operatorType === 'PRIVATE').length 
    : 0;
  const ctbOperators = type === 'operator' 
    ? operators.filter(op => op.operatorType === 'CTB').length 
    : 0;
  const uniqueRegions = type === 'operator'
    ? new Set(operators.map(op => op.region).filter(Boolean)).size
    : 0;

  const getStatsCards = () => {
    const baseCards = [
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
        textColor: 'text-blue-600',
        subtitle: type === 'operator' ? `${uniqueRegions} regions` : undefined,
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
        subtitle: `${totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(1) : 0}% of total`,
      },
    ];

    if (type === 'operator') {
      baseCards.push(
        {
          title: 'Private Operators',
          value: privateOperators,
          icon: (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"
              />
            </svg>
          ),
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-600',
          subtitle: `${totalCount > 0 ? ((privateOperators / totalCount) * 100).toFixed(1) : 0}% of total`,
        },
        {
          title: 'CTB Operators',
          value: ctbOperators,
          icon: (
            <svg
              className="w-5 h-5 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"
              />
            </svg>
          ),
          bgColor: 'bg-indigo-100',
          textColor: 'text-indigo-600',
          subtitle: `${totalCount > 0 ? ((ctbOperators / totalCount) * 100).toFixed(1) : 0}% of total`,
        }
      );
    } else {
      baseCards.push(
        {
          title: 'Inactive',
          value: inactiveCount,
          icon: (
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
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          subtitle: `${totalCount > 0 ? ((inactiveCount / totalCount) * 100).toFixed(1) : 0}% of total`,
        },
        {
          title: pendingCount > 0 ? 'Pending' : 'Suspended',
          value: pendingCount > 0 ? pendingCount : suspendedCount,
          icon: (
            <svg
              className="w-5 h-5 text-yellow-600"
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
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-600',
          subtitle: pendingCount > 0 ? 'Awaiting approval' : 'Need attention',
        }
      );
    }

    return baseCards;
  };

  const statsCards = getStatsCards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500">
                  {stat.subtitle}
                </p>
              )}
            </div>
            <div
              className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
