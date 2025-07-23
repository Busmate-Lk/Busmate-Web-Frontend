export interface BusRouteGroupRequest {
  name: String;
  description: String;
  routes: [
    {
      id: String;
      name: String;
      description: String;
      startStopId: String;
      endStopId: String;
      distanceKm: number;
      estimatedDurationMinutes: number;
      direction: string;
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
