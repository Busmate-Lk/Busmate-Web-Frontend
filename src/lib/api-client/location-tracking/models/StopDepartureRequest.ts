/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StopDepartureRequest = {
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
     * Departure timestamp (optional, defaults to current time)
     */
    timestamp?: string;
    /**
     * Whether this is a manual confirmation
     */
    isManual?: boolean;
    /**
     * Who confirmed the departure (required if isManual is true)
     */
    confirmedBy?: string;
    /**
     * Time spent at stop in minutes
     */
    dwellTimeMinutes?: number;
    /**
     * Number of passengers alighting
     */
    passengerCount?: number;
    /**
     * Additional notes about the departure
     */
    notes?: string;
};

