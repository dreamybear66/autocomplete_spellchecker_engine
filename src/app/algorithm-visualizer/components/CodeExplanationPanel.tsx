'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';

export default function CodeExplanationPanel() {
  return (
    <div className="glassmorphic p-6 rounded-2xl border-white/10 space-y-4 shadow-neural">
      <div className="flex items-center space-x-2">
        <Code2 className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-primary">Algorithm Logic</h3>
      </div>

      <div className="bg-[#0b0e14] rounded-xl p-4 border border-white/5 font-mono text-[11px] leading-relaxed overflow-x-auto">
        <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-white/5 opacity-50">
          <Terminal className="w-3 h-3" />
          <span>levenshtein_distance.ts</span>
        </div>
        <pre className="text-emerald-400">
          {`function calculate(s1, s2) {
  const dp = Array(n + 1).fill(m + 1);
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (s1[i] === s2[j]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = min(delete, insert, sub) + 1;
      }
    }
  }
  return dp[n][m];
}`}
        </pre>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed italic">
        The DP table allows us to build solutions to larger problems using previously calculated optimal sub-problems.
      </p>
    </div>
  );
}
