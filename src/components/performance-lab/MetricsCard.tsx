'use client';

import { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock, Zap, HardDrive, CheckCircle } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string | number;
    unit: string;
    change: number;
    icon: React.ElementType;
}

export default function MetricsCard({ label, value, unit, change, icon: Icon }: MetricCardProps) {
    const isPositive = change > 0;
    const isNegative = change < 0;

    // Determine if positive change is good based on metric type
    const isGoodChange =
        (label.includes('Throughput') || label.includes('Success Rate')) ? isPositive :
            (label.includes('Response Time') || label.includes('Memory')) ? isNegative :
                isPositive;

    return (
        <div className="bg-background-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
            {/* Icon and Change Indicator */}
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-mono ${isGoodChange ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                    ) : (
                        <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
                </div>
            </div>

            {/* Label */}
            <div className="text-sm text-gray-400 font-mono mb-2">
                {label}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white font-mono">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
                <span className="text-lg text-gray-500 font-mono">
                    {unit}
                </span>
            </div>
        </div>
    );
}
