/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveTrip } from './ActiveTrip';
export type ActiveTripsResponse = {
    success?: boolean;
    data?: {
        trips?: Array<ActiveTrip>;
        totalCount?: number;
        page?: number;
        totalPages?: number;
        hasNextPage?: boolean;
        hasPrevPage?: boolean;
    };
    metadata?: {
        timestamp?: string;
        activeCount?: number;
        pausedCount?: number;
    };
};

