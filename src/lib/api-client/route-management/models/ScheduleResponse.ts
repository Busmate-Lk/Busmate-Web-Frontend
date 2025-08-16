/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleStopResponse } from './ScheduleStopResponse';
export type ScheduleResponse = {
    id?: string;
    name?: string;
    routeId?: string;
    routeName?: string;
    routeGroupId?: string;
    routeGroupName?: string;
    scheduleType?: string;
    effectiveStartDate?: string;
    effectiveEndDate?: string;
    status?: string;
    scheduleStops?: Array<ScheduleStopResponse>;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
};

