/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StopProgressResponse = {
    success?: boolean;
    data?: {
        tripId?: string;
        routeProgress?: {
            totalStops?: number;
            completedStops?: number;
            progressPercentage?: number;
            nextStopIndex?: number;
        };
        currentStop?: {
            stopId?: string;
            name?: string;
            sequence?: number;
            estimatedArrival?: string;
            scheduledArrival?: string;
            delay?: number;
        };
        recentStops?: Array<{
            stopId?: string;
            name?: string;
            arrivalTime?: string;
            departureTime?: string;
            dwellTime?: number;
            delay?: number;
        }>;
    };
};

