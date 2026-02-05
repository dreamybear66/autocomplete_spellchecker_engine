'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronUp, Info, Clock, Database } from 'lucide-react';

const editDistanceCode = `function editDistance(source: string, target: string): number {
  const m = source.length;
  const n = target.length;
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));
  
  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (source[i - 1] === target[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // Match
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Substitute
        );
      }
    }
  }
  
  return dp[m][n];
}`;

const spellCorrectionCode = `function spellCorrect(
  word: string,
  dictionary: string[],
  maxDistance: number = 2
): string[] {
  const suggestions: Array<{word: string, distance: number}> = [];
  
  for (const dictWord of dictionary) {
    const distance = editDistance(word, dictWord);
    
    if (distance <= maxDistance) {
      suggestions.push({ word: dictWord, distance });
    }
  }
  
  // Sort by distance, then alphabetically
  return suggestions
    .sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }
      return a.word.localeCompare(b.word);
    })
    .map(s => s.word);
}`;

interface EditDistanceCodeExplanationProps {
    activeOperation: 'algorithm' | 'spellcheck';
    onOperationChange: (operation: 'algorithm' | 'spellcheck') => void;
}

export default function EditDistanceCodeExplanation({
    activeOperation,
    onOperationChange
}: EditDistanceCodeExplanationProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const code = activeOperation === 'algorithm' ? editDistanceCode : spellCorrectionCode;
    const explanation = activeOperation === 'algorithm'
        ? "Dynamic programming approach to calculate minimum edit operations. Each cell dp[i][j] represents the minimum cost to transform source[0..i] to target[0..j]. Operations include match (cost 0), insert, delete, and substitute (each cost 1)."
        : "Spell correction finds dictionary words within a maximum edit distance threshold. Results are ranked by similarity (lower distance = better match), then alphabetically for ties.";

    const timeComplexity = activeOperation === 'algorithm'
        ? "O(m × n) where m, n are string lengths"
        : "O(d × m × n) where d is dictionary size";

    const spaceComplexity = activeOperation === 'algorithm'
        ? "O(m × n) for DP table"
        : "O(k) for storing k suggestions";

    return (
        <div className="bg-background-card border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background-tertiary/30">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-mono font-bold text-white">Code Explanation</h2>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg hover:bg-background-tertiary transition-colors"
                >
                    {isCollapsed ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>

            {!isCollapsed && (
                <div className="p-4 space-y-4">
                    {/* Tab Switcher */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onOperationChange('algorithm')}
                            className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${activeOperation === 'algorithm'
                                    ? 'bg-primary text-background shadow-neon'
                                    : 'bg-background-tertiary text-gray-400 hover:text-white'
                                }`}
                        >
                            Levenshtein Distance Algorithm
                        </button>
                        <button
                            onClick={() => onOperationChange('spellcheck')}
                            className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${activeOperation === 'spellcheck'
                                    ? 'bg-primary text-background shadow-neon'
                                    : 'bg-background-tertiary text-gray-400 hover:text-white'
                                }`}
                        >
                            Spell Correction with Edit Distance
                        </button>
                    </div>

                    {/* Code Block */}
                    <div className="rounded-lg overflow-hidden border border-border">
                        {/* macOS-style window controls */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-background-tertiary border-b border-border">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs font-mono text-gray-400 ml-2">typescript</span>
                        </div>

                        {/* Code */}
                        <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            <SyntaxHighlighter
                                language="typescript"
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '1rem',
                                    background: '#0d1117',
                                    fontSize: '13px',
                                    fontFamily: 'JetBrains Mono, monospace'
                                }}
                                showLineNumbers
                            >
                                {code}
                            </SyntaxHighlighter>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="bg-background-tertiary/50 border border-border rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-2">
                            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <h3 className="font-mono font-semibold text-white">Explanation</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {explanation}
                        </p>
                    </div>

                    {/* Complexity Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Time Complexity */}
                        <div className="bg-background-tertiary/50 border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <h4 className="text-xs font-mono font-semibold text-gray-400">Time Complexity</h4>
                            </div>
                            <p className="text-sm font-mono text-primary font-semibold">
                                {timeComplexity}
                            </p>
                        </div>

                        {/* Space Complexity */}
                        <div className="bg-background-tertiary/50 border border-border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Database className="w-4 h-4 text-primary" />
                                <h4 className="text-xs font-mono font-semibold text-gray-400">Space Complexity</h4>
                            </div>
                            <p className="text-sm font-mono text-primary font-semibold">
                                {spaceComplexity}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
