export interface BusRouteGroupRequest {
  name: String;
  description: String;
  category: 'expressway' | 'normal';
  routeNumber: String;
  routes: [
    {
      id: String;
      name: String;
      description: String;
      startStopId: String;
      endStopId: String;
      distanceKm: number;
      estimatedDurationMinutes: number;
      direction: 'forward' | 'backward';
      routeStops: [
        {
          id: String;
          stopId: String;
          stopOrder: number;
          distanceFromStartKm: number;
        }
      ];
    }
  ];
}
