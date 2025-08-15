/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleRequest } from '../models/ScheduleRequest';
import type { ScheduleResponse } from '../models/ScheduleResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScheduleManagementService {
    /**
     * @returns ScheduleResponse OK
     * @throws ApiError
     */
    public static getAllSchedules(): CancelablePromise<Array<ScheduleResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules',
        });
    }
    /**
     * @param requestBody
     * @returns ScheduleResponse OK
     * @throws ApiError
     */
    public static createSchedule(
        requestBody: ScheduleRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ScheduleResponse OK
     * @throws ApiError
     */
    public static createBulkSchedules(
        requestBody: Array<ScheduleRequest>,
    ): CancelablePromise<Array<ScheduleResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ScheduleResponse OK
     * @throws ApiError
     */
    public static getScheduleById(
        id: string,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ScheduleResponse OK
     * @throws ApiError
     */
    public static updateSchedule(
        id: string,
        requestBody: ScheduleRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}',
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
    public static deleteSchedule(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
}
