/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Device = {
    /**
     * MongoDB ObjectId
     */
    _id?: string;
    /**
     * Unique device identifier
     */
    deviceId?: string;
    /**
     * Assigned bus ID
     */
    busId?: string;
    /**
     * Type of device
     */
    deviceType?: Device.deviceType;
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
     * Device operational status
     */
    status?: Device.status;
    /**
     * Current online status
     */
    isOnline?: boolean;
    /**
     * Last time device was seen
     */
    lastSeen?: string;
    /**
     * Last location update timestamp
     */
    lastLocationUpdate?: string;
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
    currentLocation?: {
        type?: Device.type;
        /**
         * [longitude, latitude]
         */
        coordinates?: Array<number>;
    };
    /**
     * Current battery level percentage
     */
    batteryLevel?: number;
    /**
     * Signal strength percentage
     */
    signalStrength?: number;
    /**
     * Device temperature in Celsius
     */
    temperature?: number;
    /**
     * Network type
     */
    networkType?: Device.networkType;
    /**
     * Network provider name
     */
    networkProvider?: string;
    /**
     * Device IP address
     */
    ipAddress?: string;
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
     * Total data transmitted in bytes
     */
    totalDataTransmitted?: number;
    /**
     * Total number of location updates sent
     */
    totalLocationUpdates?: number;
    /**
     * Average GPS accuracy
     */
    averageAccuracy?: number;
    /**
     * Device uptime percentage
     */
    uptimePercentage?: number;
    /**
     * Warranty expiry date
     */
    warrantyExpiry?: string;
    /**
     * Installation date
     */
    installedAt?: string;
    /**
     * Who installed the device
     */
    installedBy?: string;
    /**
     * Who created the device record
     */
    createdBy?: string;
    /**
     * Who last updated the device
     */
    updatedBy?: string;
    /**
     * Record creation timestamp
     */
    createdAt?: string;
    /**
     * Record last update timestamp
     */
    updatedAt?: string;
};
export namespace Device {
    /**
     * Type of device
     */
    export enum deviceType {
        GPS = 'GPS',
        MOBILE = 'Mobile',
        TABLET = 'Tablet',
        OBD = 'OBD',
        TELEMATICS = 'Telematics',
        SMARTPHONE = 'Smartphone',
        DEDICATED_GPS = 'Dedicated_GPS',
        OTHER = 'Other',
    }
    /**
     * Device operational status
     */
    export enum status {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
        OFFLINE = 'offline',
    }
    export enum type {
        POINT = 'Point',
    }
    /**
     * Network type
     */
    export enum networkType {
        _2G = '2G',
        _3G = '3G',
        _4G = '4G',
        _5G = '5G',
        WI_FI = 'WiFi',
        SATELLITE = 'Satellite',
        UNKNOWN = 'Unknown',
    }
}

