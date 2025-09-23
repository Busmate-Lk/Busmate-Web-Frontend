'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScaleChartOptions,
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ScheduleResponse, RouteResponse } from '@/lib/api-client/route-management';
import { Clock, Route, MapPin, Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeSpaceDiagramProps {
  schedules: ScheduleResponse[];
  route?: RouteResponse | null;
  currentScheduleId?: string;
  isLoading?: boolean;
}

interface DiagramPoint {
  x: number; // Time in minutes from midnight
  y: number; // Distance from start in km
  stopName?: string;
  arrivalTime?: string;
  departureTime?: string;
}

interface ScheduleLine {
  scheduleId: string;
  scheduleName: string;
  points: DiagramPoint[];
  color: string;
  isCurrentSchedule: boolean;
}

// Color palette for different schedules
const SCHEDULE_COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#EC4899', // Pink
  '#84CC16', // Lime
  '#F97316', // Orange
  '#6366F1', // Indigo
];

export function TimeSpaceDiagram({ 
  schedules, 
  route, 
  currentScheduleId,
  isLoading = false 
}: TimeSpaceDiagramProps) {
  const chartRef = useRef<ChartJS<'line', DiagramPoint[], unknown>>(null);

  // Convert time string to minutes from midnight
  const timeToMinutes = (timeString?: string): number => {
    if (!timeString) return 0;
    try {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    } catch {
      return 0;
    }
  };

  // Convert minutes to time string
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Create a mapping of stop names to distances from route data
  const stopDistanceMap = useMemo(() => {
    const map = new Map<string, number>();
    
    if (route?.routeStops) {
      route.routeStops.forEach(routeStop => {
        if (routeStop.stopName && routeStop.distanceFromStartKm !== undefined) {
          map.set(routeStop.stopName, routeStop.distanceFromStartKm);
        }
      });
    }
    
    // Add start and end stops
    if (route?.startStopName) {
      map.set(route.startStopName, 0);
    }
    if (route?.endStopName && route?.distanceKm) {
      map.set(route.endStopName, route.distanceKm);
    }
    
    return map;
  }, [route]);

  // Process schedules into diagram lines
  const scheduleLines = useMemo((): ScheduleLine[] => {
    if (!schedules || schedules.length === 0) return [];

    return schedules.map((schedule, index) => {
      const points: DiagramPoint[] = [];
      const color = SCHEDULE_COLORS[index % SCHEDULE_COLORS.length];
      const isCurrentSchedule = schedule.id === currentScheduleId;

      // Process schedule stops
      if (schedule.scheduleStops && schedule.scheduleStops.length > 0) {
        // Sort stops by stop order
        const sortedStops = [...schedule.scheduleStops].sort(
          (a, b) => (a.stopOrder || 0) - (b.stopOrder || 0)
        );

        sortedStops.forEach((stop) => {
          if (stop.arrivalTime && stop.stopName) {
            // Get distance from the route stop mapping
            const distance = stopDistanceMap.get(stop.stopName) ?? (stop.stopOrder || 0) * 5; // Fallback to estimated distance
            
            points.push({
              x: timeToMinutes(stop.arrivalTime),
              y: distance,
              stopName: stop.stopName,
              arrivalTime: stop.arrivalTime,
              departureTime: stop.departureTime,
            });
          }
        });
      }

      return {
        scheduleId: schedule.id || '',
        scheduleName: schedule.name || `Schedule ${index + 1}`,
        points,
        color,
        isCurrentSchedule,
      };
    }).filter(line => line.points.length > 0);
  }, [schedules, currentScheduleId, stopDistanceMap]);

  // Get time range for x-axis
  const timeRange = useMemo(() => {
    if (scheduleLines.length === 0) return { min: 0, max: 1440 };

    const allTimes = scheduleLines.flatMap(line => line.points.map(p => p.x));
    const minTime = Math.min(...allTimes);
    const maxTime = Math.max(...allTimes);
    
    // Add padding
    const padding = 30; // 30 minutes padding
    return {
      min: Math.max(0, minTime - padding),
      max: Math.min(1440, maxTime + padding)
    };
  }, [scheduleLines]);

  // Get distance range for y-axis
  const distanceRange = useMemo(() => {
    if (scheduleLines.length === 0) return { min: 0, max: 100 };

    const allDistances = scheduleLines.flatMap(line => line.points.map(p => p.y));
    const minDistance = Math.min(...allDistances);
    const maxDistance = Math.max(...allDistances);
    
    // Add padding
    const padding = Math.max(1, (maxDistance - minDistance) * 0.1);
    return {
      min: Math.max(0, minDistance - padding),
      max: maxDistance + padding
    };
  }, [scheduleLines]);

  // Chart data
  const chartData = {
    datasets: scheduleLines.map((line) => ({
      label: line.scheduleName,
      data: line.points,
      borderColor: line.color,
      backgroundColor: line.color + '20',
      borderWidth: line.isCurrentSchedule ? 3 : 2,
      pointRadius: line.isCurrentSchedule ? 6 : 4,
      pointHoverRadius: 8,
      pointBackgroundColor: line.color,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      tension: 0.1,
      fill: false,
    })),
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Time-Space Diagram - Route Schedules',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const point = context[0]?.raw as DiagramPoint;
            return point?.stopName || 'Stop';
          },
          label: (context: any) => {
            const point = context.raw as DiagramPoint;
            const dataset = context.dataset;
            return [
              `${dataset.label}`,
              `Time: ${minutesToTime(point.x)}`,
              `Distance: ${point.y.toFixed(1)} km`,
              ...(point.arrivalTime ? [`Arrival: ${point.arrivalTime}`] : []),
              ...(point.departureTime ? [`Departure: ${point.departureTime}`] : []),
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Time of Day',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        min: timeRange.min,
        max: timeRange.max,
        ticks: {
          stepSize: 60, // 1 hour intervals
          callback: function(value: any) {
            return minutesToTime(value as number);
          },
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Distance from Start (km)',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        min: distanceRange.min,
        max: distanceRange.max,
        ticks: {
          stepSize: Math.max(1, Math.round((distanceRange.max - distanceRange.min) / 10)),
        },
        grid: {
          display: true,
          color: '#e5e7eb',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'point' as const,
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-500">Loading time-space diagram...</span>
      </div>
    );
  }

  if (scheduleLines.length === 0) {
    return (
      <div className="text-center py-12">
        <Route className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Data</h3>
        <p className="text-gray-500 mb-6">
          No schedules with timing data found for this route.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">About Time-Space Diagrams</p>
              <p>
                Time-space diagrams show schedule patterns across time and distance, 
                helping planners identify service gaps and optimize frequencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 mb-1">Time-Space Diagram</p>
            <p className="text-blue-800">
              This diagram shows {scheduleLines.length} schedule(s) on this route. 
              Each line represents a schedule's journey through stops over time. 
              The current schedule is highlighted with a thicker line.
            </p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div style={{ height: '500px' }}>
          <Line 
            ref={chartRef}
            data={chartData} 
            options={chartOptions} 
          />
        </div>
      </div>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">{scheduleLines.length}</div>
          <div className="text-sm text-gray-600">Total Schedules</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">
            {minutesToTime(timeRange.min)} - {minutesToTime(timeRange.max)}
          </div>
          <div className="text-sm text-gray-600">Service Hours</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-900">
            {distanceRange.max.toFixed(1)} km
          </div>
          <div className="text-sm text-gray-600">Route Distance</div>
        </div>
      </div>

      {/* Legend and Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          How to Read This Diagram
        </h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>X-axis (Time):</strong> Shows time of day from earliest to latest service</p>
          <p>• <strong>Y-axis (Distance):</strong> Shows distance along the route from start to end</p>
          <p>• <strong>Lines:</strong> Each colored line represents a different schedule</p>
          <p>• <strong>Points:</strong> Each point represents a scheduled stop time</p>
          <p>• <strong>Current Schedule:</strong> Highlighted with a thicker line</p>
          <p>• <strong>Hover:</strong> Hover over points to see detailed timing information</p>
        </div>
      </div>
    </div>
  );
}