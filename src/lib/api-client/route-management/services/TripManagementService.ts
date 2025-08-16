/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TripRequest } from '../models/TripRequest';
import type { TripResponse } from '../models/TripResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TripManagementService {
    /**
     * Get all trips
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getAllTrips(): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips',
        });
    }
    /**
     * Create a new trip
     * @param requestBody
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static createTrip(
        requestBody: TripRequest,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/trips',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get trips by assignment
     * @param assignmentId
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByAssignment(
        assignmentId: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/assignment/{assignmentId}',
            path: {
                'assignmentId': assignmentId,
            },
        });
    }
    /**
     * Get trips by bus
     * @param busId
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByBus(
        busId: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/bus/{busId}',
            path: {
                'busId': busId,
            },
        });
    }
    /**
     * Get trips by conductor
     * @param conductorId
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByConductor(
        conductorId: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/conductor/{conductorId}',
            path: {
                'conductorId': conductorId,
            },
        });
    }
    /**
     * Get trips by date range
     * @param startDate
     * @param endDate
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByDateRange(
        startDate: string,
        endDate: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/date-range',
            query: {
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Get trips by date
     * @param tripDate
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByDate(
        tripDate: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/date/{tripDate}',
            path: {
                'tripDate': tripDate,
            },
        });
    }
    /**
     * Get trips by driver
     * @param driverId
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByDriver(
        driverId: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/driver/{driverId}',
            path: {
                'driverId': driverId,
            },
        });
    }
    /**
     * Generate trips for assignment within date range
     * @param assignmentId
     * @param fromDate
     * @param toDate
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static generateTripsForAssignment(
        assignmentId: string,
        fromDate: string,
        toDate: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/trips/generate',
            query: {
                'assignmentId': assignmentId,
                'fromDate': fromDate,
                'toDate': toDate,
            },
        });
    }
    /**
     * Get trips by status
     * @param status
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripsByStatus(
        status: 'pending' | 'active' | 'completed' | 'cancelled' | 'delayed' | 'in_transit' | 'boarding' | 'departed',
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/status/{status}',
            path: {
                'status': status,
            },
        });
    }
    /**
     * Get trip by ID
     * @param id
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static getTripById(
        id: string,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/trips/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update trip
     * @param id
     * @param requestBody
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static updateTrip(
        id: string,
        requestBody: TripRequest,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/trips/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete trip
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteTrip(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/trips/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Cancel trip
     * @param id
     * @param reason
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static cancelTrip(
        id: string,
        reason: string,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/trips/{id}/cancel',
            path: {
                'id': id,
            },
            query: {
                'reason': reason,
            },
        });
    }
    /**
     * Complete trip
     * @param id
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static completeTrip(
        id: string,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/trips/{id}/complete',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Start trip
     * @param id
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static startTrip(
        id: string,
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/trips/{id}/start',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update trip status
     * @param id
     * @param status
     * @returns TripResponse OK
     * @throws ApiError
     */
    public static updateTripStatus(
        id: string,
        status: 'pending' | 'active' | 'completed' | 'cancelled' | 'delayed' | 'in_transit' | 'boarding' | 'departed',
    ): CancelablePromise<TripResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/trips/{id}/status',
            path: {
                'id': id,
            },
            query: {
                'status': status,
            },
        });
    }
}
