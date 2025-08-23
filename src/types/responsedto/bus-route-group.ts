export interface BusRouteGroupResponse {
  id: string;
  name: string;
  description: string;
  category: 'expressway' | 'normal';
  routeNumber: string;
  routes: {
    id: string;
    name: string;
    description: string;
    routeGroupId: string;
    routeGroupName: string;
    startStopId: string;
    startStopName: string;
    startStopLocation: {
      latitude: number;
      longitude: number;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    endStopId: string;
    endStopName: string;
    endStopLocation: {
      latitude: number;
      longitude: number;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    distanceKm: number;
    estimatedDurationMinutes: number;
    direction: 'forward' | 'backward';
    routeStops: {
      stopId: string;
      stopName: string;
      location: {
        latitude: number;
        longitude: number;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      stopOrder: number;
      distanceFromStartKm: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
