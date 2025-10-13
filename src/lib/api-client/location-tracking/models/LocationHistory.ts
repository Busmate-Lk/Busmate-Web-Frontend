/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeoJSONPoint } from './GeoJSONPoint';
export type LocationHistory = {
    success?: boolean;
    data?: {
        tripId?: string;
        locations?: Array<{
            _id?: string;
            location?: GeoJSONPoint;
            timestamp?: string;
            speed?: number;
            accuracy?: number;
            heading?: number;
            altitude?: number;
        }>;
        totalCount?: number;
        page?: number;
        totalPages?: number;
    };
    metadata?: {
        timeRange?: {
            start?: string;
            end?: string;
        };
        distance?: {
            total?: number;
            unit?: string;
        };
    };
};

