export interface BusRouteGroupResponse {
  id: String;
  name: String;
  description: String;
  category: 'expressway' | 'normal';
  routeNumber: String;
  routes: {
    id: String;
    name: String;
    description: String;
    routeGroupId: String;
    routeGroupName: String;
    startStopId: String;
    startStopName: String;
    startStopLocation: {
      latitude: number;
      longitude: number;
      address: String;
      city: String;
      state: String;
      zipCode: String;
      country: String;
    };
    endStopId: String;
    endStopName: String;
    endStopLocation: {
      latitude: number;
      longitude: number;
      address: String;
      city: String;
      state: String;
      zipCode: String;
      country: String;
    };
    distanceKm: number;
    estimatedDurationMinutes: number;
    direction: 'forward' | 'backward';
    routeStops: {
      stopId: String;
      stopName: String;
      location: {
        latitude: number;
        longitude: number;
        address: String;
        city: String;
        state: String;
        zipCode: String;
        country: String;
      };
      stopOrder: number;
      distanceFromStartKm: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: String;
    updatedBy: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: String;
  updatedBy: String;
}
