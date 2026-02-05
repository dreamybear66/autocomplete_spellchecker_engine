'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronUp, Info, Clock, Database } from 'lucide-react';

const trieInsertCode = `class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency: number;
  
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.frequency = 0;
  }
}

function insert(root: TrieNode, word: string): void {
  let current = root;
  for (const char of word) {
    if (!current.children.has(char)) {
      current.children.set(char, new TrieNode());
    }
    current = current.children.get(char)!;
  }
  current.isEndOfWord = true;
  current.frequency++;
}`;

const trieSearchCode = `function search(root: TrieNode, prefix: string): string[] {
  let current = root;
  
  // Navigate to prefix end
  for (const char of prefix) {
    if (!current.children.has(char)) {
      return [];
    }
    current = current.children.get(char)!;
  }
  
  // DFS to collect all words
  const results: Array<{word: string, freq: number}> = [];
  
  function dfs(node: TrieNode, path: string) {
    if (node.isEndOfWord) {
      results.push({ word: prefix + path, freq: node.frequency });
    }
    for (const [char, child] of node.children) {
      dfs(child, path + char);
    }
  }
  
  dfs(current, '');
  
  // Sort by frequency
  return results
    .sort((a, b) => b.freq - a.freq)
    .map(r => r.word);
}`;

interface CodeExplanationProps {
    activeOperation: 'insert' | 'search';
    onOperationChange: (operation: 'insert' | 'search') => void;
}

export default function CodeExplanation({ activeOperation, onOperationChange }: CodeExplanationProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const code = activeOperation === 'insert' ? trieInsertCode : trieSearchCode;
    const explanation = activeOperation === 'insert'
        ? "The insert operation traverses the Trie character by character, creating new nodes as needed. Each character becomes a node, and the final character is marked as end of word with frequency tracking."
        : "Search navigates to the prefix end, then performs DFS to collect all words with that prefix. Results are sorted by frequency for relevance ranking.";

    const timeComplexity = activeOperation === 'insert'
        ? "O(m) where m is word length"
        : "O(p + n) where p is prefix length, n is results";

    const spaceComplexity = activeOperation === 'insert'
        ? "O(m) for new word insertion"
        : "O(n) for storing results";

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
                            onClick={() => onOperationChange('insert')}
                            className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${activeOperation === 'insert'
                                    ? 'bg-primary text-background shadow-neon'
                                    : 'bg-background-tertiary text-gray-400 hover:text-white'
                                }`}
                        >
                            Trie Insert Operation
                        </button>
                        <button
                            onClick={() => onOperationChange('search')}
                            className={`flex-1 px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all ${activeOperation === 'search'
                                    ? 'bg-primary text-background shadow-neon'
                                    : 'bg-background-tertiary text-gray-400 hover:text-white'
                                }`}
                        >
                            Trie Search Operation
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
                        <div className="max-h-96 overflow-y-auto">
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
