/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type StopEvent = {
    /**
     * MongoDB ObjectId
     */
    _id?: string;
    /**
     * Trip identifier
     */
    tripId?: string;
    /**
     * Stop identifier
     */
    stopId?: string;
    /**
     * Type of stop event
     */
    eventType?: StopEvent.eventType;
    /**
     * Event timestamp
     */
    timestamp?: string;
    location?: GeoJSONPoint;
    actualLocation?: GeoJSONPoint;
    /**
     * Whether this was manually confirmed
     */
    isManual?: boolean;
    /**
     * Who confirmed this event
     */
    confirmedBy?: string;
    /**
     * GPS accuracy in meters
     */
    accuracy?: number;
    /**
     * Speed at event time in km/h
     */
    speed?: number;
    /**
     * Direction in degrees
     */
    heading?: number;
    /**
     * Distance from actual stop location in meters
     */
    distanceFromStop?: number;
    /**
     * Time spent at stop in minutes (for departure events)
     */
    dwellTimeMinutes?: number;
    /**
     * Passenger count during event
     */
    passengerCount?: number;
    /**
     * Delay compared to schedule in minutes
     */
    delay?: number;
    /**
     * Additional notes
     */
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace StopEvent {
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

