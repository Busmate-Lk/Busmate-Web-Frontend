/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type ActiveBusesOnRoute = {
    success?: boolean;
    data?: {
        routeId?: string;
        activeBuses?: Array<{
            busId?: string;
            tripId?: string;
            currentLocation?: GeoJSONPoint;
            routeProgress?: number;
            status?: 'active' | 'paused';
            speed?: number;
            passengerCount?: number;
            nextStopId?: string;
            nextStopETA?: string;
            lastUpdate?: string;
        }>;
        totalCount?: number;
    };
    metadata?: {
        timestamp?: string;
        routeName?: string;
    };
};

