/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StopEvent } from './StopEvent';
export type StopEventsResponse = {
    success?: boolean;
    data?: {
        stopId?: string;
        events?: Array<StopEvent>;
        totalCount?: number;
        page?: number;
        totalPages?: number;
    };
    metadata?: {
        timeRange?: {
            start?: string;
            end?: string;
        };
        eventTypes?: Array<string>;
    };
};

