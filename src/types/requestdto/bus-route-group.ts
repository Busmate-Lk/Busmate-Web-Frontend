export interface BusRouteGroupRequest {
  name: string;
  description: string;
  category: 'expressway' | 'normal';
  routeNumber: string;
  routes: [
    {
      id: string;
      name: string;
      description: string;
      startStopId: string;
      endStopId: string;
      distanceKm: number;
      estimatedDurationMinutes: number;
      direction: 'forward' | 'backward';
      routeStops: [
        {
          id: string;
          stopId: string;
          stopOrder: number;
          distanceFromStartKm: number;
        }
      ];
    }
  ];
}
