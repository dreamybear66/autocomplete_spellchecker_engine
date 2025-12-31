'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Search, FolderTree } from 'lucide-react';

export default function DataStructureExplorer() {
  return (
    <div className="glassmorphic p-6 rounded-2xl border-white/10 space-y-6 shadow-neural">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderTree className="w-5 h-5 text-accent" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-accent">Node Explorer</h3>
        </div>
        <Box className="w-4 h-4 text-muted-foreground opacity-50" />
      </div>

      <div className="space-y-3">
        {[
          { label: 'Current Prefix', value: '"algo"', color: 'text-primary' },
          { label: 'Children Count', value: '3 nodes', color: 'text-foreground' },
          { label: 'Leaf Node', value: 'FALSE', color: 'text-error' },
          { label: 'Access Count', value: '1,247 hits', color: 'text-success' },
        ].map((stat) => (
          <div key={stat.label} className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">{stat.label}</span>
            <span className={cn("text-xs font-bold font-mono", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
        <Search className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] font-mono text-muted-foreground font-bold italic">Scanning structure...</span>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
