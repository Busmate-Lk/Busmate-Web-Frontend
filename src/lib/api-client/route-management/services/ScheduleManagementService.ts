/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageScheduleResponse } from '../models/PageScheduleResponse';
import type { ScheduleCalendarRequest } from '../models/ScheduleCalendarRequest';
import type { ScheduleExceptionRequest } from '../models/ScheduleExceptionRequest';
import type { ScheduleExceptionResponse } from '../models/ScheduleExceptionResponse';
import type { ScheduleRequest } from '../models/ScheduleRequest';
import type { ScheduleResponse } from '../models/ScheduleResponse';
import type { TripResponse } from '../models/TripResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScheduleManagementService {
    /**
     * Get schedules with filtering, search, and pagination
     * Retrieve schedules with optional filtering by route, route group, type, status, and search. Search is performed across schedule name, description, and route name. Default: page=0, size=10, sort=name
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sortBy Sort by field name (name, createdAt, updatedAt, effectiveStartDate)
     * @param sortDir Sort direction (asc or desc)
     * @param routeId Filter by specific route ID
     * @param routeGroupId Filter by route group ID
     * @param scheduleType Filter by schedule type (REGULAR or SPECIAL)
     * @param status Filter by status (ACTIVE or INACTIVE)
     * @param search Search text to filter schedules by name, description, or route name
     * @returns PageScheduleResponse Schedules retrieved successfully
     * @throws ApiError
     */
    public static getSchedules(
        page?: number,
        size: number = 10,
        sortBy: string = 'name',
        sortDir: string = 'asc',
        routeId?: string,
        routeGroupId?: string,
        scheduleType?: 'REGULAR' | 'SPECIAL',
        status?: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED',
        search?: string,
    ): CancelablePromise<PageScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules',
            query: {
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
                'routeId': routeId,
                'routeGroupId': routeGroupId,
                'scheduleType': scheduleType,
                'status': status,
                'search': search,
            },
            errors: {
                400: `Invalid pagination or filtering parameters`,
            },
        });
    }
    /**
     * Create a new schedule (basic)
     * Creates a new schedule with basic information only. Use this for creating a schedule that will be configured later with stops, calendar, and exceptions.
     * @param requestBody
     * @returns ScheduleResponse Schedule created successfully
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
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                409: `Schedule name already exists for this route`,
            },
        });
    }
    /**
     * Get all schedules without pagination
     * Retrieve all schedules as a simple list. Use carefully as it returns all schedules at once.
     * @returns ScheduleResponse All schedules retrieved successfully
     * @throws ApiError
     */
    public static getAllSchedules(): CancelablePromise<Array<ScheduleResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/all',
        });
    }
    /**
     * Create multiple schedules
     * Creates multiple schedules in a single operation. Useful for bulk imports.
     * @param requestBody
     * @returns ScheduleResponse Schedules created successfully
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
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get schedules by route ID
     * Retrieve all schedules for a specific route with optional status filtering.
     * @param routeId Route ID
     * @param status Filter by status (ACTIVE or INACTIVE)
     * @param page Page number (0-based)
     * @param size Page size (max 100)
     * @param sortBy Sort by field name
     * @param sortDir Sort direction (asc or desc)
     * @returns PageScheduleResponse Schedules retrieved successfully
     * @throws ApiError
     */
    public static getSchedulesByRoute(
        routeId: string,
        status?: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED',
        page?: number,
        size: number = 10,
        sortBy: string = 'name',
        sortDir: string = 'asc',
    ): CancelablePromise<PageScheduleResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/by-route/{routeId}',
            path: {
                'routeId': routeId,
            },
            query: {
                'status': status,
                'page': page,
                'size': size,
                'sortBy': sortBy,
                'sortDir': sortDir,
            },
            errors: {
                400: `Invalid UUID format`,
            },
        });
    }
    /**
     * Get distinct schedule types
     * Retrieve all distinct schedule types for filter dropdown options.
     * @returns string Distinct schedule types retrieved successfully
     * @throws ApiError
     */
    public static getDistinctScheduleTypes(): CancelablePromise<Array<'REGULAR' | 'SPECIAL'>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/filter-options/schedule-types',
        });
    }
    /**
     * Get distinct statuses
     * Retrieve all distinct statuses for filter dropdown options.
     * @returns string Distinct statuses retrieved successfully
     * @throws ApiError
     */
    public static getDistinctStatuses(): CancelablePromise<Array<'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED'>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/filter-options/statuses',
        });
    }
    /**
     * Create a complete schedule with all components
     * Creates a new schedule with stops, calendar, and exceptions in one transaction. This is the recommended endpoint for creating fully configured schedules.
     * @param requestBody
     * @returns ScheduleResponse Complete schedule created successfully
     * @throws ApiError
     */
    public static createScheduleFull(
        requestBody: ScheduleRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/full',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                409: `Schedule name already exists for this route`,
            },
        });
    }
    /**
     * Import schedules from file
     * Import multiple schedules from a CSV or Excel file. The file should contain schedule metadata, calendar settings, and stop timings.
     * @param formData
     * @returns ScheduleResponse Schedules imported successfully
     * @throws ApiError
     */
    public static importSchedules(
        formData?: {
            /**
             * CSV or Excel file containing schedule data
             */
            file: Blob;
        },
    ): CancelablePromise<Array<ScheduleResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/import',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid file format or data`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get schedule statistics
     * Retrieve statistical information about schedules (counts by type, status, etc.).
     * @returns any Schedule statistics retrieved successfully
     * @throws ApiError
     */
    public static getScheduleStatistics(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/statistics',
        });
    }
    /**
     * Validate schedule import file
     * Validate a schedule import file without actually importing the data. Returns validation errors and warnings.
     * @param formData
     * @returns any File validation completed
     * @throws ApiError
     */
    public static validateScheduleImport(
        formData?: {
            /**
             * CSV or Excel file to validate
             */
            file: Blob;
        },
    ): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/validate',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Invalid file format`,
            },
        });
    }
    /**
     * Get schedule by ID
     * Retrieve a specific schedule with all its details including stops, calendar, and exceptions.
     * @param id Schedule ID
     * @returns ScheduleResponse Schedule found and retrieved successfully
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
            errors: {
                400: `Invalid UUID format`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Update schedule (basic)
     * Update basic schedule information only.
     * @param id Schedule ID
     * @param requestBody
     * @returns ScheduleResponse Schedule updated successfully
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
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                404: `Schedule not found`,
                409: `Schedule name already exists`,
            },
        });
    }
    /**
     * Delete a schedule
     * Permanently delete a schedule. This action cannot be undone.
     * @param id Schedule ID
     * @returns void
     * @throws ApiError
     */
    public static deleteSchedule(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Activate schedule
     * Set schedule status to ACTIVE.
     * @param id Schedule ID
     * @returns ScheduleResponse Schedule activated successfully
     * @throws ApiError
     */
    public static activateSchedule(
        id: string,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}/activate',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Update schedule calendar
     * Update the operating days for a schedule (which days of the week it runs).
     * @param id Schedule ID
     * @param requestBody
     * @returns ScheduleResponse Schedule calendar updated successfully
     * @throws ApiError
     */
    public static updateScheduleCalendar(
        id: string,
        requestBody: ScheduleCalendarRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}/calendar',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid calendar data`,
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Clone an existing schedule
     * Create a copy of an existing schedule with modifications. Useful for creating similar schedules with slight changes (e.g., weekend version of weekday schedule).
     * @param id Source Schedule ID
     * @param requestBody
     * @returns ScheduleResponse Schedule cloned successfully
     * @throws ApiError
     */
    public static cloneSchedule(
        id: string,
        requestBody: ScheduleRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/{id}/clone',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid clone data`,
                401: `Unauthorized`,
                404: `Source schedule not found`,
                409: `Schedule name already exists`,
            },
        });
    }
    /**
     * Deactivate schedule
     * Set schedule status to INACTIVE (temporarily disable).
     * @param id Schedule ID
     * @returns ScheduleResponse Schedule deactivated successfully
     * @throws ApiError
     */
    public static deactivateSchedule(
        id: string,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}/deactivate',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Get schedule exceptions
     * Retrieve all exceptions for a specific schedule.
     * @param id Schedule ID
     * @returns ScheduleExceptionResponse Schedule exceptions retrieved successfully
     * @throws ApiError
     */
    public static getScheduleExceptions(
        id: string,
    ): CancelablePromise<Array<ScheduleExceptionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/{id}/exceptions',
            path: {
                'id': id,
            },
            errors: {
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Add schedule exception
     * Add a date exception (holiday adjustment) to a schedule.
     * @param id Schedule ID
     * @param requestBody
     * @returns ScheduleResponse Schedule exception added successfully
     * @throws ApiError
     */
    public static addScheduleException(
        id: string,
        requestBody: ScheduleExceptionRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/{id}/exceptions',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid exception data`,
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Remove schedule exception
     * Remove a specific exception from a schedule.
     * @param id Schedule ID
     * @param exceptionId Exception ID
     * @returns ScheduleResponse Schedule exception removed successfully
     * @throws ApiError
     */
    public static removeScheduleException(
        id: string,
        exceptionId: string,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedules/{id}/exceptions/{exceptionId}',
            path: {
                'id': id,
                'exceptionId': exceptionId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Schedule or exception not found`,
            },
        });
    }
    /**
     * Update complete schedule
     * Update schedule with all components including stops, calendar, and exceptions.
     * @param id Schedule ID
     * @param requestBody
     * @returns ScheduleResponse Complete schedule updated successfully
     * @throws ApiError
     */
    public static updateScheduleFull(
        id: string,
        requestBody: ScheduleRequest,
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}/full',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input data`,
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Generate trips for schedule
     * Generate trips for the specified schedule within a date range. If no date range is provided, trips will be generated for the entire schedule validity period.
     * @param id
     * @param fromDate
     * @param toDate
     * @returns TripResponse Trips generated successfully
     * @throws ApiError
     */
    public static generateTripsForSchedule(
        id: string,
        fromDate?: string,
        toDate?: string,
    ): CancelablePromise<Array<TripResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/{id}/generate-trips',
            path: {
                'id': id,
            },
            query: {
                'fromDate': fromDate,
                'toDate': toDate,
            },
            errors: {
                400: `Invalid date range or schedule configuration`,
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
    /**
     * Update schedule status
     * Change the status of a schedule (ACTIVE/INACTIVE).
     * @param id Schedule ID
     * @param status New status
     * @returns ScheduleResponse Schedule status updated successfully
     * @throws ApiError
     */
    public static updateScheduleStatus(
        id: string,
        status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'CANCELLED',
    ): CancelablePromise<ScheduleResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedules/{id}/status',
            path: {
                'id': id,
            },
            query: {
                'status': status,
            },
            errors: {
                400: `Invalid status`,
                401: `Unauthorized`,
                404: `Schedule not found`,
            },
        });
    }
}
