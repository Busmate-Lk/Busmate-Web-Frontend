/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleCalendarRequest } from './ScheduleCalendarRequest';
import type { ScheduleExceptionRequest } from './ScheduleExceptionRequest';
import type { ScheduleStopRequest } from './ScheduleStopRequest';
export type ScheduleRequest = {
    name: string;
    routeId: string;
    scheduleType: string;
    effectiveStartDate: string;
    effectiveEndDate?: string;
    status?: string;
    description?: string;
    /**
     * Whether to automatically generate trips for the schedule's validity period
     */
    generateTrips?: boolean;
    scheduleStops?: Array<ScheduleStopRequest>;
    calendar?: ScheduleCalendarRequest;
    exceptions?: Array<ScheduleExceptionRequest>;
};

