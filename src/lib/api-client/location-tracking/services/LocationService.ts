/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationUpdateResponse } from '../models/LocationUpdateResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationService {
    /**
     * Process a single GPS location update
     * Records GPS location update for an active trip
     * @param requestBody
     * @returns LocationUpdateResponse Location update processed successfully
     * @throws ApiError
     */
    public static postApiLocationUpdate(
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
             * GeoJSON Point coordinates
             */
            location: {
                type: 'Point';
                /**
                 * [longitude, latitude]
                 */
                coordinates: Array<number>;
            };
            /**
             * Location update timestamp (optional, defaults to current time)
             */
            timestamp?: string;
            /**
             * Speed in km/h (optional)
             */
            speed?: number;
            /**
             * GPS accuracy in meters (optional)
             */
            accuracy?: number;
            /**
             * Direction in degrees (optional)
             */
            heading?: number;
            /**
             * Altitude in meters (optional)
             */
            altitude?: number;
        },
    ): CancelablePromise<LocationUpdateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/location/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request - Invalid input parameters`,
                404: `Not Found - Resource not found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Process multiple GPS location updates in batch
     * Processes multiple GPS location updates efficiently
     * @param requestBody
     * @returns any Batch update processed successfully
     * @throws ApiError
     */
    public static postApiLocationBatchUpdate(
        requestBody: {
            /**
             * Array of location updates (1-100 updates)
             */
            updates: Array<{
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
                 * GeoJSON Point coordinates
                 */
                location: {
                    type: 'Point';
                    /**
                     * [longitude, latitude]
                     */
                    coordinates: Array<number>;
                };
                /**
                 * Location update timestamp (optional)
                 */
                timestamp?: string;
                /**
                 * Speed in km/h (optional)
                 */
                speed?: number;
                /**
                 * GPS accuracy in meters (optional)
                 */
                accuracy?: number;
                /**
                 * Direction in degrees (optional)
                 */
                heading?: number;
                /**
                 * Altitude in meters (optional)
                 */
                altitude?: number;
            }>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/location/batch-update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Validate GPS coordinates without storing them
     * Validates GPS coordinates, speed, and accuracy without saving to database
     * @param location GeoJSON Point coordinates
     * @param speed Speed in km/h (0-120)
     * @param accuracy GPS accuracy in meters (0-100)
     * @returns any GPS coordinates validated successfully
     * @throws ApiError
     */
    public static getApiLocationValidate(
        location: Record<string, any>,
        speed?: number,
        accuracy?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/location/validate',
            query: {
                'location': location,
                'speed': speed,
                'accuracy': accuracy,
            },
            errors: {
                400: `Invalid GPS coordinates or validation error`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get the latest location update for a specific trip
     * Retrieves the most recent GPS location update for an active trip
     * @param tripId Unique identifier for the trip
     * @returns any Latest location retrieved successfully
     * @throws ApiError
     */
    public static getApiLocationTripLatest(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/location/trip/{tripId}/latest',
            path: {
                'tripId': tripId,
            },
            errors: {
                400: `Invalid tripId parameter`,
                404: `No location data found for this trip`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get location history for a specific trip
     * Retrieves paginated location history with optional time filtering
     * @param tripId Unique identifier for the trip
     * @param limit Number of records to return (max 1000)
     * @param offset Number of records to skip
     * @param startTime Start time for filtering (ISO date string)
     * @param endTime End time for filtering (ISO date string)
     * @returns any Location history retrieved successfully
     * @throws ApiError
     */
    public static getApiLocationTripHistory(
        tripId: string,
        limit: number = 100,
        offset?: number,
        startTime?: string,
        endTime?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/location/trip/{tripId}/history',
            path: {
                'tripId': tripId,
            },
            query: {
                'limit': limit,
                'offset': offset,
                'startTime': startTime,
                'endTime': endTime,
            },
            errors: {
                400: `Invalid parameters`,
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
}
