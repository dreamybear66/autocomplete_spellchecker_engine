'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrieVisualization() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Network className="w-5 h-5 text-secondary" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">Structure Topology</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricSmall icon={Database} label="Avg Path Length" value="4.2" />
        <MetricSmall icon={Layers} label="Tree Depth" value="12" />
      </div>

      <div className="glassmorphic p-6 rounded-2xl border-white/10 min-h-[200px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full bg-secondary/40"
              />
            ))}
          </div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider italic">Topology Engine Active</p>
        </div>
      </div>
    </div>
  );
}

function MetricSmall({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Icon className="w-3 h-3" />
        <span className="text-[10px] font-mono font-bold uppercase">{label}</span>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
