/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type CurrentLocationResponse = {
    success?: boolean;
    data?: {
        tripId?: string;
        busId?: string;
        currentLocation?: GeoJSONPoint;
        timestamp?: string;
        speed?: number;
        heading?: number;
        accuracy?: number;
        status?: CurrentLocationResponse.status;
        lastUpdate?: string;
    };
};
export namespace CurrentLocationResponse {
    export enum status {
        ACTIVE = 'active',
        PAUSED = 'paused',
        COMPLETED = 'completed',
        CANCELLED = 'cancelled',
    }
}

