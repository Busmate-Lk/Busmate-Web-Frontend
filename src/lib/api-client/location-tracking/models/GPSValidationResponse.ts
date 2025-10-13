/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type GPSValidationResponse = {
    success?: boolean;
    data?: {
        isValid?: boolean;
        coordinates?: {
            latitude?: number;
            longitude?: number;
        };
        accuracy?: GPSValidationResponse.accuracy;
        issues?: Array<string>;
        recommendations?: Array<string>;
    };
};
export namespace GPSValidationResponse {
    export enum accuracy {
        HIGH = 'high',
        MEDIUM = 'medium',
        LOW = 'low',
    }
}

