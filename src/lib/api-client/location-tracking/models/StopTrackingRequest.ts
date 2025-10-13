/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StopTrackingRequest = {
    /**
     * Unique identifier for the trip
     */
    tripId: string;
    endLocation?: GeoJSONPoint;
    /**
     * Reason for stopping the trip
     */
    reason?: StopTrackingRequest.reason;
    /**
     * Additional notes about stopping the trip
     */
    notes?: string;
};
export namespace StopTrackingRequest {
    /**
     * Reason for stopping the trip
     */
    export enum reason {
        COMPLETED = 'completed',
        CANCELLED = 'cancelled',
    }
}

