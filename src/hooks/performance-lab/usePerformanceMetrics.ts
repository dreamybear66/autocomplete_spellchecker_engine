'use client';

import { useState, useEffect } from 'react';

export interface PerformanceMetrics {
    averageResponseTime: number;
    throughput: number;
    memoryUsage: number;
    successRate: number;
    changes: {
        responseTime: number;
        throughput: number;
        memory: number;
        successRate: number;
    };
}

export function usePerformanceMetrics() {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        averageResponseTime: 12.4,
        throughput: 8547,
        memoryUsage: 247,
        successRate: 99.97,
        changes: {
            responseTime: -15.3,
            throughput: 23.7,
            memory: -8.2,
            successRate: 0.12
        }
    });

    const [isRunning, setIsRunning] = useState(false);

    // Simulate real-time metric updates
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                averageResponseTime: prev.averageResponseTime + (Math.random() - 0.5) * 0.5,
                throughput: Math.max(0, prev.throughput + (Math.random() - 0.5) * 100),
                memoryUsage: Math.max(0, prev.memoryUsage + (Math.random() - 0.5) * 5),
                successRate: Math.min(100, Math.max(0, prev.successRate + (Math.random() - 0.5) * 0.01))
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, [isRunning]);

    const runBenchmark = () => {
        setIsRunning(true);
        // Simulate benchmark completion after 10 seconds
        setTimeout(() => setIsRunning(false), 10000);
    };

    const resetMetrics = () => {
        setMetrics({
            averageResponseTime: 12.4,
            throughput: 8547,
            memoryUsage: 247,
            successRate: 99.97,
            changes: {
                responseTime: -15.3,
                throughput: 23.7,
                memory: -8.2,
                successRate: 0.12
            }
        });
        setIsRunning(false);
    };

    return {
        metrics,
        isRunning,
        runBenchmark,
        resetMetrics
    };
}
