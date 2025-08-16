/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PassengerServicePermitScheduleAssignmentRequest } from '../models/PassengerServicePermitScheduleAssignmentRequest';
import type { PassengerServicePermitScheduleAssignmentResponse } from '../models/PassengerServicePermitScheduleAssignmentResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PermitScheduleAssignmentService {
    /**
     * @returns PassengerServicePermitScheduleAssignmentResponse OK
     * @throws ApiError
     */
    public static getAllAssignments1(): CancelablePromise<Array<PassengerServicePermitScheduleAssignmentResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permit-schedule-assignments',
        });
    }
    /**
     * @param requestBody
     * @returns PassengerServicePermitScheduleAssignmentResponse OK
     * @throws ApiError
     */
    public static createAssignment1(
        requestBody: PassengerServicePermitScheduleAssignmentRequest,
    ): CancelablePromise<PassengerServicePermitScheduleAssignmentResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/permit-schedule-assignments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns PassengerServicePermitScheduleAssignmentResponse OK
     * @throws ApiError
     */
    public static getAssignmentById1(
        id: string,
    ): CancelablePromise<PassengerServicePermitScheduleAssignmentResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permit-schedule-assignments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns PassengerServicePermitScheduleAssignmentResponse OK
     * @throws ApiError
     */
    public static updateAssignment1(
        id: string,
        requestBody: PassengerServicePermitScheduleAssignmentRequest,
    ): CancelablePromise<PassengerServicePermitScheduleAssignmentResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/permit-schedule-assignments/{id}',
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
    public static deleteAssignment1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/permit-schedule-assignments/{id}',
            path: {
                'id': id,
            },
        });
    }
}
