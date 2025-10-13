/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveTrip } from './ActiveTrip';
export type TripTrackingResponse = {
    success?: boolean;
    message?: string;
    data?: ActiveTrip;
    metadata?: {
        trackingStarted?: string;
        routeValidation?: {
            isValid?: boolean;
            routeExists?: boolean;
            scheduleValid?: boolean;
        };
    };
};

