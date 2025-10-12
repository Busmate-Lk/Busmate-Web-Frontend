/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Readiness probe for Kubernetes
     * @returns any Service is ready
     * @throws ApiError
     */
    public static getReady(): CancelablePromise<any> {
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
     * @returns any Service is alive
     * @throws ApiError
     */
    public static getLive(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/live',
        });
    }
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
     * Get basic health status
     * Returns basic service health information
     * @returns any Service is healthy
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
                500: `Service is unhealthy`,
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
     * Get Route Service integration health
     * Returns health status specifically for Route Service integration including circuit breaker stats and connectivity tests
     * @returns any Route Service integration is healthy or degraded
     * @throws ApiError
     */
    public static getApiHealthRouteService(): CancelablePromise<{
        status?: 'healthy' | 'degraded' | 'unhealthy';
        timestamp?: string;
        service?: string;
        connectivity?: {
            test?: string;
            responseTime?: string;
            error?: string;
        };
        circuitBreaker?: Record<string, any>;
        performance?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/route-service',
            errors: {
                503: `Route Service integration is unhealthy`,
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
     * Generate performance report
     * Generates a comprehensive performance report for the specified time window
     * @param window Time window in minutes (default 60)
     * @param format Response format (json or text)
     * @returns any Performance report generated successfully
     * @throws ApiError
     */
    public static getApiHealthReport(
        window: number = 60,
        format: 'json' | 'text' = 'json',
    ): CancelablePromise<{
        timestamp?: string;
        timeWindow?: string;
        report?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health/report',
            query: {
                'window': window,
                'format': format,
            },
            errors: {
                500: `Error generating performance report`,
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
