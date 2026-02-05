'use client';

import { Activity } from 'lucide-react';
import { usePerformanceMetrics } from '@/hooks/performance-lab/usePerformanceMetrics';
import MetricsCard from './MetricsCard';
import ComplexityTable from './ComplexityTable';
import ExportPanel from './ExportPanel';
import ThreeBackground from '@/components/shared/ThreeBackground';
import { Clock, Zap, HardDrive, CheckCircle } from 'lucide-react';

export default function PerformanceLabContent() {
    const { metrics } = usePerformanceMetrics();

    return (
        <>
            <ThreeBackground />
            <div className="min-h-screen bg-background relative z-10">
                <div className="pt-24 px-6 lg:px-8 pb-16">
                    <div className="max-w-[1800px] mx-auto space-y-8">
                        {/* Hero Section */}
                        <div className="text-center space-y-4 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="text-sm text-primary font-mono font-medium">
                                    Performance Laboratory
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white">
                                Performance <span className="text-primary">Laboratory</span>
                            </h1>

                            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-mono">
                                Comprehensive algorithm benchmarking and optimization analysis
                            </p>
                        </div>

                        {/* Content */}
                        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <MetricsCard
                                    label="Average Response Time"
                                    value={metrics.averageResponseTime.toFixed(1)}
                                    unit="ms"
                                    change={metrics.changes.responseTime}
                                    icon={Clock}
                                />
                                <MetricsCard
                                    label="Throughput"
                                    value={Math.round(metrics.throughput).toLocaleString()}
                                    unit="req/s"
                                    change={metrics.changes.throughput}
                                    icon={Zap}
                                />
                                <MetricsCard
                                    label="Memory Usage"
                                    value={Math.round(metrics.memoryUsage)}
                                    unit="MB"
                                    change={metrics.changes.memory}
                                    icon={HardDrive}
                                />
                                <MetricsCard
                                    label="Success Rate"
                                    value={metrics.successRate.toFixed(2)}
                                    unit="%"
                                    change={metrics.changes.successRate}
                                    icon={CheckCircle}
                                />
                            </div>

                            {/* Complexity Table and Export Panel */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <ComplexityTable />
                                </div>
                                <div>
                                    <ExportPanel
                                        totalTests={2}
                                        latestTest={new Date('2025-12-31T09:38:15')}
                                        metrics={metrics}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


