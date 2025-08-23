import { time } from 'console';

export interface ScheduleManagementRequest {
  name: string;
  routeId: string;
  scheduleType: string;
  effectiveStartDate: Date;
  effectiveEndDate: Date;
  status: string;
  scheduleStops: {
    stopId: string;
    stopOrder: number;
    arrivalTime: string;
    departureTime: string;
  }[];
}
