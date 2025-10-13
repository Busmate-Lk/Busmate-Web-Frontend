/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type LocationUpdate = {
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
    location: GeoJSONPoint;
    /**
     * Location update timestamp (optional, defaults to current time)
     */
    timestamp?: string;
    /**
     * Speed in km/h
     */
    speed?: number;
    /**
     * GPS accuracy in meters
     */
    accuracy?: number;
    /**
     * Direction in degrees
     */
    heading?: number;
    /**
     * Altitude in meters
     */
    altitude?: number;
};

