/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type ActiveTrip = {
    /**
     * MongoDB ObjectId
     */
    _id?: string;
    /**
     * Unique trip identifier
     */
    tripId?: string;
    /**
     * Schedule identifier
     */
    scheduleId?: string;
    /**
     * Route identifier
     */
    routeId?: string;
    /**
     * Bus identifier
     */
    busId?: string;
    /**
     * GPS device identifier
     */
    deviceId?: string;
    /**
     * Driver identifier
     */
    driverId?: string;
    /**
     * Conductor identifier
     */
    conductorId?: string;
    /**
     * Current trip status
     */
    status?: ActiveTrip.status;
    /**
     * Trip start timestamp
     */
    startTime?: string;
    /**
     * Trip end timestamp
     */
    endTime?: string;
    startLocation?: GeoJSONPoint;
    endLocation?: GeoJSONPoint;
    currentLocation?: GeoJSONPoint;
    /**
     * Total distance traveled in kilometers
     */
    totalDistance?: number;
    /**
     * Route completion percentage
     */
    routeProgress?: number;
    /**
     * Last location update timestamp
     */
    lastLocationUpdate?: string;
    /**
     * Average speed in km/h
     */
    averageSpeed?: number;
    /**
     * Maximum speed reached in km/h
     */
    maxSpeed?: number;
    /**
     * Number of stops made
     */
    stopCount?: number;
    /**
     * Current passenger count
     */
    passengerCount?: number;
    /**
     * Estimated arrival time
     */
    estimatedArrival?: string;
    /**
     * Next stop identifier
     */
    nextStopId?: string;
    /**
     * Next stop estimated arrival time
     */
    nextStopETA?: string;
    /**
     * Record creation timestamp
     */
    createdAt?: string;
    /**
     * Record last update timestamp
     */
    updatedAt?: string;
};
export namespace ActiveTrip {
    /**
     * Current trip status
     */
    export enum status {
        ACTIVE = 'active',
        PAUSED = 'paused',
        COMPLETED = 'completed',
        CANCELLED = 'cancelled',
    }
}

