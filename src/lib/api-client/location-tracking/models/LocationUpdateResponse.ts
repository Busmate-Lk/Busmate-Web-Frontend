/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type LocationUpdateResponse = {
    success?: boolean;
    message?: string;
    data?: {
        locationId?: string;
        tripId?: string;
        timestamp?: string;
        validationStatus?: string;
    };
    metadata?: {
        processingTime?: number;
        validationResults?: {
            isValid?: boolean;
            accuracy?: string;
            issues?: Array<string>;
        };
    };
};

