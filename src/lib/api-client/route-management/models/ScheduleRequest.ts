/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleStopRequest } from './ScheduleStopRequest';
export type ScheduleRequest = {
    name: string;
    routeId: string;
    scheduleType: string;
    effectiveStartDate: string;
    effectiveEndDate?: string;
    status?: string;
    scheduleStops?: Array<ScheduleStopRequest>;
};

