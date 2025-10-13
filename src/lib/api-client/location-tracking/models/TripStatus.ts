/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type TripStatus = {
    success?: boolean;
    data?: {
        tripId?: string;
        status?: TripStatus.status;
        isTracking?: boolean;
        startTime?: string;
        /**
         * Trip duration in minutes
         */
        duration?: number;
        currentLocation?: GeoJSONPoint;
        routeProgress?: number;
        nextStop?: {
            stopId?: string;
            name?: string;
            eta?: string;
            /**
             * Distance to next stop in meters
             */
            distance?: number;
        };
    };
};
export namespace TripStatus {
    export enum status {
        ACTIVE = 'active',
        PAUSED = 'paused',
        COMPLETED = 'completed',
        CANCELLED = 'cancelled',
    }
}

