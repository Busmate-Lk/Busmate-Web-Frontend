/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type NextStop = {
    success?: boolean;
    data?: {
        tripId?: string;
        nextStop?: {
            stopId?: string;
            name?: string;
            location?: GeoJSONPoint;
            /**
             * Stop sequence number in route
             */
            sequence?: number;
            estimatedArrival?: string;
            /**
             * Distance to stop in meters
             */
            distance?: number;
            /**
             * Whether this is a scheduled stop
             */
            isScheduled?: boolean;
        };
        currentLocation?: GeoJSONPoint;
        previousStop?: {
            stopId?: string;
            name?: string;
            departureTime?: string;
        };
    };
};

