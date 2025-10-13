/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Get service information and available endpoints
     * @returns any Service information
     * @throws ApiError
     */
    public static get(): CancelablePromise<{
        service?: string;
        version?: string;
        status?: string;
        timestamp?: string;
        endpoints?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Readiness probe for Kubernetes
     * Kubernetes readiness probe to check if service is ready to receive traffic
     * @returns any Service is ready
     * @throws ApiError
     */
    public static getReady(): CancelablePromise<{
        status?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ready',
            errors: {
                503: `Service not ready`,
            },
        });
    }
    /**
     * Liveness probe for Kubernetes
     * Kubernetes liveness probe to check if service is alive and should not be restarted
     * @returns any Service is alive
     * @throws ApiError
     */
    public static getLive(): CancelablePromise<{
        status?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/live',
        });
    }
    /**
     * Get basic application health status
     * Returns basic service health information without external dependencies
     * @returns any Application is healthy
     * @throws ApiError
     */
    public static getApiHealth(): CancelablePromise<{
        status?: string;
        timestamp?: string;
        service?: string;
        /**
         * Uptime in seconds
         */
        uptime?: number;
        version?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health',
            errors: {
                500: `Application is unhealthy`,
            },
        });
    }
    /**
     * Get detailed health status
     * Returns comprehensive health information including dependencies, circuit breakers, and performance metrics
     * @returns any Detailed health information
     * @throws ApiError
     */
    public static getApiHealthDetailed(): CancelablePromise<{
        status?: 'healthy' | 'degraded' | 'unhealthy';
        timestamp?: string;
        service?: string;
        uptime?: number;
        version?: string;
        issues?: Array<string>;
        dependencies?: Record<string, any>;
        circuitBreakers?: Record<string, any>;
        performance?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/detailed',
            errors: {
                503: `Service is unhealthy`,
            },
        });
    }
    /**
     * Check health of external dependencies
     * Returns health status of all external services including Route Service
     * @returns any All dependencies are healthy or partially degraded
     * @throws ApiError
     */
    public static getApiHealthDependencies(): CancelablePromise<{
        status?: 'healthy' | 'degraded' | 'unhealthy';
        timestamp?: string;
        dependencies?: Record<string, {
            status?: string;
            connectivity?: Record<string, any>;
            circuitBreaker?: Record<string, any>;
            performance?: Record<string, any>;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/dependencies',
            errors: {
                503: `One or more dependencies are unhealthy`,
            },
        });
    }
    /**
     * Get performance metrics
     * Returns detailed performance metrics and alerts for the service
     * @param window Time window in minutes (default 60)
     * @param operation Specific operation to get metrics for
     * @returns any Performance metrics retrieved successfully
     * @throws ApiError
     */
    public static getApiHealthMetrics(
        window: number = 60,
        operation?: string,
    ): CancelablePromise<{
        timestamp?: string;
        timeWindow?: string;
        operation?: string;
        stats?: Record<string, any>;
        alerts?: {
            recent?: any[];
            critical?: any[];
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/metrics',
            query: {
                'window': window,
                'operation': operation,
            },
            errors: {
                500: `Error retrieving performance metrics`,
            },
        });
    }
    /**
     * Reset all circuit breakers
     * Administrative endpoint to reset all circuit breakers to closed state
     * @returns any Circuit breakers reset successfully
     * @throws ApiError
     */
    public static postApiHealthCircuitBreakersReset(): CancelablePromise<{
        status?: string;
        message?: string;
        timestamp?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/health/circuit-breakers/reset',
            errors: {
                500: `Error resetting circuit breakers`,
            },
        });
    }
}
