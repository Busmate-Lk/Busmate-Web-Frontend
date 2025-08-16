/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusRequest } from '../models/BusRequest';
import type { BusResponse } from '../models/BusResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusManagementService {
    /**
     * @returns BusResponse OK
     * @throws ApiError
     */
    public static getAllBuses(): CancelablePromise<Array<BusResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/buses',
        });
    }
    /**
     * @param requestBody
     * @returns BusResponse OK
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
        });
    }
    /**
     * @param id
     * @returns BusResponse OK
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
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns BusResponse OK
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
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteBus(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/buses/{id}',
            path: {
                'id': id,
            },
        });
    }
}
