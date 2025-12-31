/// <reference types="react" />
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, Activity, Play, RotateCcw, FastForward } from 'lucide-react';
import AppIcon from '@/components/ui/AppIcon';
import { cn } from '@/lib/utils';

interface EditDistanceMatrixProps {
  word1: string;
  word2: string;
}

interface Step {
  r: number;
  c: number;
  type: 'base' | 'match' | 'insert' | 'delete' | 'substitute';
  cost: number;
  description: string;
}

export default function EditDistanceMatrix({ word1, word2 }: EditDistanceMatrixProps) {
  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(300);

  const s1 = useMemo(() => word1.toLowerCase(), [word1]);
  const s2 = useMemo(() => word2.toLowerCase(), [word2]);
  const n = s1.length;
  const m = s2.length;

  const { matrix, steps } = useMemo(() => {
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    const stepList: Step[] = [];

    for (let i = 0; i <= n; i++) {
      dp[i][0] = i;
      stepList.push({ r: i, c: 0, type: 'base', cost: i, description: `Base case: distance for empty target is ${i}` });
    }
    for (let j = 0; j <= m; j++) {
      dp[0][j] = j;
      if (j > 0) stepList.push({ r: 0, c: j, type: 'base', cost: j, description: `Base case: distance for empty source is ${j}` });
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          stepList.push({ r: i, c: j, type: 'match', cost: dp[i][j], description: `'${s1[i - 1]}' matches '${s2[j - 1]}'. Carry over cost from [${i - 1}, ${j - 1}].` });
        } else {
          const deleteCost = dp[i - 1][j];
          const insertCost = dp[i][j - 1];
          const substituteCost = dp[i - 1][j - 1];
          dp[i][j] = Math.min(deleteCost, insertCost, substituteCost) + 1;

          let opType: Step['type'] = 'substitute';
          if (dp[i][j] === deleteCost + 1) opType = 'delete';
          else if (dp[i][j] === insertCost + 1) opType = 'insert';

          stepList.push({ r: i, c: j, type: opType, cost: dp[i][j], description: `Mismatch. Min of delete (${deleteCost}), insert (${insertCost}), substitute (${substituteCost}) + 1.` });
        }
      }
    }
    return { matrix: dp, steps: stepList };
  }, [s1, s2, n, m]);

  const [visibleMatrix, setVisibleMatrix] = useState<number[][]>(() =>
    Array.from({ length: n + 1 }, (_, i) =>
      Array.from({ length: m + 1 }, (_, j) => (i === 0 || j === 0 ? 0 : -1))
    )
  );

  useEffect(() => {
    const newVisible = Array.from({ length: n + 1 }, () => Array(m + 1).fill(-1));
    steps.slice(0, currentStep + 1).forEach((step: Step) => {
      newVisible[step.r][step.c] = step.cost;
    });
    setVisibleMatrix(newVisible);
    if (steps[currentStep]) {
      setActiveCell({ r: steps[currentStep].r, c: steps[currentStep].c });
    }
  }, [currentStep, steps, n, m]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev: number) => prev + 1);
      }, playbackSpeed);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, playbackSpeed]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <AppIcon name="Activity" className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-widest">Levenshtein DP Table</h3>
        </div>

        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={reset}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-primary"
          >
            {isPlaying ? <Activity className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep((prev: number) => Math.min(steps.length - 1, prev + 1))}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-secondary"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="glassmorphic rounded-2xl border-white/10 overflow-hidden overflow-x-auto shadow-neural">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="p-4 border-b border-r border-white/10 text-xs font-mono text-muted-foreground">/</th>
              <th className="p-4 border-b border-r border-white/10 text-xs font-mono text-muted-foreground">ε</th>
              {word2.split('').map((char: string, i: number) => (
                <th key={i} className="p-4 border-b border-r border-white/10 text-xs font-mono font-bold text-secondary uppercase">
                  {char}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-4 border-r border-white/10 text-xs font-mono text-muted-foreground bg-white/5">ε</td>
              {visibleMatrix[0].map((val: number, j: number) => (
                <Cell
                  key={`0-${j}`}
                  value={val}
                  active={activeCell?.r === 0 && activeCell?.c === j}
                />
              ))}
            </tr>
            {word1.split('').map((char: string, i: number) => (
              <tr key={i}>
                <td className="p-4 border-r border-white/10 text-xs font-mono font-bold text-accent uppercase bg-white/5 text-center">
                  {char}
                </td>
                {visibleMatrix[i + 1].map((val: number, j: number) => (
                  <Cell
                    key={`${i + 1}-${j}`}
                    value={val}
                    active={activeCell?.r === i + 1 && activeCell?.c === j}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {steps[currentStep] && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentStep}
          className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start space-x-3"
        >
          <HelpCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-[11px] font-mono font-bold text-primary uppercase">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].type}
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed italic">
              {steps[currentStep].description}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Cell({ value, active }: {
  value: number;
  active: boolean;
}) {
  return (
    <td
      className={cn(
        "p-4 border-r border-white/10 text-center font-mono text-sm transition-all duration-300",
        active ? "bg-primary/20 text-primary scale-110 shadow-neural z-20" : "text-foreground",
        value === -1 ? "opacity-10 text-transparent" : "opacity-100"
      )}
    >
      <motion.span
        initial={false}
        animate={active ? { scale: 1.2 } : { scale: 1 }}
      >
        {value === -1 ? '?' : value}
      </motion.span>
    </td>
  );
}
