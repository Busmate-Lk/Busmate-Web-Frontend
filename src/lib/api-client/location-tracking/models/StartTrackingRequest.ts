/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StartTrackingRequest = {
    /**
     * Unique identifier for the trip
     */
    tripId: string;
    /**
     * GPS device identifier
     */
    deviceId: string;
    /**
     * Bus identifier
     */
    busId: string;
    /**
     * Schedule identifier
     */
    scheduleId: string;
    /**
     * Route identifier
     */
    routeId: string;
    /**
     * Driver identifier (optional)
     */
    driverId?: string;
    /**
     * Conductor identifier (optional)
     */
    conductorId?: string;
    startLocation?: GeoJSONPoint;
};

