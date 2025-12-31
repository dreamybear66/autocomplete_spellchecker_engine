'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function MetricCard({ label, value, icon, trend, trendValue }: MetricCardProps) {
  return (
    <div className="glassmorphic rounded-2xl p-6 space-y-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-mono font-bold text-foreground">{value}</span>
        {trendValue && (
          <span className={cn(
            "text-xs font-mono font-semibold",
            trend === 'up' ? "text-green-500" : trend === 'down' ? "text-red-500" : "text-muted-foreground"
          )}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
