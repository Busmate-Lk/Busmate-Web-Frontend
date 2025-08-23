export interface ScheduleManagementResponse {
  id: string;
  name: string;
  routeId: string;
  routeName: string;
  routeGroupId: string;
  routeGroupName: string;
  scheduleType: string;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  status: string;
  scheduleStops: {
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
    arrivalTime: string;
    departureTime: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
