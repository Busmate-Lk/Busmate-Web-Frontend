/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RouteGroupRequest } from '../models/RouteGroupRequest';
import type { RouteGroupResponse } from '../models/RouteGroupResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RouteGroupManagementService {
    /**
     * @returns RouteGroupResponse OK
     * @throws ApiError
     */
    public static getAllRouteGroups(): CancelablePromise<Array<RouteGroupResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/route-groups',
        });
    }
    /**
     * @param requestBody
     * @returns RouteGroupResponse OK
     * @throws ApiError
     */
    public static createRouteGroup(
        requestBody: RouteGroupRequest,
    ): CancelablePromise<RouteGroupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/route-groups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns RouteGroupResponse OK
     * @throws ApiError
     */
    public static getRouteGroupById(
        id: string,
    ): CancelablePromise<RouteGroupResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/route-groups/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns RouteGroupResponse OK
     * @throws ApiError
     */
    public static updateRouteGroup(
        id: string,
        requestBody: RouteGroupRequest,
    ): CancelablePromise<RouteGroupResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/route-groups/{id}',
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
    public static deleteRouteGroup(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/route-groups/{id}',
            path: {
                'id': id,
            },
        });
    }
}
