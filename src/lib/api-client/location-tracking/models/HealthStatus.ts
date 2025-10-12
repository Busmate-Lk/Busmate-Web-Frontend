/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HealthStatus = {
    status?: HealthStatus.status;
    timestamp?: string;
    service?: string;
    uptime?: number;
    version?: string;
};
export namespace HealthStatus {
    export enum status {
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
    }
}

