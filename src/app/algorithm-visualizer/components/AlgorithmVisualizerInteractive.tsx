'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TrieVisualizer from '@/components/visualization/TrieVisualizer';
import EditDistanceMatrix from './EditDistanceMatrix';
import TrieVisualization from './TrieVisualization';
import { Search, Wand2, Network, Table } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AlgorithmVisualizerInteractive() {
  const [query, setQuery] = useState('algorithm');
  const [target, setTarget] = useState('algorithms');
  const [activeTab, setActiveTab] = useState<'trie' | 'matrix'>('trie');

  const dictionary = {
    'algorithm': 156, 'algorithms': 89, 'autocomplete': 234, 'automate': 67, 'automation': 145,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all pl-10"
            placeholder="Word 1 (Source)..."
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-secondary/50 outline-none transition-all pl-10"
            placeholder="Word 2 (Target)..."
          />
          <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex space-x-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
        <TabButton
          active={activeTab === 'trie'}
          onClick={() => setActiveTab('trie')}
          icon={Network}
          label="Trie Structure"
        />
        <TabButton
          active={activeTab === 'matrix'}
          onClick={() => setActiveTab('matrix')}
          icon={Table}
          label="Edit Distance Matrix"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'trie' ? (
            <TrieVisualizer query={query} dictionary={dictionary} />
          ) : (
            <EditDistanceMatrix word1={query} word2={target} />
          )}
        </div>
        <div className="space-y-8">
          <TrieVisualization />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3"
          >
            <h4 className="text-xs font-mono font-bold uppercase text-secondary tracking-widest">Efficiency Insight</h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              The hybrid approach uses a BK-Tree to find candidates within an edit distance of 2,
              then ranks them using Trie frequency metrics to provide the "Did you mean?" suggestions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all",
        active ? "bg-primary text-primary-foreground shadow-neural" : "text-muted-foreground hover:bg-white/5"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
