/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QueriesService {
    /**
     * Get all active trips with current locations and status
     * Retrieves all currently active bus trips with real-time location data
     * @returns any Active trips retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesTripsActive(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/trips/active',
            errors: {
                400: `Invalid query parameters`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get current location and status of a specific trip
     * Retrieves the current GPS location and status information for an active trip
     * @param tripId Unique identifier for the trip
     * @returns any Current trip location retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesTripsCurrentLocation(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/trips/{tripId}/current-location',
            path: {
                'tripId': tripId,
            },
            errors: {
                400: `Invalid tripId parameter`,
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get location history for a specific trip
     * Retrieves paginated location history for a trip with optional time filtering
     * @param tripId Unique identifier for the trip
     * @param startTime Start time for filtering (ISO date string)
     * @param endTime End time for filtering (ISO date string)
     * @param limit Number of records to return
     * @param offset Number of records to skip
     * @returns any Trip location history retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesTripsLocations(
        tripId: string,
        startTime?: string,
        endTime?: string,
        limit: number = 100,
        offset?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/trips/{tripId}/locations',
            path: {
                'tripId': tripId,
            },
            query: {
                'startTime': startTime,
                'endTime': endTime,
                'limit': limit,
                'offset': offset,
            },
            errors: {
                400: `Invalid parameters`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get current location of a specific bus
     * Retrieves the current GPS location and status of a specific bus
     * @param busId Unique identifier for the bus
     * @returns any Current bus location retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesBusesCurrentLocation(
        busId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/buses/{busId}/current-location',
            path: {
                'busId': busId,
            },
            errors: {
                404: `Bus not found or not currently active`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get all active buses on a specific route
     * Retrieves all buses currently operating on a specific route
     * @param routeId Unique identifier for the route
     * @param page Page number for pagination
     * @param limit Number of buses per page
     * @returns any Active buses on route retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesRoutesActiveBuses(
        routeId: string,
        page: number = 1,
        limit: number = 50,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/routes/{routeId}/active-buses',
            path: {
                'routeId': routeId,
            },
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                400: `Invalid query parameters`,
                404: `Route not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get expected arrivals at a specific stop
     * Retrieves upcoming bus arrivals and ETAs for a specific bus stop
     * @param stopId Unique identifier for the bus stop
     * @param limit Maximum number of arrivals to return
     * @param timeWindow Time window in minutes to look ahead
     * @returns any Stop arrivals retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesStopsArrivals(
        stopId: string,
        limit: number = 10,
        timeWindow: number = 60,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/stops/{stopId}/arrivals',
            path: {
                'stopId': stopId,
            },
            query: {
                'limit': limit,
                'timeWindow': timeWindow,
            },
            errors: {
                400: `Invalid parameters`,
                404: `Stop not found`,
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
    public static getApiQueriesTripsNextStop(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/trips/{tripId}/next-stop',
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
     * Get overall trip progress including stops completed
     * Retrieves detailed progress information for a trip including stops completed and remaining
     * @param tripId Unique identifier for the trip
     * @returns any Trip progress retrieved successfully
     * @throws ApiError
     */
    public static getApiQueriesTripsProgress(
        tripId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/queries/trips/{tripId}/progress',
            path: {
                'tripId': tripId,
            },
            errors: {
                404: `Trip not found`,
                500: `Internal server error`,
            },
        });
    }
}
