/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TripTrackingService {
    /**
     * Begin trip tracking for a specific trip
     * Initiates GPS tracking for a bus trip
     * @param requestBody
     * @returns any Trip tracking started successfully
     * @throws ApiError
     */
    public static postApiTripsStartTracking(
        requestBody: {
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
            /**
             * Starting location coordinates (optional)
             */
            startLocation?: {
                type?: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates?: Array<number>;
            };
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/trips/start-tracking',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or trip already active`,
                500: `Failed to start trip tracking`,
            },
        });
    }
    /**
     * End trip tracking for a specific trip
     * Stops GPS tracking for a bus trip and finalizes the trip data
     * @param requestBody
     * @returns any Trip tracking stopped successfully
     * @throws ApiError
     */
    public static postApiTripsStopTracking(
        requestBody: {
            /**
             * Unique identifier for the trip
             */
            tripId: string;
            /**
             * Ending location coordinates (optional)
             */
            endLocation?: {
                type?: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates?: Array<number>;
            };
            /**
             * Reason for stopping the trip
             */
            reason?: 'completed' | 'cancelled';
            /**
             * Additional notes about trip completion
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/trips/stop-tracking',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Trip not found or not active`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Pause trip tracking temporarily
     * Temporarily pauses GPS tracking for an active trip
     * @param tripId Unique identifier for the trip
     * @param requestBody
     * @returns any Trip tracking paused successfully
     * @throws ApiError
     */
    public static putApiTripsPause(
        tripId: string,
        requestBody?: {
            /**
             * Reason for pausing the trip
             */
            reason?: string;
            /**
             * Additional notes
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/trips/{tripId}/pause',
            path: {
                'tripId': tripId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or trip not active`,
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Resume paused trip tracking
     * Resumes GPS tracking for a previously paused trip
     * @param tripId Unique identifier for the trip
     * @param requestBody
     * @returns any Trip tracking resumed successfully
     * @throws ApiError
     */
    public static putApiTripsResume(
        tripId: string,
        requestBody?: {
            /**
             * Additional notes
             */
            notes?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/trips/{tripId}/resume',
            path: {
                'tripId': tripId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or trip not paused`,
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get current tracking status of a trip
     * Retrieves the current status and details of a specific trip
     * @param tripId Unique identifier for the trip
     * @returns any Trip status retrieved successfully
     * @throws ApiError
     */
    public static getApiTripsStatus(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/{tripId}/status',
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
     * Get list of all currently active trips
     * Retrieves all trips that are currently being tracked
     * @param page Page number for pagination
     * @param limit Number of trips per page
     * @returns any Active trips retrieved successfully
     * @throws ApiError
     */
    public static getApiTripsActive(
        page: number = 1,
        limit: number = 50,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/active',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Invalid query parameters`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Force stop trip tracking (admin/emergency use)
     * Forcibly stops trip tracking for emergency situations or administrative purposes
     * @param tripId Unique identifier for the trip
     * @param requestBody
     * @returns any Trip tracking force stopped successfully
     * @throws ApiError
     */
    public static deleteApiTripsForceStop(
        tripId: string,
        requestBody?: {
            /**
             * Reason for force stopping the trip
             */
            reason?: string;
            /**
             * Identifier of who forced the stop
             */
            forceStoppedBy?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/trips/{tripId}/force-stop',
            path: {
                'tripId': tripId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
}
