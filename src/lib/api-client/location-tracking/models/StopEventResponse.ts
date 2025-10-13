/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StopEvent } from './StopEvent';
export type StopEventResponse = {
    success?: boolean;
    message?: string;
    data?: StopEvent;
    metadata?: {
        delayInfo?: {
            scheduledTime?: string;
            actualTime?: string;
            delayMinutes?: number;
            delayReason?: string;
        };
        stopInfo?: {
            stopName?: string;
            sequence?: number;
            isScheduled?: boolean;
        };
    };
};

