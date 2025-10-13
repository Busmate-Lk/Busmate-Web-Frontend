/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StopArrivals = {
    success?: boolean;
    data?: {
        stopId?: string;
        stopName?: string;
        arrivals?: Array<{
            tripId?: string;
            busId?: string;
            routeId?: string;
            routeName?: string;
            estimatedArrival?: string;
            scheduledArrival?: string;
            /**
             * Delay in minutes (positive for late, negative for early)
             */
            delay?: number;
            currentLocation?: GeoJSONPoint;
            /**
             * Distance to stop in meters
             */
            distance?: number;
            passengerCount?: number;
            status?: 'approaching' | 'arrived' | 'departed';
        }>;
        totalArrivals?: number;
    };
    metadata?: {
        timestamp?: string;
        /**
         * Time window for arrivals in minutes
         */
        timeWindow?: number;
    };
};

