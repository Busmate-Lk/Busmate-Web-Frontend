import { time } from 'console';

export interface ScheduleManagementRequest {
  name: String;
  routeId: String;
  scheduleType: String;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  status: String;
  scheduleStops: {
    stopId: String;
    stopOrder: number;
    arrivalTime: String;
    departureTime: String;
  }[];
}
