/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PassengerServicePermitRequest } from '../models/PassengerServicePermitRequest';
import type { PassengerServicePermitResponse } from '../models/PassengerServicePermitResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermitManagementService {
    /**
     * @returns PassengerServicePermitResponse OK
     * @throws ApiError
     */
    public static getAllPermits(): CancelablePromise<Array<PassengerServicePermitResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permits',
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
