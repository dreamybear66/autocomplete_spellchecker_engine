'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TrieNodeProps {
  char: string;
  isEndOfWord: boolean;
  frequency: number;
  depth: number;
  isActive: boolean;
  children: string[];
}

export default function TrieNode({
  char,
  isEndOfWord,
  frequency,
  isActive
}: TrieNodeProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 relative",
        isActive
          ? "bg-primary/20 border-primary shadow-algorithm"
          : "bg-muted/40 border-border opacity-50",
        isEndOfWord && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      <span className="text-lg font-mono font-bold text-foreground uppercase">{char}</span>
      {frequency > 0 && (
        <span className="absolute -bottom-1 -right-1 text-[10px] font-mono bg-background border border-border px-1 rounded text-muted-foreground">
          {frequency}
        </span>
      )}
    </motion.div>
  );
}
