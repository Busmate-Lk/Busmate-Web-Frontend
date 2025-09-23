'use client';

import React from 'react';
import { TimeSpaceDiagram } from '@/components/mot/schedule-details/TimeSpaceDiagram';

// Mock data for testing
const mockRoute = {
  id: 'route-1',
  name: 'Colombo - Kandy Main Route',
  startStopName: 'Colombo Fort',
  endStopName: 'Kandy Central',
  distanceKm: 115.5,
  direction: 'OUTBOUND' as const,
  routeStops: [
    { stopId: 'stop-1', stopName: 'Colombo Fort', distanceFromStartKm: 0, stopOrder: 0 },
    { stopId: 'stop-2', stopName: 'Kelaniya', distanceFromStartKm: 15.2, stopOrder: 1 },
    { stopId: 'stop-3', stopName: 'Gampaha', distanceFromStartKm: 28.8, stopOrder: 2 },
    { stopId: 'stop-4', stopName: 'Veyangoda', distanceFromStartKm: 45.1, stopOrder: 3 },
    { stopId: 'stop-5', stopName: 'Kegalle', distanceFromStartKm: 72.3, stopOrder: 4 },
    { stopId: 'stop-6', stopName: 'Mawanella', distanceFromStartKm: 89.7, stopOrder: 5 },
    { stopId: 'stop-7', stopName: 'Kandy Central', distanceFromStartKm: 115.5, stopOrder: 6 },
  ]
};

const mockSchedules = [
  {
    id: 'schedule-1',
    name: 'Morning Express',
    routeId: 'route-1',
    status: 'ACTIVE' as const,
    scheduleStops: [
      { stopName: 'Colombo Fort', stopOrder: 0, arrivalTime: '06:00:00', departureTime: '06:00:00' },
      { stopName: 'Kelaniya', stopOrder: 1, arrivalTime: '06:20:00', departureTime: '06:22:00' },
      { stopName: 'Gampaha', stopOrder: 2, arrivalTime: '06:40:00', departureTime: '06:42:00' },
      { stopName: 'Veyangoda', stopOrder: 3, arrivalTime: '07:05:00', departureTime: '07:07:00' },
      { stopName: 'Kegalle', stopOrder: 4, arrivalTime: '07:45:00', departureTime: '07:47:00' },
      { stopName: 'Mawanella', stopOrder: 5, arrivalTime: '08:10:00', departureTime: '08:12:00' },
      { stopName: 'Kandy Central', stopOrder: 6, arrivalTime: '08:35:00', departureTime: '08:35:00' },
    ]
  },
  {
    id: 'schedule-2',
    name: 'Regular Service',
    routeId: 'route-1',
    status: 'ACTIVE' as const,
    scheduleStops: [
      { stopName: 'Colombo Fort', stopOrder: 0, arrivalTime: '08:00:00', departureTime: '08:00:00' },
      { stopName: 'Kelaniya', stopOrder: 1, arrivalTime: '08:25:00', departureTime: '08:27:00' },
      { stopName: 'Gampaha', stopOrder: 2, arrivalTime: '08:50:00', departureTime: '08:52:00' },
      { stopName: 'Veyangoda', stopOrder: 3, arrivalTime: '09:20:00', departureTime: '09:22:00' },
      { stopName: 'Kegalle', stopOrder: 4, arrivalTime: '10:10:00', departureTime: '10:12:00' },
      { stopName: 'Mawanella', stopOrder: 5, arrivalTime: '10:40:00', departureTime: '10:42:00' },
      { stopName: 'Kandy Central', stopOrder: 6, arrivalTime: '11:10:00', departureTime: '11:10:00' },
    ]
  },
  {
    id: 'schedule-3',
    name: 'Afternoon Express',
    routeId: 'route-1',
    status: 'ACTIVE' as const,
    scheduleStops: [
      { stopName: 'Colombo Fort', stopOrder: 0, arrivalTime: '14:00:00', departureTime: '14:00:00' },
      { stopName: 'Kelaniya', stopOrder: 1, arrivalTime: '14:18:00', departureTime: '14:20:00' },
      { stopName: 'Gampaha', stopOrder: 2, arrivalTime: '14:35:00', departureTime: '14:37:00' },
      { stopName: 'Veyangoda', stopOrder: 3, arrivalTime: '14:58:00', departureTime: '15:00:00' },
      { stopName: 'Kegalle', stopOrder: 4, arrivalTime: '15:35:00', departureTime: '15:37:00' },
      { stopName: 'Mawanella', stopOrder: 5, arrivalTime: '15:58:00', departureTime: '16:00:00' },
      { stopName: 'Kandy Central', stopOrder: 6, arrivalTime: '16:20:00', departureTime: '16:20:00' },
    ]
  },
  {
    id: 'schedule-4',
    name: 'Evening Service',
    routeId: 'route-1',
    status: 'ACTIVE' as const,
    scheduleStops: [
      { stopName: 'Colombo Fort', stopOrder: 0, arrivalTime: '17:30:00', departureTime: '17:30:00' },
      { stopName: 'Kelaniya', stopOrder: 1, arrivalTime: '17:55:00', departureTime: '17:57:00' },
      { stopName: 'Gampaha', stopOrder: 2, arrivalTime: '18:20:00', departureTime: '18:22:00' },
      { stopName: 'Veyangoda', stopOrder: 3, arrivalTime: '18:50:00', departureTime: '18:52:00' },
      { stopName: 'Kegalle', stopOrder: 4, arrivalTime: '19:40:00', departureTime: '19:42:00' },
      { stopName: 'Mawanella', stopOrder: 5, arrivalTime: '20:10:00', departureTime: '20:12:00' },
      { stopName: 'Kandy Central', stopOrder: 6, arrivalTime: '20:40:00', departureTime: '20:40:00' },
    ]
  }
];

export default function TimeSpaceDiagramDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Time-Space Diagram Demo
        </h1>
        <p className="text-gray-600">
          Demonstration of the Time-Space Diagram component showing multiple bus schedules
          on the Colombo-Kandy route.
        </p>
      </div>

      <TimeSpaceDiagram
        schedules={mockSchedules}
        route={mockRoute}
        currentScheduleId="schedule-2"
        isLoading={false}
      />

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Implementation Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Features Implemented:</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Interactive Chart.js time-space diagram</li>
              <li>• Multiple schedule visualization</li>
              <li>• Current schedule highlighting</li>
              <li>• Hover tooltips with detailed information</li>
              <li>• Time axis (X) showing hours of operation</li>
              <li>• Distance axis (Y) showing route progression</li>
              <li>• Responsive design for all screen sizes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Technical Implementation:</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Chart.js with react-chartjs-2</li>
              <li>• TypeScript with proper type definitions</li>
              <li>• Integration with existing API services</li>
              <li>• Automatic distance calculation from route data</li>
              <li>• Time parsing and formatting utilities</li>
              <li>• Color-coded schedule lines</li>
              <li>• Error handling and loading states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}