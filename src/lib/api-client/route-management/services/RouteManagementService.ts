/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouteResponse } from '../models/RouteResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RouteManagementService {
    /**
     * @returns RouteResponse OK
     * @throws ApiError
     */
    public static getAllRoutes(): CancelablePromise<Array<RouteResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/routes',
        });
    }
    /**
     * @param id
     * @returns RouteResponse OK
     * @throws ApiError
     */
    public static getRouteById(
        id: string,
    ): CancelablePromise<RouteResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/routes/{id}',
            path: {
                'id': id,
            },
        });
    }
}
