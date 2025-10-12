/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Device } from '../models/Device';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DeviceManagementService {
    /**
     * Create a new GPS device
     * Register a new GPS device in the system for bus tracking
     * @param requestBody
     * @returns any Device created successfully
     * @throws ApiError
     */
    public static postApiDevices(
        requestBody: {
            /**
             * Unique device identifier (alphanumeric, underscore, hyphen only)
             */
            deviceId: string;
            /**
             * Bus ID to assign this device to (optional)
             */
            busId?: string;
            /**
             * Type of the device
             */
            deviceType?: 'GPS' | 'Mobile' | 'Tablet' | 'OBD' | 'Telematics' | 'Smartphone' | 'Dedicated_GPS' | 'Other';
            /**
             * Device manufacturer
             */
            manufacturer?: string;
            /**
             * Device model name
             */
            modelName?: string;
            /**
             * Firmware version
             */
            firmwareVersion?: string;
            /**
             * Hardware version
             */
            hardwareVersion?: string;
            /**
             * GPS accuracy in meters
             */
            gpsAccuracy?: number;
            /**
             * Update frequency in seconds
             */
            updateFrequency?: number;
            /**
             * Battery capacity in mAh
             */
            batteryCapacity?: number;
            /**
             * Network type
             */
            networkType?: '2G' | '3G' | '4G' | '5G' | 'WiFi' | 'Satellite' | 'Unknown';
            /**
             * Network provider name
             */
            networkProvider?: string;
            settings?: {
                /**
                 * Update interval in seconds
                 */
                updateInterval?: number;
                /**
                 * GPS accuracy threshold in meters
                 */
                accuracyThreshold?: number;
                /**
                 * Speed threshold in km/h
                 */
                speedThreshold?: number;
                /**
                 * Geofence radius in meters
                 */
                geofenceRadius?: number;
            };
            /**
             * Who installed the device
             */
            installedBy?: string;
            /**
             * Who created this device record
             */
            createdBy?: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/devices',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                409: `Device ID already exists or bus already assigned`,
            },
        });
    }
    /**
     * Get all devices with filtering and pagination
     * Retrieve devices with optional filtering by status, type, bus, online status, etc.
     * Use the isOnline query parameter to filter for online devices (isOnline=true) or offline devices (isOnline=false).
     * This endpoint replaces separate /online and /offline endpoints with a unified filtering approach.
     *
     * @param page Page number for pagination
     * @param limit Number of items per page
     * @param status Filter by device status
     * @param deviceType Filter by device type
     * @param busId Filter by assigned bus ID
     * @param isOnline Filter by online status
     * @param manufacturer Filter by manufacturer (partial match)
     * @param sortBy Field to sort by
     * @param sortOrder Sort order
     * @returns any Devices retrieved successfully
     * @throws ApiError
     */
    public static getApiDevices(
        page: number = 1,
        limit: number = 50,
        status?: 'active' | 'inactive' | 'offline',
        deviceType?: 'GPS' | 'Mobile' | 'Tablet' | 'OBD' | 'Telematics' | 'Smartphone' | 'Dedicated_GPS' | 'Other',
        busId?: string,
        isOnline?: boolean,
        manufacturer?: string,
        sortBy: 'deviceId' | 'createdAt' | 'lastSeen' | 'lastLocationUpdate' | 'status' = 'createdAt',
        sortOrder: 'asc' | 'desc' = 'desc',
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Array<Device>;
        pagination?: {
            currentPage?: number;
            totalPages?: number;
            totalCount?: number;
            limit?: number;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices',
            query: {
                'page': page,
                'limit': limit,
                'status': status,
                'deviceType': deviceType,
                'busId': busId,
                'isOnline': isOnline,
                'manufacturer': manufacturer,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Get device by ID
     * Retrieve a specific device by its device ID
     * @param deviceId Device ID
     * @returns any Device retrieved successfully
     * @throws ApiError
     */
    public static getApiDevices1(
        deviceId: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/{deviceId}',
            path: {
                'deviceId': deviceId,
            },
            errors: {
                404: `Device not found`,
            },
        });
    }
    /**
     * Update device by ID
     * Update device properties and settings
     * @param deviceId Device ID
     * @param requestBody
     * @returns any Device updated successfully
     * @throws ApiError
     */
    public static putApiDevices(
        deviceId: string,
        requestBody: {
            /**
             * Bus ID (null to unassign)
             */
            busId?: string | null;
            /**
             * Device status
             */
            status?: 'active' | 'inactive' | 'offline';
            /**
             * Battery level percentage
             */
            batteryLevel?: number;
            /**
             * Signal strength percentage
             */
            signalStrength?: number;
            currentLocation?: {
                type?: 'Point';
                coordinates?: Array<number>;
            };
            settings?: {
                updateInterval?: number;
                accuracyThreshold?: number;
                speedThreshold?: number;
                geofenceRadius?: number;
            };
            /**
             * Who updated the device
             */
            updatedBy?: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/devices/{deviceId}',
            path: {
                'deviceId': deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Device not found`,
                409: `Bus already assigned to another device`,
            },
        });
    }
    /**
     * Delete device by ID
     * Delete a device from the system (cannot delete active online devices)
     * @param deviceId Device ID
     * @returns any Device deleted successfully
     * @throws ApiError
     */
    public static deleteApiDevices(
        deviceId: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        deviceId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/devices/{deviceId}',
            path: {
                'deviceId': deviceId,
            },
            errors: {
                404: `Device not found`,
                409: `Cannot delete active online device`,
            },
        });
    }
    /**
     * Assign device to bus
     * Assign a GPS device to a specific bus for tracking
     * @param deviceId Device ID
     * @param requestBody
     * @returns any Device assigned to bus successfully
     * @throws ApiError
     */
    public static postApiDevicesAssignBus(
        deviceId: string,
        requestBody: {
            /**
             * Bus ID to assign device to
             */
            busId: string;
            /**
             * Who assigned the device
             */
            assignedBy?: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/devices/{deviceId}/assign-bus',
            path: {
                'deviceId': deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                404: `Device not found`,
                409: `Bus already assigned to another active device`,
            },
        });
    }
    /**
     * Unassign device from bus
     * Remove device assignment from a bus
     * @param deviceId Device ID
     * @param requestBody
     * @returns any Device unassigned from bus successfully
     * @throws ApiError
     */
    public static postApiDevicesUnassignBus(
        deviceId: string,
        requestBody?: {
            /**
             * Who unassigned the device
             */
            unassignedBy?: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
        previousBusId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/devices/{deviceId}/unassign-bus',
            path: {
                'deviceId': deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Device not assigned to any bus`,
                404: `Device not found`,
                409: `Cannot unassign device while active and online`,
            },
        });
    }
    /**
     * Get devices by bus ID
     * Retrieve all devices assigned to a specific bus
     * @param busId Bus ID
     * @returns any Devices retrieved successfully
     * @throws ApiError
     */
    public static getApiDevicesByBus(
        busId: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Array<Device>;
        count?: number;
        busId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/by-bus/{busId}',
            path: {
                'busId': busId,
            },
        });
    }
    /**
     * Get device statistics
     * Retrieve aggregated statistics for all devices in the system
     * @returns any Device statistics retrieved successfully
     * @throws ApiError
     */
    public static getApiDevicesStatistics(): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: {
            totalDevices?: number;
            activeDevices?: number;
            onlineDevices?: number;
            devicesWithLowBattery?: number;
            devicesDueMaintenance?: number;
            averageBatteryLevel?: number;
            averageSignalStrength?: number;
            averageUptimePercentage?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/devices/statistics',
        });
    }
    /**
     * Update device status
     * Update the operational status of a device
     * @param deviceId Device ID
     * @param requestBody
     * @returns any Device status updated successfully
     * @throws ApiError
     */
    public static patchApiDevicesStatus(
        deviceId: string,
        requestBody: {
            /**
             * New device status
             */
            status: 'active' | 'inactive' | 'offline';
            /**
             * Who updated the status
             */
            updatedBy?: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
        data?: Device;
        previousStatus?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/devices/{deviceId}/status',
            path: {
                'deviceId': deviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid status value`,
                404: `Device not found`,
            },
        });
    }
}
