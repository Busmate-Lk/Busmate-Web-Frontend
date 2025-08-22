/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusRequest } from '../models/BusRequest';
import type { BusResponse } from '../models/BusResponse';
import type { PageBusResponse } from '../models/PageBusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusManagementService {
    /**
     * Get all buses with pagination, sorting, and filtering
     * Retrieve all buses with optional pagination, sorting, search, and filtering by operator, status, and capacity range. Search is performed across NTC registration number, plate number, model, and operator name. Default: page=0, size=10, sort=ntc_registration_number
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sortBy Sort by field name (ntc_registration_number, plate_number, capacity, model, status, created_at, updated_at)
     * @param sortDir Sort direction (asc or desc)
     * @param search Search text to filter buses by NTC registration number, plate number, model, or operator name
     * @param operatorId Filter by operator ID
     * @param status Filter by status (pending, active, inactive, cancelled)
     * @param minCapacity Filter by minimum capacity
     * @param maxCapacity Filter by maximum capacity
     * @returns PageBusResponse Buses retrieved successfully
     * @throws ApiError
     */
    public static getAllBuses(
        page?: number,
        size: number = 10,
        sortBy: string = 'ntc_registration_number',
        sortDir: string = 'asc',
        search?: string,
        operatorId?: string,
        status?: string,
        minCapacity?: number,
        maxCapacity?: number,
    ): CancelablePromise<PageBusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/buses',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
                'search': search,
                'operatorId': operatorId,
                'status': status,
                'minCapacity': minCapacity,
                'maxCapacity': maxCapacity,
            },
            errors: {
                400: `Invalid pagination, sorting, or filter parameters`,
            },
        });
    }
    /**
     * Create a new bus
     * Creates a new bus with the provided details. Requires authentication.
     * @param requestBody
     * @returns BusResponse Bus created successfully
     * @throws ApiError
     */
    public static createBus(
        requestBody: BusRequest,
    ): CancelablePromise<BusResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/buses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                409: `Bus with same NTC registration number or plate number already exists`,
            },
        });
    }
    /**
     * Get all buses without pagination
     * Retrieve all buses as a simple list without pagination. Use this endpoint carefully as it returns all buses at once.
     * @returns BusResponse All buses retrieved successfully
     * @throws ApiError
     */
    public static getAllBusesAsList(): CancelablePromise<Array<BusResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/buses/all',
        });
    }
    /**
     * Get bus by ID
     * Retrieve a specific bus by its unique identifier.
     * @param id Bus ID
     * @returns BusResponse Bus found and retrieved successfully
     * @throws ApiError
     */
    public static getBusById(
        id: string,
    ): CancelablePromise<BusResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/buses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                404: `Bus not found`,
            },
        });
    }
    /**
     * Update an existing bus
     * Update an existing bus with new details. Requires authentication.
     * @param id Bus ID
     * @param requestBody
     * @returns BusResponse Bus updated successfully
     * @throws ApiError
     */
    public static updateBus(
        id: string,
        requestBody: BusRequest,
    ): CancelablePromise<BusResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/buses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                404: `Bus not found`,
                409: `Bus NTC registration number or plate number already exists`,
            },
        });
    }
    /**
     * Delete a bus
     * Permanently delete a bus. This action cannot be undone. Requires authentication.
     * @param id Bus ID
     * @returns void
     * @throws ApiError
     */
    public static deleteBus(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/buses/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                401: `Unauthorized`,
                404: `Bus not found`,
            },
        });
    }
}
