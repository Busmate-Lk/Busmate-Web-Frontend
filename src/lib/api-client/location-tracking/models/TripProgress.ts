/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TripProgress = {
    success?: boolean;
    data?: {
        tripId?: string;
        routeId?: string;
        /**
         * Route completion percentage
         */
        routeProgress?: number;
        /**
         * Total route distance in kilometers
         */
        totalDistance?: number;
        /**
         * Distance traveled in kilometers
         */
        distanceTraveled?: number;
        /**
         * Distance remaining in kilometers
         */
        distanceRemaining?: number;
        /**
         * Estimated trip completion time
         */
        estimatedCompletion?: string;
        /**
         * Average speed in km/h
         */
        averageSpeed?: number;
        stopProgress?: {
            totalStops?: number;
            stopsCompleted?: number;
            currentStopIndex?: number;
            nextStopId?: string;
            nextStopName?: string;
            nextStopETA?: string;
        };
    };
};

