/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StopArrivalRequest = {
    /**
     * Unique identifier for the trip
     */
    tripId: string;
    /**
     * Stop identifier
     */
    stopId: string;
    location?: GeoJSONPoint;
    /**
     * Arrival timestamp (optional, defaults to current time)
     */
    timestamp?: string;
    /**
     * Whether this is a manual confirmation
     */
    isManual?: boolean;
    /**
     * Who confirmed the arrival (required if isManual is true)
     */
    confirmedBy?: string;
    /**
     * Number of passengers boarding
     */
    passengerCount?: number;
    /**
     * Additional notes about the arrival
     */
    notes?: string;
};

