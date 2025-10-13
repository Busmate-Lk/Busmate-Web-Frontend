/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DependencyHealth = {
    name?: string;
    status?: DependencyHealth.status;
    responseTime?: number;
    lastCheck?: string;
};
export namespace DependencyHealth {
    export enum status {
        HEALTHY = 'healthy',
        DEGRADED = 'degraded',
        UNHEALTHY = 'unhealthy',
    }
}

