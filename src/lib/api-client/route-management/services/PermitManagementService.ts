/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResponsePassengerServicePermitResponse } from '../models/PaginatedResponsePassengerServicePermitResponse';
import type { PassengerServicePermitRequest } from '../models/PassengerServicePermitRequest';
import type { PassengerServicePermitResponse } from '../models/PassengerServicePermitResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermitManagementService {
    /**
     * Get permits with pagination
     * Retrieve passenger service permits with pagination, filtering, and sorting options
     * @param page Page number (0-based)
     * @param size Page size
     * @param sortBy Sort field
     * @param sortDir Sort direction (asc/desc)
     * @param status Filter by status
     * @param permitType Filter by permit type
     * @param operatorName Filter by operator name
     * @param routeGroupName Filter by route group name
     * @returns PaginatedResponsePassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static getPermits(
        page?: number,
        size: number = 20,
        sortBy: string = 'createdAt',
        sortDir: string = 'desc',
        status?: string,
        permitType?: string,
        operatorName?: string,
        routeGroupName?: string,
    ): CancelablePromise<PaginatedResponsePassengerServicePermitResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permits',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
                'status': status,
                'permitType': permitType,
                'operatorName': operatorName,
                'routeGroupName': routeGroupName,
            },
        });
    }
    /**
     * @param requestBody
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static createPermit(
        requestBody: PassengerServicePermitRequest,
    ): CancelablePromise<PassengerServicePermitResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/permits',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all permits
     * Retrieve all passenger service permits without pagination
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static getAllPermits(): CancelablePromise<Array<PassengerServicePermitResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permits/all',
        });
    }
    /**
     * Get permits by route group
     * Retrieve all passenger service permits for a specific route group
     * @param routeGroupId Route group ID
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static getPermitsByRouteGroupId(
        routeGroupId: string,
    ): CancelablePromise<Array<PassengerServicePermitResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permits/route-group/{routeGroupId}',
            path: {
                'routeGroupId': routeGroupId,
            },
        });
    }
    /**
     * Get permit by ID
     * Retrieve a specific passenger service permit by its ID
     * @param id
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static getPermitById(
        id: string,
    ): CancelablePromise<PassengerServicePermitResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permits/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static updatePermit(
        id: string,
        requestBody: PassengerServicePermitRequest,
    ): CancelablePromise<PassengerServicePermitResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/permits/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deletePermit(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/permits/{id}',
            path: {
                'id': id,
            },
        });
    }
}
