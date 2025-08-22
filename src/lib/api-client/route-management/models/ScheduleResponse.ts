/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleCalendarResponse } from './ScheduleCalendarResponse';
import type { ScheduleExceptionResponse } from './ScheduleExceptionResponse';
import type { ScheduleStopResponse } from './ScheduleStopResponse';
export type ScheduleResponse = {
    id?: string;
    name?: string;
    description?: string;
    routeId?: string;
    routeName?: string;
    routeGroupId?: string;
    routeGroupName?: string;
    scheduleType?: string;
    effectiveStartDate?: string;
    effectiveEndDate?: string;
    status?: string;
    scheduleStops?: Array<ScheduleStopResponse>;
    scheduleCalendars?: Array<ScheduleCalendarResponse>;
    scheduleExceptions?: Array<ScheduleExceptionResponse>;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
};

