/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageStopResponse } from '../models/PageStopResponse';
import type { StopRequest } from '../models/StopRequest';
import type { StopResponse } from '../models/StopResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusStopManagementService {
    /**
     * Get all stops with pagination, sorting, and search
     * Retrieve all stops with optional pagination, sorting, and multi-column search. Search is performed across name, address, city, and state columns. Default: page=0, size=10, sort=name
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sortBy Sort by field name (name, createdAt, updatedAt, city, state)
     * @param sortDir Sort direction (asc or desc)
     * @param search Search text to filter stops by name, address, city, or state
     * @returns PageStopResponse Stops retrieved successfully
     * @throws ApiError
     */
    public static getAllStops(
        page?: number,
        size: number = 10,
        sortBy: string = 'name',
        sortDir: string = 'asc',
        search?: string,
    ): CancelablePromise<PageStopResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
                'search': search,
            },
            errors: {
                400: `Invalid pagination or sorting parameters`,
            },
        });
    }
    /**
     * Create a new bus stop
     * Creates a new bus stop with the provided details. Requires authentication.
     * @param requestBody
     * @returns StopResponse Stop created successfully
     * @throws ApiError
     */
    public static createStop(
        requestBody: StopRequest,
    ): CancelablePromise<StopResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stops',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                409: `Stop already exists in the same city`,
            },
        });
    }
    /**
     * Get all stops without pagination
     * Retrieve all stops as a simple list without pagination. Use this endpoint carefully as it returns all stops at once.
     * @returns StopResponse All stops retrieved successfully
     * @throws ApiError
     */
    public static getAllStopsAsList(): CancelablePromise<Array<StopResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops/all',
        });
    }
    /**
     * Get distinct accessibility statuses
     * Retrieve all distinct accessibility statuses (true/false) available in the stops database for filter dropdown options.
     * @returns boolean Distinct accessibility statuses retrieved successfully
     * @throws ApiError
     */
    public static getDistinctAccessibilityStatuses(): CancelablePromise<Array<boolean>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops/filter-options/accessibility-statuses',
        });
    }
    /**
     * Get distinct states
     * Retrieve all distinct states available in the stops database for filter dropdown options.
     * @returns string Distinct states retrieved successfully
     * @throws ApiError
     */
    public static getDistinctStates(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops/filter-options/states',
        });
    }
    /**
     * Get stop by ID
     * Retrieve a specific bus stop by its unique identifier.
     * @param id Stop ID
     * @returns StopResponse Stop found and retrieved successfully
     * @throws ApiError
     */
    public static getStopById(
        id: string,
    ): CancelablePromise<StopResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stops/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                404: `Stop not found`,
            },
        });
    }
    /**
     * Update an existing stop
     * Update an existing bus stop with new details. Requires authentication.
     * @param id Stop ID
     * @param requestBody
     * @returns StopResponse Stop updated successfully
     * @throws ApiError
     */
    public static updateStop(
        id: string,
        requestBody: StopRequest,
    ): CancelablePromise<StopResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/stops/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                404: `Stop not found`,
                409: `Stop name already exists in the same city`,
            },
        });
    }
    /**
     * Delete a stop
     * Permanently delete a bus stop. This action cannot be undone. Requires authentication.
     * @param id Stop ID
     * @returns void
     * @throws ApiError
     */
    public static deleteStop(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/stops/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                401: `Unauthorized`,
                404: `Stop not found`,
            },
        });
    }
}
