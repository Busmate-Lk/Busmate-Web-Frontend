/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperatorRequest } from '../models/OperatorRequest';
import type { OperatorResponse } from '../models/OperatorResponse';
import type { PageOperatorResponse } from '../models/PageOperatorResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OperatorManagementService {
    /**
     * Get all operators with pagination, sorting, and filtering
     * Retrieve all operators with optional pagination, sorting, search, and filtering by operator type and status. Search is performed across operator name and region. Default: page=0, size=10, sort=name
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sortBy Sort by field name (name, operatorType, region, status, createdAt, updatedAt)
     * @param sortDir Sort direction (asc or desc)
     * @param search Search text to filter operators by name or region
     * @param operatorType Filter by operator type (PRIVATE, CTB)
     * @param status Filter by status (pending, active, inactive, cancelled)
     * @returns PageOperatorResponse Operators retrieved successfully
     * @throws ApiError
     */
    public static getAllOperators(
        page?: number,
        size: number = 10,
        sortBy: string = 'name',
        sortDir: string = 'asc',
        search?: string,
        operatorType?: string,
        status?: string,
    ): CancelablePromise<PageOperatorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/operators',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
                'search': search,
                'operatorType': operatorType,
                'status': status,
            },
            errors: {
                400: `Invalid pagination, sorting, or filter parameters`,
            },
        });
    }
    /**
     * Create a new operator
     * Creates a new operator with the provided details. Requires authentication.
     * @param requestBody
     * @returns OperatorResponse Operator created successfully
     * @throws ApiError
     */
    public static createOperator(
        requestBody: OperatorRequest,
    ): CancelablePromise<OperatorResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/operators',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                409: `Operator with same name already exists`,
            },
        });
    }
    /**
     * Get all operators without pagination
     * Retrieve all operators as a simple list without pagination. Use this endpoint carefully as it returns all operators at once.
     * @returns OperatorResponse All operators retrieved successfully
     * @throws ApiError
     */
    public static getAllOperatorsAsList(): CancelablePromise<Array<OperatorResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/operators/all',
        });
    }
    /**
     * Get operator by ID
     * Retrieve a specific operator by its unique identifier.
     * @param id Operator ID
     * @returns OperatorResponse Operator found and retrieved successfully
     * @throws ApiError
     */
    public static getOperatorById(
        id: string,
    ): CancelablePromise<OperatorResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/operators/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                404: `Operator not found`,
            },
        });
    }
    /**
     * Update an existing operator
     * Update an existing operator with new details. Requires authentication.
     * @param id Operator ID
     * @param requestBody
     * @returns OperatorResponse Operator updated successfully
     * @throws ApiError
     */
    public static updateOperator(
        id: string,
        requestBody: OperatorRequest,
    ): CancelablePromise<OperatorResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/operators/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                404: `Operator not found`,
                409: `Operator name already exists`,
            },
        });
    }
    /**
     * Delete an operator
     * Permanently delete an operator. This action cannot be undone. Requires authentication.
     * @param id Operator ID
     * @returns void
     * @throws ApiError
     */
    public static deleteOperator(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/operators/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid UUID format`,
                401: `Unauthorized`,
                404: `Operator not found`,
            },
        });
    }
}
