/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type ManualConfirmationRequest = {
    /**
     * Unique identifier for the trip
     */
    tripId: string;
    /**
     * Stop identifier
     */
    stopId: string;
    /**
     * Type of stop event
     */
    eventType: ManualConfirmationRequest.eventType;
    location?: GeoJSONPoint;
    /**
     * Who is confirming this event
     */
    confirmedBy: string;
    /**
     * Number of passengers affected
     */
    passengerCount?: number;
    /**
     * Additional notes about the event
     */
    notes?: string;
};
export namespace ManualConfirmationRequest {
    /**
     * Type of stop event
     */
    export enum eventType {
        ARRIVAL = 'arrival',
        DEPARTURE = 'departure',
        BOARDING = 'boarding',
        ALIGHTING = 'alighting',
        DELAY = 'delay',
        SKIP = 'skip',
    }
}

