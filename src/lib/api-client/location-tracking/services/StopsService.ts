/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StopsService {
    /**
     * Record stop arrival event
     * Records when a bus arrives at a specific stop during a trip
     * @param stopId Unique identifier for the bus stop
     * @param requestBody
     * @returns any Stop arrival recorded successfully
     * @throws ApiError
     */
    public static postApiStopsArrival(
        stopId: string,
        requestBody: {
            /**
             * Unique identifier for the trip
             */
            tripId: string;
            /**
             * GeoJSON Point coordinates (optional)
             */
            location?: {
                type?: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates?: Array<number>;
            };
            /**
             * Arrival timestamp (defaults to current time)
             */
            timestamp?: string;
            /**
             * Whether this is a manual confirmation
             */
            isManual?: boolean;
            /**
             * ID of person confirming the arrival
             */
            confirmedBy?: string;
            /**
             * Number of passengers at arrival
             */
            passengerCount?: number;
            /**
             * Additional notes
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stops/{stopId}/arrival',
            path: {
                'stopId': stopId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or arrival already recorded`,
                404: `Trip not found or not active`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Record stop departure event
     * Records when a bus departs from a specific stop during a trip
     * @param stopId Unique identifier for the bus stop
     * @param requestBody
     * @returns any Stop departure recorded successfully
     * @throws ApiError
     */
    public static postApiStopsDeparture(
        stopId: string,
        requestBody: {
            /**
             * Unique identifier for the trip
             */
            tripId: string;
            /**
             * GeoJSON Point coordinates (optional)
             */
            location?: {
                type?: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates?: Array<number>;
            };
            /**
             * Departure timestamp (defaults to current time)
             */
            timestamp?: string;
            /**
             * Whether this is a manual confirmation
             */
            isManual?: boolean;
            /**
             * ID of person confirming the departure
             */
            confirmedBy?: string;
            /**
             * Time spent at the stop in minutes
             */
            dwellTimeMinutes?: number;
            /**
             * Number of passengers at departure
             */
            passengerCount?: number;
            /**
             * Additional notes
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stops/{stopId}/departure',
            path: {
                'stopId': stopId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or departure already recorded`,
                404: `Trip not found or arrival not recorded`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Process manual stop confirmation by driver/conductor
     * Allows drivers or conductors to manually confirm stop events
     * @param requestBody
     * @returns any Manual confirmation processed successfully
     * @throws ApiError
     */
    public static postApiStopsManualConfirmation(
        requestBody: {
            /**
             * Unique identifier for the trip
             */
            tripId: string;
            /**
             * Unique identifier for the bus stop
             */
            stopId: string;
            /**
             * Type of stop event to confirm
             */
            eventType: 'arrival' | 'departure';
            /**
             * GeoJSON Point coordinates (optional)
             */
            location?: {
                type?: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates?: Array<number>;
            };
            /**
             * ID of person confirming the event
             */
            confirmedBy: string;
            /**
             * Number of passengers
             */
            passengerCount?: number;
            /**
             * Additional notes
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stops/manual-confirmation',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Trip or stop not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get next stop information for a specific trip
     * Retrieves information about the next scheduled stop for a trip
     * @param tripId Unique identifier for the trip
     * @returns any Next stop information retrieved successfully
     * @throws ApiError
     */
    public static getApiTripsNextStop(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/{tripId}/next-stop',
            path: {
                'tripId': tripId,
            },
            errors: {
                404: `Trip not found or no more stops`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get detailed stop-by-stop progress for a trip
     * Retrieves comprehensive progress information including all stops completed and remaining
     * @param tripId Unique identifier for the trip
     * @returns any Stop progress retrieved successfully
     * @throws ApiError
     */
    public static getApiTripsStopProgress(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/{tripId}/stop-progress',
            path: {
                'tripId': tripId,
            },
            errors: {
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all events for a specific stop across all trips
     * Retrieves arrival and departure events for a bus stop with pagination and filtering
     * @param stopId Unique identifier for the bus stop
     * @param page Page number for pagination
     * @param limit Number of events per page
     * @param eventType Filter by event type
     * @param startDate Start date for filtering (ISO date string)
     * @param endDate End date for filtering (ISO date string)
     * @returns any Stop events retrieved successfully
     * @throws ApiError
     */
    public static getApiStopsEvents(
        stopId: string,
        page: number = 1,
        limit: number = 50,
        eventType?: 'arrival' | 'departure',
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops/{stopId}/events',
            path: {
                'stopId': stopId,
            },
            query: {
                'page': page,
                'limit': limit,
                'eventType': eventType,
                'startDate': startDate,
                'endDate': endDate,
            },
            errors: {
                400: `Invalid query parameters`,
                404: `Stop not found`,
                500: `Internal server error`,
            },
        });
    }
}
