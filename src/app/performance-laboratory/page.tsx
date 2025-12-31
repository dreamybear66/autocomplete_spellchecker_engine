'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  BarChart3,
  Database,
  CheckCircle2,
  FileJson,
  FileSpreadsheet,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'Average Response Time', value: '12.4 ms', icon: Zap, trend: '-15.3%', color: 'text-primary' },
  { label: 'Throughput', value: '8,547 req/s', icon: BarChart3, trend: '+23.7%', color: 'text-secondary' },
  { label: 'Memory Usage', value: '247 MB', icon: Database, trend: '-8.2%', color: 'text-accent' },
  { label: 'Success Rate', value: '99.97 %', icon: CheckCircle2, trend: '+0.12%', color: 'text-emerald-500' },
];

const complexityData = [
  { algorithm: 'Trie Autocomplete', best: 'O(k)', average: 'O(k)', worst: 'O(k)', description: 'Prefix-based search with optimal lookup time' },
  { algorithm: 'BK-Tree Spell Check', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', description: 'Metric tree for edit distance searching' },
  { algorithm: 'HashMap Frequency', best: 'O(1)', average: 'O(1)', worst: 'O(n)', description: 'Constant-time frequency tracking' },
  { algorithm: 'PriorityQueue Ranking', best: 'O(1)', average: 'O(log k)', worst: 'O(log k)', description: 'Efficient top-k selection' },
];

export default function PerformanceLaboratoryPage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-cta font-bold">Performance Laboratory</h2>
        <p className="text-muted-foreground">
          Comprehensive benchmark analysis across different data structures and search modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glassmorphic p-6 rounded-2xl border-white/10 group hover:border-primary/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", metric.color)}>
                <metric.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-success">
                {metric.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground uppercase">{metric.label}</p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glassmorphic rounded-2xl border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Algorithm Complexity Analysis</h3>
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Algorithm</th>
                    <th className="px-6 py-4">Best Case</th>
                    <th className="px-6 py-4">Average Case</th>
                    <th className="px-6 py-4">Worst Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {complexityData.map((row) => (
                    <tr key={row.algorithm} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{row.algorithm}</span>
                          <span className="text-[10px] text-muted-foreground">{row.description}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-primary">{row.best}</td>
                      <td className="px-6 py-4 font-mono text-secondary">{row.average}</td>
                      <td className="px-6 py-4 font-mono text-accent">{row.worst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glassmorphic p-6 rounded-2xl border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Export Report</h3>
              <Download className="w-4 h-4 text-primary" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ExportCard icon={FileJson} label="JSON" />
              <ExportCard icon={FileSpreadsheet} label="CSV" />
              <ExportCard icon={FileText} label="PDF" />
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                <span>Total Tests</span>
                <span className="text-foreground">128</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                <span>Latest Test</span>
                <span className="text-foreground">2026-01-01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportCard({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all group">
      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
      <span className="text-[10px] font-mono font-bold tracking-widest">{label}</span>
    </button>
  );
}
